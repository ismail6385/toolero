'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faGlasses, faSpellCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function ReadingLevelClient() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({ words: 0, sentences: 0, syllables: 0 });
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState({ label: '', description: '', color: '' });

    // Syllable estimator for Spanish (approximate)
    const countSyllables = (word: string) => {
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        // Count vowels that are not adjacent to other vowels (diphthong simplification)
        const vowels = word.match(/[aeiouáéíóúü]/g);
        if (!vowels) return 1;

        let count = 0;
        let prevIsVowel = false;
        for (let char of word) {
            const isVowel = /[aeiouáéíóúü]/.test(char);
            if (isVowel && !prevIsVowel) {
                count++;
            }
            prevIsVowel = isVowel;
        }
        // Correction for ending vowels often part of syllable
        // This is a rough heuristic.
        return Math.max(1, count);
    };

    useEffect(() => {
        if (!text.trim()) {
            setStats({ words: 0, sentences: 0, syllables: 0 });
            setScore(0);
            setLevel({ label: '', description: '', color: '' });
            return;
        }

        // 1. Analyze
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
        const vocabulary = text.trim().split(/\s+/);
        const words = vocabulary.length;
        let totalSyllables = 0;
        vocabulary.forEach(w => totalSyllables += countSyllables(w));

        setStats({ words, sentences, syllables: totalSyllables });

        // 2. Calculate Fernandez Huerta Score (Spanish Flesch)
        // L = 206.84 - (60 * (Syllables / Words)) - (102 * (Sentences / Words))
        // Note: The formula usually assumes scaling to 100 words block.
        // P (Syllables per 100 words) = (TotalSyllables / Words) * 100
        // F (Sentences per 100 words) = (TotalSentences / Words) * 100

        const P = (totalSyllables / words) * 100;
        const F = (sentences / words) * 100;

        let L = 206.84 - (0.60 * P) - (1.02 * F);

        // Clamp 0-100
        L = Math.min(100, Math.max(0, L));
        setScore(L);

        // 3. Determine Level
        if (L >= 90) setLevel({ label: 'Muy Fácil', description: 'Nivel 4º Primaria. Lectura muy sencilla, frases cortas.', color: 'text-green-600 bg-green-50' });
        else if (L >= 80) setLevel({ label: 'Fácil', description: 'Nivel 6º Primaria. Lenguaje corriente y popular.', color: 'text-emerald-600 bg-emerald-50' });
        else if (L >= 70) setLevel({ label: 'Bastante Fácil', description: 'Nivel ESO (7º-8º grado). Novelas populares.', color: 'text-teal-600 bg-teal-50' });
        else if (L >= 60) setLevel({ label: 'Normal', description: 'Nivel Educ. Secundaria Obligatoria. Estándar.', color: 'text-blue-600 bg-blue-50' });
        else if (L >= 50) setLevel({ label: 'Algo Difícil', description: 'Nivel Bachillerato. Ensayos y literatura seria.', color: 'text-indigo-600 bg-indigo-50' });
        else if (L >= 40) setLevel({ label: 'Difícil', description: 'Nivel Universitario. Textos académicos.', color: 'text-purple-600 bg-purple-50' });
        else if (L >= 30) setLevel({ label: 'Muy Difícil', description: 'Nivel Especializado/Científico.', color: 'text-pink-600 bg-pink-50' });
        else setLevel({ label: 'Árido', description: 'Nivel Técnico Superior. Requiere alta especialización.', color: 'text-red-600 bg-red-50' });

    }, [text]);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Verificador de Nivel de Lectura</h1>
                    <p className="text-teal-100 text-lg">
                        Analiza la accesibilidad y dificultad de tus textos (Fórmula Fernández-Huerta).
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faGlasses} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input */}
                <div className="relative">
                    <div className="absolute top-4 right-4 text-xs text-gray-400 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                        {stats.words} palabras
                    </div>
                    <textarea
                        className="w-full h-96 p-6 rounded-3xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none resize-none font-serif text-lg leading-relaxed text-gray-700 shadow-sm transition-all"
                        placeholder="Pega tu texto aquí para analizar su complejidad... (Mínimo recomendado: 1 párrafo)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <div className="mt-3 flex justify-between text-sm text-gray-400 px-2">
                        <span>Recomendación: Usa textos completos para mayor precisión.</span>
                        <button onClick={() => setText('')} className="text-red-400 hover:text-red-600">Borrar</button>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    {!text.trim() ? (
                        <div className="h-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-8">
                            <FontAwesomeIcon icon={faBookReader} className="text-4xl mb-4 opacity-50" />
                            <p>Esperando texto...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 animate-fade-in-up">

                            <div className="text-center mb-8">
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Índice de Legibilidad</div>
                                <div className="text-6xl font-black text-gray-800 mb-2">{score.toFixed(0)}<span className="text-2xl text-gray-300 font-normal">/100</span></div>
                                <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${level.color}`}>
                                    {level.label}
                                </div>
                                <p className="mt-4 text-gray-600">{level.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-teal-600">{stats.sentences}</div>
                                    <div className="text-xs text-gray-500 uppercase">Frases</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-teal-600">{(stats.syllables / stats.words).toFixed(2)}</div>
                                    <div className="text-xs text-gray-500 uppercase">Sílabas/Palabra</div>
                                </div>
                            </div>

                            {/* Analysis Bar */}
                            <div className="relative h-4 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 rounded-full w-full mb-2">
                                <div
                                    className="absolute w-4 h-8 bg-white border-4 border-gray-800 rounded shadow-lg -top-2 transition-all duration-500"
                                    style={{ left: `${score}%`, transform: 'translateX(-50%)' }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-gray-400">
                                <span>Difícil (0)</span>
                                <span>Media (50)</span>
                                <span>Fácil (100)</span>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
