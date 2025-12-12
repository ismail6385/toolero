'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faSync, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function HexToRgb() {
    const [hex, setHex] = useState('');
    const [rgb, setRgb] = useState('');
    const [mode, setMode] = useState<'hex-to-rgb' | 'rgb-to-hex'>('hex-to-rgb');
    const [copied, setCopied] = useState(false);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return null;
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const handleHexChange = (value: string) => {
        setHex(value);
        if (mode === 'hex-to-rgb') {
            const rgbValue = hexToRgb(value);
            if (rgbValue) {
                setRgb(`rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`);
            } else {
                setRgb('');
            }
        }
    };

    const handleRgbChange = (value: string) => {
        setRgb(value);
        if (mode === 'rgb-to-hex') {
            const match = value.match(/\d+/g);
            if (match && match.length === 3) {
                const r = parseInt(match[0]);
                const g = parseInt(match[1]);
                const b = parseInt(match[2]);
                if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                    setHex(rgbToHex(r, g, b));
                } else {
                    setHex('');
                }
            } else {
                setHex('');
            }
        }
    };

    const handleCopy = () => {
        const textToCopy = mode === 'hex-to-rgb' ? rgb : hex;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleMode = () => {
        setMode(mode === 'hex-to-rgb' ? 'rgb-to-hex' : 'hex-to-rgb');
        setHex('');
        setRgb('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faSync} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Conversor HEX a RGB</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Convierte códigos de color HEX a formato RGB y viceversa instantáneamente.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="flex justify-center mb-6">
                    <button
                        onClick={toggleMode}
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                        {mode === 'hex-to-rgb' ? 'Cambiar a RGB → HEX' : 'Cambiar a HEX → RGB'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            {mode === 'hex-to-rgb' ? 'Código HEX' : 'Código RGB'}
                        </label>
                        <input
                            type="text"
                            value={mode === 'hex-to-rgb' ? hex : rgb}
                            onChange={(e) => mode === 'hex-to-rgb' ? handleHexChange(e.target.value) : handleRgbChange(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
                            placeholder={mode === 'hex-to-rgb' ? '#FF5733' : 'rgb(255, 87, 51)'}
                        />
                        {mode === 'hex-to-rgb' && hex && (
                            <div
                                className="mt-3 h-20 rounded-xl border border-gray-200"
                                style={{ backgroundColor: hex }}
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            {mode === 'hex-to-rgb' ? 'Código RGB' : 'Código HEX'}
                        </label>
                        <input
                            type="text"
                            value={mode === 'hex-to-rgb' ? rgb : hex}
                            readOnly
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-background font-mono"
                            placeholder={mode === 'hex-to-rgb' ? 'rgb(255, 87, 51)' : '#FF5733'}
                        />
                        {mode === 'rgb-to-hex' && hex && (
                            <div
                                className="mt-3 h-20 rounded-xl border border-gray-200"
                                style={{ backgroundColor: hex }}
                            />
                        )}
                    </div>
                </div>

                {(rgb || hex) && (
                    <button
                        onClick={handleCopy}
                        className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                        {copied ? 'Copiado!' : `Copiar ${mode === 'hex-to-rgb' ? 'RGB' : 'HEX'}`}
                    </button>
                )}
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3">Información</h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        <strong>HEX:</strong> Formato hexadecimal (#RRGGBB) usado comúnmente en diseño web.
                    </p>
                    <p>
                        <strong>RGB:</strong> Formato Red-Green-Blue (rgb(r, g, b)) con valores de 0 a 255.
                    </p>
                </div>
            </div>
        </div>
    );
}

