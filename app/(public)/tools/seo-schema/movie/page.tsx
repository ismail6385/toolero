'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faFilm } from '@fortawesome/free-solid-svg-icons';

export default function MovieSchema() {
    const [formData, setFormData] = useState({
        name: '', description: '', image: '', datePublished: '', director: '', actor: '',
        duration: '', genre: '', aggregateRating: '', reviewCount: '', contentRating: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "image": formData.image || undefined,
            "datePublished": formData.datePublished || undefined,
            "duration": formData.duration || undefined,
            "genre": formData.genre || undefined,
            "contentRating": formData.contentRating || undefined,
        };

        if (formData.director) {
            schema.director = {
                "@type": "Person",
                name: formData.director
            };
        }

        if (formData.actor) {
            schema.actor = formData.actor.split(',').map(a => a.trim()).filter(a => a).map(a => ({
                "@type": "Person",
                name: a
            }));
        }

        if (formData.aggregateRating && formData.reviewCount) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                ratingValue: formData.aggregateRating,
                reviewCount: formData.reviewCount
            };
        }

        Object.keys(schema).forEach(key => {
            if (schema[key] === undefined) delete schema[key];
        });

        return JSON.stringify(schema, null, 2);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSchema());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faFilm} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Movie</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para películas. Mejora la visibilidad en Google y búsquedas de películas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFilm} className="text-primary" /> Información de la Película
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Título de la Película *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Título de la película" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Sinopsis de la película..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Imagen/Poster</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/poster.jpg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Fecha de Estreno</label>
                            <input type="date" name="datePublished" value={formData.datePublished} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Director</label>
                            <input type="text" name="director" value={formData.director} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del director" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Actores (separados por comas)</label>
                            <input type="text" name="actor" value={formData.actor} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Actor 1, Actor 2, Actor 3" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Duración (Formato: PT2H30M)</label>
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT2H30M" />
                            <p className="text-xs text-text/50 mt-1">Ejemplo: PT2H30M = 2 horas 30 minutos</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Género</label>
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Drama, Comedia, Acción, etc." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Clasificación</label>
                            <input type="text" name="contentRating" value={formData.contentRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PG-13, R, etc." />
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Reseñas</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Calificación Promedio</label>
                                    <input type="number" step="0.1" min="0" max="10" name="aggregateRating" value={formData.aggregateRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="8.5" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Número de Reseñas</label>
                                    <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="1250" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faCode} className="text-primary" /> Código JSON-LD
                        </h2>
                        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm">
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado!' : 'Copiar'}
                        </button>
                    </div>
                    <div className="bg-background rounded-xl p-4 border border-gray-200 overflow-auto max-h-[800px]">
                        <pre className="text-sm text-text font-mono whitespace-pre-wrap">{generateSchema()}</pre>
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-text/70">
                            <strong className="text-primary">💡 Instrucciones:</strong> Copia el código y pégalo en <code className="bg-background px-2 py-1 rounded text-xs">{"<head>"}</code> dentro de <code className="bg-background px-2 py-1 rounded text-xs">{"<script type='application/ld+json'>"}</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

