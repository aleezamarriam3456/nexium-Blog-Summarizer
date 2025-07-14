import { createClient } from '@supabase/supabase-js';

// ✅ Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// ✅ Throw error if missing credentials
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables');
}

// ✅ Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ TypeScript interface for summary records
export interface SummaryRecord {
  id?: string;
  blog_url: string;
  summary: string;
  urduSummary?: string; // camelCase used in the app
  created_at?: string;
}

// ✅ Save a summary to Supabase (maps camelCase → snake_case)
export async function saveSummary(
  blogUrl: string,
  summary: string,
  urduSummary?: string
): Promise<SummaryRecord[]> {
  const { data, error } = await supabase
    .from('summaries') // make sure this is your actual table name
    .insert([
      {
        blog_url: blogUrl,
        summary,
        urdu_summary: urduSummary ?? null, // snake_case for DB
        created_at: new Date(),
      },
    ])
    .select();

  if (error) {
    console.error('Error saving summary:', error);
    throw error;
  }

  // ✅ Convert snake_case urdu_summary → camelCase urduSummary
  return (data ?? []).map(item => ({
    ...item,
    urduSummary: (item as any).urdu_summary,
  })) as SummaryRecord[];
}

// ✅ Fetch summaries (maps urdu_summary → urduSummary)
export async function fetchSummaries(): Promise<SummaryRecord[]> {
  const { data, error } = await supabase
    .from('summaries') // same table name
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }

  return (data ?? []).map(item => ({
    ...item,
    urduSummary: (item as any).urdu_summary,
  })) as SummaryRecord[];
}
