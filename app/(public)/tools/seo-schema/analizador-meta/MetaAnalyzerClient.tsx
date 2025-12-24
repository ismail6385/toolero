'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faGlobe, faCheckCircle, faTimesCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function MetaAnalyzerClient() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const analyze = async () => {
        if (!url) return;
        setLoading(true);
        setError('');
        setResult(null);

        // Note: For client-side only scraping, we're limited by CORS.
        // A real robust tool would use a server-side API proxy.
        // However, for this demo we can try `fetch` if the target supports CORS (unlikely for random sites)
        // OR we can simulate providing a "Paste HTML" option which is reliable client-side.
        // For now, let's offer a "Paste Source Code" option as the primary reliable method, 
        // with a "Try Fetch" button that might struggle.

        // Actually, to make this useful without a backend proxy, we should probably stick to 
        // "Paste your HTML source code" approach for 100% reliability, OR use a public CORS proxy if allowed.
        // Let's go with the "Paste HTML" or "Fetch via server action" if we had one.
        // Given constraints, I will build a lightweight "Fetch" that warns about CORS, 
        // but perhaps focuses on "Analysis of pasted content" as the robust feature.

        // Let's implement a simple "Meta Tag Parser" for pasted HTML content for maximum reliability.
    };

    const analyzeHtml = (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const title = doc.querySelector('title')?.innerText || '';
        const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
        const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
        const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
        const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

        const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
        const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
        const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

        setResult({
            title, description, keywords, robots, viewport, canonical, ogTitle, ogDesc, ogImage
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faSearchPlus} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Analizador de Meta Tags</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Revisa cómo ven los buscadores tu sitio web.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Input Area */}
                <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 h-fit">
                    <h3 className="text-lg font-bold text-text mb-4">Pega tu Código Fuente (HTML)</h3>
                    <p className="text-sm text-text/60 mb-4">
                        Debido a restricciones de seguridad del navegador (CORS), pega el código fuente (`view-source:`) de tu web aquí para analizarlo.
                    </p>
                    <textarea
                        className="w-full h-64 p-4 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none font-mono text-xs resize-none"
                        placeholder="<html><head><title>Mi Web</title>...</head>..."
                        onChange={(e) => analyzeHtml(e.target.value)}
                    ></textarea>
                </div>

                {/* Analysis Results */}
                <div className="space-y-6">
                    {result ? (
                        <>
                            {/* General SEO */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-indigo-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGlobe} /> SEO Básico
                                </h3>

                                <ResultItem label="Meta Title" value={result.title} recommend="50-60 chars" length={result.title.length} />
                                <ResultItem label="Meta Description" value={result.description} recommend="150-160 chars" length={result.description.length} />
                                <ResultItem label="Keywords" value={result.keywords} warn="Obsoleto para Google" />
                                <ResultItem label="Canonical URL" value={result.canonical} />
                            </div>

                            {/* Technical */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-widest">Técnico</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <TechItem label="Viewport (Mobile)" has={!!result.viewport} value={result.viewport} />
                                    <TechItem label="Robots Tag" has={!!result.robots} value={result.robots || 'Index, Follow (Default)'} />
                                </div>
                            </div>

                            {/* Social */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-blue-500 uppercase mb-4 tracking-widest">Open Graph (Social)</h3>
                                <ResultItem label="OG Title" value={result.ogTitle} />
                                <ResultItem label="OG Description" value={result.ogDesc} />
                                <div className="mt-4">
                                    <span className="text-xs font-bold text-text/40 block mb-1">OG Image Preview</span>
                                    {result.ogImage ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                            <img src={result.ogImage} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="bg-red-50 text-red-500 text-xs p-2 rounded">No image found</div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-text/40 italic">
                            Los resultados aparecerán aquí...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const ResultItem = ({ label, value, recommend, length, warn }: any) => (
    <div className="mb-4 last:mb-0 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
        <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-sm text-text">{label}</span>
            {length !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${checkLength(label, length)}`}>
                    {length} chars
                </span>
            )}
        </div>
        {value ? (
            <p className="text-sm text-text/80 break-words">{value}</p>
        ) : (
            <p className="text-sm text-red-400 italic">No encontrado</p>
        )}
        {(recommend || warn) && (
            <div className="flex gap-2 mt-1">
                {recommend && <span className="text-xs text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded">Recom: {recommend}</span>}
                {warn && <span className="text-xs text-orange-400 bg-orange-50 px-2 py-0.5 rounded">{warn}</span>}
            </div>
        )}
    </div>
);

const TechItem = ({ label, has, value }: any) => (
    <div className={`p-3 rounded-xl border ${has ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
        <div className="flex items-center gap-2 mb-1">
            <FontAwesomeIcon icon={has ? faCheckCircle : faTimesCircle} className={has ? 'text-green-500' : 'text-red-500'} />
            <span className="font-bold text-xs text-text">{label}</span>
        </div>
        <p className="text-xs text-text/60 truncate" title={value}>{value}</p>
    </div>
);

const checkLength = (type: string, len: number) => {
    // Basic heuristics
    if (type === 'Meta Title') return len >= 30 && len <= 60 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    if (type === 'Meta Description') return len >= 120 && len <= 160 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
}
