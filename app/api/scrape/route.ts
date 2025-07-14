import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const blogUrl = url.searchParams.get('url');

  if (!blogUrl) {
    return NextResponse.json({ error: 'Missing blog URL parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(blogUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the blog URL' }, { status: 502 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract main text: get all paragraph texts
    const paragraphs = $('p').map((_, el) => $(el).text()).get();
    const fullText = paragraphs.join('\n\n');

    // Simulate AI summary: take first 3 paragraphs and join as summary
    const summary = paragraphs.slice(0, 3).join(' ');

    // Simple Urdu dictionary for translation
    const dictionary: Record<string, string> = {
      'the': 'د', 'is': 'ہے', 'blog': 'بلاگ', 'about': 'بارے میں',
      'this': 'یہ', 'a': 'ایک'
    };

    // Basic word-by-word translation function
    const translateToUrdu = (text: string) => {
      return text
        .split(' ')
        .map(word => dictionary[word.toLowerCase()] || word)
        .join(' ');
    };

    const urduSummary = translateToUrdu(summary);

    // Return scraped text and translations
    return NextResponse.json({ fullText, summary, urduSummary });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json({ error: 'Failed to scrape or process blog' }, { status: 500 });
  }
}
