'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function MetaTagsClient() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [viewport, setViewport] = useState('width=device-width, initial-scale=1');
    const [charset, setCharset] = useState('UTF-8');
    const [robots, setRobots] = useState('index, follow');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        let code = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">\n`;

        if (viewport) code += `<meta name="viewport" content="${viewport}">\n`;
        if (charset) code += `<meta charset="${charset}">\n`;
        if (robots) code += `<meta name="robots" content="${robots}">`;

        return code;
    };

    const code = generateCode();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faCode} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Meta Tags SEO</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Genera las etiquetas HTML meta esenciales para mejorar el SEO de tu sitio web.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Título del Sitio (Title)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Mi Increíble Sitio Web"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-text/40 mt-1">Recomendado: 50-60 caracteres. Actual: {title.length}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Descripción (Description)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ej: Una breve descripción de lo que hace tu sitio..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-32 resize-none"
                        />
                        <p className="text-xs text-text/40 mt-1">Recomendado: 150-160 caracteres. Actual: {description.length}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Palabras Clave (Keywords)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Ej: seo, herramientas, web, gratis (separadas por coma)"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-text mb-2">Autor</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-text mb-2">Robots</label>
                            <select
                                value={robots}
                                onChange={(e) => setRobots(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            >
                                <option value="index, follow">index, follow</option>
                                <option value="noindex, follow">noindex, follow</option>
                                <option value="index, nofollow">index, nofollow</option>
                                <option value="noindex, nofollow">noindex, nofollow</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* code */}
                <div className="relative">
                    <div className="sticky top-8">
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                                <span className="text-xs font-mono text-gray-400">head.html</span>
                                <button
                                    onClick={copyToClipboard}
                                    className={`text-xs px-2 py-1 rounded transition-colors flex items-center gap-2 font-bold ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
                                    {code}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
