'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faLock,
    faUnlock,
    faCopy,
    faTrash,
    faExchangeAlt,
    faFileCode,
    faCheck,
    faExclamationCircle,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function Base64Client() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        handleTransform();
    }, [input, mode]);

    const handleTransform = () => {
        setError(null);
        if (!input) {
            setOutput('');
            return;
        }

        try {
            if (mode === 'encode') {
                // Encode UTF-8 strings correctly
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                // Decode UTF-8 strings correctly
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch (err) {
            if (mode === 'decode') {
                setError('El texto ingresado no es una cadena Base64 válida.');
                setOutput(''); // Clear output on error
            } else {
                setError('Error al procesar el texto.');
            }
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swapMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output); // Swap input/output for quick reverse
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faCode} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Codificador / Decodificador Base64</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Convierte texto a formato Base64 y viceversa de forma segura. Ideal para desarrolladores y transmisión de datos.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center mb-10">
                <div className="bg-surface p-1.5 rounded-2xl border border-gray-200 shadow-sm inline-flex">
                    <button
                        onClick={() => setMode('encode')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${mode === 'encode'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-text/60 hover:text-text hover:bg-gray-50'
                            }`}
                    >
                        <FontAwesomeIcon icon={faLock} />
                        Codificar
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${mode === 'decode'
                                ? 'bg-primary text-white shadow-md'
                                : 'text-text/60 hover:text-text hover:bg-gray-50'
                            }`}
                    >
                        <FontAwesomeIcon icon={faUnlock} />
                        Decodificar
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                {/* Input Column */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-text/60 font-bold border border-gray-200">1</span>
                            {mode === 'encode' ? 'Texto Plano' : 'Cadena Base64'}
                        </label>
                        <button
                            onClick={() => setInput('')}
                            className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} /> Limpiar
                        </button>
                    </div>

                    <div className="flex-1 bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-full min-h-[300px] p-6 bg-white border-0 resize-none focus:ring-0 text-base font-mono leading-relaxed placeholder:text-text/20"
                            placeholder={mode === 'encode' ? "Escribe o pega tu texto aquí..." : "Pega tu cadena Base64 aquí (ej: SG9s8Q==)..."}
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Middle Action (Mobile only usually, but here decorative or functional swap) */}
                <div className="lg:hidden flex justify-center -my-4 z-10">
                    <button onClick={swapMode} className="bg-surface border border-gray-200 p-3 rounded-full shadow-lg text-primary hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faExchangeAlt} className="rotate-90" />
                    </button>
                </div>

                {/* Output Column */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold border border-primary/20">2</span>
                            Resultado
                        </label>
                        <button
                            onClick={swapMode}
                            className="hidden lg:flex text-xs text-primary hover:text-secondary items-center gap-1 transition-colors font-medium"
                            title="Usar resultado como entrada"
                        >
                            <FontAwesomeIcon icon={faExchangeAlt} /> Intercambiar
                        </button>
                    </div>

                    <div className={`
                        flex-1 relative group bg-surface rounded-2xl shadow-lg border overflow-hidden transition-all
                        ${error ? 'border-red-200 bg-red-50/10' : 'border-gray-200'}
                    `}>
                        {error ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-6 text-center">
                                <FontAwesomeIcon icon={faExclamationCircle} className="text-4xl mb-3 opacity-50" />
                                <p className="font-semibold">{error}</p>
                            </div>
                        ) : (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full min-h-[300px] p-6 bg-gray-50/50 border-0 resize-none focus:ring-0 text-base font-mono leading-relaxed text-text/80 select-all"
                                placeholder="El resultado aparecerá automáticamente aquí..."
                            />
                        )}

                        {/* Actions Overlay */}
                        {!error && output && (
                            <div className="absolute top-4 right-4 animate-fade-in">
                                <button
                                    onClick={copyToClipboard}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all
                                        ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white text-text hover:text-primary hover:shadow-lg'
                                        }
                                    `}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
                <InfoCard
                    title="¿Qué es Base64?"
                    text="Es un sistema de numeración posicional que usa 64 caracteres imprimibles para representar datos binarios."
                    icon={faFileCode}
                />
                <InfoCard
                    title="Codificación Segura"
                    text="Utilizamos funciones nativas del navegador para garantizar que caracteres especiales y UTF-8 (emojis, acentos) se procesen correctamente."
                    icon={faLock}
                />
                <InfoCard
                    title="Privacidad Total"
                    text="Todo el procesamiento se realiza en tu dispositivo. Ningún dato se envía a nuestros servidores."
                    icon={faCheck}
                />
            </div>
        </div>
    );
}

function InfoCard({ title, text, icon }: { title: string, text: string, icon: any }) {
    return (
        <div className="bg-surface p-6 rounded-2xl border border-gray-100/50 hover:border-gray-200 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h3 className="font-bold text-text mb-2">{title}</h3>
            <p className="text-sm text-text/60 leading-relaxed">{text}</p>
        </div>
    )
}
