import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const { blogUrl, summary, urduSummary } = await request.json();

    if (!blogUrl || !summary || !urduSummary) {
      return NextResponse.json({ error: 'Missing one or more required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('summaries')
      .insert([{ blog_url: blogUrl, summary, urdu_summary: urduSummary, created_at: new Date() }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save summary' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Summary saved successfully', data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
