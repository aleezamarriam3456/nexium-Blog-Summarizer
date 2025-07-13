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
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract main text (simple logic)
    const paragraphs = $('p').map((i, el) => $(el).text()).get();
    const fullText = paragraphs.join('\n');

    // Simulate static AI summary (first 3 lines)
    const summary = paragraphs.slice(0, 3).join(' ');

    // Translate to Urdu (basic dictionary)
    const dictionary: { [key: string]: string } = {
      'the': 'د', 'is': 'ہے', 'blog': 'بلاگ', 'about': 'بارے میں',
      'this': 'یہ', 'a': 'ایک'
    };

    const translateToUrdu = (text: string) => {
      return text.split(' ').map(word => dictionary[word.toLowerCase()] || word).join(' ');
    };

    const urduSummary = translateToUrdu(summary);

    // Optional: save to Supabase & MongoDB here or do it elsewhere
    // await saveToSupabase(blogUrl, summary, urduSummary);
    // await saveToMongoDB(blogUrl, fullText);

    return NextResponse.json({ fullText, summary, urduSummary });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json({ error: 'Failed to scrape or process blog' }, { status: 500 });
  }
}
