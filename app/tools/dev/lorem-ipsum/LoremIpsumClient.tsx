'use client';

import React, { useState, useEffect } from 'react';
import { faParagraph, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

type Unit = 'paragraphs' | 'words' | 'bytes';

export default function LoremIpsumClient() {
    const [unit, setUnit] = useState<Unit>('paragraphs');
    const [count, setCount] = useState('3');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateLorem();
    }, [unit, count]);

    const generateLorem = () => {
        const num = parseInt(count) || 1;
        let result = '';

        if (unit === 'paragraphs') {
            for (let i = 0; i < num; i++) {
                const sentenceCount = 4 + Math.floor(Math.random() * 4);
                const sentences = [];
                for (let j = 0; j < sentenceCount; j++) {
                    const wordCount = 8 + Math.floor(Math.random() * 8);
                    const words = [];
                    for (let k = 0; k < wordCount; k++) {
                        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
                    }
                    let sentence = words.join(' ');
                    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
                    sentences.push(sentence);
                }
                result += sentences.join(' ') + '\n\n';
            }
        } else if (unit === 'words') {
            const words = [];
            for (let i = 0; i < num; i++) {
                words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
            }
            result = words.join(' ');
        } else if (unit === 'bytes') {
            while (result.length < num) {
                result += LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)] + ' ';
            }
            result = result.substring(0, num);
        }

        setOutput(result.trim());
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-orange-100 text-orange-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faParagraph} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador Lorem Ipsum</h1>
                <p className="text-gray-600">Texto de relleno para tus diseños y maquetas.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Unidad</label>
                        <select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value as Unit)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        >
                            <option value="paragraphs">Párrafos</option>
                            <option value="words">Palabras</option>
                            <option value="bytes">Caracteres</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Cantidad</label>
                        <input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            min="1"
                            max="100"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={generateLorem}
                    className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg shadow-md hover:bg-orange-700 transition-all"
                >
                    Generar Texto
                </button>
            </div>

            {output && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Resultado</h3>
                        <button
                            onClick={copyToClipboard}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                            {copied ? 'Copiado!' : 'Copiar'}
                        </button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                        <p className="text-gray-700 whitespace-pre-wrap">{output}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
