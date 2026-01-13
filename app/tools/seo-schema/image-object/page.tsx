'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ImageObjectSchema() {
    const [formData, setFormData] = useState({
        contentUrl: '',
        description: '',
        name: '',
        license: '',
        authorName: '',
        authorUrl: '',
        copyrightHolder: '',
        datePublished: '',
        width: '',
        height: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: Record<string, any> = {
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": formData.contentUrl || undefined,
            "description": formData.description || undefined,
            "name": formData.name || undefined,
            "license": formData.license || undefined,
            "datePublished": formData.datePublished || undefined,
        };

        if (formData.width || formData.height) {
            schema.width = formData.width ? parseInt(formData.width) : undefined;
            schema.height = formData.height ? parseInt(formData.height) : undefined;
        }

        if (formData.authorName) {
            schema.creator = {
                "@type": "Person",
                name: formData.authorName,
                ...(formData.authorUrl && { url: formData.authorUrl })
            };
        }

        if (formData.copyrightHolder) {
            schema.copyrightHolder = {
                "@type": "Organization",
                name: formData.copyrightHolder
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
                    <FontAwesomeIcon icon={faImage} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema ImageObject</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para imágenes. Mejora el SEO de imágenes y la visibilidad en Google Images.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faImage} className="text-primary" />
                        Información de la Imagen
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de la Imagen *</label>
                            <input type="url" name="contentUrl" value={formData.contentUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/imagen.jpg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre/Título</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Título de la imagen" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción de la imagen..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Ancho (px)</label>
                                <input type="number" name="width" value={formData.width} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="1920" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Alto (px)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="1080" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Licencia</label>
                            <input type="url" name="license" value={formData.license} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://creativecommons.org/licenses/by/4.0/" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Fecha de Publicación</label>
                            <input type="date" name="datePublished" value={formData.datePublished} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Autor/Creador</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Nombre del Autor</label>
                                    <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del autor" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL del Autor</label>
                                    <input type="url" name="authorUrl" value={formData.authorUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/autor" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Titular de los Derechos</label>
                            <input type="text" name="copyrightHolder" value={formData.copyrightHolder} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del titular de derechos" />
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

