'use client';

import React, { useState } from 'react';
import { faPalette, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GradientType = 'linear' | 'radial';

export default function CssGradientClient() {
    const [type, setType] = useState<GradientType>('linear');
    const [angle, setAngle] = useState('90');
    const [color1, setColor1] = useState('#667eea');
    const [color2, setColor2] = useState('#764ba2');
    const [copied, setCopied] = useState(false);

    const generateGradient = () => {
        if (type === 'linear') {
            return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        } else {
            return `radial-gradient(circle, ${color1}, ${color2})`;
        }
    };

    const cssCode = `background: ${generateGradient()};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const presets = [
        { name: 'Sunset', colors: ['#ff6b6b', '#feca57'] },
        { name: 'Ocean', colors: ['#667eea', '#764ba2'] },
        { name: 'Forest', colors: ['#56ab2f', '#a8e063'] },
        { name: 'Fire', colors: ['#f12711', '#f5af19'] },
        { name: 'Purple', colors: ['#8e2de2', '#4a00e0'] },
        { name: 'Pink', colors: ['#ff0844', '#ffb199'] }
    ];

    const applyPreset = (colors: string[]) => {
        setColor1(colors[0]);
        setColor2(colors[1]);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faPalette} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Gradientes CSS</h1>
                <p className="text-gray-600">Crea degradados perfectos con vista previa en tiempo real.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Configuración</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Tipo de Gradiente</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setType('linear')}
                                        className={`p-3 rounded-lg border-2 transition-all ${type === 'linear'
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-200 hover:border-indigo-200'
                                            }`}
                                    >
                                        Lineal
                                    </button>
                                    <button
                                        onClick={() => setType('radial')}
                                        className={`p-3 rounded-lg border-2 transition-all ${type === 'radial'
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-200 hover:border-indigo-200'
                                            }`}
                                    >
                                        Radial
                                    </button>
                                </div>
                            </div>

                            {type === 'linear' && (
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Ángulo: {angle}°</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => setAngle(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Color 1</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={color1}
                                        onChange={(e) => setColor1(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Color 2</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={color2}
                                        onChange={(e) => setColor2(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Presets</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {presets.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => applyPreset(preset.colors)}
                                    className="h-16 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all"
                                    style={{ background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})` }}
                                    title={preset.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview & Code */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Vista Previa</h3>
                        <div
                            className="w-full h-64 rounded-lg border border-gray-200"
                            style={{ background: generateGradient() }}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Código CSS</h3>
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                            <code>{cssCode}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
