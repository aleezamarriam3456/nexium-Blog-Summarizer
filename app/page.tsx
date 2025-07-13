"use client";

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [blogUrl, setBlogUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduSummary, setUrduSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSummarize() {
    if (!blogUrl) {
      alert("Please enter a blog URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setSummary("");
    setUrduSummary("");

    try {
      // 1. Scrape full text
      const scrapeRes = await fetch(`/api/scrape?url=${encodeURIComponent(blogUrl)}`);
      const scrapeData = await scrapeRes.json();
      if (!scrapeRes.ok) throw new Error(scrapeData.error || 'Failed to scrape blog');

      const fullText = scrapeData.fullText || scrapeData.text || scrapeData; // adapt if needed

      if (!fullText) throw new Error('No text scraped from the blog URL');

      // 2. Summarize
      const summarizeRes = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullText }),
      });
      const summarizeData = await summarizeRes.json();
      if (!summarizeRes.ok) throw new Error(summarizeData.error || 'Failed to summarize');

      const { summary: englishSummary, urduSummary: urduSum } = summarizeData;

      setSummary(englishSummary);
      setUrduSummary(urduSum);

      // 3. Save full text to MongoDB
      await fetch('/api/save-to-mango', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogUrl, fullText }),
      });

      // 4. Save summaries to Supabase
      await fetch('/api/save-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogUrl, summary: englishSummary, urduSummary: urduSum }),
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-sans flex flex-col justify-between">
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 sm:px-12 py-12 flex flex-col gap-10">
        <div className="header-row flex justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-[#2c2a29] select-none">
            Nexium Blog Summarizer
          </h1>

          <nav className="dashboard-nav flex flex-row items-center gap-8 font-semibold text-[#2c2a29] select-none whitespace-nowrap">
            <a href="#about" className="hover:text-[#4f46e5]">About</a>
            <a href="#account" className="hover:text-[#4f46e5]">Account</a>
            <a href="#settings" className="hover:text-[#4f46e5]">Settings</a>
            <a href="#help" className="hover:text-[#4f46e5]">Help</a>
          </nav>
        </div>

        <div className="max-w-xl w-full flex flex-col gap-4">
          <label htmlFor="blogUrl" className="block text-2xl font-semibold text-[#2c2a29]">
            Enter Blog URL to Summarize
          </label>

          <Input
            id="blogUrl"
            type="url"
            placeholder="https://example.com/blog-post"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            className="px-5 py-4"
          />

          <Button
            type="button"
            onClick={handleSummarize}
            disabled={loading}
            className="bg-[#9b5de5] disabled:bg-[#d8b4fe]"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </Button>
        </div>

        <Separator />

        {error && (
          <p className="max-w-xl text-red-600 font-semibold">{error}</p>
        )}

        {summary && (
          <Card className="max-w-xl bg-[#fef3c7] border-gray-200">
            <CardContent className="p-8 text-[#2c2a29] leading-relaxed whitespace-pre-wrap font-medium select-text">
              <h2 className="text-3xl font-bold mb-6">Summary</h2>
              <p>{summary}</p>
            </CardContent>
          </Card>
        )}

        {urduSummary && (
          <Card className="max-w-xl bg-[#e8f5e9] border-gray-200">
            <CardContent className="p-8 text-[#2c2a29] leading-relaxed whitespace-pre-wrap font-medium select-text">
              <h2 className="text-3xl font-bold mb-6">خلاصہ (Urdu Summary)</h2>
              <p>{urduSummary}</p>
            </CardContent>
          </Card>
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
