'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faBriefcase } from '@fortawesome/free-solid-svg-icons';

export default function OrganizationSchema() {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        logo: '',
        description: '',
        email: '',
        telephone: '',
        addressStreet: '',
        addressLocality: '',
        addressRegion: '',
        addressPostalCode: '',
        addressCountry: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": formData.name || undefined,
            "url": formData.url || undefined,
            "logo": formData.logo || undefined,
            "description": formData.description || undefined,
        };

        // Contact Point
        if (formData.email || formData.telephone) {
            schema.contactPoint = {
                "@type": "ContactPoint",
                ...(formData.email && { email: formData.email }),
                ...(formData.telephone && { telephone: formData.telephone })
            };
        }

        // Address
        if (formData.addressStreet || formData.addressLocality) {
            schema.address = {
                "@type": "PostalAddress",
                ...(formData.addressStreet && { streetAddress: formData.addressStreet }),
                ...(formData.addressLocality && { addressLocality: formData.addressLocality }),
                ...(formData.addressRegion && { addressRegion: formData.addressRegion }),
                ...(formData.addressPostalCode && { postalCode: formData.addressPostalCode }),
                ...(formData.addressCountry && { addressCountry: formData.addressCountry })
            };
        }

        // Social Media
        const sameAs = [];
        if (formData.facebook) sameAs.push(formData.facebook);
        if (formData.twitter) sameAs.push(formData.twitter);
        if (formData.instagram) sameAs.push(formData.instagram);
        if (formData.linkedin) sameAs.push(formData.linkedin);
        if (formData.youtube) sameAs.push(formData.youtube);
        if (sameAs.length > 0) schema.sameAs = sameAs;

        // Remove undefined values
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
                    <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Organization</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org markup para tu organización. Mejora tu presencia en Google con información estructurada.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBriefcase} className="text-primary" />
                        Información de la Organización
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre de la Organización *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                placeholder="Ej: Mi Empresa S.L."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL del Sitio Web</label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                placeholder="https://www.ejemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL del Logo</label>
                            <input
                                type="url"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                placeholder="https://www.ejemplo.com/logo.png"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                                placeholder="Breve descripción de tu organización..."
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Contacto</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="contacto@ejemplo.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="+34 123 456 789"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Dirección</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="addressStreet"
                                    value={formData.addressStreet}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="Calle y número"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="addressLocality"
                                        value={formData.addressLocality}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="Ciudad"
                                    />
                                    <input
                                        type="text"
                                        name="addressRegion"
                                        value={formData.addressRegion}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="Provincia/Región"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="addressPostalCode"
                                        value={formData.addressPostalCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="Código Postal"
                                    />
                                    <input
                                        type="text"
                                        name="addressCountry"
                                        value={formData.addressCountry}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                        placeholder="País"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Redes Sociales</h3>
                            <div className="space-y-4">
                                <input
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="URL de Facebook"
                                />
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="URL de Twitter/X"
                                />
                                <input
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="URL de Instagram"
                                />
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="URL de LinkedIn"
                                />
                                <input
                                    type="url"
                                    name="youtube"
                                    value={formData.youtube}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="URL de YouTube"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faCode} className="text-primary" />
                            Código JSON-LD Generado
                        </h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado!' : 'Copiar'}
                        </button>
                    </div>
                    <div className="bg-background rounded-xl p-4 border border-gray-200 overflow-auto max-h-[800px]">
                        <pre className="text-sm text-text font-mono whitespace-pre-wrap">
                            {generateSchema()}
                        </pre>
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-text/70">
                            <strong className="text-primary">💡 Instrucciones:</strong> Copia el código JSON-LD y pégalo en la sección <code className="bg-background px-2 py-1 rounded text-xs">{"<head>"}</code> de tu HTML, dentro de una etiqueta <code className="bg-background px-2 py-1 rounded text-xs">{"<script type='application/ld+json'>"}</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

