'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ColorShadesClient() {
    const [color, setColor] = useState('#ec4899');
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    // Helpers
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

    // Shades (Darken)
    const generateShades = () => {
        const shades = [];
        const rgb = hexToRgb(color);
        for (let i = 0; i <= 10; i++) {
            const factor = i / 10; // 0 to 1
            // Mixing with black
            const r = Math.round(rgb.r * (1 - factor));
            const g = Math.round(rgb.g * (1 - factor));
            const b = Math.round(rgb.b * (1 - factor));
            shades.push({
                hex: rgbToHex(r, g, b),
                weight: i * 10
            });
        }
        return shades;
    };

    // Tints (Lighten)
    const generateTints = () => {
        const tints = [];
        const rgb = hexToRgb(color);
        for (let i = 0; i <= 10; i++) {
            const factor = i / 10; // 0 to 1
            // Mixing with white
            const r = Math.round(rgb.r + (255 - rgb.r) * factor);
            const g = Math.round(rgb.g + (255 - rgb.g) * factor);
            const b = Math.round(rgb.b + (255 - rgb.b) * factor);
            tints.push({
                hex: rgbToHex(r, g, b),
                weight: i * 10
            });
        }
        return tints.reverse(); // Show from white to color
    };

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 1500);
    };

    const shades = generateShades();
    const tints = generateTints();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faTint} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Tints & Shades</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Genera variaciones de luz (Tintes) y oscuridad (Sombras) de cualquier color.
                </p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <input
                        type="color"
                        value={color} onChange={(e) => setColor(e.target.value)}
                        className="h-12 w-12 cursor-pointer rounded-lg border border-gray-200"
                    />
                    <input
                        type="text"
                        value={color} onChange={(e) => setColor(e.target.value)}
                        className="px-4 py-2 text-lg font-mono font-bold border border-gray-200 rounded-lg uppercase w-32 text-center"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Tints */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-center mb-4">Tintes (Más Claros)</h3>
                    <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        {tints.map((t, idx) => (
                            <div
                                key={idx}
                                className="h-16 flex items-center justify-between px-6 cursor-pointer hover:scale-[1.02] transition-transform relative group"
                                style={{ backgroundColor: t.hex }}
                                onClick={() => copyToClipboard(t.hex)}
                            >
                                <span className={`font-mono font-bold ${idx < 5 ? 'text-gray-800' : 'text-white'}`}>{t.weight}%</span>
                                <span className={`font-mono uppercase flex items-center gap-2 ${idx < 5 ? 'text-gray-800' : 'text-white'}`}>
                                    {t.hex}
                                    {copiedColor === t.hex && <FontAwesomeIcon icon={faCheck} />}
                                </span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shades */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-center mb-4">Sombras (Más Oscuros)</h3>
                    <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        {shades.map((s, idx) => (
                            <div
                                key={idx}
                                className="h-16 flex items-center justify-between px-6 cursor-pointer hover:scale-[1.02] transition-transform relative group"
                                style={{ backgroundColor: s.hex }}
                                onClick={() => copyToClipboard(s.hex)}
                            >
                                <span className={`font-mono font-bold ${idx > 4 ? 'text-white' : 'text-gray-800'}`}>{s.weight}%</span>
                                <span className={`font-mono uppercase flex items-center gap-2 ${idx > 4 ? 'text-white' : 'text-gray-800'}`}>
                                    {s.hex}
                                    {copiedColor === s.hex && <FontAwesomeIcon icon={faCheck} />}
                                </span>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
