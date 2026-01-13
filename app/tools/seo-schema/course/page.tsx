'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function CourseSchema() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        providerName: '',
        providerUrl: '',
        courseCode: '',
        educationalCredentialAwarded: '',
        timeRequired: '',
        aggregateRating: '',
        reviewCount: '',
        price: '',
        priceCurrency: 'EUR'
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: Record<string, any> = {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "courseCode": formData.courseCode || undefined,
            "educationalCredentialAwarded": formData.educationalCredentialAwarded || undefined,
            "timeRequired": formData.timeRequired || undefined,
        };

        if (formData.providerName) {
            schema.provider = {
                "@type": "Organization",
                name: formData.providerName,
                ...(formData.providerUrl && { url: formData.providerUrl })
            };
        }

        if (formData.aggregateRating && formData.reviewCount) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                ratingValue: formData.aggregateRating,
                reviewCount: formData.reviewCount
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
                    <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Course</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para cursos online. Mejora la visibilidad en Google y búsquedas educativas.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-primary" />
                        Información del Curso
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre del Curso *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del curso" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción del curso..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Código del Curso</label>
                            <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="CURSO-001" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Credencial Otorgada</label>
                            <input type="text" name="educationalCredentialAwarded" value={formData.educationalCredentialAwarded} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Ej: Certificado, Diploma, etc." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Tiempo Requerido (Formato: PT30H)</label>
                            <input type="text" name="timeRequired" value={formData.timeRequired} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT30H" />
                            <p className="text-xs text-text/50 mt-1">Ejemplo: PT30H = 30 horas</p>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Proveedor</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Nombre del Proveedor</label>
                                    <input type="text" name="providerName" value={formData.providerName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre de la institución" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL del Proveedor</label>
                                    <input type="url" name="providerUrl" value={formData.providerUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com" />
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Precio</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Precio</label>
                                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="99.99" />
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
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Reseñas</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Calificación Promedio</label>
                                    <input type="number" step="0.1" min="0" max="5" name="aggregateRating" value={formData.aggregateRating} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="4.5" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Número de Reseñas</label>
                                    <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="125" />
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

