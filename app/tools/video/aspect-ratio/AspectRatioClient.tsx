'use client';

import React, { useState, useEffect } from 'react';
import { faExpand, faCalculator, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AspectRatio = { width: number; height: number; label: string };

const COMMON_RATIOS: AspectRatio[] = [
    { width: 16, height: 9, label: '16:9 (HD, YouTube)' },
    { width: 4, height: 3, label: '4:3 (Clásico)' },
    { width: 21, height: 9, label: '21:9 (Ultrawide)' },
    { width: 1, height: 1, label: '1:1 (Instagram)' },
    { width: 9, height: 16, label: '9:16 (Stories)' },
    { width: 2, height: 3, label: '2:3 (Pinterest)' }
];

export default function AspectRatioClient() {
    const [width, setWidth] = useState('1920');
    const [height, setHeight] = useState('1080');
    const [locked, setLocked] = useState(true);
    const [ratio, setRatio] = useState({ w: 16, h: 9 });

    useEffect(() => {
        calculateRatio(parseInt(width) || 1920, parseInt(height) || 1080);
    }, []);

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculateRatio = (w: number, h: number) => {
        const divisor = gcd(w, h);
        setRatio({ w: w / divisor, h: h / divisor });
    };

    const handleWidthChange = (newWidth: string) => {
        setWidth(newWidth);
        const w = parseInt(newWidth) || 0;
        if (locked && w > 0) {
            const newHeight = Math.round((w * ratio.h) / ratio.w);
            setHeight(newHeight.toString());
        } else if (!locked && w > 0) {
            const h = parseInt(height) || 1;
            calculateRatio(w, h);
        }
    };

    const handleHeightChange = (newHeight: string) => {
        setHeight(newHeight);
        const h = parseInt(newHeight) || 0;
        if (locked && h > 0) {
            const newWidth = Math.round((h * ratio.w) / ratio.h);
            setWidth(newWidth.toString());
        } else if (!locked && h > 0) {
            const w = parseInt(width) || 1;
            calculateRatio(w, h);
        }
    };

    const applyRatio = (ar: AspectRatio) => {
        setRatio({ w: ar.width, h: ar.height });
        setLocked(true);
        const currentWidth = parseInt(width) || 1920;
        const newHeight = Math.round((currentWidth * ar.height) / ar.width);
        setHeight(newHeight.toString());
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-red-100 text-red-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faExpand} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Aspect Ratio</h1>
                <p className="text-gray-600">Calcula dimensiones perfectas manteniendo la relación de aspecto.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Ancho (px)</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(e.target.value)}
                            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => setLocked(!locked)}
                            className={`p-4 rounded-full transition-all ${locked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
                                }`}
                            title={locked ? 'Desbloquear ratio' : 'Bloquear ratio'}
                        >
                            <FontAwesomeIcon icon={locked ? faLock : faUnlock} className="text-2xl" />
                        </button>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Alto (px)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(e.target.value)}
                            className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                    <div className="text-sm text-red-500 font-bold uppercase mb-2">Relación de Aspecto</div>
                    <div className="text-4xl font-bold text-red-600">{ratio.w}:{ratio.h}</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faCalculator} className="mr-2 text-red-500" />
                    Ratios Comunes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {COMMON_RATIOS.map((ar, index) => (
                        <button
                            key={index}
                            onClick={() => applyRatio(ar)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${ratio.w === ar.width && ratio.h === ar.height
                                    ? 'border-red-500 bg-red-50 text-red-700'
                                    : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'
                                }`}
                        >
                            <div className="font-bold text-lg">{ar.width}:{ar.height}</div>
                            <div className="text-xs text-gray-500">{ar.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
