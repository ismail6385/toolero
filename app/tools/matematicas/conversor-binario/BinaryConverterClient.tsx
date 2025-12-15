'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faExchangeAlt, faCopy, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function BinaryConverterClient() {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<'textToBinary' | 'binaryToText' | 'decimalToBinary' | 'binaryToDecimal'>('textToBinary');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const convert = (val: string, currentMode: string) => {
        setInput(val);
        if (!val) {
            setOutput('');
            return;
        }

        try {
            let res = '';
            // Space handling logic depends on user input style

            if (currentMode === 'textToBinary') {
                res = val.split('').map(char => {
                    return char.charCodeAt(0).toString(2).padStart(8, '0');
                }).join(' ');
            }
            else if (currentMode === 'binaryToText') {
                const binaries = val.replace(/[^01\s]/g, '').trim().split(/\s+/);
                res = binaries.map(bin => {
                    if (!bin) return '';
                    return String.fromCharCode(parseInt(bin, 2));
                }).join('');
            }
            else if (currentMode === 'decimalToBinary') {
                // Handle mixed input or spaces? Stick to simple number for now
                if (!isNaN(Number(val))) {
                    res = parseInt(val, 10).toString(2);
                } else {
                    res = 'Error: Solo números';
                }
            }
            else if (currentMode === 'binaryToDecimal') {
                const cleanBin = val.replace(/[^01]/g, '');
                if (cleanBin) {
                    res = parseInt(cleanBin, 2).toString(10);
                }
            }

            setOutput(res);
        } catch (e) {
            setOutput('Error en la conversión');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleModeChange = (newMode: typeof mode) => {
        setMode(newMode);
        setInput('');
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-full mb-4 text-cyan-600">
                    <FontAwesomeIcon icon={faMicrochip} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Conversor Binario</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Traduce texto, decimales y binarios al instante.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">

                {/* Mode Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { id: 'textToBinary', label: 'Texto a Binario' },
                        { id: 'binaryToText', label: 'Binario a Texto' },
                        { id: 'decimalToBinary', label: 'Decimal a Binario' },
                        { id: 'binaryToDecimal', label: 'Binario a Decimal' },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => handleModeChange(m.id as any)}
                            className={`py-3 px-2 rounded-xl text-sm font-bold transition-all ${mode === m.id ? 'bg-cyan-600 text-white shadow-md' : 'bg-gray-100 text-text/70 hover:bg-gray-200'}`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Input */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-text mb-2 uppercase opacity-60">Entrada</label>
                        <textarea
                            value={input}
                            onChange={(e) => convert(e.target.value, mode)}
                            className="w-full h-48 px-4 py-3 rounded-xl border border-gray-300 focus:border-cyan-500 outline-none resize-none font-mono"
                            placeholder={mode.includes('ToBinary') ? 'Escribe aquí...' : '010101...'}
                        />
                        <button
                            onClick={() => { setInput(''); setOutput(''); }}
                            className="absolute top-8 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>

                    {/* Output */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-text mb-2 uppercase opacity-60">Salida</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-48 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:border-cyan-500 outline-none resize-none font-mono text-cyan-800"
                            placeholder="Resultado..."
                        />
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-8 right-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 hover:border-cyan-500'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? '¡Copiado!' : 'Copiar'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-8 p-4 bg-cyan-50 rounded-xl border border-cyan-100 text-center">
                    <p className="text-cyan-800 font-medium">
                        {mode === 'textToBinary' && 'Cada letra se convierte a 8 bits (1 byte).'}
                        {mode === 'binaryToText' && 'Pega códigos binarios separados por espacio para traducir.'}
                        {mode === 'decimalToBinary' && 'Convierte números base 10 a base 2.'}
                        {mode === 'binaryToDecimal' && 'Convierte números base 2 a base 10.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
