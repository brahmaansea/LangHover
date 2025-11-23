
import { RAW_CSV_DATA } from '../services/csvData';
import { VerbEntry, VerbConjugation } from '../types';

export const parseCSV = (): Record<string, VerbEntry> => {
  const lines = RAW_CSV_DATA.trim().split('\n');
  const verbMap: Record<string, VerbEntry> = {};

  const parseLine = (text: string): string[] => {
    // Handle tab-separated lines (common when copy-pasting from sheets/tables)
    if (text.indexOf('\t') !== -1) {
      return text.split('\t').map(s => s.trim());
    }

    // Handle comma-separated lines
    const result: string[] = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        result.push(cur);
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur);
    return result.map(s => s.replace(/^"|"$/g, '').trim());
  };

  // Start from 1 to skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = parseLine(line);
    
    // Expect at least 8 columns: infinitive, definition, 6 conjugations
    if (cols.length < 8) continue;

    const infinitive = cols[0].toLowerCase();
    const definition = cols[1];
    const conjugation: VerbConjugation = {
      io: cols[2],
      tu: cols[3],
      lui_lei: cols[4],
      noi: cols[5],
      voi: cols[6],
      loro: cols[7],
    };

    const entry: VerbEntry = {
      infinitive,
      definition,
      conjugation,
    };

    // Map infinitive
    verbMap[infinitive] = entry;

    // Map conjugated forms
    const forms = [
      conjugation.io,
      conjugation.tu,
      conjugation.lui_lei,
      conjugation.noi,
      conjugation.voi,
      conjugation.loro
    ];

    forms.forEach(form => {
      // Handle cases like "mi lavo" (reflexive) -> map "lavo" as well?
      // For now, just map the exact string found in the CSV.
      // Note: Some CSV entries might be empty or dashes
      if (form && form !== '-' && form.trim() !== '') {
        const lowerForm = form.toLowerCase();
        // If the form is reflexive like "mi lavo", we might want to match "lavo" too? 
        // The app logic currently selects single words. 
        // If the user selects "lavo", and CSV has "mi lavo", it won't match.
        // Let's try to be smart: if the form has 2 words, map the last word (usually the verb)
        
        verbMap[lowerForm] = entry;
        
        if (lowerForm.includes(' ')) {
            const parts = lowerForm.split(' ');
            if (parts.length === 2) {
                // e.g. "mi abituo" -> map "abituo"
                verbMap[parts[1]] = entry;
            }
        }
      }
    });
  }

  return verbMap;
};
