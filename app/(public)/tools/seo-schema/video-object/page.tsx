'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function VideoObjectSchema() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnailUrl: '',
        uploadDate: '',
        duration: '',
        contentUrl: '',
        embedUrl: '',
        publisherName: '',
        publisherLogo: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "thumbnailUrl": formData.thumbnailUrl || undefined,
            "uploadDate": formData.uploadDate || undefined,
            "duration": formData.duration || undefined,
            "contentUrl": formData.contentUrl || undefined,
            "embedUrl": formData.embedUrl || undefined,
        };

        if (formData.publisherName) {
            schema.publisher = {
                "@type": "Organization",
                name: formData.publisherName,
                ...(formData.publisherLogo && { logo: { "@type": "ImageObject", url: formData.publisherLogo } })
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
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faVideo} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema VideoObject</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para videos. Mejora la visibilidad en Google Videos y YouTube.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faVideo} className="text-primary" />
                        Información del Video
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Título del Video *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Título del video" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción del video..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Miniatura</label>
                            <input type="url" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/thumbnail.jpg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Fecha de Subida</label>
                            <input type="date" name="uploadDate" value={formData.uploadDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Duración (Formato: PT1H30M15S)</label>
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT5M30S" />
                            <p className="text-xs text-text/50 mt-1">Ejemplo: PT5M30S = 5 minutos 30 segundos</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL del Video (Directo)</label>
                            <input type="url" name="contentUrl" value={formData.contentUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/video.mp4" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Embed (YouTube, Vimeo, etc.)</label>
                            <input type="url" name="embedUrl" value={formData.embedUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Publicador</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Nombre del Publicador</label>
                                    <input type="text" name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del canal/publicador" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL del Logo del Publicador</label>
                                    <input type="url" name="publisherLogo" value={formData.publisherLogo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/logo.png" />
                                </div>
                            </div>
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
                            <strong className="text-primary">💡 Instrucciones:</strong> Copia el código y pégalo en <code className="bg-background px-2 py-1 rounded text-xs">{"<head>"}</code> dentro de <code className="bg-background px-2 py-1 rounded text-xs">{"<script type='application/ld+json'>"}</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

