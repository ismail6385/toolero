'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faWeightHanging, faTh } from '@fortawesome/free-solid-svg-icons';

export default function MDFClient() {
    // Sheet Props
    const [sheetWidth, setSheetWidth] = useState(122); // cm
    const [sheetLength, setSheetLength] = useState(244); // cm
    const [thickness, setThickness] = useState(18); // mm
    const [count, setCount] = useState(1);

    // Project Mode
    // A: Just calculate weight of sheets
    // B: Calculate sheets needed for PARTS
    const [mode, setMode] = useState('weight'); // weight | pieces

    // Pieces Inputs
    const [partWidth, setPartWidth] = useState(60); // cm
    const [partLength, setPartLength] = useState(40); // cm
    const [partCount, setPartCount] = useState(10);
    const [wasteMargin, setWasteMargin] = useState(10); // % waste

    // Constants
    const density = 750; // kg/m3 standard for MDF (ranges 600-800 usually)

    // Calculations
    const sheetAreaM2 = (sheetWidth * sheetLength) / 10000;
    const sheetVolM3 = sheetAreaM2 * (thickness / 1000);
    const singleSheetWeight = sheetVolM3 * density;
    const totalWeight = singleSheetWeight * count;

    // Pieces Calc
    // Simplified Area Method
    const partAreaM2 = (partWidth * partLength) / 10000;
    const totalPartsArea = partAreaM2 * partCount;
    // Add waste
    const requiredArea = totalPartsArea * (1 + wasteMargin / 100);

    const sheetsNeeded = Math.ceil(requiredArea / sheetAreaM2);

    // Fit Check (Basic) - Does the part fit in the sheet at all?
    const fits = (partWidth <= sheetWidth && partLength <= sheetLength) || (partWidth <= sheetLength && partLength <= sheetWidth);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-700 to-amber-800 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Tableros MDF</h1>
                    <p className="text-yellow-100 text-lg">
                        Calcula el peso para el transporte y estima cuántos tableros necesitas.
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
                        <button onClick={() => setMode('weight')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'weight' ? 'bg-white shadow text-amber-800' : 'text-gray-500'}`}>Peso / Transporte</button>
                        <button onClick={() => setMode('pieces')} className={`flex-1 py-2 rounded-lg text-sm font-bold ${mode === 'pieces' ? 'bg-white shadow text-amber-800' : 'text-gray-500'}`}>Piezas (Corte)</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Formato del Tablero</h3>

                        {/* Sheet Dims */}
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
                                {[3, 5.5, 9, 12, 15, 18, 25, 30].map(mm => (
                                    <button key={mm} onClick={() => setThickness(mm)} className={`px-3 py-1 rounded border text-sm ${thickness === mm ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                        {mm}mm
                                    </button>
                                ))}
                            </div>
                        </div>

                        {mode === 'weight' ? (
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Cantidad de Tableros</label>
                                <input type="number" min="1" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-lg text-amber-800 mt-1" />
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4">Piezas a Cortar</h3>
                                <div className="grid grid-cols-2 gap-2 mb-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Ancho Pieza (cm)</label>
                                        <input type="number" value={partWidth} onChange={e => setPartWidth(Number(e.target.value))} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Largo Pieza (cm)</label>
                                        <input type="number" value={partLength} onChange={e => setPartLength(Number(e.target.value))} className="w-full p-2 border rounded" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cantidad Piezas</label>
                                    <input type="number" value={partCount} onChange={e => setPartCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
                                        Margen de Desperdicio (%)
                                        <span className="text-amber-600">{wasteMargin}%</span>
                                    </label>
                                    <input type="range" min="0" max="30" step="5" value={wasteMargin} onChange={e => setWasteMargin(Number(e.target.value))} className="w-full accent-amber-600" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Result */}
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                        {mode === 'weight' ? (
                            <div className="flex items-center gap-4">
                                <div className="text-4xl text-yellow-700 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
                                    <FontAwesomeIcon icon={faWeightHanging} className="text-2xl" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-amber-900">{totalWeight.toFixed(1)} <span className="text-lg">kg</span></div>
                                    <div className="text-xs text-amber-700 font-medium">({singleSheetWeight.toFixed(1)} kg por tablero)</div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-4xl font-black text-amber-900">{sheetsNeeded}</div>
                                    <div className="text-lg font-bold text-amber-700 uppercase">Tableros Necesarios</div>
                                </div>
                                <div className="text-xs text-amber-800 mt-1">
                                    Estimado para {partCount} piezas de {partWidth}x{partLength} con {wasteMargin}% de margen.
                                    {!fits && <div className="text-red-600 font-bold mt-1">⚠️ ¡La pieza es más grande que el tablero!</div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-7">
                    <div className="bg-stone-100 rounded-3xl h-full min-h-[400px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Sheet Visual */}
                        <div
                            className="bg-[#d4a872] shadow-xl relative transition-all duration-500 flex flex-wrap content-start gap-[1px]"
                            style={{
                                width: `${Math.min(sheetWidth * 2, 400)}px`,
                                height: `${Math.min(sheetLength * 2, 500)}px`,
                                maxWidth: '90%',
                                maxHeight: '600px',
                                aspectRatio: `${sheetWidth}/${sheetLength}`
                            }}
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] opacity-50 pointer-events-none"></div>

                            {/* Label */}
                            <div className="absolute -top-6 w-full text-center text-xs font-bold text-gray-400">{sheetWidth} cm</div>
                            <div className="absolute -left-8 top-1/2 -rotate-90 text-xs font-bold text-gray-400">{sheetLength} cm</div>

                            {/* Thickness Indicator */}
                            <div className="absolute -bottom-2 -right-2 bg-amber-900 text-white text-[10px] px-1 rounded shadow">{thickness}mm</div>

                            {/* Pieces Visualization (Simplified Grid) */}
                            {mode === 'pieces' && fits && (
                                Array.from({ length: Math.min(partCount, 20) }).map((_, i) => ( // Show purely illustrative items
                                    <div key={i}
                                        className="bg-white/30 border border-white/50 relative"
                                        style={{
                                            width: `${(partWidth / sheetWidth) * 100}%`,
                                            height: `${(partLength / sheetLength) * 100}%`,
                                            display: 'inline-block'
                                        }}
                                    ></div>
                                ))
                            )}

                        </div>

                        {mode === 'pieces' && (
                            <div className="absolute bottom-4 text-center text-xs text-gray-400 italic">
                                * La visualización es esquemática y no representa el nesting (corte) real optimizado.
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
