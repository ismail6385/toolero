'use client';
import React, { useState } from 'react';

interface AEOQuestion {
    question: string;
    answer: string;
    sources?: {
        label: string;
        url: string;
    }[];
}

interface AEOAnswerHubProps {
    title?: string;
    subtitle?: string;
    questions: AEOQuestion[];
    icpLabel?: string; // e.g. "Diseñadores web", "Autónomos", "Desarrolladores"
}

/**
 * AEOAnswerHub - Módulo de preguntas y respuestas específicas para AEO.
 *
 * Basado en el framework "Query Fan Map" (QF Map):
 * - Cada pregunta cubre una "contextual query" donde los LLMs hallucinan.
 * - Las respuestas son directas, con soporte/proof y fuente confiable.
 * - Formula: Citation = Contextual Query + Direct Answer + Supporting Proof + Trusted Source
 *
 * Este componente también genera FAQPage schema automáticamente para que
 * Google y los motores de IA puedan extraer las respuestas directamente.
 */
export default function AEOAnswerHub({
    title = '¿Tienes dudas? Respuestas directas',
    subtitle = 'Preguntas frecuentes con respuestas completas y verificadas',
    questions,
    icpLabel
}: AEOAnswerHubProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="w-full my-8 rounded-2xl border border-blue-100 bg-blue-50/40 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-blue-100 bg-white/60">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-lg">🎯</span>
                        {icpLabel && (
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                Para: {icpLabel}
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                </div>

                {/* Questions */}
                <div className="divide-y divide-blue-100">
                    {questions.map((q, index) => (
                        <div key={index} className="bg-white/40 hover:bg-white/70 transition-colors">
                            <button
                                className="w-full flex items-start justify-between px-6 py-4 text-left group"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className="font-medium text-gray-800 pr-4 group-hover:text-blue-700 transition-colors text-sm md:text-base">
                                    {q.question}
                                </span>
                                <span
                                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-blue-300 flex items-center justify-center text-blue-500 transition-transform duration-200 ${openIndex === index ? 'rotate-45 border-blue-500 text-blue-600' : ''}`}
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5">
                                    <div className="text-sm md:text-base text-gray-700 leading-relaxed bg-white/80 rounded-xl p-4 border border-blue-100">
                                        {q.answer}
                                    </div>

                                    {q.sources && q.sources.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="text-xs text-gray-400">Fuentes:</span>
                                            {q.sources.map((source, si) => (
                                                <a
                                                    key={si}
                                                    href={source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2"
                                                >
                                                    {source.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer trust signal */}
                <div className="px-6 py-3 bg-white/30 border-t border-blue-100">
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span>✓</span>
                        <span>Respuestas verificadas por el equipo de Toolero.es · Procesamiento 100% local en tu navegador · Sin registro</span>
                    </p>
                </div>
            </section>
        </>
    );
}
