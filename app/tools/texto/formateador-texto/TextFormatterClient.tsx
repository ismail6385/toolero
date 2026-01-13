'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAlignLeft,
    faCode,
    faHeading,
    faArrowRight,
    faCheck,
    faCopy,
    faTrash,
    faQuoteRight,
    faKeyboard,
    faEraser,
    faTextHeight,
    faMagic
} from '@fortawesome/free-solid-svg-icons';

export default function TextFormatterClient() {
    const [text, setText] = useState('');
    const [formattedText, setFormattedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [lastAction, setLastAction] = useState<string | null>(null);

    const formatters = [
        {
            id: 'strip-html',
            label: 'Eliminar HTML',
            description: 'Elimina todas las etiquetas HTML y deja solo el texto.',
            icon: faCode,
            action: (t: string) => t.replace(/<[^>]*>/g, '')
        },
        {
            id: 'fix-punctuation',
            label: 'Arreglar Puntuación',
            description: 'Añade espacios después de puntos y comas.',
            icon: faMagic,
            action: (t: string) => t.replace(/([.,;?!])(?=[^\s])/g, '$1 ')
        },
        {
            id: 'sentences-to-lines',
            label: 'Frases a Líneas',
            description: 'Coloca cada frase en una nueva línea.',
            icon: faQuoteRight,
            action: (t: string) => t.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n')
        },
        {
            id: 'lines-to-sentence',
            label: 'Líneas a Texto',
            description: 'Une todas las líneas en un solo párrafo.',
            icon: faAlignLeft,
            action: (t: string) => t.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
        },
        {
            id: 'normalize-space',
            label: 'Normalizar Espacios',
            description: 'Convierte espacios múltiples y tabs en un espacio simple.',
            icon: faTextHeight,
            action: (t: string) => t.replace(/\s+/g, ' ').trim()
        },
        {
            id: 'remove-numbers',
            label: 'Eliminar Números',
            description: 'Borra todos los dígitos del texto.',
            icon: faEraser,
            action: (t: string) => t.replace(/[0-9]/g, '')
        },
        {
            id: 'remove-punctuation',
            label: 'Eliminar Puntuación',
            description: 'Borra puntos, comas y otros signos.',
            icon: faKeyboard,
            action: (t: string) => t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        },
        {
            id: 'title-case',
            label: 'Formato Título',
            description: 'Capitaliza la Primera Letra De Cada Palabra.',
            icon: faHeading,
            action: (t: string) => t.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        }
    ];

    const handleFormat = (formatter: typeof formatters[0]) => {
        const result = formatter.action(text);
        setFormattedText(result);
        setLastAction(formatter.id);
    };

    const copyToClipboard = () => {
        if (!formattedText) return;
        navigator.clipboard.writeText(formattedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faAlignLeft} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Formateador de Texto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Limpia, estructura y da formato a tus textos automáticamente. Ideal para limpiar contenido web, documentos y listas.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Formatting Options */}
                <div className="space-y-4 lg:order-2">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
                        <h3 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faMagic} className="text-primary" />
                            Acciones Rápidas
                        </h3>
                        <div className="grid gap-3">
                            {formatters.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleFormat(item)}
                                    className={`
                                        group relative p-4 rounded-xl border text-left transition-all duration-200
                                        ${lastAction === item.id
                                            ? 'bg-primary/5 border-primary shadow-sm'
                                            : 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`
                                            w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                            ${lastAction === item.id ? 'bg-primary text-white' : 'bg-gray-50 text-text/60 group-hover:bg-primary/10 group-hover:text-primary'}
                                        `}>
                                            <FontAwesomeIcon icon={item.icon} className="text-sm" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-text/90 text-sm group-hover:text-primary transition-colors">
                                                {item.label}
                                            </div>
                                        </div>
                                        {lastAction === item.id && (
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        )}
                                    </div>
                                    <div className="text-xs text-text/50 mt-2 pl-11">
                                        {item.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Input/Output Areas */}
                <div className="lg:col-span-2 space-y-6 lg:order-1">
                    {/* Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-sm font-semibold text-text/80">Texto Original</label>
                            <button
                                onClick={() => { setText(''); setFormattedText(''); setLastAction(null); }}
                                className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTrash} /> Limpiar Todo
                            </button>
                        </div>
                        <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-64 p-6 border-0 resize-none focus:ring-0 text-base leading-relaxed placeholder:text-text/20 font-sans"
                                placeholder="Pega tu texto aquí para comenzar..."
                            />
                        </div>
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center text-primary/20">
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl rotate-90 lg:rotate-0" />
                    </div>

                    {/* Output */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-sm font-semibold text-text/80">Resultado</label>
                            <button
                                onClick={copyToClipboard}
                                disabled={!formattedText}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                    ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-white hover:bg-secondary disabled:bg-gray-100 disabled:text-gray-400'
                                    }
                                `}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                                {copied ? 'Copiado' : 'Copiar Texto'}
                            </button>
                        </div>
                        <div className="relative group bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                            <textarea
                                readOnly
                                value={formattedText}
                                className="w-full h-64 p-6 bg-gray-50/50 border-0 resize-none focus:ring-0 text-base leading-relaxed text-text/80 font-sans"
                                placeholder="El texto formateado aparecerá aquí..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
