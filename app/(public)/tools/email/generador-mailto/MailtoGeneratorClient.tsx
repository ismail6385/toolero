'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEnvelope, faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default function MailtoGeneratorClient() {
    const [to, setTo] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Construct mailto
        let params: string[] = [];
        if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
        if (bcc) params.push(`bcc=${encodeURIComponent(bcc)}`);
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (body) params.push(`body=${encodeURIComponent(body)}`);

        const queryString = params.length > 0 ? `?${params.join('&')}` : '';
        setResult(`mailto:${to}${queryString}`);
    }, [to, cc, bcc, subject, body]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Generador de Enlaces Mailto</h1>
                    <p className="text-sky-100 text-lg">
                        Crea enlaces de correo inteligentes que pre-rellenan el asunto y el mensaje.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faLink} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Configuración del Enlace</h3>

                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">Destinatario (To)</label>
                            <input
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"
                                placeholder="ejemplo@correo.com"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-1">Copia (CC)</label>
                                <input
                                    value={cc}
                                    onChange={e => setCc(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"
                                    placeholder="jefe@empresa.com"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-1">Copia Oculta (BCC)</label>
                                <input
                                    value={bcc}
                                    onChange={e => setBcc(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"
                                    placeholder="archivo@empresa.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">Asunto (Subject)</label>
                            <input
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 outline-none"
                                placeholder="Consulta sobre producto..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-1">Cuerpo del Mensaje (Body)</label>
                            <textarea
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 outline-none h-32 resize-none"
                                placeholder="Hola, me gustaría recibir más información sobre..."
                            />
                        </div>
                    </div>
                </div>

                {/* Result */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 sticky top-6">
                        <h3 className="text-blue-900 font-bold mb-4">Tu Enlace Generado</h3>

                        <div className="bg-white p-4 rounded-xl border border-blue-200 break-all font-mono text-sm text-gray-600 mb-6 max-h-40 overflow-y-auto">
                            {result}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCopy : faCopy} />
                                {copied ? '¡Copiado!' : 'Copiar URL'}
                            </button>
                            <a
                                href={result}
                                className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                Probar Enlace
                            </a>
                        </div>

                        {/* HTML Snippet */}
                        <div className="mt-8 pt-6 border-t border-blue-200">
                            <h4 className="text-sm font-bold text-blue-800 mb-2">Código HTML para tu web:</h4>
                            <div className="bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                                &lt;a href="{result}"&gt;Enviar Email&lt;/a&gt;
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
