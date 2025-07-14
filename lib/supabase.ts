import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key must be provided in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface SummaryRecord {
  id?: string;
  blog_url: string;
  summary: string;
  urduSummary?: string | null;
  created_at?: string;
}

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
