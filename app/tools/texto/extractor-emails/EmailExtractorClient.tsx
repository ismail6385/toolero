'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faSearch,
    faCopy,
    faTrash,
    faFilter,
    faSortAlphaDown,
    faCheck,
    faDownload,
    faList,
    faTerminal
} from '@fortawesome/free-solid-svg-icons';

export default function EmailExtractorClient() {
    const [inputText, setInputText] = useState('');
    const [options, setOptions] = useState({
        unique: true,
        sort: true,
        lowercase: true,
        separator: '\n' // '\n', ', ', '; '
    });
    const [copied, setCopied] = useState(false);

    const { emails, formattedOutput, count } = useMemo(() => {
        if (!inputText) return { emails: [], formattedOutput: '', count: 0 };

        // Robust Email Regex
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
        let matches = inputText.match(emailRegex) || [];

        // Lowercase
        if (options.lowercase) {
            matches = matches.map(e => e.toLowerCase());
        }

        // Unique
        if (options.unique) {
            matches = Array.from(new Set(matches));
        }

        // Sort
        if (options.sort) {
            matches.sort();
        }

        const output = matches.join(options.separator);
        return { emails: matches, formattedOutput: output, count: matches.length };
    }, [inputText, options]);

    const copyToClipboard = () => {
        if (!formattedOutput) return;
        navigator.clipboard.writeText(formattedOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadList = () => {
        if (!formattedOutput) return;
        const blob = new Blob([formattedOutput], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emails_extraidos.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const toggleOption = (key: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof options] }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Extractor de Emails</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Extrae direcciones de correo electrónico de textos largos, documentos o listas desordenadas.
                    Limpia, ordena y exporta en segundos.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* Input Column */}
                <div className="space-y-4">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[600px]">
                        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                                <FontAwesomeIcon icon={faSearch} className="text-primary" />
                                Texto Fuente
                            </label>
                            <button
                                onClick={() => setInputText('')}
                                className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faTrash} /> Limpiar
                            </button>
                        </div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-1 w-full p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed placeholder:text-text/20 font-mono"
                            placeholder="Pega aquí el texto, HTML o contenido desordenado..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Output & Options Column */}
                <div className="space-y-6">
                    {/* Options Panel */}
                    <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h3 className="text-sm font-bold text-text/70 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faFilter} className="text-primary" />
                            Configuración
                        </h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                <button
                                    onClick={() => toggleOption('unique')}
                                    className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${options.unique ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faList} />
                                    Sin Duplicados
                                </button>
                                <button
                                    onClick={() => toggleOption('sort')}
                                    className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${options.sort ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={faSortAlphaDown} />
                                    Ordenar A-Z
                                </button>
                                <button
                                    onClick={() => toggleOption('lowercase')}
                                    className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${options.lowercase ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                        }`}
                                >
                                    <span className="font-bold">abc</span>
                                    Minúsculas
                                </button>
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                                <span className="text-sm text-text/60 font-medium">Separador:</span>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    {[
                                        { val: '\n', label: 'Nueva Línea' },
                                        { val: ', ', label: 'Coma' },
                                        { val: '; ', label: 'Punto y Coma' },
                                    ].map((sep) => (
                                        <button
                                            key={sep.val}
                                            onClick={() => setOptions(prev => ({ ...prev, separator: sep.val }))}
                                            className={`
                                                px-3 py-1 rounded-md text-xs font-medium transition-all
                                                ${options.separator === sep.val
                                                    ? 'bg-white text-primary shadow-sm'
                                                    : 'text-text/50 hover:text-text'
                                                }
                                            `}
                                        >
                                            {sep.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[400px]">
                        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold text-text/80">Emails Encontrados</label>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${count > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {count}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={downloadList}
                                    disabled={!formattedOutput}
                                    className="p-1.5 text-text/40 hover:text-primary transition-colors"
                                    title="Descargar Lista"
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!formattedOutput}
                                    className={`
                                        flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                        ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-primary text-white hover:bg-secondary disabled:bg-gray-200 disabled:text-gray-400'
                                        }
                                    `}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative group">
                            <textarea
                                readOnly
                                value={formattedOutput}
                                className="w-full h-full p-4 border-0 resize-none focus:ring-0 text-sm font-mono leading-relaxed text-text/80 bg-white"
                                placeholder="Los emails extraídos aparecerán aquí..."
                            />
                            {count === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-text/20 pointer-events-none">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-3 opacity-50" />
                                    <p className="text-sm font-medium">Esperando texto...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
