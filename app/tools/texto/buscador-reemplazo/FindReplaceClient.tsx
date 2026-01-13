'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faExchangeAlt,
    faFont,
    faWholeWord,
    faCode,
    faCopy,
    faTrash,
    faCheck,
    faEye,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function FindReplaceClient() {
    const [inputText, setInputText] = useState('');
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [options, setOptions] = useState({
        matchCase: false,
        wholeWord: false,
        useRegex: false
    });
    const [copied, setCopied] = useState(false);

    // Calculate result and stats on the fly
    const { outputText, matchCount } = useMemo(() => {
        if (!inputText || !findText) {
            return { outputText: inputText, matchCount: 0 };
        }

        try {
            let flags = 'g';
            if (!options.matchCase) flags += 'i';

            let searchPattern = findText;

            if (!options.useRegex) {
                // Escape special regex chars if not using regex mode
                searchPattern = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                if (options.wholeWord) {
                    searchPattern = `\\b${searchPattern}\\b`;
                }
            }

            const regex = new RegExp(searchPattern, flags);
            const matches = inputText.match(regex);
            const count = matches ? matches.length : 0;
            const replaced = inputText.replace(regex, replaceText);

            return { outputText: replaced, matchCount: count };
        } catch (e) {
            // Invalid regex or error
            return { outputText: inputText, matchCount: 0 };
        }
    }, [inputText, findText, replaceText, options]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOption = (key: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faSearch} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Buscador y Reemplazo</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Busca y reemplaza texto rápidamente. Soporta expresiones regulares, coincidencia exacta y reemplazo masivo.
                </p>
            </div>

            {/* Controls Section */}
            <div className="bg-surface rounded-2xl shadow-lg border border-primary/10 p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-9xl" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <FontAwesomeIcon icon={faSearch} className="text-primary" />
                            Buscar
                        </label>
                        <input
                            type="text"
                            value={findText}
                            onChange={(e) => setFindText(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            placeholder="Texto a buscar..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <FontAwesomeIcon icon={faExchangeAlt} className="text-primary" />
                            Reemplazar con
                        </label>
                        <input
                            type="text"
                            value={replaceText}
                            onChange={(e) => setReplaceText(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            placeholder="Nuevo texto..."
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={() => toggleOption('matchCase')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all flex items-center gap-2 ${options.matchCase
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-text border-gray-200 hover:border-primary/50'
                            }`}
                    >
                        <FontAwesomeIcon icon={faFont} />
                        Mayús/Minús (Aa)
                    </button>
                    <button
                        onClick={() => toggleOption('wholeWord')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all flex items-center gap-2 ${options.wholeWord
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white text-text border-gray-200 hover:border-primary/50'
                            }`}
                    >
                        <span className="font-bold border border-current rounded px-1 text-[10px]">Ab</span>
                        Palabra Completa
                    </button>
                    <button
                        onClick={() => toggleOption('useRegex')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all flex items-center gap-2 ${options.useRegex
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                : 'bg-white text-text border-gray-200 hover:border-purple-500/50'
                            }`}
                        title="Usar Expresiones Regulares (Regex)"
                    >
                        <FontAwesomeIcon icon={faCode} />
                        Regex
                    </button>

                    {matchCount > 0 && (
                        <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200 font-medium animate-fade-in">
                            <FontAwesomeIcon icon={faCheck} />
                            {matchCount} coincidencia{matchCount !== 1 && 's'} encontrada{matchCount !== 1 && 's'}
                        </div>
                    )}
                </div>
            </div>

            {/* Editors Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Text */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80">Texto Original</label>
                        <button
                            onClick={() => setInputText('')}
                            className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} /> Limpiar
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden h-[500px]">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-full p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed placeholder:text-text/20 font-mono"
                            placeholder="Pega tu texto aquí..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Output Text */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80">Resultado</label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!outputText}
                            className={`
                                flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold transition-all
                                ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                                }
                            `}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar Resultado'}
                        </button>
                    </div>
                    <div className="relative group bg-gray-50/50 rounded-2xl shadow-md border border-gray-200 overflow-hidden h-[500px]">
                        <textarea
                            readOnly
                            value={outputText}
                            className="w-full h-full p-6 bg-transparent border-0 resize-none focus:ring-0 text-base leading-relaxed text-text/80 font-mono"
                            placeholder="El texto modificado aparecerá aquí..."
                        />
                        {/* Overlay visual hint when empty */}
                        {!outputText && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                <FontAwesomeIcon icon={faArrowRight} className="text-6xl text-text" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
