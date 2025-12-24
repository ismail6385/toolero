'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExchangeAlt,
    faColumns,
    faCodeBranch,
    faTrash,
    faCheck
} from '@fortawesome/free-solid-svg-icons';

export default function TextComparatorClient() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffResult, setDiffResult] = useState<JSX.Element[]>([]);
    const [isCompared, setIsCompared] = useState(false);

    // Simple word-based diff algorithm adaptation
    const compareTexts = () => {
        const words1 = text1.split(/\s+/);
        const words2 = text2.split(/\s+/);

        // This is a very naive diff for visual purposes. 
        // For production "Google Docs" style diff, we'd need a hefty library like 'diff-match-patch'.
        // Here we highlight simple additions/removals based on disjoint indices loosely.

        // Let's do a simple side-by-side highlighting logic
        // If word at index i is different, mark it.

        const maxLen = Math.max(words1.length, words2.length);
        const result = [];

        for (let i = 0; i < maxLen; i++) {
            const w1 = words1[i] || '';
            const w2 = words2[i] || '';

            if (w1 === w2) {
                result.push(<span key={i} className="text-text/70">{w1} </span>);
            } else {
                if (w1) result.push(<span key={`del-${i}`} className="bg-red-100 text-red-600 line-through decoration-red-400 mx-0.5 px-1 rounded">{w1} </span>);
                if (w2) result.push(<span key={`ins-${i}`} className="bg-green-100 text-green-600 font-bold mx-0.5 px-1 rounded">{w2} </span>);
            }
        }

        setDiffResult(result);
        setIsCompared(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Comparador de Textos</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Compara dos textos y encuentra las diferencias. Ideal para revisar cambios en código, artículos o listas.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Text A */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text/80 px-2 flex justify-between">
                        <span>Texto Original (A)</span>
                        <button onClick={() => setText1('')} className="text-text/40 hover:text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                    </label>
                    <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[400px] focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            value={text1}
                            onChange={(e) => { setText1(e.target.value); setIsCompared(false); }}
                            className="w-full h-full p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed placeholder:text-text/20 font-mono"
                            placeholder="Pega la versión original aquí..."
                        />
                    </div>
                </div>

                {/* Text B */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text/80 px-2 flex justify-between">
                        <span>Texto Modificado (B)</span>
                        <button onClick={() => setText2('')} className="text-text/40 hover:text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                    </label>
                    <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[400px] focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            value={text2}
                            onChange={(e) => { setText2(e.target.value); setIsCompared(false); }}
                            className="w-full h-full p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed placeholder:text-text/20 font-mono"
                            placeholder="Pega la nueva versión aquí..."
                        />
                    </div>
                </div>
            </div>

            <div className="text-center mb-12">
                <button
                    onClick={compareTexts}
                    disabled={!text1 && !text2}
                    className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-3 mx-auto"
                >
                    <FontAwesomeIcon icon={faCodeBranch} />
                    Comparar Diferencias
                </button>
            </div>

            {/* Results */}
            {isCompared && (
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8 animate-fade-in">
                    <h3 className="text-lg font-bold text-text mb-4 border-b pb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faColumns} className="text-primary" />
                        Resultado de la Comparación
                    </h3>

                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm leading-8 break-words text-text/80">
                        {diffResult.length > 0 ? diffResult : <span className="text-green-500 flex items-center gap-2"><FontAwesomeIcon icon={faCheck} /> ¡Los textos son idénticos!</span>}
                    </div>

                    <div className="mt-4 flex gap-4 text-xs font-semibold uppercase tracking-wider text-text/50 justify-end">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 border border-red-200 rounded"></span> Eliminado (Texto A)</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 border border-green-200 rounded"></span> Añadido (Texto B)</span>
                    </div>
                </div>
            )}
        </div>
    );
}
