'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faCode as faCodeIcon } from '@fortawesome/free-solid-svg-icons';

export default function SoftwareApplicationSchema() {
    const [formData, setFormData] = useState({
        name: '', description: '', applicationCategory: '', operatingSystem: '', offersPrice: '',
        offersPriceCurrency: 'EUR', offersUrl: '', aggregateRating: '', reviewCount: '',
        screenshot: '', softwareVersion: '', releaseDate: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "applicationCategory": formData.applicationCategory || undefined,
            "operatingSystem": formData.operatingSystem || undefined,
            "softwareVersion": formData.softwareVersion || undefined,
            "releaseDate": formData.releaseDate || undefined,
            "screenshot": formData.screenshot || undefined,
        };

        if (formData.offersPrice) {
            schema.offers = {
                "@type": "Offer",
                price: formData.offersPrice,
                priceCurrency: formData.offersPriceCurrency,
                ...(formData.offersUrl && { url: formData.offersUrl })
            };
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faCodeIcon} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema SoftwareApplication</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para aplicaciones de software. Mejora la visibilidad en Google Play y App Store.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCodeIcon} className="text-primary" /> Información de la Aplicación
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre de la Aplicación *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre de la aplicación" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción de la aplicación..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Categoría</label>
                            <input type="text" name="applicationCategory" value={formData.applicationCategory} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="GameApplication, BusinessApplication, etc." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Sistema Operativo</label>
                            <input type="text" name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Android, iOS, Windows, etc." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Versión</label>
                            <input type="text" name="softwareVersion" value={formData.softwareVersion} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="1.0.0" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Fecha de Lanzamiento</label>
                            <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Screenshot</label>
                            <input type="url" name="screenshot" value={formData.screenshot} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/screenshot.jpg" />
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Oferta y Precio</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Precio</label>
                                        <input type="number" step="0.01" name="offersPrice" value={formData.offersPrice} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Moneda</label>
                                        <select name="offersPriceCurrency" value={formData.offersPriceCurrency} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                                            <option value="EUR">EUR (€)</option>
                                            <option value="USD">USD ($)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL de la Oferta</label>
                                    <input type="url" name="offersUrl" value={formData.offersUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://play.google.com/store/apps/details?id=..." />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Reseñas</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Calificación Promedio</label>
                                    <input type="number" step="0.1" min="0" max="5" name="aggregateRating" value={formData.aggregateRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="4.5" />
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

