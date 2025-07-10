// lib/translate.ts
import { dictionary } from '@/data/dictionary';

/**
 * Translates an English sentence into Urdu using a simple word-to-word dictionary.
 * It preserves punctuation and handles lowercase conversion for matching.
 */
export function translateToUrdu(text: string): string {
  return text
    .split(/\s+/) // Split text into words
    .map((word) => {
      // Separate punctuation from the word (e.g., 'blog,' → 'blog' and ',')
      const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/i);

      if (!match) return word; // Non-alphabetic (like numbers or symbols)

      const [_, core, punct] = match;
      const lowerCore = core.toLowerCase();

      // Return translated word + original punctuation (if any)
      return (dictionary[lowerCore] || core) + (punct || '');
    })
    .join(' ');
}
