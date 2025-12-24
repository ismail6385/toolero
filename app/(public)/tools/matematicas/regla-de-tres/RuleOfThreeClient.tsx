'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEquals, faExchangeAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function RuleOfThreeClient() {
    const [valA, setValA] = useState<number | ''>('');
    const [valB, setValB] = useState<number | ''>('');
    const [valC, setValC] = useState<number | ''>('');
    const [mode, setMode] = useState<'direct' | 'inverse'>('direct');

    const result = () => {
        if (typeof valA !== 'number' || typeof valB !== 'number' || typeof valC !== 'number') return null;
        if (valA === 0 && mode === 'direct') return null;
        if (valC === 0 && mode === 'inverse') return null; // Avoid div by zero logic

        let res = 0;
        if (mode === 'direct') {
            // A -> B
            // C -> X
            // X = (B * C) / A
            if (valA === 0) return 0;
            res = (valB * valC) / valA;
        } else {
            // Inverse
            // A -> B
            // C -> X
            // X = (A * B) / C
            if (valC === 0) return 0;
            res = (valA * valB) / valC;
        }

        // Format to max 4 decimals if needed
        return Math.round(res * 10000) / 10000;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faEquals} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Regla de Tres</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Resuelve problemas de proporcionalidad directa e inversa.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                    <button
                        onClick={() => setMode(mode === 'direct' ? 'inverse' : 'direct')}
                        className={`text-xs font-bold uppercase py-1 px-3 rounded-full border transition-all flex items-center gap-2 ${mode === 'direct' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-orange-50 border-orange-200 text-orange-600'}`}
                    >
                        <FontAwesomeIcon icon={faExchangeAlt} />
                        {mode === 'direct' ? 'Modo Directo' : 'Modo Inverso'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-8">
                    {/* Group 1 */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="relative">
                            <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-bold text-text/30">A</span>
                            <input
                                type="number"
                                value={valA}
                                onChange={e => setValA(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-32 h-20 text-3xl font-bold text-center rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                placeholder="A"
                            />
                        </div>
                        <div className="h-8 w-0.5 bg-gray-200"></div>
                        <div className="relative">
                            <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-bold text-text/30">C</span>
                            <input
                                type="number"
                                value={valC}
                                onChange={e => setValC(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-32 h-20 text-3xl font-bold text-center rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                placeholder="C"
                            />
                        </div>
                    </div>

                    {/* Arrows */}
                    <div className="flex flex-col items-center gap-8 text-indigo-300">
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                    </div>

                    {/* Group 2 */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="relative">
                            <span className="absolute -right-6 top-1/2 -translate-y-1/2 font-bold text-text/30">B</span>
                            <input
                                type="number"
                                value={valB}
                                onChange={e => setValB(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-32 h-20 text-3xl font-bold text-center rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                placeholder="B"
                            />
                        </div>
                        <div className="h-8 w-0.5 bg-gray-200"></div>
                        <div className="w-32 h-20 flex items-center justify-center bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-300 transform scale-105 transition-all">
                            <span className="text-3xl font-bold">
                                {result() ?? '?'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-text/50 text-sm">
                    {mode === 'direct' ? (
                        <p>Si <b>A</b> es a <b>B</b>, entonces <b>C</b> es a <b>X</b><br />(B × C) / A = X</p>
                    ) : (
                        <p>Si <b>A</b> es a <b>B</b> inversamente, entonces <b>C</b> es a <b>X</b><br />(A × B) / C = X</p>
                    )}
                </div>
            </div>
        </div>
    );
}
