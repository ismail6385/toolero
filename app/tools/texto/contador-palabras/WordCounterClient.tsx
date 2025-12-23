'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faTrash, faFont, faCalculator, faParagraph, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export default function WordCounterClient() {
    const [text, setText] = useState('');

    const stats = {
        chars: text.length,
        words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
        paragraphs: text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length,
        sentences: text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim() !== '').length
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-text mb-2">Contador de Palabras</h1>
                <p className="text-text/60">Analiza tu texto en tiempo real con precisión milimétrica.</p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden hover:border-primary/50 transition-colors">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border-b border-gray-200">
                    <StatBox label="Palabras" value={stats.words} icon={faFont} />
                    <StatBox label="Caracteres" value={stats.chars} icon={faCalculator} />
                    <StatBox label="Párrafos" value={stats.paragraphs} icon={faParagraph} />
                    <StatBox label="Frases" value={stats.sentences} icon={faAlignLeft} />
                </div>

                {/* Text Area */}
                <div className="p-6 bg-background">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-80 p-6 rounded-xl border-0 shadow-inner bg-white focus:ring-2 focus:ring-primary focus:ring-opacity-50 resize-y font-mono text-base text-text leading-relaxed placeholder:text-text/30"
                        placeholder="Escribe o pega tu texto aquí para comenzar el análisis..."
                    />
                </div>

                {/* Actions Bar */}
                <div className="bg-white p-4 border-t border-gray-200 flex justify-between items-center">
                    <button
                        onClick={() => setText('')}
                        className="flex items-center gap-2 text-sm font-semibold text-text/60 hover:text-text px-4 py-2 rounded-xl hover:bg-background transition-colors"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        Borrar Todo
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText(text)}
                        className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        Copiar Texto
                    </button>
                </div>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Contador de Palabras: Preciso y Gratuito</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">⚡</div>
                            <h3 className="font-semibold text-text mb-2">Tiempo Real</h3>
                            <p className="text-sm text-text/70">Cuenta palabras y caracteres instantáneamente mientras escribes.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">📊</div>
                            <h3 className="font-semibold text-text mb-2">Estadísticas Completas</h3>
                            <p className="text-sm text-text/70">Palabras, caracteres, párrafos y frases en un solo lugar.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">✓</div>
                            <h3 className="font-semibold text-text mb-2">100% Gratis</h3>
                            <p className="text-sm text-text/70">Sin límites, sin registro, sin anuncios molestos.</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Para qué usar el contador de palabras?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">📝 Ensayos y Trabajos</h3>
                            <p className="text-sm text-text/70">Verifica que cumples con el límite de palabras requerido.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✍️ Escritura Creativa</h3>
                            <p className="text-sm text-text/70">Controla la extensión de tus artículos, cuentos o novelas.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">💼 Contenido SEO</h3>
                            <p className="text-sm text-text/70">Optimiza la longitud de tus textos para mejor posicionamiento.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">📱 Redes Sociales</h3>
                            <p className="text-sm text-text/70">Asegúrate de no exceder los límites de caracteres.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Cómo cuenta las palabras esta herramienta?</h3>
                            <p className="text-text/70">Contamos las palabras separadas por espacios. Los números y símbolos también se cuentan como palabras.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Cuenta los espacios como caracteres?</h3>
                            <p className="text-text/70">Sí, contamos todos los caracteres incluyendo espacios, puntuación y saltos de línea.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Es gratis contar palabras?</h3>
                            <p className="text-text/70">Completamente gratis, sin límites de uso ni necesidad de registro.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Se guarda mi texto?</h3>
                            <p className="text-text/70">No, todo se procesa en tu navegador. Tu texto nunca se envía a ningún servidor.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Contador de Palabras y Caracteres Online</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-3">
                        <p>
                            Nuestro <strong>contador de palabras</strong> te permite <strong>contar palabras</strong> y <strong>contar caracteres</strong> de forma instantánea. Ya sea que necesites verificar la longitud de un ensayo, artículo o publicación en redes sociales, nuestra herramienta gratuita te ofrece estadísticas precisas en tiempo real.
                        </p>
                        <p>
                            Con nuestro <strong>contador de palabras online</strong>, puedes <strong>contar palabras en texto</strong> de cualquier longitud. Es perfecto para estudiantes, escritores, bloggers y profesionales del marketing que necesitan <strong>contar letras</strong> y palabras para cumplir con requisitos específicos de longitud.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatBox({ label, value, icon }: { label: string, value: number, icon: IconDefinition }) {
    return (
        <div className="bg-white p-6 text-center group hover:bg-background transition-colors">
            <div className="text-primary/20 text-2xl mb-2 group-hover:text-primary transition-colors">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="text-3xl font-semibold text-text mb-1 group-hover:scale-110 transition-transform">{value}</div>
            <div className="text-xs font-semibold text-text/50 uppercase tracking-widest">{label}</div>
        </div>
    )
}
