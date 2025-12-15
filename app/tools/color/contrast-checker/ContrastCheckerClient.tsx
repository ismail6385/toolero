'use client';

import React, { useState, useEffect } from 'react';
import { faAdjust, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ContrastCheckerClient() {
    const [foreground, setForeground] = useState('#000000');
    const [background, setBackground] = useState('#ffffff');
    const [ratio, setRatio] = useState(21);

    useEffect(() => {
        calculateContrast();
    }, [foreground, background]);

    const getLuminance = (hex: string): number => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;

        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const calculateContrast = () => {
        const l1 = getLuminance(foreground);
        const l2 = getLuminance(background);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        const contrastRatio = (lighter + 0.05) / (darker + 0.05);
        setRatio(parseFloat(contrastRatio.toFixed(2)));
    };

    const getWCAGLevel = (ratio: number, size: 'normal' | 'large') => {
        if (size === 'normal') {
            if (ratio >= 7) return { level: 'AAA', pass: true };
            if (ratio >= 4.5) return { level: 'AA', pass: true };
            return { level: 'Fail', pass: false };
        } else {
            if (ratio >= 4.5) return { level: 'AAA', pass: true };
            if (ratio >= 3) return { level: 'AA', pass: true };
            return { level: 'Fail', pass: false };
        }
    };

    const normalText = getWCAGLevel(ratio, 'normal');
    const largeText = getWCAGLevel(ratio, 'large');

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faAdjust} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Verificador de Contraste</h1>
                <p className="text-gray-600">Verifica la accesibilidad del contraste según WCAG 2.1.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Color Inputs */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <label className="block text-gray-700 font-medium mb-2">Color de Texto (Foreground)</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={foreground}
                                onChange={(e) => setForeground(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <label className="block text-gray-700 font-medium mb-2">Color de Fondo (Background)</label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                            />
                            <input
                                type="text"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Ratio de Contraste</h3>
                        <div className="text-5xl font-bold text-indigo-600 text-center">
                            {ratio}:1
                        </div>
                    </div>
                </div>

                {/* Preview & Results */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Vista Previa</h3>
                        <div
                            className="p-8 rounded-lg border border-gray-200"
                            style={{ backgroundColor: background, color: foreground }}
                        >
                            <p className="text-base mb-4">Texto normal de ejemplo (16px)</p>
                            <p className="text-2xl font-bold">Texto grande de ejemplo (24px)</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Resultados WCAG 2.1</h3>

                        <div className="space-y-4">
                            <div className={`p-4 rounded-lg border-2 ${normalText.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-700">Texto Normal</span>
                                    <FontAwesomeIcon
                                        icon={normalText.pass ? faCheck : faTimes}
                                        className={normalText.pass ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                                <div className={`text-sm ${normalText.pass ? 'text-green-700' : 'text-red-700'}`}>
                                    Nivel {normalText.level} {normalText.pass ? '✓' : '✗'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Requiere 4.5:1 (AA) o 7:1 (AAA)
                                </div>
                            </div>

                            <div className={`p-4 rounded-lg border-2 ${largeText.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-gray-700">Texto Grande (18pt+)</span>
                                    <FontAwesomeIcon
                                        icon={largeText.pass ? faCheck : faTimes}
                                        className={largeText.pass ? 'text-green-600' : 'text-red-600'}
                                    />
                                </div>
                                <div className={`text-sm ${largeText.pass ? 'text-green-700' : 'text-red-700'}`}>
                                    Nivel {largeText.level} {largeText.pass ? '✓' : '✗'}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Requiere 3:1 (AA) o 4.5:1 (AAA)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
