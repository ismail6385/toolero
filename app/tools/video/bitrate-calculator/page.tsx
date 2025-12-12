"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faServer, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';

export default function BitrateCalculatorPage() {
    const [width, setWidth] = useState<number>(1920);
    const [height, setHeight] = useState<number>(1080);
    const [fps, setFps] = useState<number>(30);
    const [duration, setDuration] = useState({ hours: 0, minutes: 10, seconds: 0 });
    const [customBitrate, setCustomBitrate] = useState<number>(0); // in kbps

    // Platform Recommendations
    const platforms = [
        {
            name: "YouTube",
            id: "youtube",
            presets: [
                { label: "4K (2160p) 60fps", w: 3840, h: 2160, fps: 60, bitrate: 53000 },
                { label: "4K (2160p) 30fps", w: 3840, h: 2160, fps: 30, bitrate: 35000 },
                { label: "2K (1440p) 60fps", w: 2560, h: 1440, fps: 60, bitrate: 24000 },
                { label: "2K (1440p) 30fps", w: 2560, h: 1440, fps: 30, bitrate: 16000 },
                { label: "1080p 60fps", w: 1920, h: 1080, fps: 60, bitrate: 12000 },
                { label: "1080p 30fps", w: 1920, h: 1080, fps: 30, bitrate: 8000 },
            ]
        },
        {
            name: "Twitch",
            id: "twitch",
            presets: [
                { label: "1080p 60fps (High)", w: 1920, h: 1080, fps: 60, bitrate: 6000 },
                { label: "900p 60fps", w: 1600, h: 900, fps: 60, bitrate: 5000 },
                { label: "720p 60fps", w: 1280, h: 720, fps: 60, bitrate: 4500 },
                { label: "720p 30fps", w: 1280, h: 720, fps: 30, bitrate: 3000 },
            ]
        },
        {
            name: "Facebook / Instagram",
            id: "meta",
            presets: [
                { label: "1080p Video", w: 1920, h: 1080, fps: 30, bitrate: 4000 },
                { label: "720p Video", w: 1280, h: 720, fps: 30, bitrate: 2000 },
            ]
        }
    ];

    const calculateFileSize = (bitrateKbps: number) => {
        const totalSeconds = (duration.hours * 3600) + (duration.minutes * 60) + duration.seconds;
        // Size in Megabytes = (Bitrate (kbps) * Duration (s)) / 8 / 1024
        const sizeMB = (bitrateKbps * totalSeconds) / 8192;
        // Size in Gigabytes
        const sizeGB = sizeMB / 1024;
        return { mb: sizeMB.toFixed(1), gb: sizeGB.toFixed(2) };
    };

    const getRecommendedBitrate = () => {
        // Rough estimation logic based on resolution and FPS
        // Pixel count
        const pixels = width * height;
        let baseBitrate = 0;

        // Very rough heuristic constants
        // 1080p (2MP) ~ 8000 kbps for high quality
        // Scale somewhat linearly but bitrate efficiency improves at higher res
        if (pixels <= 921600) { // 720p or less
            baseBitrate = (pixels / 921600) * 4000;
        } else if (pixels <= 2073600) { // 1080p
            baseBitrate = 4000 + ((pixels - 921600) / (2073600 - 921600)) * 4000;
        } else { // > 1080p
            baseBitrate = 8000 + ((pixels - 2073600) / (8294400 - 2073600)) * 27000; // up to ~35000 for 4k
        }

        // Adjust for FPS (base is 30)
        if (fps > 30) {
            baseBitrate *= 1.5;
        }

        return Math.round(baseBitrate);
    };

    const currentRecommended = getRecommendedBitrate();
    const fileSize = calculateFileSize(customBitrate || currentRecommended);

    const applyPreset = (preset: any) => {
        setWidth(preset.w);
        setHeight(preset.h);
        setFps(preset.fps);
        setCustomBitrate(preset.bitrate);
        toast.success(`Aplicado: ${preset.label}`);
    };

    return (
        <div className="min-h-screen bg-background">
            <Toaster position="bottom-center" />

            {/* Hero Section */}
            <section className="bg-surface border-b border-gray-100 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                        <FontAwesomeIcon icon={faVideo} className="mr-2" />
                        Herramienta de Video
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
                        Calculadora de <span className="text-primary">Bitrate</span>
                    </h1>
                    <p className="text-text/60 max-w-2xl mx-auto text-lg">
                        Calcula el bitrate óptimo y el tamaño de archivo estimado para tus videos de YouTube, Twitch y Streaming.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Inputs */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Video Settings */}
                            <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-text mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">1</span>
                                    Configuración de Video
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-text/70 mb-2">Resolución</label>
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))}
                                                    className="w-full pl-3 pr-8 py-2 bg-background border border-gray-200 rounded-lg text-sm" placeholder="Ancho"
                                                />
                                                <span className="absolute right-2 top-2 text-xs text-text/30">W</span>
                                            </div>
                                            <span className="text-text/30">x</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                                                    className="w-full pl-3 pr-8 py-2 bg-background border border-gray-200 rounded-lg text-sm" placeholder="Alto"
                                                />
                                                <span className="absolute right-2 top-2 text-xs text-text/30">H</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-text/70 mb-2">FPS (Frames)</label>
                                        <select
                                            value={fps} onChange={(e) => setFps(Number(e.target.value))}
                                            className="w-full px-3 py-2 bg-background border border-gray-200 rounded-lg text-sm"
                                        >
                                            <option value="24">24 fps (Cine)</option>
                                            <option value="25">25 fps (PAL)</option>
                                            <option value="30">30 fps (Standard)</option>
                                            <option value="50">50 fps (High)</option>
                                            <option value="60">60 fps (Smooth)</option>
                                            <option value="120">120 fps (Slow Mo)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-text/70 mb-2">Bitrate (kbps)</label>
                                        <input
                                            type="number"
                                            value={customBitrate || currentRecommended}
                                            onChange={(e) => setCustomBitrate(Number(e.target.value))}
                                            className="w-full px-3 py-2 bg-background border border-primary/30 rounded-lg text-sm font-bold text-primary"
                                        />
                                        <div className="text-[10px] text-text/40 mt-1 text-right">
                                            Calculado: {currentRecommended} kbps
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-text mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">2</span>
                                    Duración del Video
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-text/50 mb-1">Horas</label>
                                        <input
                                            type="number" min="0" value={duration.hours}
                                            onChange={(e) => setDuration({ ...duration, hours: Number(e.target.value) })}
                                            className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl text-center font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-text/50 mb-1">Minutos</label>
                                        <input
                                            type="number" min="0" max="59" value={duration.minutes}
                                            onChange={(e) => setDuration({ ...duration, minutes: Number(e.target.value) })}
                                            className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl text-center font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-text/50 mb-1">Segundos</label>
                                        <input
                                            type="number" min="0" max="59" value={duration.seconds}
                                            onChange={(e) => setDuration({ ...duration, seconds: Number(e.target.value) })}
                                            className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl text-center font-bold"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Platform Presets */}
                            <div className="bg-surface rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-text mb-6 flex items-center">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">3</span>
                                    Presets de Plataformas
                                </h3>
                                <div className="space-y-6">
                                    {platforms.map((platform) => (
                                        <div key={platform.id}>
                                            <h4 className="text-sm font-bold text-text/80 mb-3 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faServer} className="text-text/30 text-xs" />
                                                {platform.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {platform.presets.map((preset) => (
                                                    <button
                                                        key={preset.label}
                                                        onClick={() => applyPreset(preset)}
                                                        className="px-3 py-1.5 text-xs bg-background border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-all text-text/60"
                                                    >
                                                        {preset.label} ({Math.round(preset.bitrate / 1000)} Mbps)
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b border-primary/10">
                                    <h3 className="text-lg font-bold text-primary mb-1">Resultados Estimados</h3>
                                    <p className="text-xs text-text/50">Basado en la configuración actual</p>
                                </div>
                                <div className="p-6 space-y-6">

                                    <div>
                                        <div className="text-xs font-semibold text-text/40 uppercase tracking-wider mb-2">Tamaño de Archivo</div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-text">{fileSize.gb}</span>
                                            <span className="text-lg font-medium text-text/40">GB</span>
                                        </div>
                                        <div className="text-sm text-text/50 mt-1">
                                            ({fileSize.mb} MB)
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-100"></div>

                                    <div>
                                        <div className="text-xs font-semibold text-text/40 uppercase tracking-wider mb-2">Configuración Usada</div>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex justify-between">
                                                <span className="text-text/60">Resolución:</span>
                                                <span className="font-medium text-text">{width}x{height}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-text/60">Framerate:</span>
                                                <span className="font-medium text-text">{fps} fps</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-text/60">Bitrate:</span>
                                                <span className="font-medium text-primary">{(customBitrate || currentRecommended) / 1000} Mbps</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span className="text-text/60">Duración:</span>
                                                <span className="font-medium text-text">
                                                    {duration.hours}h {duration.minutes}m {duration.seconds}s
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                                        <div className="flex gap-3">
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-yellow-600 mt-0.5" />
                                            <div className="text-xs text-yellow-800 leading-relaxed">
                                                <strong>Nota:</strong> El tamaño final puede variar dependiendo del método de compresión (VBR/CBR) y la complejidad del video (movimiento, colores).
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-12 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
                    <h2>¿Qué es el Bitrate y por qué importa?</h2>
                    <p>
                        El <strong>bitrate</strong> (tasa de bits) es la cantidad de datos que se procesan por segundo en un archivo de video.
                        Se mide generalmente en kilobits por segundo (kbps) o megabits por segundo (Mbps).
                    </p>
                    <p>
                        Un bitrate más alto significa generalmente mejor calidad de imagen, pero también un tamaño de archivo mucho mayor.
                        Elegir el bitrate correcto es un balance entre calidad visual y capacidad de almacenamiento o ancho de banda de streaming.
                    </p>
                    <h3>Recomendaciones Generales</h3>
                    <ul>
                        <li><strong>Streaming 1080p:</strong> 4,500 - 6,000 kbps</li>
                        <li><strong>Upload YouTube 1080p:</strong> 8,000 - 12,000 kbps</li>
                        <li><strong>Upload YouTube 4K:</strong> 35,000 - 45,000 kbps</li>
                        <li><strong>Grabación Local:</strong> 15,000+ kbps para edición posterior</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
