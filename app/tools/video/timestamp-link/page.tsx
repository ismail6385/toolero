"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLink, faCopy, faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';

export default function TimestampLinkPage() {
    const [url, setUrl] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [generatedLink, setGeneratedLink] = useState('');

    // Parse URL to check if it's valid YouTube
    const isValidYoutubeUrl = (url: string) => {
        return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
    };

    const generateLink = () => {
        if (!url) return;

        // Clean inputs
        let h = Math.max(0, hours);
        let m = Math.max(0, minutes);
        let s = Math.max(0, seconds);

        // Normalize time (e.g. 65 seconds -> 1 min 5 sec)
        if (s >= 60) {
            m += Math.floor(s / 60);
            s = s % 60;
        }
        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }

        // Calculate total seconds for t= parameter
        const totalSeconds = (h * 3600) + (m * 60) + s;

        try {
            let newUrl = url.trim();
            let videoId = '';

            // Extract ID
            if (newUrl.includes('youtu.be/')) {
                videoId = newUrl.split('youtu.be/')[1].split('?')[0];
            } else if (newUrl.includes('v=')) {
                videoId = newUrl.split('v=')[1].split('&')[0];
            } else if (newUrl.includes('shorts/')) {
                videoId = newUrl.split('shorts/')[1].split('?')[0];
            }

            if (!videoId) {
                toast.error('No se pudo detectar el ID del video');
                return;
            }

            // Create standard tu.be link which is shorter
            const finalUrl = `https://youtu.be/${videoId}?t=${totalSeconds}`;
            setGeneratedLink(finalUrl);
            toast.success('Link generado con éxito');

        } catch (e) {
            toast.error('URL inválida');
        }
    };

    useEffect(() => {
        if (url && isValidYoutubeUrl(url)) {
            generateLink(); // Auto-generate when time changes if URL is present
        }
    }, [hours, minutes, seconds]);

    const copyToClipboard = () => {
        if (!generatedLink) return;
        navigator.clipboard.writeText(generatedLink);
        toast.success('Copiado al portapapeles');
    };

    return (
        <div className="min-h-screen bg-background">
            <Toaster position="bottom-center" />

            {/* Hero Section */}
            <section className="bg-surface border-b border-gray-100 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        Herramienta de Video
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
                        Generador de Enlaces de <span className="text-primary">Tiempo</span>
                    </h1>
                    <p className="text-text/60 max-w-2xl mx-auto text-lg">
                        Crea enlaces directos a un momento específico en videos de YouTube.
                        Comparte el minuto exacto sin que tus amigos tengan que buscarlo.
                    </p>
                </div>
            </section>

            {/* Tool Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">

                        {/* URL Input */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-text/80 mb-2">URL del Video de YouTube</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                        if (!generatedLink && e.target.value) generateLink();
                                    }}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full pl-5 pr-12 py-4 bg-background border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                                <div className="absolute right-4 top-4 text-text/30">
                                    <FontAwesomeIcon icon={faLink} />
                                </div>
                            </div>
                        </div>

                        {/* Time Input */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-text/80 mb-4">Momento Específico (Timestamp)</label>
                            <div className="flex items-center gap-4 justify-center bg-background p-6 rounded-xl border border-gray-100">
                                <div className="text-center">
                                    <input
                                        type="number" min="0" value={hours} onChange={(e) => setHours(Number(e.target.value))}
                                        className="w-20 text-center py-2 border border-gray-200 rounded-lg text-xl font-bold focus:border-primary outline-none"
                                    />
                                    <div className="text-xs text-text/40 mt-1">Horas</div>
                                </div>
                                <div className="text-2xl font-bold text-text/30">:</div>
                                <div className="text-center">
                                    <input
                                        type="number" min="0" max="59" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}
                                        className="w-20 text-center py-2 border border-gray-200 rounded-lg text-xl font-bold focus:border-primary outline-none"
                                    />
                                    <div className="text-xs text-text/40 mt-1">Minutos</div>
                                </div>
                                <div className="text-2xl font-bold text-text/30">:</div>
                                <div className="text-center">
                                    <input
                                        type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))}
                                        className="w-20 text-center py-2 border border-gray-200 rounded-lg text-xl font-bold focus:border-primary outline-none"
                                    />
                                    <div className="text-xs text-text/40 mt-1">Segundos</div>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateLink}
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all mb-8 flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faLink} />
                            Generar Enlace
                        </button>

                        {/* Result */}
                        {generatedLink && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <label className="block text-sm font-semibold text-text/80 mb-2">Tu Enlace Generado:</label>
                                <div className="relative group">
                                    <input
                                        readOnly
                                        value={generatedLink}
                                        className="w-full pl-5 pr-32 py-4 bg-green-50/50 border border-green-200 rounded-xl text-green-800 font-medium outline-none"
                                    />
                                    <div className="absolute right-2 top-2 bottom-2 flex gap-2">
                                        <a
                                            href={generatedLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 flex items-center justify-center bg-white border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                            title="Probar enlace"
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                        </a>
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                            Copiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>

            {/* Info Section */}
            <section className="py-12 bg-background">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-60 text-sm">
                    <p>
                        Funciona con enlaces estándar de YouTube, youtu.be y YouTube Shorts.
                        El enlace generado llevará automáticamente al espectador al momento exacto que seleccionaste.
                    </p>
                </div>
            </section>
        </div>
    );
}
