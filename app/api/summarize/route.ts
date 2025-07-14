import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { fullText } = await request.json();

    if (!fullText || typeof fullText !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid fullText' }, { status: 400 });
    }

    // Split text into sentences using regex for ., !, ? as delimiters
    const sentences = fullText
      .split(/(?<=[.?!])\s+/)
      .map(s => s.trim())
      .filter(Boolean);

    // Take first 3 sentences or fewer
    const summary = sentences.slice(0, 3).join(' ');
    // Ensure summary ends with punctuation
    const summaryFinal = /[.?!]$/.test(summary) ? summary : summary + '.';

    // Simple Urdu dictionary for translation
    const dictionary: Record<string, string> = {
      'the': 'د', 'is': 'ہے', 'blog': 'بلاگ', 'about': 'بارے میں',
      'this': 'یہ', 'a': 'ایک', 'of': 'کے', 'and': 'اور'
    };

    // Translate word by word, preserving punctuation
    const translateToUrdu = (text: string) => {
      return text
        .split(/\b/) // split by word boundaries
        .map(word => {
          const lower = word.toLowerCase();
          return dictionary[lower] || word;
        })
        .join('');
    };

    const urduSummary = translateToUrdu(summaryFinal);

    return NextResponse.json({ summary: summaryFinal, urduSummary });
  } catch (error) {
    console.error('Summarize API error:', error);
    return NextResponse.json({ error: 'Something went wrong while summarizing' }, { status: 500 });
  }
}
