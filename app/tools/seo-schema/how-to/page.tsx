'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faCode as faCodeIcon, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function HowToSchema() {
    const [formData, setFormData] = useState({
        name: '', description: '', image: '', totalTime: '', estimatedCost: '', tool: '', supply: ''
    });
    const [steps, setSteps] = useState([{ name: '', text: '', image: '', url: '' }]);
    const [copied, setCopied] = useState(false);

    const addStep = () => {
        setSteps([...steps, { name: '', text: '', image: '', url: '' }]);
    };

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const updateStep = (index: number, field: 'name' | 'text' | 'image' | 'url', value: string) => {
        const updated = [...steps];
        updated[index][field] = value;
        setSteps(updated);
    };

    const generateSchema = () => {
        const schema: any = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "image": formData.image || undefined,
            "totalTime": formData.totalTime || undefined,
        };

        if (formData.estimatedCost) {
            schema.estimatedCost = {
                "@type": "MonetaryAmount",
                currency: "EUR",
                value: formData.estimatedCost
            };
        }

        if (formData.tool) {
            schema.tool = formData.tool.split(',').map(t => t.trim()).filter(t => t).map(t => ({ "@type": "HowToTool", name: t }));
        }

        if (formData.supply) {
            schema.supply = formData.supply.split(',').map(s => s.trim()).filter(s => s).map(s => ({ "@type": "HowToSupply", name: s }));
        }

        const howToSteps = steps.filter(s => s.name && s.text).map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && { image: step.image }),
            ...(step.url && { url: step.url })
        }));

        if (howToSteps.length > 0) {
            schema.step = howToSteps;
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
                    <FontAwesomeIcon icon={faCodeIcon} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema HowTo</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para guías paso a paso. Mejora la visibilidad en Google con rich snippets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCodeIcon} className="text-primary" /> Información de la Guía
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre de la Guía *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre de la guía" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción de la guía..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Imagen</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/imagen.jpg" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Tiempo Total (Formato: PT1H30M)</label>
                            <input type="text" name="totalTime" value={formData.totalTime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT30M" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Costo Estimado</label>
                            <input type="number" step="0.01" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="25.50" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Herramientas (separadas por comas)</label>
                            <input type="text" name="tool" value={formData.tool} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Martillo, Destornillador" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Materiales (separados por comas)</label>
                            <input type="text" name="supply" value={formData.supply} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Madera, Clavos, Pintura" />
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-text">Pasos</h3>
                                <button onClick={addStep} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm">
                                    <FontAwesomeIcon icon={faPlus} /> Añadir Paso
                                </button>
                            </div>
                            <div className="space-y-4">
                                {steps.map((step, index) => (
                                    <div key={index} className="p-4 bg-background rounded-xl border border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold text-text">Paso {index + 1}</span>
                                            {steps.length > 1 && (
                                                <button onClick={() => removeStep(index)} className="text-red-500 hover:text-red-700">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-semibold text-text mb-2">Nombre del Paso</label>
                                                <input type="text" value={step.name} onChange={(e) => updateStep(index, 'name', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Título del paso" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-text mb-2">Descripción del Paso *</label>
                                                <textarea value={step.text} onChange={(e) => updateStep(index, 'text', e.target.value)} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción del paso..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-text mb-2">URL de Imagen (Opcional)</label>
                                                <input type="url" value={step.image} onChange={(e) => updateStep(index, 'image', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/paso.jpg" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-text mb-2">URL (Opcional)</label>
                                                <input type="url" value={step.url} onChange={(e) => updateStep(index, 'url', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

