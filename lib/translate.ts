import { dictionary } from '@/data/dictionary';

/**
 * Translates an English sentence into Urdu using a simple word-to-word dictionary.
 * - Preserves punctuation (e.g., "blog," becomes "بلاگ،")
 * - Case-insensitive matching
 * - Falls back to original word if no translation found
 */
export function translateToUrdu(text: string): string {
  return text
    .split(/\s+/) // Split into words based on spaces
    .map((word) => {
      // Match words with optional punctuation (e.g., blog., guide!)
      const match = word.match(/^([a-zA-Z]+)([.,!?]*)$/);

      if (!match) return word; // Return original if it's a number, emoji, etc.

      const [_, core, punct] = match;
      const lowerCore = core.toLowerCase();

      // Translate using dictionary and reattach punctuation
      return (dictionary[lowerCore] || core) + (punct || '');
    })
    .join(' ');
}
