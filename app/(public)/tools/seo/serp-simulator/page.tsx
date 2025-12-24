'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDesktop,
    faMobileAlt,
    faCheckCircle,
    faExclamationCircle,
    faInfoCircle,
    faSearch,
    faStar
} from '@fortawesome/free-solid-svg-icons';

export default function SerpSimulator() {
    const [title, setTitle] = useState('Título de tu Página Web | Ejemplo SEO');
    const [description, setDescription] = useState('Esta es la meta descripción que aparecerá en los resultados de búsqueda de Google. Debe ser atractiva y contener las palabras clave principales para mejorar el CTR.');
    const [url, setUrl] = useState('www.ejemplo.com/categoria/pagina-seo');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
    const [showDate, setShowDate] = useState(true);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState('4.8');
    const [votes, setVotes] = useState('125');

    // approximate pixel widths
    const [titleWidth, setTitleWidth] = useState(0);
    const [descWidth, setDescWidth] = useState(0);

    useEffect(() => {
        // Simple approximation: average char width roughly varies, but we can stick to char count for now
        // or improved estimation logic. Google uses pixels, usually ~600px for title.
        // Let's use a canvas approach for better estimation if possible, or just char length heuristics.
        // For this tool, we will use a multiplier. Aerial is narrow, W is wide.
        const calculateWidth = (text: string, font: string) => {
            if (typeof window === 'undefined') return 0;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) return 0;
            context.font = font;
            return context.measureText(text).width;
        };

        setTitleWidth(calculateWidth(title, '20px Arial')); // Google title roughly 20px
        setDescWidth(calculateWidth(description, '14px Arial')); // Google desc roughly 14px
    }, [title, description]);

    const titleMaxLength = 600; // pixels
    const descMaxLength = 960; // pixels (approx for desktop) / mobile is different but let's stick to standard advice.

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    SEO Visualizer
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Simulador SERP Google</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Visualiza cómo aparecerá tu sitio web en los resultados de búsqueda.
                    Optimiza tus títulos y descripciones para maximizar tu CTR.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor Column */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm">1</span>
                        Editar Contenido
                    </h2>

                    <div className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold text-text">Título SEO</label>
                                <span className={`text-xs font-mono px-2 py-0.5 rounded ${titleWidth > titleMaxLength ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {Math.round(titleWidth)}px / {titleMaxLength}px
                                </span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                placeholder="Escribe tu título aquí..."
                            />
                            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${titleWidth > titleMaxLength ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${Math.min((titleWidth / titleMaxLength) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold text-text">Meta Descripción</label>
                                <span className={`text-xs font-mono px-2 py-0.5 rounded ${descWidth > descMaxLength ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {Math.round(descWidth)}px / {descMaxLength}px
                                </span>
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text resize-none"
                                placeholder="Escribe tu descripción aquí..."
                            />
                            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${descWidth > descMaxLength ? 'bg-yellow-500' : 'bg-green-500'}`} // Description being too long isn't as critical as title, just gets truncated
                                    style={{ width: `${Math.min((descWidth / descMaxLength) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        {/* URL Input */}
                        <div>
                            <label className="text-sm font-semibold text-text mb-2 block">URL Visible</label>
                            <div className="flex items-center">
                                <span className="bg-gray-50 border border-r-0 border-gray-200 text-text/50 px-3 py-3 rounded-l-xl text-sm">https://</span>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full px-4 py-3 rounded-r-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-text"
                                />
                            </div>
                        </div>

                        {/* Extras */}
                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-sm font-semibold text-text mb-4">Opciones Avanzadas</h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={showDate}
                                        onChange={(e) => setShowDate(e.target.checked)}
                                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-text/80">Mostrar Fecha</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={showRating}
                                        onChange={(e) => setShowRating(e.target.checked)}
                                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-text/80">Mostrar Estrellas (Rich Snippet)</span>
                                </label>

                                {showRating && (
                                    <div className="flex gap-4 pl-8">
                                        <div>
                                            <label className="text-xs text-text/60 block mb-1">Puntuación (0-5)</label>
                                            <input
                                                type="number"
                                                min="0" max="5" step="0.1"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className="w-20 px-2 py-1 text-sm border border-gray-200 rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-text/60 block mb-1">Votos</label>
                                            <input
                                                type="number"
                                                value={votes}
                                                onChange={(e) => setVotes(e.target.value)}
                                                className="w-20 px-2 py-1 text-sm border border-gray-200 rounded"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Column */}
                <div className="flex flex-col">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary text-sm">2</span>
                                Vista Previa Google
                            </h2>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('desktop')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow text-primary' : 'text-text/50 hover:text-text'}`}
                                >
                                    <FontAwesomeIcon icon={faDesktop} />
                                </button>
                                <button
                                    onClick={() => setViewMode('mobile')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow text-primary' : 'text-text/50 hover:text-text'}`}
                                >
                                    <FontAwesomeIcon icon={faMobileAlt} />
                                </button>
                            </div>
                        </div>

                        {/* Google Result Card */}
                        <div className={`transition-all duration-300 ${viewMode === 'mobile' ? 'w-[375px] max-w-full mx-auto' : 'w-full'}`}>
                            <div className="bg-white p-4 font-arial text-left">
                                {viewMode === 'mobile' && (
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">
                                            <FontAwesomeIcon icon={faSearch} /> {/* Favicon placeholder */}
                                        </div>
                                        <div className="flex flex-col text-xs">
                                            <span className="text-[#202124]">{url.split('/')[0]}</span>
                                            <span className="text-[#5f6368]">{url}</span>
                                        </div>
                                    </div>
                                )}

                                {viewMode === 'desktop' && (
                                    <div className="flex items-center gap-1 text-sm mb-1 text-[#202124]">
                                        <cite className="not-italic text-[#202124]">{url}</cite>
                                        <div className="text-[#5f6368] text-[10px] ml-1">▼</div>
                                    </div>
                                )}

                                <h3 className="text-[#1a0dab] text-xl cursor-pointer hover:underline truncate py-1 font-normal leading-snug">
                                    {title}
                                </h3>

                                <div className="text-[#4d5156] text-sm leading-normal mt-1">
                                    {showRating && (
                                        <div className="flex items-center text-sm text-[#4d5156] mb-0.5">
                                            <div className="flex text-[#f8b500] text-[10px] mr-1">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </div>
                                            <span className="mr-1">Valoración: {rating}</span>
                                            <span>- {votes} votos</span>
                                        </div>
                                    )}

                                    <span>
                                        {showDate && <span className="text-[#70757a] mr-2">{new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })} — </span>}
                                        {description}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faInfoCircle} className="text-primary" />
                                Consejos de Optimización
                            </h4>
                            <ul className="space-y-2 text-sm text-text/70">
                                <li className="flex items-start gap-2">
                                    <FontAwesomeIcon icon={titleWidth <= titleMaxLength ? faCheckCircle : faExclamationCircle} className={titleWidth <= titleMaxLength ? "text-green-500 mt-1" : "text-red-500 mt-1"} />
                                    <span>Mantén el <strong>Título</strong> por debajo de ~600px (aprox 60 caracteres) para evitar que se corte.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FontAwesomeIcon icon={descWidth <= descMaxLength ? faCheckCircle : faExclamationCircle} className={descWidth <= descMaxLength ? "text-green-500 mt-1" : "text-yellow-500 mt-1"} />
                                    <span>La <strong>Descripción</strong> ideal está entre 150-160 caracteres (aprox 960px).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1" />
                                    <span>Incluye tu <strong>Palabra Clave principal</strong> al inicio del título.</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
