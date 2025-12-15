'use client';

import React, { useState } from 'react';
import { faFont, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FONT_STYLES = [
    {
        name: 'Serif Bold',
        transform: (text: string) => text.split('').map(c => {
            const code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(code + 119743);
            if (code >= 97 && code <= 122) return String.fromCharCode(code + 119737);
            return c;
        }).join('')
    },
    {
        name: 'Sans Bold',
        transform: (text: string) => text.split('').map(c => {
            const code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(code + 119743);
            if (code >= 97 && code <= 122) return String.fromCharCode(code + 119737);
            return c;
        }).join('')
    },
    {
        name: 'Cursiva',
        transform: (text: string) => text.split('').map(c => {
            const code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(code + 119951);
            if (code >= 97 && code <= 122) return String.fromCharCode(code + 119945);
            return c;
        }).join('')
    },
    {
        name: 'Monospace',
        transform: (text: string) => text.split('').map(c => {
            const code = c.charCodeAt(0);
            if (code >= 65 && code <= 90) return String.fromCharCode(code + 120367);
            if (code >= 97 && code <= 122) return String.fromCharCode(code + 120361);
            if (code >= 48 && code <= 57) return String.fromCharCode(code + 120774);
            return c;
        }).join('')
    },
    {
        name: 'Círculos',
        transform: (text: string) => text.split('').map(c => {
            const map: Record<string, string> = {
                'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
                'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ',
                'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
                'y': 'ⓨ', 'z': 'ⓩ', '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤',
                '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
            };
            return map[c.toLowerCase()] || c;
        }).join('')
    },
    {
        name: 'Cuadrados',
        transform: (text: string) => text.split('').map(c => {
            const map: Record<string, string> = {
                'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷',
                'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿',
                'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇',
                'y': '🅈', 'z': '🅉'
            };
            return map[c.toLowerCase()] || c;
        }).join('')
    },
    {
        name: 'Aesthetic',
        transform: (text: string) => text.split('').join(' ')
    },
    {
        name: 'Invertido',
        transform: (text: string) => {
            const map: Record<string, string> = {
                'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
                'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
                'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
                'y': 'ʎ', 'z': 'z'
            };
            return text.toLowerCase().split('').map(c => map[c] || c).reverse().join('');
        }
    }
];

export default function BioFontsClient() {
    const [inputText, setInputText] = useState('');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faFont} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Fuentes para Bio</h1>
                <p className="text-gray-600">Convierte tu texto en fuentes aesthetic para Instagram, TikTok y más.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
                <label className="block text-gray-700 font-medium mb-2">Escribe tu texto</label>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Escribe algo aquí..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
                />
            </div>

            {inputText && (
                <div className="space-y-4">
                    {FONT_STYLES.map((style, index) => {
                        const transformed = style.transform(inputText);
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 font-bold uppercase mb-2">{style.name}</div>
                                        <div className="text-xl break-words">{transformed}</div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(transformed, index)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all ${copiedIndex === index
                                                ? 'bg-green-500 text-white'
                                                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={copiedIndex === index ? faCheck : faCopy} className="mr-2" />
                                        {copiedIndex === index ? 'Copiado!' : 'Copiar'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
