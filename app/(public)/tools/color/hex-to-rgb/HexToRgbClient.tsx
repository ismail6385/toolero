'use client';

import React, { useState, useEffect } from 'react';
import { faExchangeAlt, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HexToRgbClient() {
    const [hex, setHex] = useState('#3498db');
    const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 });
    const [copiedHex, setCopiedHex] = useState(false);
    const [copiedRgb, setCopiedRgb] = useState(false);

    useEffect(() => {
        hexToRgb(hex);
    }, [hex]);

    const hexToRgb = (hexValue: string) => {
        const cleanHex = hexValue.replace('#', '');
        if (cleanHex.length === 6) {
            const r = parseInt(cleanHex.substring(0, 2), 16);
            const g = parseInt(cleanHex.substring(2, 4), 16);
            const b = parseInt(cleanHex.substring(4, 6), 16);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                setRgb({ r, g, b });
            }
        }
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        const toHex = (n: number) => {
            const hex = Math.max(0, Math.min(255, n)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const handleRgbChange = (color: 'r' | 'g' | 'b', value: string) => {
        const num = parseInt(value) || 0;
        const newRgb = { ...rgb, [color]: Math.max(0, Math.min(255, num)) };
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyHex = () => {
        navigator.clipboard.writeText(hex);
        setCopiedHex(true);
        setTimeout(() => setCopiedHex(false), 2000);
    };

    const copyRgb = () => {
        navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        setCopiedRgb(true);
        setTimeout(() => setCopiedRgb(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faExchangeAlt} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Conversor HEX a RGB</h1>
                <p className="text-gray-600">Convierte entre formatos de color hexadecimal y RGB.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* HEX Input */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 text-center">HEX</h3>

                    <div className="mb-6">
                        <div className="flex gap-2 mb-4">
                            <input
                                type="color"
                                value={hex}
                                onChange={(e) => setHex(e.target.value)}
                                className="w-20 h-20 rounded-lg border border-gray-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={hex}
                                onChange={(e) => setHex(e.target.value)}
                                className="flex-1 p-4 text-2xl text-center border border-gray-300 rounded-lg font-mono uppercase focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                maxLength={7}
                            />
                        </div>

                        <button
                            onClick={copyHex}
                            className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${copiedHex
                                    ? 'bg-green-500 text-white'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copiedHex ? faCheck : faCopy} className="mr-2" />
                            {copiedHex ? 'Copiado!' : 'Copiar HEX'}
                        </button>
                    </div>

                    <div
                        className="w-full h-32 rounded-lg border border-gray-200"
                        style={{ backgroundColor: hex }}
                    />
                </div>

                {/* RGB Input */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 text-center">RGB</h3>

                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Red (R)</label>
                            <input
                                type="number"
                                value={rgb.r}
                                onChange={(e) => handleRgbChange('r', e.target.value)}
                                min="0"
                                max="255"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Green (G)</label>
                            <input
                                type="number"
                                value={rgb.g}
                                onChange={(e) => handleRgbChange('g', e.target.value)}
                                min="0"
                                max="255"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Blue (B)</label>
                            <input
                                type="number"
                                value={rgb.b}
                                onChange={(e) => handleRgbChange('b', e.target.value)}
                                min="0"
                                max="255"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <button
                            onClick={copyRgb}
                            className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${copiedRgb
                                    ? 'bg-green-500 text-white'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copiedRgb ? faCheck : faCopy} className="mr-2" />
                            {copiedRgb ? 'Copiado!' : 'Copiar RGB'}
                        </button>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">Valor RGB</div>
                        <div className="font-mono text-lg text-gray-800">
                            rgb({rgb.r}, {rgb.g}, {rgb.b})
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
