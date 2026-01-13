'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faLock, faBackspace, faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

const KEYS = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
];

export default function VirtualKeyboardClient() {
    const [text, setText] = useState('');
    const [caps, setCaps] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleKey = (key: string) => {
        setText(prev => prev + (caps ? key.toUpperCase() : key));
    };

    const handleBackspace = () => {
        setText(prev => prev.slice(0, -1));
    };

    const handleSpace = () => {
        setText(prev => prev + ' ');
    };

    const handleClear = () => {
        setText('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faKeyboard} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Teclado Virtual Seguro</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Escribe información sensible (contraseñas, pines) usando el ratón para evitar keyloggers.
                </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl shadow-xl border border-gray-100 max-w-3xl mx-auto">
                <div className="relative mb-8">
                    <textarea
                        value={text}
                        readOnly
                        placeholder="Escribe aquí pulsando las teclas..."
                        className="w-full h-32 p-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary text-xl font-mono shadow-inner bg-gray-50"
                    />
                    <button
                        onClick={copyToClipboard}
                        disabled={!text}
                        className={`absolute bottom-4 right-4 text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100 text-gray-700'
                            }`}
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                        {copied ? 'Copiado' : 'Copiar'}
                    </button>
                    {text && (
                        <button onClick={handleClear} className="absolute top-4 right-4 text-xs text-red-500 hover:underline">
                            Borrar todo
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-2 select-none bg-gray-200 p-4 rounded-xl border-b-8 border-gray-300">
                    {KEYS.map((row, idx) => (
                        <div key={idx} className="flex justify-center gap-1 sm:gap-2">
                            {row.map((k) => (
                                <button
                                    key={k}
                                    onClick={() => handleKey(k)}
                                    className="w-8 h-10 sm:w-12 sm:h-14 bg-white rounded shadow-sm hover:bg-gray-50 active:translate-y-0.5 active:shadow-none font-bold text-lg sm:text-xl border-b-4 border-gray-300 text-gray-800 transition-transform"
                                >
                                    {caps ? k.toUpperCase() : k}
                                </button>
                            ))}
                        </div>
                    ))}

                    {/* Bottom Row */}
                    <div className="flex justify-center gap-1 sm:gap-2 mt-2">
                        <button
                            onClick={() => setCaps(!caps)}
                            className={`px-4 sm:px-6 h-10 sm:h-14 rounded shadow-sm font-bold text-sm sm:text-base border-b-4 transition-transform ${caps ? 'bg-primary text-white border-primary-dark translate-y-0.5 border-b-0 mt-[4px]' : 'bg-gray-300 text-gray-700 border-gray-400 hover:bg-gray-400'}`} // Improved Caps visual state
                        >
                            CAPS
                        </button>
                        <button
                            onClick={handleSpace}
                            className="flex-1 max-w-xs h-10 sm:h-14 bg-white rounded shadow-sm hover:bg-gray-50 active:translate-y-0.5 active:shadow-none font-bold text-gray-400 border-b-4 border-gray-300"
                        >
                            SPACE
                        </button>
                        <button
                            onClick={handleBackspace}
                            className="px-4 sm:px-6 h-10 sm:h-14 bg-red-100 text-red-600 rounded shadow-sm hover:bg-red-200 active:translate-y-0.5 active:shadow-none font-bold border-b-4 border-red-200"
                        >
                            <FontAwesomeIcon icon={faBackspace} />
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500 bg-blue-50 p-4 rounded-xl flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faLock} className="text-blue-500" />
                    Tus pulsaciones no son enviadas a ningún servidor. Todo ocurre en tu navegador.
                </div>
            </div>
        </div>
    );
}
