"use client";

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface SummaryRecord {
  id: string;
  blog_url: string;
  summary: string;
  urduSummary?: string;
  created_at: string;
}

export default function HistoryPage() {
  const [summaries, setSummaries] = useState<SummaryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummaries() {
      const { data, error } = await supabase
        .from('summaries') // ✅ make sure this matches your table name
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch summaries:', error);
      } else if (data) {
        const mapped = data.map(item => ({
          ...item,
          urduSummary: (item as any).urdu_summary, // ✅ map correctly from DB
        }));
        setSummaries(mapped);
      }

      setLoading(false);
    }

    fetchSummaries();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-700">Loading summaries...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#2c2a29]">🕘 Summary History</h1>

      {summaries.length === 0 ? (
        <p className="text-gray-600">No summaries saved yet.</p>
      ) : (
        <ul className="space-y-6">
          {summaries.map(({ id, blog_url, summary, urduSummary, created_at }) => (
            <li key={id} className="border rounded-lg shadow-sm p-5 bg-white break-words">
              <p className="text-sm text-gray-600 mb-2">
                🔗 URL:{' '}
                <a
                  href={blog_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {blog_url}
                </a>
              </p>

              <p className="mb-2 text-[#2c2a29]">
                <strong>📄 Summary:</strong> {summary}
              </p>

              {urduSummary && (
                <p className="mb-2 text-green-700">
                  <strong>📝 اردو خلاصہ:</strong> {urduSummary}
                </p>
              )}

              <p className="text-xs text-gray-500">
                📅 Saved on: {new Date(created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
