'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSearch, faDownload, faExclamationCircle, faPaste, faLink, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function YouTubeThumbnailClient() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState('');

    const extractVideoId = (input: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = input.match(regex);
        return match ? match[1] : null;
    };

    const handleInput = (val: string) => {
        setUrl(val);
        if (!val) {
            setVideoId('');
            setError('');
            return;
        }

        const id = extractVideoId(val);
        if (id) {
            setVideoId(id);
            setError('');
        } else {
            setVideoId('');
            setError('URL inválida. Asegúrate de que sea un enlace de YouTube.');
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            handleInput(text);
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    };

    const handleCopy = (link: string, key: string) => {
        navigator.clipboard.writeText(link);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    const downloadImage = async (imageUrl: string, fileName: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            // Fallback: Open in new tab if CORS blocks fetch
            window.open(imageUrl, '_blank');
        }
    };

    const qualities = [
        { label: 'Máxima Resolución (HD/4K)', suffix: 'maxresdefault', desc: '1280x720 • Mejor Calidad' },
        { label: 'Alta Calidad (HQ)', suffix: 'sddefault', desc: '640x480 • Estándar' },
        { label: 'Calidad Media (MQ)', suffix: 'hqdefault', desc: '480x360 • Reducido' },
        { label: 'Pequeña (SQ)', suffix: 'mqdefault', desc: '320x180 • Miniatura' },
    ];

    return (
        <div className="w-full">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 mb-10 border border-red-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6 text-red-600">
                        <FontAwesomeIcon icon={faImage} className="text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Descargar Miniatura YouTube
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Extrae y descarga la imagen de portada de cualquier video en Alta Definición (HD, 4K). Gratis y sin marcas de agua.
                    </p>

                    <div className="relative group">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleInput(e.target.value)}
                            className="w-full pl-12 pr-32 py-4 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg transition-all shadow-sm bg-white"
                            placeholder="Pega el enlace del video aquí..."
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors">
                            <FontAwesomeIcon icon={faSearch} className="text-xl" />
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <button
                                onClick={handlePaste}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPaste} /> Pegar
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-100 animate-fade-in">
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}
                </div>
            </div>

            {videoId && (
                <div className="grid gap-8 animate-fade-in-up">
                    {/* Main High Quality Preview */}
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg ring-1 ring-black/5">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <span className="font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                                Mejor Calidad Disponible
                            </span>
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">RECOMENDADO</span>
                        </div>
                        <div className="aspect-video bg-gray-100 relative group overflow-hidden">
                            <img
                                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                alt="Miniatura YouTube 4K"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                }}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4 backdrop-blur-sm">
                                <button
                                    onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, `thumbnail_${videoId}_HD.jpg`)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transform hover:scale-105 transition-all shadow-xl"
                                >
                                    <FontAwesomeIcon icon={faDownload} /> Descargar HD
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Other Qualities Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {qualities.slice(1).map((q) => {
                            const imgUrl = `https://img.youtube.com/vi/${videoId}/${q.suffix}.jpg`;
                            return (
                                <div key={q.suffix} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-video bg-gray-100 relative group">
                                        <img
                                            src={imgUrl}
                                            alt={q.label}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => downloadImage(imgUrl, `thumbnail_${videoId}_${q.suffix}.jpg`)}
                                                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform"
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-sm">{q.label}</h3>
                                                <p className="text-xs text-gray-500">{q.desc}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(imgUrl, q.suffix)}
                                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${copied === q.suffix
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <FontAwesomeIcon icon={copied === q.suffix ? faCheck : faLink} />
                                            {copied === q.suffix ? '¡Enlace Copiado!' : 'Copiar Enlace'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
