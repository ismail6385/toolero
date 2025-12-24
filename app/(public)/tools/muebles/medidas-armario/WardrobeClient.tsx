'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faRulerHorizontal, faTshirt, faArchive } from '@fortawesome/free-solid-svg-icons';

export default function WardrobeClient() {
    // State
    const [wallWidth, setWallWidth] = useState(250); // cm
    const [depthType, setDepthType] = useState('standard'); // standard (60) | shallow (40)

    // Constants
    const MODULE_WIDTH_MAX = 100; // max reasonable door width
    const MODULE_WIDTH_MIN = 40;
    const STANDARD_DEPTH = 60;
    const SHALLOW_DEPTH = 40;

    // Calculation Logic
    // Strategy: Fit the widest possible standard modules (usually 50, 60, 80, 100) or split evenly.
    // Let's go with "Even Split" logic for custom wardrobes, which is common for built-ins.
    // Or standard 60cm modules (Ikea PAX style).

    // Let's do "Standard Modules" estimation.
    // Assuming standard module width is approx 50cm or 75cm or 100cm.
    // We try to fit as many 50cm units as possible, then fill remainder?
    // User often wants "How many doors?".

    // Optimizing for 50-60cm doors is best for hinge stress.
    const idealDoorWidth = 50;
    const numDoors = Math.round(wallWidth / idealDoorWidth);
    const actualDoorWidth = wallWidth / numDoors;

    // Depth check
    const depth = depthType === 'standard' ? STANDARD_DEPTH : SHALLOW_DEPTH;

    // Capacity estimation (rough)
    // 1 meter of standard rod holds ~30 shirts or 10 suits/coats
    const rodLengthMeters = wallWidth / 100;
    const shirtCapacity = Math.floor(rodLengthMeters * 30);
    const foldedCapacity = Math.floor(rodLengthMeters * 40); // Stacks of clothes

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-500 to-stone-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Armario</h1>
                    <p className="text-stone-100 text-lg">
                        Diseña la distribución de puertas y estima la capacidad de tu armario.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faDoorOpen} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-stone-100 text-stone-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Espacio Disponible
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                                    Ancho de Pared
                                    <span className="font-bold text-stone-700 bg-stone-100 px-2 rounded">{wallWidth} cm</span>
                                </label>
                                <input
                                    type="range" min="60" max="600" step="5"
                                    value={wallWidth}
                                    onChange={e => setWallWidth(Number(e.target.value))}
                                    className="w-full accent-stone-600 cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Profundidad</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setDepthType('standard')}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${depthType === 'standard' ? 'border-stone-500 bg-stone-100 text-stone-800' : 'border-gray-200 text-gray-500'}`}
                                    >
                                        <span className="font-bold text-lg">60cm</span>
                                        <span className="text-xs">Estándar (Perchas)</span>
                                    </button>
                                    <button
                                        onClick={() => setDepthType('shallow')}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${depthType === 'shallow' ? 'border-stone-500 bg-stone-100 text-stone-800' : 'border-gray-200 text-gray-500'}`}
                                    >
                                        <span className="font-bold text-lg">40cm</span>
                                        <span className="text-xs">Fondo Reducido</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-stone-100 text-stone-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Distribución Ideal
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-500">Nº Puertas/Módulos</span>
                                <span className="text-xl font-bold text-stone-700">{numDoors}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-500">Ancho por puerta</span>
                                <span className="text-xl font-bold text-stone-700">{actualDoorWidth.toFixed(1)} cm</span>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faTshirt} className="text-stone-400 mb-1" />
                                    <div className="text-lg font-bold text-gray-800">~{shirtCapacity}</div>
                                    <div className="text-xs text-gray-400">Camisas (Percha)</div>
                                </div>
                                <div className="text-center">
                                    <FontAwesomeIcon icon={faArchive} className="text-stone-400 mb-1" />
                                    <div className="text-lg font-bold text-gray-800">~{foldedCapacity}</div>
                                    <div className="text-xs text-gray-400">Prendas (Dobladas)</div>
                                </div>
                            </div>
                            {depthType === 'shallow' && (
                                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                    * Con 40cm, las perchas deben ir frontales (extraíbles), no caben transversales.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Visualizer (Elevation View) */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[400px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Wall */}
                        <div className="absolute inset-0 bg-white"></div>
                        <div className="absolute bottom-0 w-full h-8 bg-gray-200 border-t border-gray-300"></div>

                        {/* Closet Elevation */}
                        <div
                            className="relative bg-stone-100 border-x border-t border-stone-300 shadow-xl flex"
                            style={{
                                width: '90%', // Using percentage width of container to represent the scale relatively
                                height: '80%', // Represents standard 240cm height
                                maxWidth: `${wallWidth * 2}px`, // Max scale constraints
                            }}
                        >
                            {/* Render Doors */}
                            {Array.from({ length: numDoors }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 border-r border-stone-300 relative group hover:bg-stone-50 transition-colors"
                                >
                                    {/* Handle */}
                                    <div className={`absolute top-1/2 w-1 h-8 bg-stone-400 rounded-full ${i % 2 === 0 ? 'right-2' : 'left-2'}`}></div>

                                    {/* Dimensions on hover */}
                                    <div className="absolute bottom-2 inset-x-0 text-center text-[10px] text-stone-400 opacity-0 group-hover:opacity-100">
                                        {actualDoorWidth.toFixed(0)}cm
                                    </div>

                                    {/* Inner Shelf hints (visual flare) */}
                                    <div className="w-full h-full opacity-10 flex flex-col justify-evenly px-2">
                                        <div className="h-px bg-black w-full"></div>
                                        <div className="h-px bg-black w-full"></div>
                                        <div className="h-px bg-black w-full"></div>
                                    </div>
                                </div>
                            ))}

                            {/* Top Dimension Line */}
                            <div className="absolute -top-8 left-0 w-full flex flex-col items-center">
                                <div className="w-full h-2 border-l border-r border-t border-black/20"></div>
                                <span className="text-xs font-bold text-stone-500 bg-white px-1 -mt-3">{wallWidth} cm Total</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
