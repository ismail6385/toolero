'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faCopy, faCheck, faImage } from '@fortawesome/free-solid-svg-icons';

export default function OpenGraphClient() {
    const [title, setTitle] = useState('');
    const [siteName, setSiteName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('website');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:site_name" content="${siteName}">`;
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
                    <FontAwesomeIcon icon={faShareAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador Open Graph</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea etiquetas para que tus enlaces luzcan increíbles en Facebook, LinkedIn, Discord y WhatsApp.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Título (og:title)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Curso de React Desde Cero"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Nombre del Sitio (og:site_name)</label>
                        <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            placeholder="Ej: EscuelaDev"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">URL del Sitio (og:url)</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://ejemplo.com/curso-react"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Descripción (og:description)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Una descripción atractiva para aumentar los clics..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">URL de Imagen (og:image)</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-text/40 mt-1">Recomendado: 1200x630 píxeles</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Tipo (og:type)</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        >
                            <option value="website">website</option>
                            <option value="article">article</option>
                            <option value="profile">profile</option>
                            <option value="video.movie">video.movie</option>
                            <option value="music.song">music.song</option>
                        </select>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-8">
                    <div className="bg-gray-100 p-6 rounded-2xl">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Vista Previa (Facebook/Linkedin)</label>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-md mx-auto shadow-sm">
                            <div className="aspect-[1.91/1] bg-gray-200 w-full relative">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/1200x630?text=No+Image')} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-2">
                                        <FontAwesomeIcon icon={faImage} className="text-4xl" />
                                        <span className="text-sm">1200 x 630 px</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-[#f0f2f5] border-t border-gray-200">
                                <p className="text-xs text-gray-500 uppercase truncate mb-0.5">{new URL(url || 'http://example.com').hostname}</p>
                                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{title || 'Título del Enlace'}</h3>
                                <p className="text-xs text-gray-600 line-clamp-1">{description || 'Descripción corta del enlace...'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                                <span className="text-xs font-mono text-gray-400">meta-tags.html</span>
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
