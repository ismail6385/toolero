'use client';

import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faPalette, faRefresh, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function PaletteGenerator() {
    const [palette, setPalette] = useState<string[]>([]);
    const [format, setFormat] = useState<'hex' | 'rgb' | 'css'>('hex');

    const generatePalette = useCallback(() => {
        const colors: string[] = [];
        for (let i = 0; i < 5; i++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            colors.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
        }
        setPalette(colors);
    }, []);

    const rgbToHex = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToCss = (hex: string) => {
        return `--color: ${hex};`;
    };

    const formatColor = (color: string) => {
        switch (format) {
            case 'hex':
                return color;
            case 'rgb':
                return rgbToHex(color);
            case 'css':
                return hexToCss(color);
            default:
                return color;
        }
    };

    const copyAll = () => {
        const text = palette.map(formatColor).join('\n');
        navigator.clipboard.writeText(text);
    };

    const copyColor = (color: string) => {
        navigator.clipboard.writeText(formatColor(color));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faPalette} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador de Paletas</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea paletas de colores armónicas y exporta los códigos en HEX, RGB o CSS.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold text-text">Formato de exportación:</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value as 'hex' | 'rgb' | 'css')}
                            className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        >
                            <option value="hex">HEX</option>
                            <option value="rgb">RGB</option>
                            <option value="css">CSS Variable</option>
                        </select>
                    </div>
                    <button
                        onClick={generatePalette}
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                        <FontAwesomeIcon icon={faRefresh} />
                        Generar Paleta
                    </button>
                </div>

                {palette.length > 0 ? (
                    <>
                        <div className="grid grid-cols-5 gap-4 mb-6">
                            {palette.map((color, index) => (
                                <div key={index} className="group">
                                    <div
                                        className="h-32 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform mb-2"
                                        style={{ backgroundColor: color }}
                                        onClick={() => copyColor(color)}
                                    />
                                    <div className="text-center">
                                        <p className="text-xs font-mono text-text/70 mb-1">{formatColor(color)}</p>
                                        <button
                                            onClick={() => copyColor(color)}
                                            className="text-xs text-primary hover:text-secondary transition-colors"
                                        >
                                            Copiar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={copyAll}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                        >
                            <FontAwesomeIcon icon={faCopy} />
                            Copiar Todos los Colores
                        </button>
                    </>
                ) : (
                    <div className="text-center py-12 text-text/50">
                        <FontAwesomeIcon icon={faPalette} className="text-4xl mb-4 opacity-50" />
                        <p>Haz clic en "Generar Paleta" para crear una paleta de colores</p>
                    </div>
                )}
            </div>
        </div>
    );
}

