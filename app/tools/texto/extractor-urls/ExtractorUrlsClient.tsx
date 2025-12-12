'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLink,
    faSearch,
    faCopy,
    faTrash,
    faFilter,
    faSortAlphaDown,
    faCheck,
    faExternalLinkAlt,
    faGlobe,
    faList
} from '@fortawesome/free-solid-svg-icons';

export default function UrlExtractorClient() {
    const [inputText, setInputText] = useState('');
    const [options, setOptions] = useState({
        unique: true,
        sort: false,
        onlyDomains: false,
        protocol: 'all' // 'all', 'http', 'https'
    });
    const [copied, setCopied] = useState(false);

    const extractedUrls = useMemo(() => {
        if (!inputText) return [];

        // Regex for URL extraction
        // Matches http/https urls, reasonably standard pattern
        const urlRegex = /(https?:\/\/[^\s"',]+)/g;

        let matches = inputText.match(urlRegex) || [];

        // Filter by protocol
        if (options.protocol !== 'all') {
            matches = matches.filter(url => url.startsWith(options.protocol + '://'));
        }

        // Clean domains if requested
        if (options.onlyDomains) {
            matches = matches.map(url => {
                try {
                    return new URL(url).hostname;
                } catch {
                    return url;
                }
            });
        }

        // Unique
        if (options.unique) {
            matches = Array.from(new Set(matches));
        }

        // Sort
        if (options.sort) {
            matches.sort();
        }

        return matches;
    }, [inputText, options]);

    const copyToClipboard = () => {
        if (extractedUrls.length === 0) return;
        navigator.clipboard.writeText(extractedUrls.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOption = (key: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof options] }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faLink} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Extractor de URLs</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Extrae, filtra y organiza enlaces de cualquier texto. Ideal para analizar sitemaps, logs o listas de recursos.
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
                            placeholder="Pega aquí el texto que contiene las URLs..."
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
                            Opciones de Extracción
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => toggleOption('unique')}
                                className={`p-2 rounded-lg text-sm font-medium border flex items-center justify-center gap-2 transition-all ${options.unique ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faList} />
                                Eliminar Duplicados
                            </button>
                            <button
                                onClick={() => toggleOption('sort')}
                                className={`p-2 rounded-lg text-sm font-medium border flex items-center justify-center gap-2 transition-all ${options.sort ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faSortAlphaDown} />
                                Ordenar A-Z
                            </button>
                            <button
                                onClick={() => toggleOption('onlyDomains')}
                                className={`p-2 rounded-lg text-sm font-medium border flex items-center justify-center gap-2 transition-all ${options.onlyDomains ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-gray-200 text-text/60'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faGlobe} />
                                Solo Dominios
                            </button>
                            <select
                                value={options.protocol}
                                onChange={(e) => setOptions(prev => ({ ...prev, protocol: e.target.value }))}
                                className="p-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-text/60 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                            >
                                <option value="all">Cualquier Protocolo</option>
                                <option value="https">Solo HTTPS</option>
                                <option value="http">Solo HTTP</option>
                            </select>
                        </div>
                    </div>

                    {/* Output Area */}
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[420px]">
                        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold text-text/80">Resultados</label>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${extractedUrls.length > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {extractedUrls.length} links
                                </span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                disabled={extractedUrls.length === 0}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-white hover:bg-secondary disabled:bg-gray-200 disabled:text-gray-400'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado!' : 'Copiar Lista'}
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto bg-white p-2">
                            {extractedUrls.length > 0 ? (
                                <ul className="space-y-1">
                                    {extractedUrls.map((url, idx) => (
                                        <li key={idx} className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0 border-dashed">
                                            <span className="text-sm font-mono text-text/70 truncate mr-4 select-all">{url}</span>
                                            <a
                                                href={options.onlyDomains ? `https://${url}` : url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-text/30 hover:text-primary transition-colors p-1"
                                                title="Abrir URL"
                                            >
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-text/20">
                                    <FontAwesomeIcon icon={faLink} className="text-4xl mb-3 opacity-50" />
                                    <p className="text-sm font-medium">No se encontraron URLs</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
