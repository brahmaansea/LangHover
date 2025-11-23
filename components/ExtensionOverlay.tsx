
import React, { useEffect, useState } from 'react';
import { parseCSV } from '../utils/csvParser';
import { VerbEntry } from '../types';
import TranslationCard from './TranslationCard';

export default function ExtensionOverlay() {
  const [verbData, setVerbData] = useState<Record<string, VerbEntry>>({});
  const [selection, setSelection] = useState<{
    word: string;
    entry: VerbEntry;
    style: React.CSSProperties;
  } | null>(null);

  // 1. Load Data on Mount (Simulates loading dict in background)
  useEffect(() => {
    const data = parseCSV();
    setVerbData(data);
  }, []);

  // 2. Listen to Global Document Events (Simulates Content Script behavior)
  useEffect(() => {
    const handleGlobalSelection = () => {
      const selectionObj = window.getSelection();
      
      if (!selectionObj || selectionObj.rangeCount === 0 || selectionObj.isCollapsed) {
        setSelection(null);
        return;
      }

      const text = selectionObj.toString().trim();
      // Only process single words to match CSV logic
      if (!text || text.includes(' ')) {
        setSelection(null);
        return;
      }

      const lowerText = text.toLowerCase();
      // Strip punctuation
      const cleanText = lowerText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\[\]]/g, "");

      const entry = verbData[cleanText];

      if (entry) {
        const range = selectionObj.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        const CARD_WIDTH = 320;
        const CARD_HEIGHT = 300; 
        const GAP = 12;

        // Horizontal Positioning (Clamp to viewport)
        let left = rect.left + (rect.width / 2) - (CARD_WIDTH / 2);
        left = Math.max(16, Math.min(left, viewportWidth - CARD_WIDTH - 16));

        // Vertical Positioning (Flip if near bottom)
        const spaceBelow = viewportHeight - rect.bottom;
        let style: React.CSSProperties = { left };

        if (spaceBelow < (CARD_HEIGHT + GAP) && rect.top > (CARD_HEIGHT + GAP)) {
          // Position above
          style.bottom = viewportHeight - rect.top + GAP;
        } else {
          // Position below
          style.top = rect.bottom + GAP;
        }
        
        setSelection({
          word: text,
          entry,
          style
        });
      } else {
        setSelection(null);
      }
    };

    // Attach to document to catch selection anywhere
    document.addEventListener('mouseup', handleGlobalSelection);
    document.addEventListener('keyup', handleGlobalSelection);

    return () => {
      document.removeEventListener('mouseup', handleGlobalSelection);
      document.removeEventListener('keyup', handleGlobalSelection);
    };
  }, [verbData]);

  if (!selection) return null;

  return (
    <TranslationCard 
      word={selection.word} 
      entry={selection.entry} 
      style={selection.style} 
    />
  );
}
