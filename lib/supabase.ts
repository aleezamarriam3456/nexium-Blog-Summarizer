import { createClient } from '@supabase/supabase-js';

// ✅ Use server-safe env vars (don't use NEXT_PUBLIC here)
const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_KEY ?? '';

// ✅ Throw error if missing env vars
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Key must be provided in environment variables');
}

// ✅ Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Type for Supabase summary record
export interface SummaryRecord {
  id?: string;
  blog_url: string;
  summary: string;
  urduSummary?: string;
  created_at?: string;
}

// ✅ Save a summary to Supabase
export async function saveSummary(
  blogUrl: string,
  summary: string,
  urduSummary?: string
): Promise<SummaryRecord[]> {
  const { data, error } = await supabase
    .from('summaries')
    .insert([
      {
        blog_url: blogUrl,
        summary,
        urdu_summary: urduSummary ?? null,
        created_at: new Date(),
      },
    ])
    .select();

  if (error) {
    console.error('Error saving summary:', error);
    throw error;
  }

  return (data ?? []).map((item) => ({
    ...item,
    urduSummary: (item as any).urdu_summary,
  })) as SummaryRecord[];
}

// ✅ Fetch all summaries
export async function fetchSummaries(): Promise<SummaryRecord[]> {
  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }

  return (data ?? []).map((item) => ({
    ...item,
    urduSummary: (item as any).urdu_summary,
  })) as SummaryRecord[];
}
