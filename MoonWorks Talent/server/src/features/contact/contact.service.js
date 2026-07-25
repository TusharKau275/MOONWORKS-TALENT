import { supabase } from '../../lib/supabaseClient.js';

export const insertContactSubmission = async (data) => {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([data])
    .select('id')
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Failed to save submission. Please try again later.');
  }

  return result;
};
