'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faRandom, faListOl, faCopy } from '@fortawesome/free-solid-svg-icons';

export default function RandomNumberClient() {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [unique, setUnique] = useState(true);
    const [results, setResults] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const generate = () => {
        setIsAnimating(true);
        setResults([]);

        // Short delay for animation effect
        setTimeout(() => {
            let nums: number[] = [];

            if (unique && (max - min + 1) < count) {
                alert('El rango es demasiado pequeño para generar tantos números únicos.');
                setIsAnimating(false);
                return;
            }

            if (unique) {
                const pool = Array.from({ length: (max - min + 1) }, (_, i) => i + min);
                // Fisher-Yates shuffle
                for (let i = pool.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [pool[i], pool[j]] = [pool[j], pool[i]];
                }
                nums = pool.slice(0, count);
            } else {
                for (let i = 0; i < count; i++) {
                    nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
                }
            }

            setResults(nums);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faDice} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Números Aleatorios</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Obtén números al azar para tus sorteos, juegos o decisiones.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <label className="block text-xs font-bold uppercase text-text/50 mb-2">Mínimo</label>
                        <input
                            type="number"
                            value={min}
                            onChange={e => setMin(parseInt(e.target.value) || 0)}
                            className="w-full text-center text-xl font-bold p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-text/50 mb-2">Máximo</label>
                        <input
                            type="number"
                            value={max}
                            onChange={e => setMax(parseInt(e.target.value) || 0)}
                            className="w-full text-center text-xl font-bold p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-text/50 mb-2">Cantidad</label>
                        <input
                            type="number"
                            value={count}
                            min="1"
                            max="1000"
                            onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full text-center text-xl font-bold p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <label className="flex items-center gap-3 cursor-pointer select-none bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                        <input
                            type="checkbox"
                            checked={unique}
                            onChange={e => setUnique(e.target.checked)}
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-semibold text-text/70">No repetir números</span>
                    </label>
                </div>

                <button
                    onClick={generate}
                    disabled={isAnimating}
                    className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    <FontAwesomeIcon icon={faRandom} className={isAnimating ? 'animate-spin' : ''} />
                    {isAnimating ? 'Generando...' : 'Generar Números'}
                </button>

                {results.length > 0 && (
                    <div className="mt-12 animate-fade-in-up">
                        <div className="flex justify-center flex-wrap gap-4">
                            {results.map((num, i) => (
                                <div key={i} className="min-w-[80px] h-20 flex items-center justify-center bg-white border-2 border-indigo-100 rounded-2xl shadow-sm text-3xl font-bold text-indigo-600">
                                    {num}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => navigator.clipboard.writeText(results.join(', '))}
                                className="text-sm text-indigo-500 hover:text-indigo-700 font-semibold flex items-center justify-center gap-2 mx-auto"
                            >
                                <FontAwesomeIcon icon={faCopy} /> Copiar Resultados
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
