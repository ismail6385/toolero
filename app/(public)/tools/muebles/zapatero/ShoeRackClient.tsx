'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints, faRulerCombined, faBoxOpen, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default function ShoeRackClient() {
    // Mode: Calculate Capacity (Have space) OR Calculate Size (Have shoes)
    const [mode, setMode] = useState('capacity'); // capacity | size

    // Capacity Mode Inputs
    const [rackWidth, setRackWidth] = useState(80); // cm
    const [rackHeight, setRackHeight] = useState(100); // cm
    const [rackDepth, setRackDepth] = useState(35); // cm
    const [numShelves, setNumShelves] = useState(4);

    // Size Mode Inputs
    const [numPairs, setNumPairs] = useState(20);
    const [shoeType, setShoeType] = useState('mixed'); // mixed | heels | boots | sneakers

    // Constants
    const pairWidth = 22; // cm avg
    const shoeLength = 30; // cm avg (size 43/44)
    const shoeHeightMap: Record<string, number> = {
        'flat': 12,
        'sneakers': 15,
        'heels': 20,
        'boots': 40,
        'mixed': 18 // Avg including spacing
    };

    // Results
    let capacity = 0;
    let requiredW = 0, requiredH = 0;

    if (mode === 'capacity') {
        const pairsPerShelf = Math.floor(rackWidth / pairWidth);
        // Check depth
        const isDeepEnough = rackDepth >= 30;
        const isDoubleRow = rackDepth >= 55; // Deep enough for two rows?

        let multiplier = 1;
        if (!isDeepEnough) multiplier = 0.7; // Angled shelves hold less or require more height
        if (isDoubleRow) multiplier = 2; // Rare but possible

        capacity = Math.floor(pairsPerShelf * numShelves * multiplier);
    } else {
        // Size mode
        // Assume standard width 80cm module
        const pairsPerStandardShelf = Math.floor(80 / pairWidth); // ~3-4 pairs
        const shelvesNeeded = Math.ceil(numPairs / pairsPerStandardShelf);
        const shelfH = shoeHeightMap[shoeType] || 18;

        requiredW = 80; // Standard module
        requiredH = (shelvesNeeded * shelfH) + (shelvesNeeded * 2) + 10; // +Thickness + Base
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Zapatero</h1>
                    <p className="text-orange-100 text-lg">
                        Organiza tu calzado. Calcula capacidad o diseña el mueble perfecto.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faShoePrints} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Mode Switch */}
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setMode('capacity')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'capacity' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            ¿Cuántos caben?
                        </button>
                        <button
                            onClick={() => setMode('size')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'size' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Diseñar Mueble
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        {mode === 'capacity' ? (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 mb-4">Medidas del Mueble</h3>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Ancho (cm)</label>
                                    <input type="range" min="40" max="200" step="5" value={rackWidth} onChange={e => setRackWidth(Number(e.target.value))} className="w-full accent-orange-500" />
                                    <div className="text-right font-bold text-orange-600">{rackWidth} cm</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Alto (cm)</label>
                                    <input type="range" min="40" max="240" step="10" value={rackHeight} onChange={e => setRackHeight(Number(e.target.value))} className="w-full accent-orange-500" />
                                    <div className="text-right font-bold text-orange-600">{rackHeight} cm</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Fondo (cm)</label>
                                    <input type="range" min="15" max="60" step="5" value={rackDepth} onChange={e => setRackDepth(Number(e.target.value))} className="w-full accent-orange-500" />
                                    <div className="text-right font-bold text-orange-600">{rackDepth} cm</div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Nº Baldas</label>
                                    <div className="flex gap-2 mt-1">
                                        {[2, 3, 4, 5, 6, 8, 10].map(n => (
                                            <button key={n} onClick={() => setNumShelves(n)} className={`px-3 py-1 rounded border text-sm ${numShelves === n ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'}`}>{n}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 mb-4">Tu Colección</h3>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Nº Pares de Zapatos</label>
                                    <input type="number" value={numPairs} onChange={e => setNumPairs(Number(e.target.value))} className="w-full p-2 border rounded-lg mt-1 text-lg font-bold text-orange-600 outline-none focus:border-orange-500" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Tipo Principal</label>
                                    <select value={shoeType} onChange={e => setShoeType(e.target.value)} className="w-full p-2 border rounded-lg mt-1 outline-none">
                                        <option value="mixed">Variado (Estándar)</option>
                                        <option value="sneakers">Zapatillas (Deportivas)</option>
                                        <option value="heels">Tacones</option>
                                        <option value="boots">Botas</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Result Card */}
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-10 text-9xl -mr-4 -mb-4 text-orange-900 pointer-events-none">
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </div>

                        {mode === 'capacity' ? (
                            <>
                                <h3 className="text-orange-900 font-bold mb-2">Capacidad Estimada</h3>
                                <div className="text-5xl font-black text-orange-600 mb-1">{capacity} <span className="text-xl font-medium text-orange-800">pares</span></div>
                                <p className="text-xs text-orange-800 mt-2">
                                    {rackDepth < 25 ? '⚠️ Fondo muy estrecho. Los zapatos deberán ir inclinados (menos capacidad).' : 'Fondo adecuado para posición plana.'}
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-orange-900 font-bold mb-2">Espacio Necesario</h3>
                                <div className="text-sm font-semibold text-orange-800 mb-1">Para {numPairs} pares ({shoeType}):</div>
                                <div className="text-3xl font-black text-orange-600 mt-2">{requiredH} cm <span className="text-lg text-orange-800 font-medium">Alto</span></div>
                                <div className="text-sm text-orange-800">en un módulo de 80cm ancho.</div>
                            </>
                        )}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Rack Visual */}
                        <div
                            className="bg-white border-4 border-gray-300 shadow-xl relative flex flex-col transition-all duration-500"
                            style={{
                                width: mode === 'capacity' ? `${Math.min(rackWidth * 2.5, 400)}px` : '300px', // Scale
                                height: mode === 'capacity' ? `${Math.min(rackHeight * 2.5, 500)}px` : `${Math.min(requiredH * 2.5, 500)}px`,
                                maxWidth: '100%',
                                maxHeight: '90%'
                            }}
                        >
                            {/* Shelves */}
                            {mode === 'capacity' ? (
                                Array.from({ length: numShelves }).map((_, i) => (
                                    <div key={i} className="flex-1 border-b border-gray-200 w-full relative group">
                                        {/* Shoe Dots */}
                                        <div className="absolute bottom-1 w-full flex justify-evenly px-2 gap-1">
                                            {Array.from({ length: Math.floor(rackWidth / 22) }).map((_, k) => (
                                                <div key={k} className="h-3 w-6 bg-orange-400 rounded-full opacity-50"></div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Design mode visual (auto calc shelves)
                                Array.from({ length: Math.ceil(numPairs / Math.floor(80 / 22)) }).map((_, i) => (
                                    <div key={i} className="flex-1 border-b border-gray-200 w-full bg-orange-50/50"></div>
                                ))
                            )}

                            {/* Dimensions Label */}
                            <div className="absolute -right-12 top-0 h-full flex items-center">
                                <div className="h-full border-l border-black/20 relative">
                                    <span className="absolute top-1/2 left-2 -translate-y-1/2 text-xs font-bold text-gray-400 rotate-90 whitespace-nowrap">
                                        {mode === 'capacity' ? rackHeight : requiredH} cm
                                    </span>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 w-full text-center text-xs font-bold text-gray-400">
                                {mode === 'capacity' ? rackWidth : 80} cm
                            </div>

                        </div>

                    </div>
                    <div className="mt-4 text-center text-xs text-gray-400">
                        * Representación esquemática baseada en zapatos de adulto talla 42.
                    </div>
                </div>

            </div>
        </div>
    );
}
