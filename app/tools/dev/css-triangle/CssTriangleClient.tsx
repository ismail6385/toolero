'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

type Direction = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export default function CssTriangleClient() {
    const [direction, setDirection] = useState<Direction>('top');
    const [color, setColor] = useState('#ec4899');
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [copied, setCopied] = useState(false);
    const [css, setCss] = useState('');

    useEffect(() => {
        let styles = `width: 0; 
height: 0; 
border-style: solid; 
`;

        const w = width / 2;
        const h = height / 2;

        switch (direction) {
            case 'top':
                styles += `border-width: 0 ${w}px ${height}px ${w}px; 
border-color: transparent transparent ${color} transparent;`;
                break;
            case 'bottom':
                styles += `border-width: ${height}px ${w}px 0 ${w}px; 
border-color: ${color} transparent transparent transparent;`;
                break;
            case 'left':
                styles += `border-width: ${h}px ${width}px ${h}px 0; 
border-color: transparent ${color} transparent transparent;`;
                break;
            case 'right':
                styles += `border-width: ${h}px 0 ${h}px ${width}px; 
border-color: transparent transparent transparent ${color};`;
                break;
            case 'top-left':
                styles += `border-width: ${height}px ${width}px 0 0; 
border-color: ${color} transparent transparent transparent;`;
                break;
            case 'top-right':
                styles += `border-width: 0 ${width}px ${height}px 0; 
border-color: transparent ${color} transparent transparent;`;
                break;
            case 'bottom-left':
                styles += `border-width: ${height}px 0 0 ${width}px; 
border-color: transparent transparent transparent ${color};`;
                break;
            case 'bottom-right':
                styles += `border-width: 0 0 ${height}px ${width}px; 
border-color: transparent transparent ${color} transparent;`;
                break;
        }

        setCss(styles);
    }, [direction, color, width, height]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faPlay} className="text-3xl -rotate-90" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Triángulos CSS</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Genera triángulos geométricos puros usando solo bordes CSS. Sin imágenes ni SVGs.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Controls */}
                <div className="lg:col-span-5 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Configuración</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-3">Dirección</label>
                            <div className="grid grid-cols-4 gap-2">
                                {['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left'].map((dir) => (
                                    <button
                                        key={dir}
                                        onClick={() => setDirection(dir as Direction)}
                                        className={`p-2 rounded-lg border transition-all ${direction === dir
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white border-gray-200 hover:border-gray-300'
                                            }`}
                                        title={dir}
                                    >
                                        <div className={`w-0 h-0 border-4 border-current inline-block transform
                                            ${dir === 'top' ? 'border-l-transparent border-r-transparent border-t-0 border-b-current' : ''}
                                            ${dir === 'bottom' ? 'border-l-transparent border-r-transparent border-b-0 border-t-current' : ''}
                                            ${dir === 'left' ? 'border-t-transparent border-b-transparent border-l-0 border-r-current' : ''}
                                            ${dir === 'right' ? 'border-t-transparent border-b-transparent border-r-0 border-l-current' : ''}
                                            ${dir === 'top-left' ? 'border-r-transparent border-b-transparent border-l-current border-t-current' : ''}
                                            ${dir === 'top-right' ? 'border-l-transparent border-b-transparent border-r-current border-t-current' : ''}
                                            ${dir === 'bottom-left' ? 'border-r-transparent border-t-transparent border-l-current border-b-current' : ''}
                                            ${dir === 'bottom-right' ? 'border-l-transparent border-t-transparent border-r-current border-b-current' : ''}
                                        `}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Ancho</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{width}px</span>
                            </div>
                            <input
                                type="range" min="0" max="500"
                                value={width} onChange={(e) => setWidth(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Alto</label>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">{height}px</span>
                            </div>
                            <input
                                type="range" min="0" max="500"
                                value={height} onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Color</label>
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
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-12 min-h-[400px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <div
                            style={{
                                width: 0,
                                height: 0,
                                borderStyle: 'solid',
                                borderWidth: css.match(/border-width: ([^;]+);/)?.[1] || '',
                                borderColor: css.match(/border-color: ([^;]+);/)?.[1] || '',
                            }}
                        />
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
