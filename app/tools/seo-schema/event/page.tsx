'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function EventSchema() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        locationName: '',
        locationAddress: '',
        locationCity: '',
        locationCountry: '',
        organizerName: '',
        organizerUrl: '',
        image: '',
        price: '',
        priceCurrency: 'EUR',
        url: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: Record<string, any> = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "startDate": formData.startDate || undefined,
            "endDate": formData.endDate || undefined,
            "image": formData.image || undefined,
            "url": formData.url || undefined,
        };

        if (formData.locationName || formData.locationAddress) {
            schema.location = {
                "@type": "Place",
                name: formData.locationName,
                address: {
                    "@type": "PostalAddress",
                    ...(formData.locationAddress && { streetAddress: formData.locationAddress }),
                    ...(formData.locationCity && { addressLocality: formData.locationCity }),
                    ...(formData.locationCountry && { addressCountry: formData.locationCountry })
                }
            };
        }

        if (formData.organizerName) {
            schema.organizer = {
                "@type": "Organization",
                name: formData.organizerName,
                ...(formData.organizerUrl && { url: formData.organizerUrl })
            };
        }

        if (formData.price) {
            schema.offers = {
                "@type": "Offer",
                price: formData.price,
                priceCurrency: formData.priceCurrency
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
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faCalendar} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Event</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para eventos. Mejora la visibilidad en Google Events y búsquedas de eventos.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="text-primary" />
                        Información del Evento
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre del Evento *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del evento" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción del evento..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Fecha de Inicio *</label>
                                <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Fecha de Fin</label>
                                <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Imagen</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/evento.jpg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL del Evento</label>
                            <input type="url" name="url" value={formData.url} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/evento" />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Ubicación</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Nombre del Lugar</label>
                                    <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Ej: Centro de Convenciones" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Dirección</label>
                                    <input type="text" name="locationAddress" value={formData.locationAddress} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Calle y número" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Ciudad</label>
                                        <input type="text" name="locationCity" value={formData.locationCity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Ciudad" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">País</label>
                                        <input type="text" name="locationCountry" value={formData.locationCountry} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="País" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Organizador</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Nombre del Organizador</label>
                                    <input type="text" name="organizerName" value={formData.organizerName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del organizador" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL del Organizador</label>
                                    <input type="url" name="organizerUrl" value={formData.organizerUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Precio</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Precio</label>
                                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Moneda</label>
                                    <select name="priceCurrency" value={formData.priceCurrency} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                                        <option value="EUR">EUR (€)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
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

