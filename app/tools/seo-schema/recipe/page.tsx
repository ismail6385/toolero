'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faUtensils } from '@fortawesome/free-solid-svg-icons';

export default function RecipeSchema() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        authorName: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        recipeYield: '',
        recipeCategory: '',
        recipeCuisine: '',
        calories: '',
        ingredients: '',
        instructions: ''
    });

    const [copied, setCopied] = useState(false);

    const generateSchema = () => {
        const schema: Record<string, any> = {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": formData.name || undefined,
            "description": formData.description || undefined,
            "image": formData.image || undefined,
            "prepTime": formData.prepTime || undefined,
            "cookTime": formData.cookTime || undefined,
            "totalTime": formData.totalTime || undefined,
            "recipeYield": formData.recipeYield || undefined,
            "recipeCategory": formData.recipeCategory || undefined,
            "recipeCuisine": formData.recipeCuisine || undefined,
            "nutrition": formData.calories ? { "@type": "NutritionInformation", calories: formData.calories } : undefined,
        };

        if (formData.ingredients) {
            schema.recipeIngredient = formData.ingredients.split('\n').filter(i => i.trim());
        }

        if (formData.instructions) {
            schema.recipeInstructions = formData.instructions.split('\n').filter(i => i.trim()).map((inst, idx) => ({
                "@type": "HowToStep",
                position: idx + 1,
                text: inst.trim()
            }));
        }

        if (formData.authorName) {
            schema.author = { "@type": "Person", name: formData.authorName };
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
                    <FontAwesomeIcon icon={faUtensils} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema Recipe</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para recetas. Mejora la visibilidad en Google Recipes y rich snippets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faUtensils} className="text-primary" /> Información de la Receta
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Nombre de la Receta *</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre de la receta" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Descripción</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Descripción de la receta..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">URL de Imagen</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="https://www.ejemplo.com/receta.jpg" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Tiempo Prep (PT30M)</label>
                                <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT30M" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Tiempo Cocción (PT1H)</label>
                                <input type="text" name="cookTime" value={formData.cookTime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT1H" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Tiempo Total (PT1H30M)</label>
                                <input type="text" name="totalTime" value={formData.totalTime} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="PT1H30M" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Rendimiento</label>
                                <input type="text" name="recipeYield" value={formData.recipeYield} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="4 porciones" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Categoría</label>
                                <input type="text" name="recipeCategory" value={formData.recipeCategory} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Plato principal" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Cocina</label>
                            <input type="text" name="recipeCuisine" value={formData.recipeCuisine} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Italiana, Española, etc." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Calorías</label>
                            <input type="number" name="calories" value={formData.calories} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="350" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Autor</label>
                            <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Nombre del autor" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Ingredientes (uno por línea)</label>
                            <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="2 tazas de harina&#10;1 huevo&#10;1 cucharada de aceite" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Instrucciones (un paso por línea)</label>
                            <textarea name="instructions" value={formData.instructions} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Mezclar los ingredientes secos&#10;Añadir los líquidos&#10;Cocinar a fuego medio" />
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

