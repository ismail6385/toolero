'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faCopy,
    faCheckCircle,
    faGlobe,
    faShareAlt,
    faLayerGroup,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function MetaTagGenerator() {
    // Basic SEO
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [author, setAuthor] = useState('');
    const [robots, setRobots] = useState('index, follow');

    // Open Graph (Facebook/LinkedIn)
    const [ogTitle, setOgTitle] = useState('');
    const [ogDescription, setOgDescription] = useState('');
    const [ogImage, setOgImage] = useState('');
    const [ogUrl, setOgUrl] = useState('');
    const [ogType, setOgType] = useState('website');

    // Twitter Card
    const [twitterCard, setTwitterCard] = useState('summary_large_image');
    const [twitterSite, setTwitterSite] = useState('');

    // UI States
    const [activeTab, setActiveTab] = useState<'basic' | 'opengraph' | 'twitter'>('basic');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        let code = `<!-- Basic Meta Tags -->\n`;
        code += `<title>${title || 'Título de la Página'}</title>\n`;
        code += `<meta name="description" content="${description}">\n`;
        if (keywords) code += `<meta name="keywords" content="${keywords}">\n`;
        if (author) code += `<meta name="author" content="${author}">\n`;
        code += `<meta name="robots" content="${robots}">\n`;
        code += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
        code += `<meta charset="UTF-8">\n\n`;

        code += `<!-- Open Graph / Facebook -->\n`;
        code += `<meta property="og:type" content="${ogType}">\n`;
        code += `<meta property="og:url" content="${ogUrl}">\n`;
        code += `<meta property="og:title" content="${ogTitle || title}">\n`;
        code += `<meta property="og:description" content="${ogDescription || description}">\n`;
        if (ogImage) code += `<meta property="og:image" content="${ogImage}">\n`;
        code += `\n`;

        code += `<!-- Twitter -->\n`;
        code += `<meta property="twitter:card" content="${twitterCard}">\n`;
        code += `<meta property="twitter:url" content="${ogUrl}">\n`;
        code += `<meta property="twitter:title" content="${ogTitle || title}">\n`;
        code += `<meta property="twitter:description" content="${ogDescription || description}">\n`;
        if (ogImage) code += `<meta property="twitter:image" content="${ogImage}">\n`;
        if (twitterSite) code += `<meta name="twitter:site" content="${twitterSite}">\n`;

        return code;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    Meta Tags
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Generador de Meta Tags</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea etiquetas meta perfectas para SEO y redes sociales.
                    Mejora tu visibilidad en Google, Facebook y Twitter.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Inputs Column */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'basic' ? 'border-primary text-primary' : 'border-transparent text-text/60 hover:text-text'}`}
                        >
                            <FontAwesomeIcon icon={faGlobe} /> SEO Básico
                        </button>
                        <button
                            onClick={() => setActiveTab('opengraph')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'opengraph' ? 'border-[#1877F2] text-[#1877F2]' : 'border-transparent text-text/60 hover:text-text'}`}
                        >
                            <FontAwesomeIcon icon={faFacebook} /> Open Graph
                        </button>
                        <button
                            onClick={() => setActiveTab('twitter')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === 'twitter' ? 'border-[#1DA1F2] text-[#1DA1F2]' : 'border-transparent text-text/60 hover:text-text'}`}
                        >
                            <FontAwesomeIcon icon={faTwitter} /> Twitter Card
                        </button>
                    </div>

                    <div className="p-6 md:p-8 flex-1">
                        {/* Basic SEO Form */}
                        {activeTab === 'basic' && (
                            <div className="space-y-4 animate-fadeIn">
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">Título del Sitio</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder="Ej: Toolero - Herramientas Gratis"
                                    />
                                    <p className="text-xs text-text/50 mt-1">{title.length} caracteres (Recomendado: 50-60)</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">Descripción</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text resize-none"
                                        placeholder="Breve descripción de tu sitio web..."
                                    />
                                    <p className="text-xs text-text/50 mt-1">{description.length} caracteres (Recomendado: 150-160)</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">Palabras Clave (Separadas por comas)</label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder="Ej: seo, herramientas, generador"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-text mb-1 block">Autor</label>
                                        <input
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                            placeholder="Tu Nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-text mb-1 block">Robots</label>
                                        <select
                                            value={robots}
                                            onChange={(e) => setRobots(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text bg-white"
                                        >
                                            <option value="index, follow">index, follow</option>
                                            <option value="noindex, follow">noindex, follow</option>
                                            <option value="index, nofollow">index, nofollow</option>
                                            <option value="noindex, nofollow">noindex, nofollow</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Open Graph Form */}
                        {activeTab === 'opengraph' && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="p-4 bg-blue-50 rounded-xl mb-4 text-sm text-blue-800 border border-blue-100">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    Estos datos controlan cómo se ve tu enlace en Facebook, LinkedIn y WhatsApp.
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">OG Title (Opcional)</label>
                                    <input
                                        type="text"
                                        value={ogTitle}
                                        onChange={(e) => setOgTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder={`Usa "${title}" si se deja vacío`}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">OG URL</label>
                                    <input
                                        type="text"
                                        value={ogUrl}
                                        onChange={(e) => setOgUrl(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder="https://www.tusitio.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">OG Image URL</label>
                                    <input
                                        type="text"
                                        value={ogImage}
                                        onChange={(e) => setOgImage(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder="https://www.tusitio.com/imagen.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">OG Type</label>
                                    <select
                                        value={ogType}
                                        onChange={(e) => setOgType(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text bg-white"
                                    >
                                        <option value="website">Website</option>
                                        <option value="article">Article</option>
                                        <option value="product">Product</option>
                                        <option value="profile">Profile</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Twitter Form */}
                        {activeTab === 'twitter' && (
                            <div className="space-y-4 animate-fadeIn">
                                <div className="p-4 bg-sky-50 rounded-xl mb-4 text-sm text-sky-800 border border-sky-100">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    Configura cómo aparecen tus enlaces en Twitter (X).
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">Twitter Card Type</label>
                                    <select
                                        value={twitterCard}
                                        onChange={(e) => setTwitterCard(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text bg-white"
                                    >
                                        <option value="summary_large_image">Summary Large Image</option>
                                        <option value="summary">Summary</option>
                                        <option value="app">App</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-text mb-1 block">Twitter Site (@username)</label>
                                    <input
                                        type="text"
                                        value={twitterSite}
                                        onChange={(e) => setTwitterSite(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                        placeholder="@miusuario"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Column */}
                <div className="flex flex-col h-full sticky top-8">
                    <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-800 overflow-hidden flex flex-col h-full min-h-[500px]">
                        <div className="bg-[#2d2d2d] px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-gray-200 font-mono text-sm flex items-center gap-2">
                                <FontAwesomeIcon icon={faCode} className="text-primary" />
                                HTML Generated
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-primary text-white hover:bg-white hover:text-primary'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? 'Copiado!' : 'Copiar Código'}
                            </button>
                        </div>
                        <div className="p-6 relative overflow-auto flex-1 group">
                            <pre className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                {generateCode()}
                            </pre>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent h-12 top-[90%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-text mb-6 text-center">Cómo usar estas etiquetas</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <span className="font-bold">1</span>
                        </div>
                        <h4 className="font-semibold mb-2">Genera</h4>
                        <p className="text-sm text-text/60">Rellena los campos del formulario. Las pestañas Open Graph y Twitter son opcionales pero recomendadas.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <span className="font-bold">2</span>
                        </div>
                        <h4 className="font-semibold mb-2">Copia</h4>
                        <p className="text-sm text-text/60">Pulsa el botón "Copiar Código" para obtener el bloque HTML completo y limpio.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                            <span className="font-bold">3</span>
                        </div>
                        <h4 className="font-semibold mb-2">Pega</h4>
                        <p className="text-sm text-text/60">Pega el código dentro de la sección <code>&lt;head&gt;</code> de tu archivo HTML o plantilla.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


