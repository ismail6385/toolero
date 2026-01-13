'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faCopy, faCheck, faImage } from '@fortawesome/free-solid-svg-icons';

export default function TwitterCardClient() {
    const [cardType, setCardType] = useState('summary_large_image');
    const [site, setSite] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        return `<!-- Twitter Card -->
<meta name="twitter:card" content="${cardType}">
<meta name="twitter:site" content="${site}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">`;
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
                    <FontAwesomeIcon icon={faHashtag} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador Twitter Cards</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Optimiza la apariencia de tus tweets con tarjetas ricas en contenido (imágenes grandes o resúmenes).
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Tipo de Tarjeta (twitter:card)</label>
                        <select
                            value={cardType}
                            onChange={(e) => setCardType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        >
                            <option value="summary_large_image">Summary Large Image (Imagen Grande)</option>
                            <option value="summary">Summary (Resumen Pequeño)</option>
                            <option value="app">App</option>
                            <option value="player">Player</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Usuario Twitter del Sitio (twitter:site)</label>
                        <input
                            type="text"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                            placeholder="@tuusuario"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Título (twitter:title)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título impactante"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-text/40 mt-1">Máx 70 caracteres</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Descripción (twitter:description)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Resumen del contenido..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-24 resize-none"
                        />
                        <p className="text-xs text-text/40 mt-1">Máx 200 caracteres</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2">URL de Imagen (twitter:image)</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-8">
                    <div className="bg-gray-100 p-6 rounded-2xl">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Vista Previa Twitter</label>

                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-w-md mx-auto shadow-sm">
                            {/* Card Logic */}
                            {cardType === 'summary_large_image' ? (
                                <>
                                    <div className="aspect-[2/1] bg-gray-200 w-full relative border-b border-gray-100">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x418?text=No+Image')} />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-2">
                                                <FontAwesomeIcon icon={faImage} className="text-4xl" />
                                                <span className="text-sm">Large Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-1">{title || 'Título de la Tarjeta'}</h3>
                                        <p className="text-[15px] text-gray-500 leading-snug">{description || 'Descripción del contenido que aparecerá en el tweet...'}</p>
                                        <p className="text-[15px] text-gray-400 mt-1">{new URL('http://tudominio.com').hostname.toLowerCase()}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex">
                                    <div className="w-32 h-32 bg-gray-200 flex-shrink-0 border-r border-gray-100">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/200x200?text=Image')} />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                <FontAwesomeIcon icon={faImage} className="text-2xl" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col justify-center">
                                        <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-1 line-clamp-1">{title || 'Título de la Tarjeta'}</h3>
                                        <p className="text-[15px] text-gray-500 leading-snug line-clamp-2">{description || 'Descripción del contenido que aparecerá en el tweet...'}</p>
                                        <p className="text-[15px] text-gray-400 mt-1">{new URL('http://tudominio.com').hostname.toLowerCase()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                                <span className="text-xs font-mono text-gray-400">twitter-card.html</span>
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
