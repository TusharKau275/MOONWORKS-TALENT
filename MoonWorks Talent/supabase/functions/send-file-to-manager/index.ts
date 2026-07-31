import { createClient } from '@supabase/supabase-js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const MANAGER_EMAIL = Deno.env.get('MANAGER_EMAIL')!
const FROM_EMAIL = Deno.env.get('FROM_EMAIL')! // must be a verified domain in Resend

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // needed to read storage regardless of RLS
)

Deno.serve(async (req) => {
  try {
    const payload = await req.json()

    // Storage webhook payload shape: { type, table, record, ... }
    // record.bucket_id and record.name give you the file
    const bucket = payload.record?.bucket_id
    const path = payload.record?.name

    if (!bucket || !path) {
      return new Response('No file info in payload', { status: 400 })
    }

    // Download the file from storage
    const { data: fileBlob, error: downloadError } = await supabase
      .storage
      .from(bucket)
      .download(path)

    if (downloadError) throw downloadError

    const arrayBuffer = await fileBlob.arrayBuffer()
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((s, b) => s + String.fromCharCode(b), '')
    )

    const filename = path.split('/').pop()

    // Send via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: MANAGER_EMAIL,
        subject: `New file uploaded: ${filename}`,
        text: `A new file was uploaded to ${bucket}/${path}. See attached.`,
        attachments: [
          {
            filename,
            content: base64,
          },
        ],
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.text()
      throw new Error(`Resend error: ${err}`)
    }

    return new Response('Email sent', { status: 200 })
  } catch (err) {
    console.error(err)
    const message = err instanceof Error ? err.message : (err as { message?: string })?.message || String(err)
    return new Response(`Error: ${message}`, { status: 500 })
  }
})