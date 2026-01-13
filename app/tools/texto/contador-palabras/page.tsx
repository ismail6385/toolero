
'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faTrash, faFont, faCalculator, faParagraph, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export default function WordCounter() {
    const [text, setText] = useState('');

    const stats = {
        chars: text.length,
        words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
        paragraphs: text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length,
        sentences: text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim() !== '').length
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-text mb-2">Contador de Palabras</h1>
                <p className="text-text/60">Analiza tu texto en tiempo real con precisión milimétrica.</p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden hover:border-primary/50 transition-colors">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border-b border-gray-200">
                    <StatBox label="Palabras" value={stats.words} icon={faFont} />
                    <StatBox label="Caracteres" value={stats.chars} icon={faCalculator} />
                    <StatBox label="Párrafos" value={stats.paragraphs} icon={faParagraph} />
                    <StatBox label="Frases" value={stats.sentences} icon={faAlignLeft} />
                </div>

                {/* Text Area */}
                <div className="p-6 bg-background">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-80 p-6 rounded-xl border-0 shadow-inner bg-white focus:ring-2 focus:ring-primary focus:ring-opacity-50 resize-y font-mono text-base text-text leading-relaxed placeholder:text-text/30"
                        placeholder="Escribe o pega tu texto aquí para comenzar el análisis..."
                    />
                </div>

                {/* Actions Bar */}
                <div className="bg-white p-4 border-t border-gray-200 flex justify-between items-center">
                    <button
                        onClick={() => setText('')}
                        className="flex items-center gap-2 text-sm font-semibold text-text/60 hover:text-text px-4 py-2 rounded-xl hover:bg-background transition-colors"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Borrar Todo
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText(text)}
                        className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        Copiar Texto
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, icon }: { label: string, value: number, icon: IconDefinition }) {
    return (
        <div className="bg-white p-6 text-center group hover:bg-background transition-colors">
            <div className="text-primary/20 text-2xl mb-2 group-hover:text-primary transition-colors">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="text-3xl font-semibold text-text mb-1 group-hover:scale-110 transition-transform">{value}</div>
            <div className="text-xs font-semibold text-text/50 uppercase tracking-widest">{label}</div>
        </div>
    )
}
