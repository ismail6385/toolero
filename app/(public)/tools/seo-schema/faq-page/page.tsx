'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faQuestionCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function FAQPageSchema() {
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
    const [copied, setCopied] = useState(false);

    const addFAQ = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };

    const removeFAQ = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index));
    };

    const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
        const updated = [...faqs];
        updated[index][field] = value;
        setFaqs(updated);
    };

    const generateSchema = () => {
        const mainEntity = faqs
            .filter(faq => faq.question && faq.answer)
            .map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }));

        if (mainEntity.length === 0) {
            return JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: []
            }, null, 2);
        }

        return JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity
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
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Schema FAQPage</h1>
                <p className="text-text/60 max-w-2xl mx-auto">Genera Schema.org para páginas de preguntas frecuentes. Mejora la visibilidad en Google con rich snippets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faQuestionCircle} className="text-primary" /> Preguntas Frecuentes
                        </h2>
                        <button onClick={addFAQ} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm">
                            <FontAwesomeIcon icon={faPlus} /> Añadir
                        </button>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-4 bg-background rounded-xl border border-gray-200">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-text">Pregunta {index + 1}</span>
                                    {faqs.length > 1 && (
                                        <button onClick={() => removeFAQ(index)} className="text-red-500 hover:text-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Pregunta</label>
                                        <input type="text" value={faq.question} onChange={(e) => updateFAQ(index, 'question', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="¿Cuál es tu pregunta?" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">Respuesta</label>
                                        <textarea value={faq.answer} onChange={(e) => updateFAQ(index, 'answer', e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Escribe la respuesta aquí..." />
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

