// lib/translate.ts

import { dictionary } from '../data/dictionary';

export function translateToUrdu(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => {
      // Remove punctuation for matching and keep it after translation
      const punctuationMatch = word.match(/[.,!?;:]$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const cleanWord = punctuation ? word.slice(0, -1).toLowerCase() : word.toLowerCase();

      // Translate word if found, else keep original
      const translatedWord = dictionary[cleanWord] || word;

      // Add back punctuation if any
      return translatedWord + punctuation;
    })
    .join(' ');
}
