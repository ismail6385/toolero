'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRainbow, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function TextGradientClient() {
    const [text, setText] = useState('Texto con Estilo');
    const [color1, setColor1] = useState('#ec4899');
    const [color2, setColor2] = useState('#8b5cf6');
    const [direction, setDirection] = useState('to right');
    const [copied, setCopied] = useState(false);

    const css = `background: linear-gradient(${direction}, ${color1}, ${color2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faRainbow} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Gradientes de Texto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea efectos de texto increíbles con degradados CSS. Moderno y fácil.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Controls */}
                <div className="lg:col-span-5 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Tu Texto</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Color Inicio</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={color1} onChange={(e) => setColor1(e.target.value)}
                                    className="h-10 w-10 cursor-pointer rounded border border-gray-200"
                                />
                                <input
                                    type="text"
                                    value={color1} onChange={(e) => setColor1(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg uppercase"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Color Fin</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={color2} onChange={(e) => setColor2(e.target.value)}
                                    className="h-10 w-10 cursor-pointer rounded border border-gray-200"
                                />
                                <input
                                    type="text"
                                    value={color2} onChange={(e) => setColor2(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-3">Dirección</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { val: 'to right', label: '→' },
                                { val: 'to left', label: '←' },
                                { val: 'to bottom', label: '↓' },
                                { val: 'to top', label: '↑' },
                                { val: 'to bottom right', label: '↘' },
                                { val: 'to bottom left', label: '↙' },
                                { val: 'to top right', label: '↗' },
                                { val: 'to top left', label: '↖' },
                            ].map((dir) => (
                                <button
                                    key={dir.val}
                                    onClick={() => setDirection(dir.val)}
                                    className={`p-2 rounded-lg border font-bold text-xl transition-all ${direction === dir.val
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white border-gray-200 hover:border-gray-300 text-gray-400'
                                        }`}
                                >
                                    {dir.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-12 min-h-[300px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <h2
                            className="text-6xl md:text-8xl font-black text-center leading-tight break-words max-w-full"
                            style={{
                                background: `linear-gradient(${direction}, ${color1}, ${color2})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {text}
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 left-0 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg border-r border-b border-primary/20">
                            CSS Code
                        </div>
                        <code className="block bg-surface border border-gray-200 rounded-xl p-6 pt-10 text-sm font-mono text-text whitespace-pre-wrap">
                            {css}
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
