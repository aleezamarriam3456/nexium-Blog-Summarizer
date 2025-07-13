import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url parameter.' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch URL content');

    const html = await response.text();

    // Basic HTML tag stripper (simple, not perfect)
    const text = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // remove scripts
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '') // remove styles
      .replace(/<\/?[^>]+(>|$)/g, '') // remove all tags
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();

    if (text.length < 50) {
      return res.status(422).json({ error: 'Extracted content too short or empty.' });
    }

    res.status(200).json({ content: text });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
