import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { translateToUrdu } from '../../../lib/translate'; // your custom translation function

// Simple summarizer: first 3 sentences
function summarize(text: string): string {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences.slice(0, 3).join(' ');
}

export async function POST(request: Request) {
  try {
    const { blogUrl } = await request.json();

    if (!blogUrl || typeof blogUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing blogUrl' }, { status: 400 });
    }

    const res = await fetch(blogUrl);
    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch URL: ${res.status}` }, { status: 400 });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    let text = '';
    $('p').each((_, el) => {
      text += $(el).text() + ' ';
    });

    if (!text.trim()) {
      return NextResponse.json({ error: 'No readable text found.' }, { status: 400 });
    }

    const englishSummary = summarize(text.trim());
    const urduSummary = translateToUrdu(englishSummary);

    return NextResponse.json({ englishSummary, urduSummary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
