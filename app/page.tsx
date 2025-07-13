'use client';

import { useState } from 'react';
import { translateToUrdu } from '../lib/translate'; // Adjust path if needed

export default function Home() {
  const [blogUrl, setBlogUrl] = useState('');         // <-- Added state for URL input
  const [blogContent, setBlogContent] = useState('');
  const [summary, setSummary] = useState('');
  const [urduSummary, setUrduSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple summarizer: first 3 sentences
  function summarize(text: string): string {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    return sentences.slice(0, 3).join(' ').trim();
  }

  // Fetch blog content from your API route using URL
  async function fetchBlogContent(url: string): Promise<string> {
    const res = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to fetch blog content.');
    }
    const data = await res.json();
    return data.content;
  }

  async function handleSummarize() {
    setError(null);
    setSummary('');
    setUrduSummary('');
    setLoading(true);

    try {
      let content = blogContent;

      // If user provided URL but no manual content, fetch content from URL
      if (!content.trim() && blogUrl.trim()) {
        content = await fetchBlogContent(blogUrl.trim());
      }

      if (!content.trim()) {
        setError('Please paste the blog content or provide a valid URL.');
        setLoading(false);
        return;
      }

      const englishSummary = summarize(content);
      const urdu = translateToUrdu(englishSummary);

      setSummary(englishSummary);
      setUrduSummary(urdu);
    } catch (e: any) {
      setError(e.message || 'Something went wrong.');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-sans flex flex-col justify-between">
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 sm:px-12 py-12 flex flex-col gap-10">
        <div
          className="header-row"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
        >
          <h1 className="text-4xl font-bold text-[#2c2a29] select-none">Nexium Blog Summarizer</h1>
          <nav
            className="dashboard-nav"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2rem',
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#2c2a29',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <a href="#about" className="hover:text-[#4f46e5]">About</a>
            <a href="#account" className="hover:text-[#4f46e5]">Account</a>
            <a href="#settings" className="hover:text-[#4f46e5]">Settings</a>
            <a href="#help" className="hover:text-[#4f46e5]">Help</a>
            <a href="#history" className="hover:text-[#4f46e5]">History</a>
          </nav>
        </div>

        {/* NEW URL input field */}
        <div className="max-w-xl w-full flex flex-col gap-4">
          <label htmlFor="blogUrl" className="block text-2xl font-semibold text-[#2c2a29]">
            Enter Blog URL (optional)
          </label>
          <input
            id="blogUrl"
            type="url"
            placeholder="https://example.com/blog-post"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:border-[#9b5de5] focus:ring-4 focus:ring-[#9b5de5]/30 px-5 py-4 text-[#1c1c1c] placeholder-gray-500 font-medium outline-none"
            disabled={loading}
          />
        </div>

        <div className="max-w-xl w-full flex flex-col gap-4">
          <label htmlFor="blogContent" className="block text-2xl font-semibold text-[#2c2a29]">
            Paste Blog Content to Summarize
          </label>
          <textarea
            id="blogContent"
            placeholder="Paste full blog content here..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:border-[#9b5de5] focus:ring-4 focus:ring-[#9b5de5]/30 px-5 py-4 text-[#1c1c1c] placeholder-gray-500 font-medium outline-none resize-y"
            rows={10}
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleSummarize}
            disabled={loading}
            className="bg-[#9b5de5] disabled:bg-[#d8b4fe] text-white font-semibold py-4 rounded-xl shadow-md hover:bg-[#7c3aed] active:scale-95 transition-transform"
          >
            {loading ? 'Summarizing...' : 'Generate Summary'}
          </button>
        </div>

        {error && (
          <p className="max-w-xl text-red-600 font-semibold" role="alert">
            {error}
          </p>
        )}

        {summary && (
          <article className="max-w-xl bg-[#fef3c7] rounded-2xl border border-gray-200 p-8 text-[#2c2a29] leading-relaxed whitespace-pre-wrap font-medium select-text">
            <h2 className="text-3xl font-bold mb-6">Summary</h2>
            <p>{summary}</p>
          </article>
        )}

        {urduSummary && (
          <article className="max-w-xl bg-[#e8f5e9] rounded-2xl border border-gray-200 p-8 text-[#2c2a29] leading-relaxed whitespace-pre-wrap font-medium select-text">
            <h2 className="text-3xl font-bold mb-6">خلاصہ (Urdu Summary)</h2>
            <p>{urduSummary}</p>
          </article>
        )}
      </main>

      <footer className="w-full bg-white bg-opacity-90 backdrop-blur-md px-6 py-6 shadow-inner text-[#2c2a29] font-medium text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <p>© 2025 Nexium. All rights reserved.</p>
          <div className="flex gap-5 justify-center text-2xl">
            <a href="https://facebook.com/nexium" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">📘</a>
            <a href="https://twitter.com/nexium" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">🐦</a>
            <a href="https://instagram.com/nexium" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">📸</a>
            <a href="mailto:contact@nexium.com" className="hover:text-[#9b5de5]">✉️</a>
            <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">📚</a>
            <a href="https://vercel.com/templates?framework=next.js" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">🚀</a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#9b5de5]">🌐</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
