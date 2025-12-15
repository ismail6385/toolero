'use client';

import React, { useState } from 'react';
import { faHashtag, faCopy, faCheck, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHashtag as faHashtagSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Category = 'general' | 'fitness' | 'food' | 'travel' | 'fashion' | 'tech' | 'business';

const HASHTAG_DATABASE: Record<Category, string[]> = {
    general: ['love', 'instagood', 'photooftheday', 'beautiful', 'happy', 'cute', 'followme', 'like4like', 'picoftheday', 'art', 'instadaily', 'amazing', 'bestoftheday', 'smile', 'style'],
    fitness: ['fitness', 'gym', 'workout', 'fit', 'motivation', 'fitnessmotivation', 'training', 'health', 'lifestyle', 'bodybuilding', 'fitfam', 'exercise', 'muscle', 'healthylifestyle', 'gymlife'],
    food: ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'foodstagram', 'foodphotography', 'homemade', 'cooking', 'dinner', 'lunch', 'breakfast', 'tasty', 'foodlover'],
    travel: ['travel', 'travelgram', 'instatravel', 'wanderlust', 'vacation', 'traveling', 'adventure', 'explore', 'travelphotography', 'nature', 'trip', 'tourism', 'traveltheworld', 'travelblogger', 'holiday'],
    fashion: ['fashion', 'style', 'ootd', 'fashionblogger', 'fashionista', 'instafashion', 'outfit', 'model', 'stylish', 'fashionstyle', 'shopping', 'beauty', 'moda', 'fashionable', 'outfitoftheday'],
    tech: ['tech', 'technology', 'innovation', 'gadgets', 'coding', 'programming', 'developer', 'software', 'ai', 'startup', 'digital', 'techie', 'computer', 'electronics', 'geek'],
    business: ['business', 'entrepreneur', 'success', 'motivation', 'marketing', 'startup', 'money', 'entrepreneurship', 'businessowner', 'hustle', 'mindset', 'goals', 'leadership', 'inspiration', 'businesslife']
};

export default function HashtagGeneratorClient() {
    const [category, setCategory] = useState<Category>('general');
    const [keyword, setKeyword] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generateHashtags = () => {
        const categoryHashtags = HASHTAG_DATABASE[category];
        let selected = [...categoryHashtags];

        // Add keyword-based hashtags if provided
        if (keyword) {
            const keywordVariations = [
                keyword.toLowerCase(),
                `${keyword.toLowerCase()}gram`,
                `${keyword.toLowerCase()}love`,
                `${keyword.toLowerCase()}daily`,
                `insta${keyword.toLowerCase()}`
            ];
            selected = [...keywordVariations, ...selected];
        }

        // Shuffle and take 30
        const shuffled = selected.sort(() => Math.random() - 0.5).slice(0, 30);
        setHashtags(shuffled);
    };

    const copyHashtags = () => {
        const text = hashtags.map(h => `#${h}`).join(' ');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faHashtagSolid} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Hashtags</h1>
                <p className="text-gray-600">Aumenta el alcance de tus publicaciones con hashtags relevantes.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Palabra clave (opcional)</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Ej: viaje, comida, moda..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Category)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        >
                            <option value="general">General</option>
                            <option value="fitness">Fitness</option>
                            <option value="food">Comida</option>
                            <option value="travel">Viajes</option>
                            <option value="fashion">Moda</option>
                            <option value="tech">Tecnología</option>
                            <option value="business">Negocios</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={generateHashtags}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                    Generar Hashtags
                </button>
            </div>

            {hashtags.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Hashtags Generados ({hashtags.length})</h3>
                        <button
                            onClick={copyHashtags}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                            {copied ? 'Copiado!' : 'Copiar Todos'}
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {hashtags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                        <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                        <FontAwesomeIcon icon={faTiktok} className="text-2xl" />
                        <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                    </div>
                </div>
            )}
        </div>
    );
}
