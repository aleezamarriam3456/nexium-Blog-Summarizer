"use client";

import { useState } from "react";

export default function Home() {
  const [blogUrl, setBlogUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSummarize() {
    if (!blogUrl) return alert("Please enter a blog URL.");
    setLoading(true);
    setSummary("");

    setTimeout(() => {
      setSummary(
        `This is a simulated summary of the blog at ${blogUrl}. It highlights the key points clearly and concisely.`
      );
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-sans flex flex-col justify-between">
      {/* Main Content Container */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 sm:px-12 py-12 flex flex-col gap-10">
        {/* Header row: Main heading left, dashboard links right */}
        <div
          className="header-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h1 className="text-4xl font-bold text-[#2c2a29] select-none">
            Nexium Blog Summarizer
          </h1>

          <nav
            className="dashboard-nav"
            style={{
              display: "flex",
              flexDirection: "row",       // <-- Changed here to horizontal row
              alignItems: "center",       // vertically center links
              gap: "2rem",                // space between links
              fontWeight: 600,
              fontSize: "1.125rem",
              color: "#2c2a29",
              userSelect: "none",
              whiteSpace: "nowrap",       // prevent wrapping
            }}
          >
            <a
              href="#about"
              className="hover:text-[#4f46e5]"
              style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
            >
              About
            </a>
            <a
              href="#account"
              className="hover:text-[#4f46e5]"
              style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
            >
              Account
            </a>
            <a
              href="#settings"
              className="hover:text-[#4f46e5]"
              style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
            >
              Settings
            </a>
            <a
              href="#help"
              className="hover:text-[#4f46e5]"
              style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
            >
              Help
            </a>
          </nav>
        </div>

        {/* Input and Button spanning full width */}
        <div className="max-w-xl w-full flex flex-col gap-4">
          <label
            htmlFor="blogUrl"
            className="block text-2xl font-semibold text-[#2c2a29]"
          >
            Enter Blog URL to Summarize
          </label>
          <input
            id="blogUrl"
            type="url"
            placeholder="https://example.com/blog-post"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            className="w-full rounded-lg border border-gray-300 focus:border-[#9b5de5] focus:ring-4 focus:ring-[#9b5de5]/30 px-5 py-4 text-[#1c1c1c] placeholder-gray-500 font-medium outline-none"
          />
          <button
            type="button"
            onClick={handleSummarize}
            disabled={loading}
            className="bg-[#9b5de5] disabled:bg-[#d8b4fe] text-white font-semibold py-4 rounded-xl shadow-md hover:bg-[#7c3aed] active:scale-95 transition-transform"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </div>

        {/* Summary Output */}
        {summary && (
          <article className="max-w-xl bg-[#fef3c7] rounded-2xl border border-gray-200 p-8 text-[#2c2a29] leading-relaxed whitespace-pre-wrap font-medium select-text">
            <h2 className="text-3xl font-bold mb-6">Summary</h2>
            <p>{summary}</p>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white bg-opacity-90 backdrop-blur-md px-6 py-6 shadow-inner text-[#2c2a29] font-medium text-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <p>© 2025 Nexium. All rights reserved.</p>
          <div className="flex gap-5 justify-center text-2xl">
            <a
              href="https://facebook.com/nexium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              📘
            </a>
            <a
              href="https://twitter.com/nexium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              🐦
            </a>
            <a
              href="https://instagram.com/nexium"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              📸
            </a>
            <a
              href="mailto:contact@nexium.com"
              className="hover:text-[#9b5de5]"
            >
              ✉️
            </a>
            <a
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              📚
            </a>
            <a
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              🚀
            </a>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9b5de5]"
            >
              🌐
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
