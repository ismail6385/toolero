'use client';

import React, { useState, useEffect } from 'react';
import { faCalculator, faVideo, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Quality = 'low' | 'medium' | 'high' | 'ultra';

const QUALITY_MULTIPLIERS: Record<Quality, number> = {
    low: 0.5,
    medium: 1,
    high: 1.5,
    ultra: 2
};

const RESOLUTION_BASE_BITRATES: Record<string, number> = {
    '480p': 1500,
    '720p': 2500,
    '1080p': 4500,
    '1440p': 9000,
    '4K': 20000
};

export default function BitrateCalculatorClient() {
    const [resolution, setResolution] = useState('1080p');
    const [quality, setQuality] = useState<Quality>('medium');
    const [fps, setFps] = useState('30');
    const [duration, setDuration] = useState('60');
    const [bitrate, setBitrate] = useState(0);
    const [fileSize, setFileSize] = useState(0);

    useEffect(() => {
        calculateBitrate();
    }, [resolution, quality, fps, duration]);

    const calculateBitrate = () => {
        const baseBitrate = RESOLUTION_BASE_BITRATES[resolution] || 4500;
        const qualityMultiplier = QUALITY_MULTIPLIERS[quality];
        const fpsMultiplier = parseInt(fps) === 60 ? 1.5 : 1;

        const calculatedBitrate = Math.round(baseBitrate * qualityMultiplier * fpsMultiplier);
        setBitrate(calculatedBitrate);

        // File size in MB = (bitrate in kbps * duration in seconds) / (8 * 1024)
        const durationSeconds = parseInt(duration) || 0;
        const sizeInMB = (calculatedBitrate * durationSeconds) / (8 * 1024);
        setFileSize(sizeInMB);
    };

    const formatFileSize = (mb: number) => {
        if (mb < 1024) return `${mb.toFixed(2)} MB`;
        return `${(mb / 1024).toFixed(2)} GB`;
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faVideo} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Bitrate</h1>
                <p className="text-gray-600">Calcula el bitrate óptimo para tus videos y streaming.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Settings Panel */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                        <FontAwesomeIcon icon={faCalculator} className="mr-2 text-blue-500" />
                        Configuración
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Resolución</label>
                            <select
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="480p">480p (SD)</option>
                                <option value="720p">720p (HD)</option>
                                <option value="1080p">1080p (Full HD)</option>
                                <option value="1440p">1440p (2K)</option>
                                <option value="4K">4K (Ultra HD)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Calidad</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['low', 'medium', 'high', 'ultra'] as Quality[]).map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => setQuality(q)}
                                        className={`p-3 rounded-lg border-2 transition-all capitalize ${quality === q
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-blue-200'
                                            }`}
                                    >
                                        {q === 'low' ? 'Baja' : q === 'medium' ? 'Media' : q === 'high' ? 'Alta' : 'Ultra'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">FPS (Cuadros por segundo)</label>
                            <select
                                value={fps}
                                onChange={(e) => setFps(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="24">24 FPS (Cine)</option>
                                <option value="30">30 FPS (Estándar)</option>
                                <option value="60">60 FPS (Suave)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Duración (segundos)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                min="1"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-center">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                        <FontAwesomeIcon icon={faTv} className="mr-2 text-blue-500" />
                        Resultados
                    </h3>

                    <div className="space-y-6">
                        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                            <div className="text-sm text-blue-500 font-bold uppercase mb-2">Bitrate Recomendado</div>
                            <div className="text-4xl font-bold text-blue-700">{bitrate.toLocaleString()} kbps</div>
                            <div className="text-sm text-gray-500 mt-2">{(bitrate / 1000).toFixed(2)} Mbps</div>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-sm text-gray-500 font-bold uppercase mb-2">Tamaño Estimado</div>
                            <div className="text-3xl font-bold text-gray-800">{formatFileSize(fileSize)}</div>
                            <div className="text-xs text-gray-400 mt-2">Para {duration} segundos de video</div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-xs text-yellow-800">
                                <strong>💡 Tip:</strong> Para streaming en vivo, usa un bitrate ligeramente inferior al recomendado para evitar buffering.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
