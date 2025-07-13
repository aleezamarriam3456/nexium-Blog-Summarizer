"use client";

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface SummaryRecord {
  id: string;
  blog_url: string;
  summary: string;
  created_at: string;
}

export default function History() {
  const [summaries, setSummaries] = useState<SummaryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummaries() {
      const { data, error } = await supabase
        .from('summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch summaries:', error);
      } else if (data) {
        setSummaries(data as SummaryRecord[]);
      }
      setLoading(false);
    }
    fetchSummaries();
  }, []);

  if (loading) return <p>Loading summaries...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Summaries History</h1>
      {summaries.length === 0 && <p>No summaries saved yet.</p>}
      <ul className="space-y-6">
        {summaries.map(({ id, blog_url, summary, created_at }) => (
          <li key={id} className="border p-4 rounded shadow">
            <p className="text-sm text-gray-600 mb-2">
              URL: <a href={blog_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{blog_url}</a>
            </p>
            <p className="mb-2">{summary}</p>
            <p className="text-xs text-gray-500">Saved on: {new Date(created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
