import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SummaryRecord {
  id?: string;
  blog_url: string;
  summary: string;
  created_at?: string;
}

export async function saveSummary(url: string, summary: string): Promise<SummaryRecord[]> {
  const { data, error } = await supabase
    .from('summaries')
    .insert([{ blog_url: url, summary }])
    .select();

  if (error) {
    console.error('Error saving summary:', error);
    throw error;
  }

  return data as SummaryRecord[] || [];
}

