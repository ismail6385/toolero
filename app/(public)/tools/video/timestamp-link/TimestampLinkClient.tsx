'use client';

import React, { useState } from 'react';
import { faLink, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TimestampLinkClient() {
    const [videoUrl, setVideoUrl] = useState('');
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const extractVideoId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
            /youtube\.com\/embed\/([^&\n?#]+)/,
            /youtube\.com\/v\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return null;
    };

    const generateLink = () => {
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            alert('URL de YouTube no válida');
            return;
        }

        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;
        const s = parseInt(seconds) || 0;
        const totalSeconds = h * 3600 + m * 60 + s;

        const link = `https://youtu.be/${videoId}?t=${totalSeconds}`;
        setGeneratedLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-red-100 text-red-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Link con Timestamp de YouTube</h1>
                <p className="text-gray-600">Comparte videos desde el momento exacto que quieres.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-6">
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">URL del Video de YouTube</label>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Tiempo de Inicio</label>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Horas</label>
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                min="0"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Minutos</label>
                            <input
                                type="number"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                min="0"
                                max="59"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Segundos</label>
                            <input
                                type="number"
                                value={seconds}
                                onChange={(e) => setSeconds(e.target.value)}
                                min="0"
                                max="59"
                                className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={generateLink}
                    disabled={!videoUrl}
                    className="w-full bg-red-600 text-white font-bold py-4 rounded-lg shadow-md hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generar Enlace
                </button>
            </div>

            {generatedLink && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
                    <label className="block text-gray-700 font-medium mb-2">Enlace Generado</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={generatedLink}
                            readOnly
                            className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                        />
                        <button
                            onClick={copyToClipboard}
                            className={`px-6 py-4 rounded-lg font-bold transition-all ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
