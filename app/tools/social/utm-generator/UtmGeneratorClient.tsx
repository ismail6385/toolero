'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faLink, faCopy, faCheckCircle, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function UtmGeneratorClient() {
    const [url, setUrl] = useState('');
    const [source, setSource] = useState('');
    const [medium, setMedium] = useState('');
    const [campaign, setCampaign] = useState('');
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');

    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!url) {
            setResult('');
            return;
        }

        try {
            const baseUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
            const params = new URLSearchParams(baseUrl.search);

            if (source) params.set('utm_source', source);
            if (medium) params.set('utm_medium', medium);
            if (campaign) params.set('utm_campaign', campaign);
            if (term) params.set('utm_term', term);
            if (content) params.set('utm_content', content);

            // Reconstruct logic to ensure clean URL
            // baseUrl.toString will encode tracking params properly
            // But we modified standard URLSearchParams, need to re-attach

            // Simpler:
            const final = `${baseUrl.origin}${baseUrl.pathname}?${params.toString()}`;
            setResult(final);
        } catch (e) {
            setResult(''); // Invalid URL
        }
    }, [url, source, medium, campaign, term, content]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faBullhorn} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de UTM</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Añade parámetros de seguimiento a tus enlaces para Google Analytics.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-text/50 uppercase mb-2">URL del Sitio Web *</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="https://ejemplo.com"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faGlobe} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-text/50 uppercase mb-2">Fuente (Source) *</label>
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="google, newsletter"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text/50 uppercase mb-2">Medio (Medium) *</label>
                            <input
                                type="text"
                                value={medium}
                                onChange={(e) => setMedium(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="cpc, banner, email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-text/50 uppercase mb-2">Nombre Campaña (Name)</label>
                        <input
                            type="text"
                            value={campaign}
                            onChange={(e) => setCampaign(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                            placeholder="oferta_verano"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-text/50 uppercase mb-2">Término (Term)</label>
                            <input
                                type="text"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="running+shoes"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text/50 uppercase mb-2">Contenido (Content)</label>
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="cta_top"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-gray-900 rounded-3xl p-8 shadow-xl flex-1 flex flex-col justify-center">
                        <label className="block text-xs font-bold text-white/50 uppercase mb-4 text-center">URL Generada</label>

                        {result ? (
                            <div className="break-all font-mono text-indigo-300 bg-white/5 p-4 rounded-xl mb-6 text-sm leading-relaxed">
                                {result}
                            </div>
                        ) : (
                            <div className="text-white/20 text-center italic mb-6">
                                Completa los campos para generar tu URL...
                            </div>
                        )}

                        <button
                            onClick={copyToClipboard}
                            disabled={!result}
                            className={`w-full py-4 font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${result ? 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-[1.02]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                            {copied ? '¡Copiado!' : 'Copiar URL'}
                        </button>
                    </div>

                    <div className="mt-6 bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
                        <strong>Tip:</strong> Usa parámetros consistentes (todo minúsculas) para mantener tus datos de Analytics limpios.
                    </div>
                </div>
            </div>
        </div>
    );
}
