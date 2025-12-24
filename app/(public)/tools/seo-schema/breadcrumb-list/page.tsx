'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faLayerGroup, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function BreadcrumbListSchema() {
    const [items, setItems] = useState([{ name: '', url: '' }]);
    const [copied, setCopied] = useState(false);

    const addItem = () => {
        setItems([...items, { name: '', url: '' }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: 'name' | 'url', value: string) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const generateSchema = () => {
        const itemListElement = items
            .filter(item => item.name && item.url)
            .map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url
            }));

        if (itemListElement.length === 0) {
            return JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: []
            }, null, 2);
        }

        return JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement
        }, null, 2);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSchema());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema BreadcrumbList</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para breadcrumbs. Mejora la navegación en los resultados de Google.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-primary" /> Elementos de Navegación
                        </h2>
                        <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm">
                            <FontAwesomeIcon icon={faPlus} /> Añadir
                        </button>
                    </div>
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="p-4 bg-background rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-text">Nivel {index + 1}</span>
                                    {items.length > 1 && (
                                        <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Nombre</label>
                                        <input type="text" value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Inicio, Productos, etc." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">URL</label>
                                        <input type="url" value={item.url} onChange={(e) => updateItem(index, 'url', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com" />
                                    </div>
                                </div>
                            </div>
                        ))}
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

