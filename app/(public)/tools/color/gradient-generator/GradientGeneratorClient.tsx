'use client';

import React, { useState } from 'react';
import { faPalette, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GradientGeneratorClient() {
    const [color1, setColor1] = useState('#ff6b6b');
    const [color2, setColor2] = useState('#4ecdc4');
    const [color3, setColor3] = useState('#45b7d1');
    const [useThreeColors, setUseThreeColors] = useState(false);
    const [angle, setAngle] = useState('135');
    const [copied, setCopied] = useState(false);

    const generateGradient = () => {
        if (useThreeColors) {
            return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
        }
        return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    };

    const cssCode = `background: ${generateGradient()};`;

    const copyCode = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faPalette} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Degradados</h1>
                <p className="text-gray-600">Crea degradados CSS perfectos con vista previa en tiempo real.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <div
                    className="w-full h-64 rounded-xl mb-8 border border-gray-200"
                    style={{ background: generateGradient() }}
                />

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Ángulo: {angle}°</label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={angle}
                            onChange={(e) => setAngle(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={useThreeColors}
                                onChange={(e) => setUseThreeColors(e.target.checked)}
                                className="w-5 h-5 rounded text-pink-600 focus:ring-pink-500"
                            />
                            <span className="ml-2 text-gray-700">Usar 3 colores</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
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
                                    className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
                                />
                            </div>
                        </div>

                        {useThreeColors && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Color 3</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={color3}
                                        onChange={(e) => setColor3(e.target.value)}
                                        className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={color3}
                                        onChange={(e) => setColor3(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-lg font-mono uppercase"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Código CSS</h3>
                    <button
                        onClick={copyCode}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
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
    );
}
