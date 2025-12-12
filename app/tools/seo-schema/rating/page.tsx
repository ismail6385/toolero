'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faStar } from '@fortawesome/free-solid-svg-icons';

export default function RatingSchema() {
    const [formData, setFormData] = useState({
        ratingValue: '',
        bestRating: '5',
        worstRating: '1'
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "Rating",
            "ratingValue": formData.ratingValue || undefined,
            "bestRating": formData.bestRating || undefined,
            "worstRating": formData.worstRating || undefined,
        };

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faStar} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Rating</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para calificaciones. Usa este schema dentro de Review o AggregateRating.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faStar} className="text-primary" />
                        Información de Calificación
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Valor de Calificación *</label>
                            <input type="number" step="0.1" name="ratingValue" value={formData.ratingValue} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="4.5" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Mejor Calificación</label>
                            <input type="number" name="bestRating" value={formData.bestRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="5" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Peor Calificación</label>
                            <input type="number" name="worstRating" value={formData.worstRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="1" />
                        </div>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faCode} className="text-primary" />
                            Código JSON-LD
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
                            <strong className="text-primary">💡 Nota:</strong> Este schema se usa normalmente dentro de Review o AggregateRating. Copia el código y pégalo en <code className="bg-background px-2 py-1 rounded text-xs">{"<head>"}</code> dentro de <code className="bg-background px-2 py-1 rounded text-xs">{"<script type='application/ld+json'>"}</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

