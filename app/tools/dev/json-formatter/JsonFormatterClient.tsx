'use client';

import React, { useState } from 'react';
import { faCode, faCopy, faCheck, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function JsonFormatterClient() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error de sintaxis JSON');
            setOutput('');
        }
    };

    const minifyJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error de sintaxis JSON');
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faCode} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Formateador JSON</h1>
                <p className="text-gray-600">Valida, formatea y minifica código JSON al instante.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Input */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Entrada JSON</h3>
                        <button
                            onClick={clearAll}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"nombre": "Juan", "edad": 30}'
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm resize-none"
                    />
                </div>

                {/* Output */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Salida</h3>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="El resultado aparecerá aquí..."
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm resize-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <button
                    onClick={formatJson}
                    disabled={!input}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon icon={faExpand} className="mr-2" />
                    Formatear (Beautify)
                </button>
                <button
                    onClick={minifyJson}
                    disabled={!input}
                    className="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-md hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FontAwesomeIcon icon={faCompress} className="mr-2" />
                    Minificar
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-red-500 text-xl">⚠️</div>
                        <div>
                            <div className="font-bold text-red-700 mb-1">Error de Sintaxis</div>
                            <div className="text-red-600 text-sm font-mono">{error}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
