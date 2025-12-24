'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faCompress, faCopy, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function CssMinifierClient() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const minifyCss = () => {
        if (!input.trim()) return;

        let css = input;

        // Remove comments
        css = css.replace(/\/\*[\s\S]*?\*\//g, "");

        // Remove whitespace
        css = css.replace(/\s+/g, " ");

        // Remove space around symbols
        css = css.replace(/\s*([{}:;,])\s*/g, "$1");

        // Remove last semicolon in block
        css = css.replace(/;}/g, "}");

        // Trim
        css = css.trim();

        setOutput(css);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const savings = input && output ? ((1 - output.length / input.length) * 100).toFixed(1) : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
                    <FontAwesomeIcon icon={faFileCode} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Minificador CSS</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Optimiza tus hojas de estilo CSS reduciendo su tamaño al máximo.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Input */}
                <div className="flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="font-bold text-text/60 text-sm uppercase">CSS Original</span>
                        <button
                            onClick={() => { setInput(''); setOutput(''); }}
                            className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faTrash} /> Limpiar
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 w-full p-6 rounded-2xl border border-gray-200 focus:border-blue-500 outline-none resize-none font-mono text-sm shadow-sm"
                        placeholder="/* Pega tu código CSS aquí */&#10;body {&#10;  background-color: #fff;&#10;  color: #333;&#10;}"
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="font-bold text-text/60 text-sm uppercase">CSS Minificado</span>
                        {output && (
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                Ahorro: {savings}%
                            </span>
                        )}
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-full p-6 rounded-2xl border border-gray-200 bg-gray-50 font-mono text-sm resize-none outline-none text-blue-900"
                            placeholder="El resultado aparecerá aquí..."
                        />
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-4 right-4 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 text-text hover:text-blue-600'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    onClick={minifyCss}
                    className="px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto"
                >
                    <FontAwesomeIcon icon={faCompress} /> Minificar CSS
                </button>
            </div>
        </div>
    );
}
