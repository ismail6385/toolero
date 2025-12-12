'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faIndent,
    faCompressArrowsAlt,
    faCheck,
    faCopy,
    faTrash,
    faExclamationCircle,
    faFileCode,
    faDownload,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function JsonFormatterClient() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [indentSize, setIndentSize] = useState(2);

    const formatJson = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                setError(null);
                return;
            }
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, indentSize);
            setOutput(formatted);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setOutput('');
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                setError(null);
                return;
            }
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            setOutput('');
        }
    };

    const handlePasteAndFormat = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
            // Auto-format on paste action if valid
            try {
                const parsed = JSON.parse(text);
                setOutput(JSON.stringify(parsed, null, indentSize));
                setError(null);
            } catch (e: any) {
                setError(e.message);
            }
        } catch (err) {
            // Clipboard access denied or empty
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadJson = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faCode} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Formateador y Validador JSON</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Herramienta gratuita para formatear (pretty print), minificar y validar código JSON.
                </p>
            </div>

            {/* Toolbar */}
            <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={formatJson}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors"
                    >
                        <FontAwesomeIcon icon={faIndent} />
                        Formatear
                    </button>
                    <button
                        onClick={minifyJson}
                        className="flex items-center gap-2 px-4 py-2 bg-text/5 text-text rounded-lg font-semibold hover:bg-text/10 transition-colors border border-gray-200"
                    >
                        <FontAwesomeIcon icon={faCompressArrowsAlt} />
                        Minificar
                    </button>

                    <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />

                    <div className="flex items-center gap-2 ml-1">
                        <span className="text-sm font-medium text-text/60">Indentación:</span>
                        <select
                            value={indentSize}
                            onChange={(e) => setIndentSize(Number(e.target.value))}
                            className="bg-white border border-gray-200 text-text text-sm rounded-lg p-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        >
                            <option value={2}>2 Espacios</option>
                            <option value={4}>4 Espacios</option>
                            <option value={8}>8 Espacios</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setInput(''); setOutput(''); setError(null); }}
                        className="text-text/40 hover:text-red-500 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Limpiar
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 h-[600px]">
                {/* Input Area */}
                <div className="flex flex-col h-full space-y-2">
                    <label className="text-sm font-semibold text-text/80 px-1">JSON Entrada</label>
                    <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-full p-6 border-0 resize-none focus:ring-0 text-sm font-mono leading-relaxed placeholder:text-text/20"
                            placeholder='Pegue su JSON aquí...'
                            spellCheck={false}
                        />
                        {!input && (
                            <button
                                onClick={handlePasteAndFormat}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-primary/5 text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                Pegar y Formatear
                            </button>
                        )}
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex flex-col h-full space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-semibold text-text/80">
                            {error ? <span className="text-red-500">Error en JSON</span> : 'JSON Resultado'}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={downloadJson}
                                disabled={!output}
                                className="text-xs flex items-center gap-1 text-text/60 hover:text-primary disabled:opacity-30"
                                title="Descargar .json"
                            >
                                <FontAwesomeIcon icon={faDownload} /> .json
                            </button>
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className={`
                                    flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold transition-all
                                    ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 text-text/60 hover:bg-primary hover:text-white disabled:opacity-30'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        </div>
                    </div>

                    <div className={`
                        flex-1 bg-gray-50 rounded-2xl shadow-inner border border-gray-200 overflow-hidden relative
                        ${error ? 'border-red-300 bg-red-50/20' : ''}
                    `}>
                        {error ? (
                            <div className="absolute inset-0 p-6 overflow-auto">
                                <div className="flex items-start gap-3 text-red-600">
                                    <FontAwesomeIcon icon={faExclamationCircle} className="mt-1" />
                                    <div className="font-mono text-sm break-all">
                                        <p className="font-bold mb-1">JSON Inválido</p>
                                        {error}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full p-6 bg-transparent border-0 resize-none focus:ring-0 text-sm font-mono leading-relaxed text-text/80"
                                placeholder="El resultado aparecerá aquí..."
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
