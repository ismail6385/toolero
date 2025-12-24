'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

export default function ParticleBoardClient() {
    // Sheet Props
    const [sheetWidth, setSheetWidth] = useState(122);
    const [sheetLength, setSheetLength] = useState(244);
    const [thickness, setThickness] = useState(15);
    const [count, setCount] = useState(1);

    // Constants
    const density = 650; // kg/m3 for Particle Board (lighter than MDF)

    // Calculations
    const sheetAreaM2 = (sheetWidth * sheetLength) / 10000;
    const sheetVolM3 = sheetAreaM2 * (thickness / 1000);
    const singleSheetWeight = sheetVolM3 * density;
    const totalWeight = singleSheetWeight * count;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-stone-400 to-stone-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Aglomerado (Chipboard)</h1>
                    <p className="text-stone-100 text-lg">
                        Estima el peso de tableros de partículas para transporte y carga.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faThLarge} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Formato del Tablero</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho (cm)</label>
                                <input type="number" value={sheetWidth} onChange={e => setSheetWidth(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Largo (cm)</label>
                                <input type="number" value={sheetLength} onChange={e => setSheetLength(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Espesor (mm)</label>
                            <div className="flex gap-2 flex-wrap">
                                {[9, 12, 15, 18, 24].map(mm => (
                                    <button key={mm} onClick={() => setThickness(mm)} className={`px-3 py-1 rounded border text-sm ${thickness === mm ? 'bg-stone-500 text-white border-stone-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                        {mm}mm
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                            <input type="number" min="1" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-lg text-stone-700 mt-1" />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-7">
                    <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                        <div className="text-6xl text-stone-400 mb-4">
                            <FontAwesomeIcon icon={faWeightHanging} />
                        </div>
                        <h3 className="text-stone-800 text-sm font-bold uppercase mb-2">Peso Total Estimado</h3>
                        <div className="text-5xl font-black text-stone-700 mb-2">{totalWeight.toFixed(1)} <span className="text-2xl">kg</span></div>
                        <p className="text-stone-500 text-sm">
                            {count} tableros de {thickness}mm ({singleSheetWeight.toFixed(1)} kg c/u)
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
