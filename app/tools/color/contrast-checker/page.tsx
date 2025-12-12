'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function ContrastChecker() {
    const [foreground, setForeground] = useState('#000000');
    const [background, setBackground] = useState('#FFFFFF');

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const getLuminance = (r: number, g: number, b: number) => {
        const [rs, gs, bs] = [r, g, b].map(val => {
            val = val / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const getContrast = (color1: string, color2: string) => {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        if (!rgb1 || !rgb2) return 0;

        const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);
        return (lighter + 0.05) / (darker + 0.05);
    };

    const contrast = getContrast(foreground, background);

    const getWCAGLevel = (ratio: number, level: 'AA' | 'AAA', size: 'normal' | 'large') => {
        if (level === 'AA') {
            if (size === 'normal') return ratio >= 4.5;
            return ratio >= 3;
        } else {
            if (size === 'normal') return ratio >= 7;
            return ratio >= 4.5;
        }
    };

    const results = {
        contrast: contrast.toFixed(2),
        aaNormal: getWCAGLevel(contrast, 'AA', 'normal'),
        aaLarge: getWCAGLevel(contrast, 'AA', 'large'),
        aaaNormal: getWCAGLevel(contrast, 'AAA', 'normal'),
        aaaLarge: getWCAGLevel(contrast, 'AAA', 'large'),
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faAdjust} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Comprobador de Contraste</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Verifica si la combinación de colores de texto y fondo cumple con los estándares de accesibilidad (WCAG).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faAdjust} className="text-primary" />
                        Seleccionar Colores
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Color de Texto (Foreground)</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={foreground}
                                    onChange={(e) => setForeground(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Color de Fondo (Background)</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="w-16 h-16 rounded-xl border border-gray-200 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={background}
                                    onChange={(e) => setBackground(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6">Vista Previa y Resultados</h2>

                    <div
                        className="rounded-xl p-8 mb-6 border border-gray-200 shadow-md"
                        style={{ backgroundColor: background }}
                    >
                        <p
                            className="text-2xl font-semibold"
                            style={{ color: foreground }}
                        >
                            Texto de Ejemplo
                        </p>
                        <p
                            className="text-base mt-2"
                            style={{ color: foreground }}
                        >
                            Este es un ejemplo de cómo se verá el texto con estos colores.
                        </p>
                    </div>

                    <div className="bg-background rounded-xl p-6 border border-gray-200">
                        <div className="mb-4">
                            <h3 className="font-semibold text-text mb-2">Ratio de Contraste</h3>
                            <div className="text-3xl font-bold text-primary mb-1">{results.contrast}:1</div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full transition-all ${
                                        contrast >= 7 ? 'bg-green-600' :
                                        contrast >= 4.5 ? 'bg-blue-600' :
                                        contrast >= 3 ? 'bg-yellow-600' :
                                        'bg-red-600'
                                    }`}
                                    style={{ width: `${Math.min((contrast / 21) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-text mb-3">Cumplimiento WCAG</h3>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-gray-200">
                                    <span className="text-sm text-text">WCAG AA - Texto Normal</span>
                                    <FontAwesomeIcon
                                        icon={results.aaNormal ? faCheckCircle : faTimesCircle}
                                        className={results.aaNormal ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-gray-200">
                                    <span className="text-sm text-text">WCAG AA - Texto Grande</span>
                                    <FontAwesomeIcon
                                        icon={results.aaLarge ? faCheckCircle : faTimesCircle}
                                        className={results.aaLarge ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-gray-200">
                                    <span className="text-sm text-text">WCAG AAA - Texto Normal</span>
                                    <FontAwesomeIcon
                                        icon={results.aaaNormal ? faCheckCircle : faTimesCircle}
                                        className={results.aaaNormal ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-gray-200">
                                    <span className="text-sm text-text">WCAG AAA - Texto Grande</span>
                                    <FontAwesomeIcon
                                        icon={results.aaaLarge ? faCheckCircle : faTimesCircle}
                                        className={results.aaaLarge ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faAdjust} className="text-primary" />
                    Sobre WCAG
                </h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        <strong>WCAG (Web Content Accessibility Guidelines)</strong> establece estándares de contraste para garantizar 
                        que el contenido sea accesible para personas con discapacidades visuales.
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li><strong>AA - Texto Normal:</strong> Ratio mínimo de 4.5:1</li>
                        <li><strong>AA - Texto Grande:</strong> Ratio mínimo de 3:1 (18pt o 14pt en negrita)</li>
                        <li><strong>AAA - Texto Normal:</strong> Ratio mínimo de 7:1</li>
                        <li><strong>AAA - Texto Grande:</strong> Ratio mínimo de 4.5:1</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

