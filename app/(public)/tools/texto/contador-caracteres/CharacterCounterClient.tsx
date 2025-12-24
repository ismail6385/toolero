'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFont,
    faTextWidth,
    faAlignLeft,
    faTrash,
    faCopy,
    faCheck,
    faChartPie,
    faHashtag,
    faClock,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faFacebook,
    faInstagram,
    faLinkedin,
    faGoogle
} from '@fortawesome/free-brands-svg-icons';

export default function CharacterCounterClient() {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const stats = useMemo(() => {
        const trimmed = text.trim();
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s/g, '').length;
        const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
        const sentences = trimmed === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = trimmed === '' ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
        const lines = text === '' ? 0 : text.split(/\n/).length;

        // Reading time (avg 200 words per minute)
        const readingTimeSeconds = Math.ceil(words / (200 / 60));
        const readingTimeText = readingTimeSeconds < 60
            ? `${readingTimeSeconds} seg`
            : `${Math.ceil(readingTimeSeconds / 60)} min`;

        return { chars, charsNoSpaces, words, sentences, paragraphs, lines, readingTimeText };
    }, [text]);

    const socialLimits = [
        { name: 'Twitter / X', limit: 280, icon: faTwitter, color: 'text-sky-500' },
        { name: 'Instagram Bio', limit: 150, icon: faInstagram, color: 'text-pink-500' },
        { name: 'Facebook Post', limit: 63206, icon: faFacebook, color: 'text-blue-600' },
        { name: 'LinkedIn Post', limit: 3000, icon: faLinkedin, color: 'text-blue-700' },
        { name: 'Google Meta Desc', limit: 160, icon: faGoogle, color: 'text-green-600' },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faHashtag} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Contador de Caracteres</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Analiza tu texto con precisión. Ideal para SEO, posts de redes sociales y redacción profesional.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Content (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Primary Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <StatCard label="Caracteres" value={stats.chars} icon={faFont} />
                        <StatCard label="Sin Espacios" value={stats.charsNoSpaces} icon={faTextWidth} />
                        <StatCard label="Palabras" value={stats.words} icon={faAlignLeft} />
                        <StatCard label="Lectura" value={stats.readingTimeText} icon={faClock} />
                    </div>

                    {/* Editor */}
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:border-primary/30 transition-all duration-300">
                        <div className="p-4 bg-gray-50/80 border-b border-gray-200 flex justify-between items-center backdrop-blur-sm">
                            <span className="text-sm font-medium text-text/60 flex items-center gap-2">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Escribe o pega tu texto abajo
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setText('')}
                                    className="p-2 text-text/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip"
                                    title="Borrar todo"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${copied
                                            ? 'bg-green-500 text-white shadow-green-200'
                                            : 'bg-primary text-white hover:bg-secondary shadow-primary/20'
                                        } shadow-lg`}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full h-[400px] p-6 bg-white resize-y border-0 focus:ring-0 text-lg leading-relaxed font-sans placeholder:text-text/20"
                                placeholder="Empieza a escribir aquí..."
                                spellCheck={false}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Sidebar (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Social Limits */}
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faChartPie} className="text-primary" />
                            Límites para Redes Sociales
                        </h3>
                        <div className="space-y-4">
                            {socialLimits.map((platform, idx) => {
                                const remaining = platform.limit - stats.chars;
                                const percentage = Math.min(100, (stats.chars / platform.limit) * 100);
                                const isOverLimit = remaining < 0;

                                return (
                                    <div key={idx} className="group">
                                        <div className="flex justify-between items-center mb-1 text-sm">
                                            <span className="flex items-center gap-2 font-medium text-text/80">
                                                <FontAwesomeIcon icon={platform.icon} className={platform.color} />
                                                {platform.name}
                                            </span>
                                            <span className={`font-mono text-xs ${isOverLimit ? 'text-red-500 font-bold' : 'text-text/60'}`}>
                                                {isOverLimit ? remaining : `${remaining} restantes`}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${isOverLimit ? 'bg-red-500' : 'bg-primary'}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-6 overflow-hidden">
                        <h3 className="text-lg font-semibold text-text mb-4">Detalles del Texto</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem label="Párrafos" value={stats.paragraphs} />
                            <DetailItem label="Frases" value={stats.sentences} />
                            <DetailItem label="Líneas" value={stats.lines} />
                            <DetailItem label="Espacios" value={(stats.chars - stats.charsNoSpaces)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string | number, icon: any }) {
    return (
        <div className="bg-background rounded-xl p-4 border border-gray-100 shadow-sm text-center hover:shadow-md hover:border-primary/20 transition-all">
            <div className="text-primary/30 text-xl mb-2">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="text-2xl font-bold text-text mb-1">{value}</div>
            <div className="text-xs text-text/50 font-semibold uppercase">{label}</div>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: number }) {
    return (
        <div className="p-3 bg-gray-50 rounded-lg text-center border border-gray-100">
            <div className="text-xl font-bold text-text/80">{value}</div>
            <div className="text-xs text-text/50">{label}</div>
        </div>
    );
}
