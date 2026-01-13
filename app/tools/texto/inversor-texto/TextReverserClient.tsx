'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExchangeAlt,
    faCopy,
    faTrash,
    faHistory,
    faRandom,
    faCheck,
    faArrowRightArrowLeft,
    faAlignLeft,
    faFont,
    faCode
} from '@fortawesome/free-solid-svg-icons';

export default function TextReverserClient() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [copied, setCopied] = useState(false);
    const [activeMode, setActiveMode] = useState<string | null>(null);

    const handleReverse = (mode: string) => {
        let result = '';
        setActiveMode(mode);

        switch (mode) {
            case 'reverse-text':
                // "Hola Mundo" -> "odnuM aloH"
                result = inputText.split('').reverse().join('');
                break;
            case 'reverse-words':
                // "Hola Mundo" -> "Mundo Hola"
                result = inputText.split(/\s+/).reverse().join(' ');
                break;
            case 'reverse-letters-words':
                // "Hola Mundo" -> "aloH odnuM"
                result = inputText.split(/\s+/).map(word => word.split('').reverse().join('')).join(' ');
                break;
            case 'flip-text':
                // Upside down text mapping
                const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?&";
                const flipped = "ɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z0ƖᄅƐㄣϛ9ㄥ86˙'¡¿⅋";
                result = inputText.split('').map(c => {
                    const index = normal.indexOf(c);
                    return index !== -1 ? flipped[index] : c;
                }).reverse().join('');
                break;
            default:
                result = inputText;
        }
        setOutputText(result);
    };

    const copyToClipboard = () => {
        if (!outputText) return;
        navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const modes = [
        {
            id: 'reverse-text',
            label: 'Invertir Todo',
            description: 'Invierte todo el texto completamente.',
            example: 'Hola → aloH',
            icon: faExchangeAlt
        },
        {
            id: 'reverse-words',
            label: 'Invertir Palabras',
            description: 'Cambia el orden de las palabras.',
            example: 'Hola Mundo → Mundo Hola',
            icon: faRandom
        },
        {
            id: 'reverse-letters-words',
            label: 'Invertir Letras por Palabra',
            description: 'Invierte las letras manteniendo el orden de palabras.',
            example: 'Hola Mundo → aloH odnuM',
            icon: faFont
        },
        {
            id: 'flip-text',
            label: 'Texto al Revés (Flip)',
            description: 'Voltea el texto de cabeza (Upside Down).',
            example: 'Hola → ɐloH',
            icon: faHistory
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Inversor de Texto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Herramienta avanzada para invertir, voltear y transformar el orden de tu texto al instante.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <FontAwesomeIcon icon={faAlignLeft} className="text-primary" />
                            Texto Original
                        </label>
                        <button
                            onClick={() => {
                                setInputText('');
                                setOutputText('');
                                setActiveMode(null);
                            }}
                            className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} /> Limpiar
                        </button>
                    </div>
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-80 p-6 bg-white border-0 resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-text/20"
                            placeholder="Escribe algo aquí..."
                        />
                    </div>
                </div>

                {/* Controls & Output Section */}
                <div className="space-y-6">
                    {/* Transformation Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => handleReverse(mode.id)}
                                disabled={!inputText}
                                className={`
                                    relative p-4 rounded-xl border text-left transition-all duration-200
                                    ${activeMode === mode.id
                                        ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                                        : 'bg-surface text-text border-gray-200 hover:border-primary/50 hover:shadow-md'
                                    }
                                    ${!inputText && 'opacity-50 cursor-not-allowed'}
                                `}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <FontAwesomeIcon icon={mode.icon} className={activeMode === mode.id ? 'text-white' : 'text-primary'} />
                                    {activeMode === mode.id && <FontAwesomeIcon icon={faCheck} className="text-white" />}
                                </div>
                                <div className="font-semibold mb-1">{mode.label}</div>
                                <div className={`text-xs ${activeMode === mode.id ? 'text-white/80' : 'text-text/50'}`}>
                                    Ej: {mode.example}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Output Area */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCode} className="text-primary" />
                                Resultado
                            </label>
                            {outputText && (
                                <span className="text-xs text-green-600 font-medium animate-fade-in">
                                    ¡Transformación lista!
                                </span>
                            )}
                        </div>
                        <div className="relative group bg-surface rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                            <textarea
                                readOnly
                                value={outputText}
                                className="w-full h-40 p-6 bg-gray-50/50 border-0 resize-none focus:ring-0 text-lg leading-relaxed text-text/80 select-all cursor-text"
                                placeholder="El resultado aparecerá aquí..."
                            />

                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    disabled={!outputText}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all
                                        ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white text-text hover:text-primary hover:shadow-lg'
                                        }
                                        disabled:opacity-0 disabled:pointer-events-none
                                    `}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
