import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid text' }, { status: 400 });
    }

    // Basic English → Urdu dictionary
    const dictionary: Record<string, string> = {
      'the': 'د',
      'is': 'ہے',
      'blog': 'بلاگ',
      'about': 'بارے میں',
      'this': 'یہ',
      'a': 'ایک',
      'of': 'کے',
      'and': 'اور',
      'to': 'کو',
      'in': 'میں',
      'for': 'کے لیے',
      'with': 'کے ساتھ'
      // add more as needed
    };

    const translateToUrdu = (input: string) => {
      return input
        // split by word boundaries, preserving punctuation
        .split(/\b/)
        .map(word => {
          const lower = word.toLowerCase();
          return dictionary[lower] || word;
        })
        .join('');
    };

    const urduText = translateToUrdu(text);

    return NextResponse.json({ urduText });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json({ error: 'Failed to translate text' }, { status: 500 });
  }
}
