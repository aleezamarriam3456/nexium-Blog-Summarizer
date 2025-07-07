"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [blogUrl, setBlogUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!blogUrl) return alert("Please enter a blog URL.");

    setLoading(true);
    setSummary("");

    // Simulate AI summary fetching (replace with your API call)
    setTimeout(() => {
      setSummary(
        "This is a simulated summary of the blog at " + blogUrl + ". It highlights the key points clearly and concisely."
      );
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      {/* Main dashboard area */}
      <main className="row-start-2 flex flex-col gap-8 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl font-bold">Blog Summarizer</h1>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Enter blog URL here"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            className="w-full p-3 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-ring focus:outline-2 transition"
          />
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/80 disabled:opacity-50 transition"
          >
            {loading ? "Summarizing..." : "Get Summary"}
          </button>

          {summary && (
            <section className="mt-6 bg-card p-5 rounded-md border border-border">
              <h2 className="text-2xl font-semibold mb-3">Summary</h2>
              <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
            </section>
          )}
        </div>
      </main>

      {/* Footer with links and icons */}
      <footer className="row-start-3 flex gap-6 flex-wrap justify-center items-center text-sm font-medium">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} aria-hidden />
          Learn
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} aria-hidden />
          Examples
        </a>

        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} aria-hidden />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
