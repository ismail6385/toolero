'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';

export default function ProportionCalculatorClient() {
    const [a, setA] = useState<string>('1920');
    const [b, setB] = useState<string>('1080');
    const [c, setC] = useState<string>('1280');
    const [d, setD] = useState<string>('');

    const calculate = () => {
        const valA = parseFloat(a);
        const valB = parseFloat(b);
        const valC = parseFloat(c);

        if (!isNaN(valA) && !isNaN(valB) && !isNaN(valC) && valA !== 0) {
            const res = (valB * valC) / valA;
            setD(parseFloat(res.toFixed(4)).toString());
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faCompressArrowsAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Proporciones (Regla de Tres)</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Calcula el valor faltante en una proporción. Ideal para redimensionar imágenes o recetas.
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-surface p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-8">

                {/* Ratio 1 */}
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-100 w-full">
                        <label className="block text-center text-sm font-bold text-gray-400 mb-2">Ancho Original (A)</label>
                        <input
                            type="number"
                            value={a}
                            onChange={(e) => { setA(e.target.value); if (d) setD(''); }}
                            className="w-full text-center text-3xl font-bold bg-transparent focus:outline-none text-gray-800"
                        />
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-100 w-full">
                        <label className="block text-center text-sm font-bold text-gray-400 mb-2">Alto Original (B)</label>
                        <input
                            type="number"
                            value={b}
                            onChange={(e) => { setB(e.target.value); if (d) setD(''); }}
                            className="w-full text-center text-3xl font-bold bg-transparent focus:outline-none text-gray-800"
                        />
                    </div>
                </div>

                <div className="text-4xl font-bold text-primary">=</div>

                {/* Ratio 2 */}
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-100 w-full">
                        <label className="block text-center text-sm font-bold text-gray-400 mb-2">Nuevo Ancho (C)</label>
                        <input
                            type="number"
                            value={c}
                            onChange={(e) => { setC(e.target.value); if (d) setD(''); }}
                            className="w-full text-center text-3xl font-bold bg-transparent focus:outline-none text-gray-800"
                        />
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="bg-primary p-6 rounded-2xl shadow-xl shadow-primary/30 w-full relative overflow-hidden group cursor-pointer" onClick={calculate}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <label className="block text-center text-sm font-bold text-white/80 mb-2">Nuevo Alto (D)</label>
                        <div className="h-10 flex items-center justify-center">
                            {d ? (
                                <span className="text-3xl font-bold text-white">{d}</span>
                            ) : (
                                <button className="bg-white/20 px-4 py-1 rounded text-sm font-bold text-white hover:bg-white/30 transition-colors">
                                    Calcular
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
