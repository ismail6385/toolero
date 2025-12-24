'use client';

import React, { useState, useEffect } from 'react';
import { faCode, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RgbToHexClient() {
    const [r, setR] = useState('52');
    const [g, setG] = useState('152');
    const [b, setB] = useState('219');
    const [hex, setHex] = useState('#3498db');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        convertToHex();
    }, [r, g, b]);

    const convertToHex = () => {
        const rNum = Math.max(0, Math.min(255, parseInt(r) || 0));
        const gNum = Math.max(0, Math.min(255, parseInt(g) || 0));
        const bNum = Math.max(0, Math.min(255, parseInt(b) || 0));

        const toHex = (n: number) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        setHex(`#${toHex(rNum)}${toHex(gNum)}${toHex(bNum)}`);
    };

    const copyHex = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-purple-100 text-purple-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faCode} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">RGB a HEX</h1>
                <p className="text-gray-600">Convierte valores RGB a código hexadecimal.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <h3 className="font-bold text-gray-800 mb-6">Valores RGB</h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Red (R)</label>
                        <input
                            type="number"
                            value={r}
                            onChange={(e) => setR(e.target.value)}
                            min="0"
                            max="255"
                            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Green (G)</label>
                        <input
                            type="number"
                            value={g}
                            onChange={(e) => setG(e.target.value)}
                            min="0"
                            max="255"
                            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Blue (B)</label>
                        <input
                            type="number"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            min="0"
                            max="255"
                            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                    <div className="text-sm text-gray-500 mb-1">Entrada RGB</div>
                    <div className="font-mono text-lg text-gray-800">
                        rgb({r || 0}, {g || 0}, {b || 0})
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-800">Resultado HEX</h3>
                    <button
                        onClick={copyHex}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            }`}
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                        {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div
                        className="w-24 h-24 rounded-lg border-2 border-gray-200 flex-shrink-0"
                        style={{ backgroundColor: hex }}
                    />
                    <div className="flex-1">
                        <input
                            type="text"
                            value={hex}
                            readOnly
                            className="w-full p-4 text-3xl text-center bg-gray-50 border-2 border-gray-300 rounded-lg font-mono uppercase"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
