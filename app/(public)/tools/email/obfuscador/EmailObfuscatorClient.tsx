'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faCode, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function EmailObfuscatorClient() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [method, setMethod] = useState<'decimal' | 'hex'>('decimal');
    const [copied, setCopied] = useState(false);

    const obfuscate = () => {
        if (!email) {
            setResult('');
            return;
        }

        let encoded = '';
        for (let i = 0; i < email.length; i++) {
            if (method === 'decimal') {
                encoded += `&#${email.charCodeAt(i)};`;
            } else {
                encoded += `&#x${email.charCodeAt(i).toString(16)};`;
            }
        }

        // Wrap in a simple mailto link structure or just the entities?
        // Let's provide the anchor tag version as it's most useful.
        setResult(`<a href="mailto:${encoded}">${encoded}</a>`);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Obfuscador de Email Anti-Spam</h1>
                    <p className="text-emerald-100 text-lg">
                        Oculta tu dirección de correo a los bots rastreadores (scrapers) usando entidades HTML.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <label className="text-sm font-bold text-gray-700 block mb-1">Tu Email</label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:border-emerald-500 outline-none font-medium"
                            placeholder="ejemplo@dominio.com"
                        />

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setMethod('decimal')}
                                className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${method === 'decimal' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'}`}
                            >
                                Decimal (&#64;)
                            </button>
                            <button
                                onClick={() => setMethod('hex')}
                                className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${method === 'hex' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'}`}
                            >
                                Hexadecimal (&#x40;)
                            </button>
                        </div>

                        <button
                            onClick={obfuscate}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200"
                        >
                            <FontAwesomeIcon icon={faCode} className="mr-2" />
                            Generar Código Seguro
                        </button>
                    </div>
                </div>

                {/* Result */}
                <div className="space-y-6">
                    {result && (
                        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 animate-fade-in-up">
                            <h3 className="text-emerald-900 font-bold mb-4">Código Protegido</h3>

                            <div className="bg-white p-4 rounded-xl border border-emerald-200 font-mono text-xs text-gray-600 mb-6 break-all max-h-60 overflow-y-auto leading-relaxed">
                                {result}
                            </div>

                            <button
                                onClick={copyToClipboard}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? '¡Copiado!' : 'Copiar HTML'}
                            </button>

                            <div className="mt-6 text-center">
                                <span className="text-xs font-bold text-emerald-800 uppercase mb-2 block">Cómo se ve en el navegador:</span>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg inline-block shadow-sm">
                                    <span dangerouslySetInnerHTML={{ __html: result }}></span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    El usuario ve el email normal, pero el código fuente es ilegible para bots simples.
                                </p>
                            </div>
                        </div>
                    )}
                    {!result && (
                        <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center text-gray-400 p-12 text-center">
                            Ingresa un email para ver el resultado
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
