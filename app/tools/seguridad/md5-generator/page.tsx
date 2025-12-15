'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLock,
    faCopy,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

export default function Md5Generator() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateHash = async (algo: 'SHA-1' | 'SHA-256' | 'SHA-512') => {
        if (!input) return;
        setLoading(true);
        try {
            const msgBuffer = new TextEncoder().encode(input);
            const hashBuffer = await crypto.subtle.digest(algo, msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHash(hashHex);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-500/20 bg-gray-500/5 text-gray-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Criptografía
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Generador Hash (SHA)</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera hashes seguros SHA-256, SHA-512 y SHA-1 directamente en tu navegador.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="mb-6">
                    <label className="text-sm font-semibold text-text mb-2 block">Texto a encriptar</label>
                    <textarea
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setHash(''); }}
                        placeholder="Escribe algo aquí..."
                        className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-500 resize-none font-sans"
                    />
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button onClick={() => generateHash('SHA-256')} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-all">
                        SHA-256
                    </button>
                    <button onClick={() => generateHash('SHA-512')} className="px-6 py-2 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-all">
                        SHA-512
                    </button>
                    <button onClick={() => generateHash('SHA-1')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all">
                        SHA-1
                    </button>
                </div>

                {hash && (
                    <div className="animate-fadeIn">
                        <label className="text-xs font-bold text-text/50 uppercase block mb-2">Resultado Hash</label>
                        <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-4">
                            <code className="text-sm font-mono text-text break-all block pr-12">
                                {hash}
                            </code>
                            <button
                                onClick={copyToClipboard}
                                className={`absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-lg text-xs font-bold transition-all ${copied
                                        ? 'text-green-500 bg-green-50'
                                        : 'text-text/40 hover:text-text hover:bg-gray-200'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} className="text-lg" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
