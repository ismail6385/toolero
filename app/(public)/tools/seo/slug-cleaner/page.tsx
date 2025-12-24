'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLink,
    faCopy,
    faTrash,
    faEraser,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function SlugCleaner() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [separator, setSeparator] = useState('-');
    const [removeStopWords, setRemoveStopWords] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [copied, setCopied] = useState(false);

    // Common stop words in Spanish and English
    const stopWords = new Set([
        'a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'según', 'sin', 'so', 'sobre', 'tras',
        'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'y', 'o', 'pero', 'mas', 'sino', 'que',
        'the', 'and', 'or', 'at', 'of', 'to', 'in', 'on', 'for', 'with', 'by', 'an', 'is', 'it'
    ]);

    useEffect(() => {
        const processSlug = () => {
            if (!input.trim()) {
                setOutput('');
                return;
            }

            const lines = input.split('\n');
            const processedLines = lines.map(line => {
                let text = line;

                // 1. Lowercase
                if (lowercase) {
                    text = text.toLowerCase();
                }

                // 2. Remove special chars and accents
                text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
                text = text.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric except spaces

                // 3. Split into words
                let words = text.split(/\s+/).filter(w => w.length > 0);

                // 4. Remove stop words
                if (removeStopWords) {
                    words = words.filter(w => !stopWords.has(w.toLowerCase()));
                }

                // 5. Join with separator
                return words.join(separator);
            });

            setOutput(processedLines.join('\n'));
        };

        processSlug();
    }, [input, separator, removeStopWords, lowercase]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                    URL Friendly
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Limpiador de Slugs SEO</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Convierte títulos y textos en URLs limpias y amigables para SEO.
                    Elimina caracteres especiales, acentos y palabras vacías.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-100 p-4 md:px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-sm text-text/80 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={lowercase}
                                onChange={(e) => setLowercase(e.target.checked)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                            />
                            Minúsculas
                        </label>
                        <label className="flex items-center gap-2 text-sm text-text/80 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={removeStopWords}
                                onChange={(e) => setRemoveStopWords(e.target.checked)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                            />
                            Quitar Stop Words
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-text/60">Separador:</span>
                        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                            <button
                                onClick={() => setSeparator('-')}
                                className={`w-8 h-8 flex items-center justify-center rounded font-mono text-lg transition-colors ${separator === '-' ? 'bg-primary text-white shadow-sm' : 'text-text/60 hover:bg-gray-100'}`}
                            >
                                -
                            </button>
                            <button
                                onClick={() => setSeparator('_')}
                                className={`w-8 h-8 flex items-center justify-center rounded font-mono text-lg transition-colors ${separator === '_' ? 'bg-primary text-white shadow-sm' : 'text-text/60 hover:bg-gray-100'}`}
                            >
                                _
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {/* Input */}
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-text">Texto / Títulos (Uno por línea)</label>
                            <button
                                onClick={() => setInput('')}
                                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                            >
                                <FontAwesomeIcon icon={faEraser} /> Limpiar
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Pega aquí tus títulos...&#10;Ejemplo: ¡Cómo Optimizar tu SEO en 2025!"
                            className="w-full h-80 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none font-sans text-text placeholder:text-text/30"
                        />
                    </div>

                    {/* Output */}
                    <div className="p-6 bg-gray-50/50">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-semibold text-text">Slugs Generados</label>
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className={`text-xs flex items-center gap-1 font-bold px-3 py-1 rounded-full transition-all ${copied
                                        ? 'bg-green-100 text-green-600'
                                        : output
                                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            placeholder="como-optimizar-seo-2025"
                            className="w-full h-80 p-4 rounded-xl border border-gray-200 bg-white text-primary font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-text/50">
                Se detectan y eliminan automáticamente emojis, signos de puntuación y tabulaciones.
            </div>
        </div>
    );
}
