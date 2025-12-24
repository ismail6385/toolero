'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function ProductSchema() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        sku: '',
        mpn: '',
        brand: '',
        category: '',
        price: '',
        priceCurrency: 'EUR',
        availability: 'InStock',
        condition: 'NewCondition',
        aggregateRating: '',
        reviewCount: '',
        offersUrl: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "image": formData.image || undefined,
            "sku": formData.sku || undefined,
            "mpn": formData.mpn || undefined,
            "brand": formData.brand ? { "@type": "Brand", name: formData.brand } : undefined,
            "category": formData.category || undefined,
            "condition": formData.condition || undefined,
        };

        // Offers
        if (formData.price) {
            schema.offers = {
                "@type": "Offer",
                price: formData.price,
                priceCurrency: formData.priceCurrency,
                availability: `https://schema.org/${formData.availability}`,
                ...(formData.offersUrl && { url: formData.offersUrl })
            };
        }

        // Aggregate Rating
        if (formData.aggregateRating && formData.reviewCount) {
            schema.aggregateRating = {
                "@type": "AggregateRating",
                ratingValue: formData.aggregateRating,
                reviewCount: formData.reviewCount
            };
        }

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
                    <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Product</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera Schema.org para productos. Mejora la visibilidad en Google Shopping y rich snippets con precios.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faShoppingCart} className="text-primary" />
                        Información del Producto
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre del Producto *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del producto" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción del producto..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Imagen</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/producto.jpg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">SKU</label>
                                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="SKU-12345" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">MPN</label>
                                <input type="text" name="mpn" value={formData.mpn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="MPN-67890" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Marca</label>
                            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre de la marca" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Categoría</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Ej: Electrónica, Ropa, etc." />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-text mb-4">Oferta y Precio</h3>
                            <div className="space-y-4">
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
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Disponibilidad</label>
                                    <select name="availability" value={formData.availability} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                                        <option value="InStock">En Stock</option>
                                        <option value="OutOfStock">Agotado</option>
                                        <option value="PreOrder">Pre-orden</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">Condición</label>
                                    <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                                        <option value="NewCondition">Nuevo</option>
                                        <option value="UsedCondition">Usado</option>
                                        <option value="RefurbishedCondition">Reacondicionado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-text mb-2">URL de la Oferta</label>
                                    <input type="url" name="offersUrl" value={formData.offersUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/producto" />
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

