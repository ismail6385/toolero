'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faCouch, faRulerCombined, faArrowsAltV, faEye, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function TvStandClient() {
    // Inputs (Diagonal in inches)
    const [tvSize, setTvSize] = useState(55);
    const [viewingHeight, setViewingHeight] = useState('seated'); // seated | bed

    // Constants
    const inchToCm = 2.54;

    // Calculations
    const tvWidthCm = Math.round(tvSize * 0.87 * inchToCm); // Approx width based on 16:9
    const tvHeightCm = Math.round(tvSize * 0.49 * inchToCm);

    // Stand Width Idea: TV width + 20-30%
    const minStandWidth = Math.round(tvWidthCm * 1.05); // Bare minimum
    const idealStandWidth = Math.round(tvWidthCm * 1.25); // Nice look

    // Viewing Distance (SMPTE / THX)
    // THX: Diagonal / 0.84 = distance inches (40 deg viewing angle)
    // SMPTE: Diagonal / 0.6 = distance (30 deg)
    // Mixed usage (Living room): Size * 1.5 to 2.5 (legacy), but for 4K often Size * 1.2

    // Let's use a modern standard for 4K/HD living rooms
    const minDistanceCm = Math.round((tvSize * 1.2) * inchToCm);
    const maxDistanceCm = Math.round((tvSize * 2.5) * inchToCm);

    // Height Logic (Center of TV at eye level)
    // Eye level seated approx 105-110 cm
    const eyeLevelCm = viewingHeight === 'seated' ? 106 : 120; // Seated standard

    // TV Center = Stand Height + (TV Height / 2)
    // So: Stand Height = Eye Level - (TV Height / 2)
    const idealStandHeight = Math.round(eyeLevelCm - (tvHeightCm / 2));

    // Warning
    const showWarning = idealStandHeight < 30; // Very low stand for huge TVs

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora Mueble TV</h1>
                    <p className="text-slate-300 text-lg">
                        Encuentra el ancho y altura ideal para tu mueble de televisión.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-4">
                    <FontAwesomeIcon icon={faTv} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Tu Televisor
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-600">Tamaño Pantalla (Diagonal)</label>
                                    <span className="text-sm font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded">{tvSize}"</span>
                                </div>
                                <input
                                    type="range" min="32" max="100" step="1"
                                    value={tvSize} onChange={e => setTvSize(Number(e.target.value))}
                                    className="w-full accent-slate-600 cursor-pointer mb-2"
                                />
                                <div className="text-xs text-gray-400 flex justify-between">
                                    <span>32"</span>
                                    <span>100"</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-500">Ancho real aprox:</span>
                                    <span className="font-semibold text-gray-700">{tvWidthCm} cm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Alto real aprox:</span>
                                    <span className="font-semibold text-gray-700">{tvHeightCm} cm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-slate-100 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Resultados Ideales
                        </h3>

                        <div className="space-y-4">
                            {/* Width Result */}
                            <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                    <FontAwesomeIcon icon={faRulerCombined} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-900 text-sm">Ancho del Mueble</h4>
                                    <div className="text-2xl font-bold text-gray-800 my-1">
                                        Min. {minStandWidth} cm
                                    </div>
                                    <p className="text-xs text-blue-800">
                                        Recomendamos buscar muebles de <strong>{idealStandWidth} cm</strong> o más para que se vea equilibrado.
                                    </p>
                                </div>
                            </div>

                            {/* Height Result */}
                            <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                    <FontAwesomeIcon icon={faArrowsAltV} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-900 text-sm">Altura del Mueble</h4>
                                    <div className="text-2xl font-bold text-gray-800 my-1">
                                        ~{idealStandHeight} cm
                                    </div>
                                    <p className="text-xs text-green-800">
                                        Para que el centro de la TV quede a la altura de los ojos sentados.
                                    </p>
                                </div>
                            </div>

                            {/* Distance Result */}
                            <div className="flex items-start gap-4 p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                    <FontAwesomeIcon icon={faEye} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-900 text-sm">Distancia Sofá</h4>
                                    <div className="text-lg font-bold text-gray-800 my-1">
                                        {(minDistanceCm / 100).toFixed(1)}m - {(maxDistanceCm / 100).toFixed(1)}m
                                    </div>
                                </div>
                            </div>

                            {showWarning && (
                                <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                    <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" />
                                    <span>
                                        ¡Ojo! La TV es muy grande. Necesitarás un mueble muy  bajo ({idealStandHeight} cm) o colgarla en la pared.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Visualizer Panel */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] flex items-end justify-center relative overflow-hidden border border-slate-200">

                        {/* Wall Background */}
                        <div className="absolute inset-0 bg-white opacity-50" style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                        {/* Floor */}
                        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-200 to-gray-100 border-t border-gray-300"></div>

                        {/* Scene Container - Scaled */}
                        <div className="relative z-10 w-full max-w-lg mb-16 flex flex-col items-center">

                            {/* TV */}
                            <div
                                className="bg-black rounded border-4 border-gray-800 shadow-2xl relative flex items-center justify-center mb-1 transition-all duration-300"
                                style={{
                                    width: `${tvWidthCm * 1.5}px`, // Scale factor for visual
                                    height: `${tvHeightCm * 1.5}px`, // Scale factor
                                }}
                            >
                                <div className="text-white font-bold opacity-20 text-3xl">{tvSize}"</div>
                                {/* Center Marker */}
                                <div className="absolute w-full border-t border-red-500/50 border-dashed top-1/2 left-0"></div>
                                <span className="absolute -right-24 top-1/2 -translate-y-1/2 text-[10px] text-red-500 font-bold bg-white/80 px-1 rounded">
                                    Ojos (~106cm)
                                </span>
                            </div>

                            {/* Stand */}
                            <div
                                className="bg-amber-700 rounded-t-sm shadow-lg relative transition-all duration-300 flex items-center justify-center border-t border-l border-r border-amber-600"
                                style={{
                                    width: `${idealStandWidth * 1.5}px`, // Scale factor matches TV
                                    height: `${idealStandHeight * 1.5}px` // Scale
                                }}
                            >
                                {/* Stand details */}
                                <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                                <div className="absolute bottom-2 flex gap-4 w-full justify-center px-4">
                                    <div className="h-2 w-1/3 bg-black/20 rounded-full"></div>
                                    <div className="h-2 w-1/3 bg-black/20 rounded-full"></div>
                                </div>

                                {/* Dimensions */}
                                <div className="absolute -left-12 top-1/2 text-xs font-bold text-gray-500">
                                    {idealStandHeight}cm
                                </div>
                                <div className="absolute -bottom-6 text-xs font-bold text-gray-500">
                                    {idealStandWidth}cm
                                </div>
                            </div>

                            {/* Human Outline (Simplified) To show scale */}
                            <div className="absolute -right-10 bottom-0 opacity-20 hidden md:block">
                                {/* SVG or simple shapes representing seated person eye level? Too complex for now, using red line */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
