import { supabase } from '../../lib/supabaseClient.js';

export const fetchAllSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error);
    throw new Error('Failed to fetch submissions.');
  }

  return data;
};
