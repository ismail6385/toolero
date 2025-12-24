'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faWeightHN } from '@fortawesome/free-solid-svg-icons';

export default function PlywoodClient() {
    // Sheet Props
    const [sheetWidth, setSheetWidth] = useState(122);
    const [sheetLength, setSheetLength] = useState(244);
    const [thickness, setThickness] = useState(18);
    const [count, setCount] = useState(1);

    // Project Mode
    const [mode, setMode] = useState('weight'); // weight | pieces

    // Pieces
    const [partWidth, setPartWidth] = useState(60);
    const [partLength, setPartLength] = useState(40);
    const [partCount, setPartCount] = useState(10);
    const [wasteMargin, setWasteMargin] = useState(10);

    // Constants
    const density = 600; // kg/m3 (generic plywood)

    // Calculations
    const sheetAreaM2 = (sheetWidth * sheetLength) / 10000;
    const sheetVolM3 = sheetAreaM2 * (thickness / 1000);
    const singleSheetWeight = sheetVolM3 * density;
    const totalWeight = singleSheetWeight * count;

    // Pieces Calc (Simplified)
    const partAreaM2 = (partWidth * partLength) / 10000;
    const totalPartsArea = partAreaM2 * partCount;
    const requiredArea = totalPartsArea * (1 + wasteMargin / 100);
    const sheetsNeeded = Math.ceil(requiredArea / sheetAreaM2);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Contrachapado (Plywood/Triplay)</h1>
                    <p className="text-orange-50 text-lg">
                        Estima peso y cantidad de hojas para estructuras y muebles.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Tab Switch */}
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button onClick={() => setMode('weight')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'weight' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}>Peso</button>
                        <button onClick={() => setMode('pieces')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'pieces' ? 'bg-white shadow text-orange-600' : 'text-gray-500'}`}>Cantidad Hojas</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Formato de Hoja</h3>
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
                                {[4, 6, 9, 12, 15, 18, 21].map(mm => (
                                    <button key={mm} onClick={() => setThickness(mm)} className={`px-3 py-1 rounded border text-sm ${thickness === mm ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                        {mm}mm
                                    </button>
                                ))}
                            </div>
                        </div>

                        {mode === 'weight' ? (
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Cantidad de Hojas</label>
                                <input type="number" min="1" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-lg text-orange-600 mt-1" />
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">Piezas a Cortar</h3>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Ancho</label>
                                        <input type="number" value={partWidth} onChange={e => setPartWidth(Number(e.target.value))} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Largo</label>
                                        <input type="number" value={partLength} onChange={e => setPartLength(Number(e.target.value))} className="w-full p-2 border rounded" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cantidad Piezas</label>
                                    <input type="number" value={partCount} onChange={e => setPartCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                                        Margen de Desperdicio
                                        <span className="text-orange-600">{wasteMargin}%</span>
                                    </label>
                                    <input type="range" min="0" max="30" step="5" value={wasteMargin} onChange={e => setWasteMargin(Number(e.target.value))} className="w-full accent-orange-600" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-7">
                    <div className="bg-orange-50 p-8 rounded-3xl border border-orange-200 flex flex-col items-center justify-center h-full min-h-[300px] text-center shadow-inner">
                        {mode === 'weight' ? (
                            <>
                                <h3 className="text-orange-800 text-sm font-bold uppercase mb-2">Peso Total Estimado</h3>
                                <div className="text-6xl font-black text-orange-700 mb-2">{totalWeight.toFixed(1)} <span className="text-2xl">kg</span></div>
                                <p className="text-orange-600 text-sm">
                                    ~{singleSheetWeight.toFixed(1)} kg por hoja de {thickness}mm
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-orange-800 text-sm font-bold uppercase mb-2">Hojas Necesarias</h3>
                                <div className="text-6xl font-black text-orange-700 mb-2">{sheetsNeeded}</div>
                                <p className="text-orange-600 text-sm px-6">
                                    Para cortar {partCount} piezas de {partWidth}x{partLength}cm <br />con un {wasteMargin}% de merma.
                                </p>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
