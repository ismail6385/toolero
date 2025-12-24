'use client';

import React, { useState } from 'react';
import { faSearch, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function YouTubeTagsClient() {
    const [videoUrl, setVideoUrl] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    const extractTags = async () => {
        setError('');
        setTags([]);
        setLoading(true);

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            setError('URL de YouTube no válida');
            setLoading(false);
            return;
        }

        try {
            // Note: Due to CORS restrictions, we can't directly fetch YouTube pages from the browser
            // This is a client-side limitation. In a real implementation, you'd need a backend proxy
            // For demonstration, we'll show a message about this limitation

            setError('⚠️ Nota: Debido a restricciones CORS, esta herramienta requiere un servidor backend para funcionar correctamente. Por ahora, puedes ver las etiquetas manualmente haciendo clic derecho en el video → "Ver código fuente de la página" y buscando "keywords".');

            // Simulated tags for demonstration
            const demoTags = [
                'tutorial', 'how to', 'guide', 'tips', 'tricks',
                'español', 'youtube', 'video', 'content', 'creator'
            ];
            setTags(demoTags);

        } catch (err) {
            setError('Error al extraer las etiquetas. Verifica la URL e intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const copyTags = () => {
        const text = tags.join(', ');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-red-100 text-red-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Extractor de Tags de YouTube</h1>
                <p className="text-gray-600">Descubre las etiquetas que usan otros creadores para optimizar tu SEO.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <label className="block text-gray-700 font-medium mb-2">URL del Video de YouTube</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && extractTags()}
                    />
                    <button
                        onClick={extractTags}
                        disabled={!videoUrl || loading}
                        className="px-6 py-4 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        {loading ? 'Extrayendo...' : 'Extraer'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                    <p className="text-yellow-800 text-sm">{error}</p>
                </div>
            )}

            {tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Etiquetas Encontradas ({tags.length})</h3>
                        <button
                            onClick={copyTags}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                            {copied ? 'Copiado!' : 'Copiar Todas'}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
