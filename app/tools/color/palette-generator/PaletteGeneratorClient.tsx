'use client';

import React, { useState, useEffect } from 'react';
import { faPalette, faCopy, faCheck, faRandom } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SchemeType = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic';

export default function PaletteGeneratorClient() {
    const [baseColor, setBaseColor] = useState('#3498db');
    const [scheme, setScheme] = useState<SchemeType>('complementary');
    const [palette, setPalette] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    useEffect(() => {
        generatePalette();
    }, [baseColor, scheme]);

    const hexToHsl = (hex: string): [number, number, number] => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return [h * 360, s * 100, l * 100];
    };

    const hslToHex = (h: number, s: number, l: number): string => {
        h = h / 360;
        s = s / 100;
        l = l / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = (x: number) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const generatePalette = () => {
        const [h, s, l] = hexToHsl(baseColor);
        let colors: string[] = [baseColor];

        switch (scheme) {
            case 'complementary':
                colors.push(hslToHex((h + 180) % 360, s, l));
                colors.push(hslToHex(h, s, Math.max(l - 20, 10)));
                colors.push(hslToHex(h, s, Math.min(l + 20, 90)));
                break;
            case 'analogous':
                colors.push(hslToHex((h + 30) % 360, s, l));
                colors.push(hslToHex((h - 30 + 360) % 360, s, l));
                colors.push(hslToHex(h, s, Math.max(l - 15, 10)));
                colors.push(hslToHex(h, s, Math.min(l + 15, 90)));
                break;
            case 'triadic':
                colors.push(hslToHex((h + 120) % 360, s, l));
                colors.push(hslToHex((h + 240) % 360, s, l));
                break;
            case 'tetradic':
                colors.push(hslToHex((h + 90) % 360, s, l));
                colors.push(hslToHex((h + 180) % 360, s, l));
                colors.push(hslToHex((h + 270) % 360, s, l));
                break;
            case 'monochromatic':
                colors.push(hslToHex(h, s, Math.max(l - 30, 10)));
                colors.push(hslToHex(h, s, Math.max(l - 15, 10)));
                colors.push(hslToHex(h, s, Math.min(l + 15, 90)));
                colors.push(hslToHex(h, s, Math.min(l + 30, 90)));
                break;
        }

        setPalette(colors);
    };

    const randomColor = () => {
        const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setBaseColor(randomHex);
    };

    const copyColor = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-pink-100 text-pink-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faPalette} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Paletas</h1>
                <p className="text-gray-600">Crea esquemas de colores armónicos para tus diseños.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Color Base</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
                            />
                            <button
                                onClick={randomColor}
                                className="px-4 py-3 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                                title="Color aleatorio"
                            >
                                <FontAwesomeIcon icon={faRandom} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Esquema de Color</label>
                        <select
                            value={scheme}
                            onChange={(e) => setScheme(e.target.value as SchemeType)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                        >
                            <option value="complementary">Complementario</option>
                            <option value="analogous">Análogo</option>
                            <option value="triadic">Triádico</option>
                            <option value="tetradic">Tetrádico</option>
                            <option value="monochromatic">Monocromático</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div
                            className="h-32 cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color, index)}
                        />
                        <div className="p-4">
                            <div className="font-mono text-sm text-gray-800 mb-2 uppercase">{color}</div>
                            <button
                                onClick={() => copyColor(color, index)}
                                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${copiedIndex === index
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copiedIndex === index ? faCheck : faCopy} className="mr-2" />
                                {copiedIndex === index ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
