'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPhone, faLink, faCopy, faCheckCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export default function LinkWhatsappClient() {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        if (!phone) return;

        // Clean phone number: remove +, space, -, (, )
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const encodedMessage = encodeURIComponent(message);

        const link = `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4 text-green-600">
                    <FontAwesomeIcon icon={faCommentDots} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Links de WhatsApp</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea enlaces directos para chatear en WhatsApp sin guardar el número.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Número de Teléfono (con código de país)</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 outline-none"
                                placeholder="Ej: 34600123456"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                        </div>
                        <p className="text-xs text-text/40 mt-1">No incluyas el símbolo + ni guiones.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Mensaje (Opcional)</label>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 outline-none"
                            placeholder="Ej: Hola, quiero más información."
                        />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <button
                        onClick={generateLink}
                        disabled={!phone}
                        className={`px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-green-600 transition-all ${!phone ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                        <FontAwesomeIcon icon={faLink} className="mr-2" /> Generar Link
                    </button>
                </div>

                {generatedLink && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 animate-fade-in-up">
                        <label className="block text-xs font-bold text-text/50 uppercase mb-2 text-center">Tu Enlace Generado</label>
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <input
                                type="text"
                                readOnly
                                value={generatedLink}
                                className="flex-1 w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-green-700 font-medium outline-none text-sm"
                            />
                            <div className="flex gap-2 w-full md:w-auto">
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                                <a
                                    href={generatedLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 md:flex-none px-6 py-3 bg-green-100 text-green-700 hover:bg-green-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Probar
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
