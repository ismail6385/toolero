'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSearch, faDownload, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function YouTubeThumbnailClient() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');

    const extractVideoId = (input: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = input.match(regex);
        if (match && match[1]) {
            setVideoId(match[1]);
            setError('');
        } else {
            setVideoId('');
            setError('URL inválida. Asegúrate de que sea un enlace de YouTube.');
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUrl(val);
        if (val) extractVideoId(val);
        else {
            setVideoId('');
            setError('');
        }
    };

    const qualities = [
        { label: 'Máxima Resolución (HD/4K)', suffix: 'maxresdefault' },
        { label: 'Alta Calidad (HQ)', suffix: 'sddefault' },
        { label: 'Calidad Media (MQ)', suffix: 'hqdefault' },
        { label: 'Calidad Estándar', suffix: 'mqdefault' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faImage} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Descargar Miniaturas de YouTube</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Obtén la imagen de portada de cualquier video al instante y en la mejor calidad disponible.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-12">
                <div className="relative">
                    <input
                        type="text"
                        value={url}
                        onChange={handleInput}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg transition-all"
                        placeholder="Pega el enlace del video aquí (https://youtube.com/watch?v=...)"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <FontAwesomeIcon icon={faSearch} className="text-xl" />
                    </div>
                </div>
                {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <span className="font-semibold">{error}</span>
                    </div>
                )}
            </div>

            {videoId && (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
                    {qualities.map((q) => (
                        <div key={q.suffix} className="bg-surface rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/${q.suffix}.jpg`}
                                    alt={`Miniatura ${q.label}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Hide if image doesn't exist (some videos dont have maxres)
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <a
                                        href={`https://img.youtube.com/vi/${videoId}/${q.suffix}.jpg`}
                                        target="_blank"
                                        download={`thumbnail_${videoId}_${q.suffix}.jpg`}
                                        className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                                    >
                                        <FontAwesomeIcon icon={faDownload} /> Ver / Descargar
                                    </a>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-text">{q.label}</span>
                                <span className="text-xs font-bold text-text/40 uppercase bg-gray-100 px-2 py-1 rounded">JPG</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
