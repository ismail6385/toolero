'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVectorSquare, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function BoxShadowClient() {
    const [horizontal, setHorizontal] = useState(10);
    const [vertical, setVertical] = useState(10);
    const [blur, setBlur] = useState(5);
    const [spread, setSpread] = useState(0);
    const [color, setColor] = useState('#000000');
    const [opacity, setOpacity] = useState(0.25);
    const [inset, setInset] = useState(false);
    const [copied, setCopied] = useState(false);

    // Convert hex to rgba
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgb = hexToRgb(color);
    const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    const shadowValue = `${inset ? 'inset ' : ''}${horizontal}px ${vertical}px ${blur}px ${spread}px ${rgbaColor}`;
    const code = `box-shadow: ${shadowValue};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faVectorSquare} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador Box Shadow CSS</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea sombras CSS perfectas visualmente y copia el código al instante.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Controls */}
                <div className="lg:col-span-5 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Configuración</h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Desplazamiento Horizontal</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{horizontal}px</span>
                            </div>
                            <input
                                type="range" min="-100" max="100"
                                value={horizontal} onChange={(e) => setHorizontal(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Desplazamiento Vertical</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{vertical}px</span>
                            </div>
                            <input
                                type="range" min="-100" max="100"
                                value={vertical} onChange={(e) => setVertical(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Difuminado (Blur)</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{blur}px</span>
                            </div>
                            <input
                                type="range" min="0" max="100"
                                value={blur} onChange={(e) => setBlur(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Propagación (Spread)</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{spread}px</span>
                            </div>
                            <input
                                type="range" min="-50" max="50"
                                value={spread} onChange={(e) => setSpread(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Opacidad Color</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{opacity}</span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.01"
                                value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-2">Color Sombra</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={color} onChange={(e) => setColor(e.target.value)}
                                        className="h-10 w-10 cursor-pointer rounded border border-gray-200"
                                    />
                                    <input
                                        type="text"
                                        value={color} onChange={(e) => setColor(e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex items-end">
                                <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 w-full h-10 hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={inset} onChange={(e) => setInset(e.target.checked)}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <span className="text-sm font-semibold">Sombra Interna</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-12 min-h-[400px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <div
                            className="w-64 h-64 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-text/40 font-bold"
                            style={{ boxShadow: shadowValue }}
                        >
                            Preview
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 left-0 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg border-r border-b border-primary/20">
                            CSS Code
                        </div>
                        <code className="block bg-surface border border-gray-200 rounded-xl p-6 pt-10 text-sm font-mono text-text">
                            -webkit-box-shadow: {shadowValue};<br />
                            -moz-box-shadow: {shadowValue};<br />
                            box-shadow: {shadowValue};
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-secondary'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
