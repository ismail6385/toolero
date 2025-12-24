'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faLink, faExchangeAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function URLEncoder() {
    const [input, setInput] = useState('');
    const [encoded, setEncoded] = useState('');
    const [decoded, setDecoded] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const handleEncode = (text: string) => {
        if (!text) {
            setEncoded('');
            return;
        }
        try {
            setEncoded(encodeURIComponent(text));
        } catch (error) {
            setEncoded('Error al codificar');
        }
    };

    const handleDecode = (text: string) => {
        if (!text) {
            setDecoded('');
            return;
        }
        try {
            setDecoded(decodeURIComponent(text));
        } catch (error) {
            setDecoded('Error al decodificar. Verifica que la URL esté correctamente codificada.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        if (mode === 'encode') {
            handleEncode(value);
        } else {
            handleDecode(value);
        }
    };

    const handleModeChange = (newMode: 'encode' | 'decode') => {
        setMode(newMode);
        if (newMode === 'encode') {
            handleEncode(input);
        } else {
            handleDecode(input);
        }
    };

    const handleCopy = () => {
        const textToCopy = mode === 'encode' ? encoded : decoded;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInput('');
        setEncoded('');
        setDecoded('');
    };

    const result = mode === 'encode' ? encoded : decoded;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faLink} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Codificador/Decodificador URL</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Codifica y decodifica URLs para asegurar que sean válidas y seguras en la web.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => handleModeChange('encode')}
                        className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
                            mode === 'encode'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-background text-text border border-gray-200 hover:border-primary'
                        }`}
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                        Codificar
                    </button>
                    <button
                        onClick={() => handleModeChange('decode')}
                        className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
                            mode === 'decode'
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-background text-text border border-gray-200 hover:border-primary'
                        }`}
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} className="mr-2 rotate-180" />
                        Decodificar
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-text">
                            {mode === 'encode' ? 'Texto/URL a Codificar' : 'URL Codificada a Decodificar'}
                        </label>
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 text-sm text-text/60 hover:text-text transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            Limpiar
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none font-mono text-sm"
                        placeholder={mode === 'encode' ? 'Escribe la URL o texto que deseas codificar...' : 'Pega la URL codificada aquí...'}
                    />
                </div>

                {result && (
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">
                            {mode === 'encode' ? 'URL Codificada:' : 'URL Decodificada:'}
                        </label>
                        <div className="bg-background rounded-xl p-4 border border-gray-200 mb-4">
                            <div className="font-mono text-sm text-text break-all select-all">
                                {result}
                            </div>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado!' : 'Copiar Resultado'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLink} className="text-primary" />
                    Sobre la Codificación URL
                </h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        La <strong>codificación URL</strong> (también conocida como percent-encoding) convierte 
                        caracteres especiales en una representación segura para URLs.
                    </p>
                    <p>
                        <strong>Caracteres codificados comunes:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Espacio → %20</li>
                        <li># → %23</li>
                        <li>$ → %24</li>
                        <li>& → %26</li>
                        <li>+ → %2B</li>
                        <li>= → %3D</li>
                        <li>? → %3F</li>
                    </ul>
                    <p className="mt-3">
                        <strong>Uso común:</strong> Envío de datos en formularios web, parámetros de consulta, 
                        y enlaces con caracteres especiales.
                    </p>
                </div>
            </div>
        </div>
    );
}

