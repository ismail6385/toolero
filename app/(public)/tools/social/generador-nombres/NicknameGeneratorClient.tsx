'use client';

import React, { useState } from 'react';
import { faUserTag, faGamepad, faMagic, faCopy, faRandom, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NicknameGeneratorClient() {
    const [category, setCategory] = useState<'gamer' | 'aesthetic' | 'funny' | 'random'>('gamer');
    const [keyword, setKeyword] = useState('');
    const [nicknames, setNicknames] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const prefixes = {
        gamer: ['The', 'Pro', 'Dark', 'Cyber', 'Neon', 'Shadow', 'Ghost', 'Viper', 'X', 'Ultra', 'Master', 'Elite', 'Slayer', 'Ninja'],
        aesthetic: ['soft', 'honey', 'dream', 'cloud', 'bliss', 'velvet', 'moon', 'star', 'angel', 'pure', 'silk', 'rose', 'lavender'],
        funny: ['Potato', 'Lazy', 'Crazy', 'Derp', 'Silly', 'Noob', 'Taco', 'Banana', 'Pickle', 'Muffin', 'Cookie', 'Toast'],
        random: ['Alpha', 'Omega', 'Zeta', 'Delta', 'Echo', 'Nova', 'Flux', 'Core', 'Byte', 'Pixel', 'Bit']
    };

    const suffixes = {
        gamer: ['X', '007', 'YT', 'TV', 'Gaming', 'Plays', 'Sniper', 'Killer', 'Hunter', 'Warrior', 'God', 'King', 'Lord'],
        aesthetic: ['vibes', 'dreams', 'clouds', 'glowing', 'flower', 'skies', 'light', 'dust', 'sparkle', 'glitter'],
        funny: ['Master', 'Man', 'Girl', 'Boy', 'Cat', 'Dog', 'Eater', 'Lover', 'Hater', 'Slayer', 'Juice'],
        random: ['Code', 'Link', 'Net', 'Web', 'Sys', 'Bot', 'AI', 'Hub', 'Zone', 'Lab']
    };

    const generateNicknames = () => {
        const generated: string[] = [];
        const count = 10;
        const currentPrefixes = prefixes[category];
        const currentSuffixes = suffixes[category];

        for (let i = 0; i < count; i++) {
            let nick = '';
            const prefix = currentPrefixes[Math.floor(Math.random() * currentPrefixes.length)];
            const suffix = currentSuffixes[Math.floor(Math.random() * currentSuffixes.length)];
            const num = Math.floor(Math.random() * 999);

            if (keyword) {
                // Incorporate keyword randomly
                const format = Math.floor(Math.random() * 4);
                switch (format) {
                    case 0: nick = `${prefix}${keyword}`; break;
                    case 1: nick = `${keyword}${suffix}`; break;
                    case 2: nick = `${prefix}${keyword}${suffix}`; break; // Longer
                    default: nick = `${keyword}${num}`; break;
                }
            } else {
                const format = Math.floor(Math.random() * 3);
                switch (format) {
                    case 0: nick = `${prefix}${suffix}`; break;
                    case 1: nick = `${prefix}_${suffix}`; break;
                    default: nick = `${prefix}${suffix}${num}`; break;
                }
            }

            // Randomly transform some chars for "Gamer" aesthetic
            if (category === 'gamer' && Math.random() > 0.7) {
                nick = nick.replace(/a/g, '4').replace(/e/g, '3').replace(/i/g, '1').replace(/o/g, '0');
            }

            generated.push(nick);
        }
        setNicknames(generated);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
                <div className="inline-block p-4 rounded-full bg-pink-100 text-pink-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faUserTag} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Nicknames</h1>
                <p className="text-gray-600">Encuentra el nombre de usuario perfecto para tus juegos y redes sociales.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Palabra clave (opcional)</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Ej: Alex, Pro, Cool..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Estilo</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                                onClick={() => setCategory('gamer')}
                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${category === 'gamer' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <FontAwesomeIcon icon={faGamepad} className="mr-1" /> Gamer
                            </button>
                            <button
                                onClick={() => setCategory('aesthetic')}
                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${category === 'aesthetic' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <FontAwesomeIcon icon={faMagic} className="mr-1" /> Aesthetic
                            </button>
                            <button
                                onClick={() => setCategory('funny')}
                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${category === 'funny' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <FontAwesomeIcon icon={faRandom} className="mr-1" /> Divertido
                            </button>
                            <button
                                onClick={() => setCategory('random')}
                                className={`p-2 rounded-lg text-sm font-medium transition-colors ${category === 'random' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <FontAwesomeIcon icon={faRandom} className="mr-1" /> Random
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={generateNicknames}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-lg shadow-md hover:from-pink-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5"
                >
                    Generar Nicknames
                </button>
            </div>

            {nicknames.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {nicknames.map((nick, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition-shadow">
                            <span className="text-lg font-mono text-gray-800">{nick}</span>
                            <button
                                onClick={() => copyToClipboard(nick, index)}
                                className={`p-2 rounded-full transition-colors ${copiedIndex === index ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'}`}
                                title="Copiar"
                            >
                                <FontAwesomeIcon icon={copiedIndex === index ? faCheck : faCopy} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
