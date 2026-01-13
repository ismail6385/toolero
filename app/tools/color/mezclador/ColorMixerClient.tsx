'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVial, faCopy, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ColorMixerClient() {
    const [color1, setColor1] = useState('#3b82f6'); // blue-500
    const [color2, setColor2] = useState('#ef4444'); // red-500
    const [steps, setSteps] = useState(5);
    const [copied, setCopied] = useState<string | null>(null);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const mixColors = (c1: string, c2: string, amount: number) => {
        const rgb1 = hexToRgb(c1);
        const rgb2 = hexToRgb(c2);

        const r = Math.round(rgb1.r * (1 - amount) + rgb2.r * amount);
        const g = Math.round(rgb1.g * (1 - amount) + rgb2.g * amount);
        const b = Math.round(rgb1.b * (1 - amount) + rgb2.b * amount);

        return rgbToHex(r, g, b);
    };

    const generateMix = () => {
        const palette = [];
        for (let i = 0; i <= steps + 1; i++) {
            const factor = i / (steps + 1);
            palette.push(mixColors(color1, color2, factor));
        }
        return palette;
    };

    const palette = generateMix();

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopied(hex);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faVial} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Mezclador de Colores</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Combina dos colores y descubre la gama intermedia perfecta.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center justify-center max-w-4xl mx-auto mb-16">
                {/* Color 1 */}
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4">
                    <input
                        type="color"
                        value={color1} onChange={(e) => setColor1(e.target.value)}
                        className="h-20 w-20 cursor-pointer rounded-full border-4 border-white shadow-lg shadow-gray-200"
                    />
                    <span className="font-mono font-bold uppercase">{color1}</span>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="font-bold text-gray-400 text-sm uppercase tracking-widest">Pasos: {steps}</div>
                    <input
                        type="range" min="1" max="20"
                        value={steps} onChange={(e) => setSteps(Number(e.target.value))}
                        className="w-full accent-primary"
                    />
                </div>

                {/* Color 2 */}
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4">
                    <input
                        type="color"
                        value={color2} onChange={(e) => setColor2(e.target.value)}
                        className="h-20 w-20 cursor-pointer rounded-full border-4 border-white shadow-lg shadow-gray-200"
                    />
                    <span className="font-mono font-bold uppercase">{color2}</span>
                </div>
            </div>

            {/* Result */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4">
                {palette.map((hex, idx) => (
                    <div
                        key={idx}
                        className="w-24 h-32 rounded-xl flex flex-col items-center justify-end pb-4 shadow-md cursor-pointer hover:-translate-y-2 transition-transform relative group"
                        style={{ backgroundColor: hex }}
                        onClick={() => copyToClipboard(hex)}
                    >
                        <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-mono font-bold uppercase shadow-sm flex items-center gap-1">
                            {hex}
                            {copied === hex && <FontAwesomeIcon icon={faCheck} className="text-green-500" />}
                        </span>

                        {/* Tooltip-ish indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <FontAwesomeIcon icon={faCopy} className="text-white text-2xl drop-shadow-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
