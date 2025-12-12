'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faSync } from '@fortawesome/free-solid-svg-icons';

export default function RgbToHex() {
    const [rgb, setRgb] = useState({ r: '', g: '', b: '' });
    const [hex, setHex] = useState('');
    const [copied, setCopied] = useState(false);

    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    };

    const handleChange = (field: 'r' | 'g' | 'b', value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue >= 0 && numValue <= 255) {
            setRgb(prev => ({ ...prev, [field]: value }));
            const r = field === 'r' ? numValue : parseInt(rgb.r) || 0;
            const g = field === 'g' ? numValue : parseInt(rgb.g) || 0;
            const b = field === 'b' ? numValue : parseInt(rgb.b) || 0;
            setHex(rgbToHex(r, g, b));
        } else if (value === '') {
            setRgb(prev => ({ ...prev, [field]: '' }));
            setHex('');
        }
    };

    const handleCopy = () => {
        if (hex) {
            navigator.clipboard.writeText(hex);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const currentColor = hex || '#FFFFFF';

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faSync} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Conversor RGB a HEX</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Transforma valores RGB a código hexadecimal para uso en web.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-text mb-4">Valores RGB</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Rojo (R): 0-255</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.r}
                                    onChange={(e) => handleChange('r', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="255"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Verde (G): 0-255</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.g}
                                    onChange={(e) => handleChange('g', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="87"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Azul (B): 0-255</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={rgb.b}
                                    onChange={(e) => handleChange('b', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="51"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-text mb-4">Código HEX</h3>
                        <div className="mb-4">
                            <div
                                className="h-32 rounded-xl border border-gray-200 mb-4 shadow-md"
                                style={{ backgroundColor: currentColor }}
                            />
                            <div className="bg-background rounded-xl p-4 border border-gray-200">
                                <div className="font-mono text-2xl text-text text-center mb-2">
                                    {hex || '#------'}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    disabled={!hex}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado!' : 'Copiar HEX'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3">Información</h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        <strong>RGB:</strong> Sistema de color aditivo con valores de 0 a 255 para cada canal (Rojo, Verde, Azul).
                    </p>
                    <p>
                        <strong>HEX:</strong> Representación hexadecimal del color en formato #RRGGBB, ideal para CSS y HTML.
                    </p>
                </div>
            </div>
        </div>
    );
}

