
import React from 'react';
import { VerbEntry } from '../types';

interface TranslationCardProps {
  word: string;
  entry: VerbEntry;
  style: React.CSSProperties;
}

export default function TranslationCard({ word, entry, style }: TranslationCardProps) {
  const isConjugated = word.toLowerCase() !== entry.infinitive.toLowerCase();
  
  // Helper to strip punctuation for comparison highlighting
  const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\[\]]/g, "");

  const ConjugationItem = ({ label, value }: { label: string, value: string }) => {
    const isMatch = value.toLowerCase() === cleanWord;
    return (
      <div className="flex flex-col group">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-0.5 transition-colors group-hover:text-slate-500">
          {label}
        </span>
        <span className={`text-base leading-tight transition-colors ${isMatch ? 'font-bold text-indigo-600' : 'font-medium text-slate-700 group-hover:text-slate-900'}`}>
          {value}
        </span>
      </div>
    );
  };

  return (
    <div 
      className="fixed z-50 w-72 bg-white rounded-2xl shadow-2xl shadow-indigo-900/20 ring-1 ring-slate-900/5 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200 ease-out"
      style={style}
    >
      {/* Header Section */}
      <div className="px-6 pt-5 pb-4 bg-white relative">
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-80"></div>
        
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3 className="font-bold text-2xl text-slate-900 capitalize tracking-tight">
            {word}
          </h3>
          {isConjugated && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
              from <span className="italic ml-1 text-slate-600">{entry.infinitive}</span>
            </span>
          )}
        </div>
        <p className="text-indigo-600 font-medium text-base">
          {entry.definition}
        </p>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-slate-100 w-full"></div>

      {/* Conjugation Grid */}
      <div className="px-6 py-5 bg-slate-50/80">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <ConjugationItem label="io" value={entry.conjugation.io} />
          <ConjugationItem label="noi" value={entry.conjugation.noi} />
          <ConjugationItem label="tu" value={entry.conjugation.tu} />
          <ConjugationItem label="voi" value={entry.conjugation.voi} />
          <ConjugationItem label="lui/lei" value={entry.conjugation.lui_lei} />
          <ConjugationItem label="loro" value={entry.conjugation.loro} />
        </div>
      </div>
    </div>
  );
}
