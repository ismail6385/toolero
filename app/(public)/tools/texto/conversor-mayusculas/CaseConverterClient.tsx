'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeading,
    faFont,
    faTextHeight,
    faRandom,
    faCopy,
    faTrash,
    faCheck,
    faDownload,
    faHistory,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function CaseConverterClient() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);
    const [lastAction, setLastAction] = useState<string | null>(null);

    const transformers = [
        {
            id: 'upper',
            label: 'MAYÚSCULAS',
            desc: 'Convierte todo el texto a mayúsculas.',
            action: (t: string) => t.toUpperCase(),
            preview: 'TEXTO'
        },
        {
            id: 'lower',
            label: 'minúsculas',
            desc: 'Convierte todo el texto a minúsculas.',
            action: (t: string) => t.toLowerCase(),
            preview: 'texto'
        },
        {
            id: 'sentence',
            label: 'Formato oración',
            desc: 'Mayúscula al inicio de cada frase.',
            action: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()),
            preview: 'Texto ejemplo.'
        },
        {
            id: 'title',
            label: 'Formato Título',
            desc: 'Mayúscula en la Primera Letra de Cada Palabra.',
            action: (t: string) => t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            preview: 'Texto De Ejemplo'
        },
        {
            id: 'alternating',
            label: 'aLtErNaDo',
            desc: 'Alterna entre mayúsculas y minúsculas.',
            action: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
            preview: 'tExTo'
        },
        {
            id: 'inverse',
            label: 'Inverso',
            desc: 'Invierte mayúsculas y minúsculas.',
            action: (t: string) => t.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
            preview: 'tEXTO'
        }
    ];

    const handleTransform = (transformer: typeof transformers[0]) => {
        setText(transformer.action(text));
        setLastAction(transformer.id);
        setTimeout(() => setLastAction(null), 2000);
    };

    const copyToClipboard = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadText = () => {
        if (!text) return;
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "texto_convertido.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faHeading} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Conversor de Mayúsculas y Minúsculas</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma tu texto fácilmente: cambia a mayúsculas, minúsculas, capitaliza títulos y más con un solo clic.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Editor Area (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center px-2">
                        <div className="flex gap-4 text-sm font-semibold text-text/60">
                            <span>{text.length} Caracteres</span>
                            <span>{text.trim() ? text.trim().split(/\s+/).length : 0} Palabras</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-white hover:bg-secondary'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                            <button
                                onClick={() => setText('')}
                                className="p-2 text-text/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Borrar todo"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all min-h-[500px]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-full p-8 border-0 resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-text/20 font-sans"
                            placeholder="Escribe o pega tu texto aquí para convertirlo..."
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Sidebar Controls (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faTextHeight} className="text-primary" />
                            Opciones de Conversión
                        </h3>
                        <div className="grid gap-3">
                            {transformers.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleTransform(item)}
                                    className={`
                                        group w-full text-left p-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md
                                        ${lastAction === item.id
                                            ? 'bg-primary text-white border-primary shadow-lg ring-2 ring-primary/20'
                                            : 'bg-white border-gray-100 hover:border-primary/50 text-text'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                        {lastAction === item.id && <FontAwesomeIcon icon={faCheck} />}
                                    </div>
                                    <div className={`text-xs ${lastAction === item.id ? 'text-white/80' : 'text-text/50'}`}>
                                        Ej: {item.preview}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                        <button
                            onClick={downloadText}
                            disabled={!text}
                            className="w-full py-3 bg-white border border-gray-300 text-text font-semibold rounded-xl hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            Descargar Texto (.txt)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
