'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faCopy,
    faTrash,
    faEraser,
    faCompressArrowsAlt,
    faIndent,
    faStream,
    faArrowRight,
    faCheck,
    faCode,
    faAlignLeft
} from '@fortawesome/free-solid-svg-icons';

export default function SpaceRemoverClient() {
    const [text, setText] = useState('');
    const [lastAction, setLastAction] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const stats = {
        chars: text.length,
        spaces: (text.match(/\s/g) || []).length,
        lines: text.split(/\n/).length
    };

    const handleAction = (action: () => string, actionName: string) => {
        const newText = action();
        setText(newText);
        setLastAction(actionName);
        setTimeout(() => setLastAction(null), 3000);
    };

    const actions = [
        {
            label: 'Eliminar Espacios Extra',
            description: 'Reduce múltiples espacios a uno solo',
            icon: faCompressArrowsAlt,
            action: () => text.replace(/[ \t]+/g, ' ').trim()
        },
        {
            label: 'Eliminar Todos los Espacios',
            description: 'Elimina absolutamente todos los espacios',
            icon: faEraser,
            action: () => text.replace(/\s/g, '')
        },
        {
            label: 'Eliminar Saltos de Línea',
            description: 'Convierte el texto en una sola línea',
            icon: faStream,
            action: () => text.replace(/[\r\n]+/g, ' ').trim()
        },
        {
            label: 'Eliminar Líneas Vacías',
            description: 'Quita las líneas que no tienen contenido',
            icon: faAlignLeft,
            action: () => text.split('\n').filter(line => line.trim() !== '').join('\n')
        },
        {
            label: 'Eliminar Tabulaciones',
            description: 'Reemplaza tabs por un espacio simple',
            icon: faIndent,
            action: () => text.replace(/\t/g, ' ')
        },
        {
            label: 'Trim (Recortar)',
            description: 'Limpia espacios al inicio y final de cada línea',
            icon: faCode,
            action: () => text.split('\n').map(l => l.trim()).join('\n')
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faEraser} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Eliminador de Espacios</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Herramienta profesional para limpiar y formatear tu texto. Elimina espacios, saltos de línea y tabulaciones con un solo clic.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Editor Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:border-primary/30 transition-all duration-300">
                        {/* Toolbar */}
                        <div className="bg-gray-50/50 p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                            <div className="flex gap-4 text-sm font-medium text-text/60">
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faAlignLeft} className="text-primary" />
                                    {stats.lines} Líneas
                                </span>
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCode} className="text-primary" />
                                    {stats.chars} Caracteres
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setText('')}
                                    className="p-2 text-text/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Borrar todo"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${copied
                                            ? 'bg-green-500 text-white shadow-green-200'
                                            : 'bg-primary text-white hover:bg-secondary shadow-primary/20'
                                        } shadow-lg`}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>

                        {/* Text Area */}
                        <div className="relative group">
                            <textarea
                                ref={textAreaRef}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-[500px] p-6 bg-white resize-none border-0 focus:ring-0 text-base leading-relaxed font-mono placeholder:text-text/20"
                                placeholder="Pega tu texto aquí para comenzar a limpiar..."
                                spellCheck={false}
                            />
                            {/* Focus Ring Animation */}
                            <div className="absolute inset-0 border-2 border-transparent group-focus-within:border-primary/10 pointer-events-none rounded-b-2xl transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faStream} className="text-primary" />
                            Opciones de Limpieza
                        </h3>
                        <div className="space-y-3">
                            {actions.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAction(item.action, item.label)}
                                    className="w-full group relative flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
                                >
                                    <div className="mt-1 p-2 bg-primary/5 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={item.icon} className="text-sm" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-text flex items-center justify-between">
                                            {item.label}
                                            {lastAction === item.label && (
                                                <span className="text-xs text-green-500 font-bold animate-pulse">
                                                    Hecho!
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-text/60 mt-1 line-clamp-2">
                                            {item.description}
                                        </div>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary/30"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-gradient-to-br from-primary/90 to-secondary p-6 rounded-2xl text-white shadow-lg">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <FontAwesomeIcon icon={faCheck} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Consejo Pro</h4>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    Utiliza "Eliminar Espacios Extra" para limpiar textos copiados de PDFs o webs que suelen tener formato inconsistente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
