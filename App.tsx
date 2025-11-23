
import React from 'react';
import ExtensionOverlay from './components/ExtensionOverlay';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 
        This component represents the logic that will eventually be injected 
        into every webpage by the Chrome Extension.
      */}
      <ExtensionOverlay />

      {/* Demo Page Content */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
            Italian <span className="text-indigo-600">Verb Extension</span>
          </h1>
          <p className="text-lg text-slate-600">
            Highlight any verb below to see its translation and present tense conjugation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 leading-relaxed text-lg text-slate-700">
          <p className="mb-6">
            Ciao! Benvenuto in questa demo. Qui puoi trovare molti verbi italiani.
            Per esempio, se vuoi <strong>mangiare</strong> una pizza, devi prima <strong>cucinare</strong>.
            Forse preferisci <strong>andare</strong> al ristorante?
          </p>
          <p className="mb-6">
            Noi <strong>amiamo</strong> l'Italia. Voi <strong>studiate</strong> la lingua ogni giorno.
            Io <strong>parlo</strong> un po' di italiano, ma tu <strong>parli</strong> molto bene!
            Loro <strong>abitano</strong> a Roma e <strong>lavorano</strong> in centro.
          </p>
          <p className="mb-6">
            Il gatto <strong>miagola</strong> e il cane <strong>abbaia</strong>. 
            Non dimenticare di <strong>chiudere</strong> la porta quando <strong>esci</strong>.
            Se <strong>sogni</strong> di <strong>viaggiare</strong>, devi <strong>risparmiare</strong> soldi.
          </p>
          <p className="mb-6">
            Prova a selezionare parole come: <strong>siamo</strong>, <strong>faccio</strong>, <strong>vado</strong>, o <strong>dormire</strong>.
          </p>
          <p>
             Inoltre, prova a selezionare parole in basso per vedere come la finestra si adatta: <strong>partire</strong>, <strong>finire</strong>, <strong>capire</strong>.
          </p>
        </div>

        <div className="mt-12 text-center text-sm text-slate-400">
          <p>This page mimics a standard webpage. The extension logic is running as an overlay.</p>
        </div>
      </div>
    </div>
  );
}
