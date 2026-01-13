'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCopy,
    faClone,
    faCheck,
    faTrash,
    faCog,
    faHistory
} from '@fortawesome/free-solid-svg-icons';

export default function TextRepeaterClient() {
    const [text, setText] = useState('');
    const [repetitions, setRepetitions] = useState(10);
    const [separator, setSeparator] = useState(' '); // space, newline, comma
    const [customSeparator, setCustomSeparator] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const generateText = () => {
        if (!text) {
            setResult('');
            return;
        }

        const sep = separator === 'custom' ? customSeparator : separator;
        // Use Array.from to create huge array then join
        // Safety cap at 10000 to prevent browser crash
        const count = Math.min(Math.max(1, repetitions), 10000);

        const repeated = new Array(count).fill(text).join(sep);
        setResult(repeated);
    };

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faClone} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Duplicador de Texto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Repite un texto tantas veces como quieras. Útil para pruebas de estrés, relleno o mensajes divertidos.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faCog} className="text-primary" />
                            Configuración
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Texto a Repetir</label>
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="Hola..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">
                                    Repeticiones: <span className="text-primary font-bold">{repetitions}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="1000"
                                    value={repetitions}
                                    onChange={(e) => setRepetitions(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <input
                                    type="number"
                                    value={repetitions}
                                    onChange={(e) => setRepetitions(parseInt(e.target.value))}
                                    className="w-full mt-2 p-2 text-sm border border-gray-200 rounded-lg text-center"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text/80 mb-2">Separador</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSeparator(' ')}
                                        className={`p-2 rounded-lg text-sm border font-medium ${separator === ' ' ? 'bg-primary text-white border-primary' : 'bg-white text-text border-gray-200'}`}
                                    >
                                        Espacio
                                    </button>
                                    <button
                                        onClick={() => setSeparator('\n')}
                                        className={`p-2 rounded-lg text-sm border font-medium ${separator === '\n' ? 'bg-primary text-white border-primary' : 'bg-white text-text border-gray-200'}`}
                                    >
                                        Nueva Línea
                                    </button>
                                    <button
                                        onClick={() => setSeparator('')}
                                        className={`p-2 rounded-lg text-sm border font-medium ${separator === '' ? 'bg-primary text-white border-primary' : 'bg-white text-text border-gray-200'}`}
                                    >
                                        Nada
                                    </button>
                                    <button
                                        onClick={() => setSeparator('custom')}
                                        className={`p-2 rounded-lg text-sm border font-medium ${separator === 'custom' ? 'bg-primary text-white border-primary' : 'bg-white text-text border-gray-200'}`}
                                    >
                                        Personalizado
                                    </button>
                                </div>
                                {separator === 'custom' && (
                                    <input
                                        value={customSeparator}
                                        onChange={(e) => setCustomSeparator(e.target.value)}
                                        className="w-full mt-2 p-2 text-sm border border-gray-200 rounded-lg"
                                        placeholder="Ej: , "
                                    />
                                )}
                            </div>

                            <button
                                onClick={generateText}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faClone} />
                                Repetir Texto
                            </button>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80">Resultado ({result.length} chars)</label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!result}
                            className={`
                                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary text-white hover:bg-secondary disabled:bg-gray-200 disabled:text-gray-400'
                                }
                            `}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar'}
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-[500px] overflow-hidden group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            readOnly
                            value={result}
                            className="w-full h-full p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed text-text font-mono break-all"
                            placeholder="El texto repetido aparecerá aquí..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
