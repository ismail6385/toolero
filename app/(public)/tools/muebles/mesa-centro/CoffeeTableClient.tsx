'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faRulerHorizontal, faRulerVertical, faArrowsAltH, faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function CoffeeTableClient() {
    // Inputs
    const [sofaLength, setSofaLength] = useState(200); // cm
    const [seatHeight, setSeatHeight] = useState(45); // cm

    // Calculations
    const idealLengthMin = Math.round(sofaLength * 0.55);
    const idealLengthMax = Math.round(sofaLength * 0.70);
    const idealHeightMax = seatHeight;
    const idealHeightMin = seatHeight - 5;
    const idealGapMin = 35;
    const idealGapMax = 45;

    // Visual Scales (simple styling helpers)
    const sofaVisualWidth = Math.min(100, (sofaLength / 300) * 100);
    const tableVisualWidth = Math.min(100, (idealLengthMax / 300) * 100);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Mesa de Centro</h1>
                    <p className="text-amber-100 text-lg">
                        Encuentra las medidas perfectas para tu mesa de centro basándote en tu sofá.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <FontAwesomeIcon icon={faCouch} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-amber-100 text-amber-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Medidas de tu Sofá
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-600">Largo del Sofá</label>
                                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">{sofaLength} cm</span>
                                </div>
                                <input
                                    type="range" min="100" max="400" step="5"
                                    value={sofaLength} onChange={e => setSofaLength(Number(e.target.value))}
                                    className="w-full accent-amber-600 cursor-pointer mb-2"
                                />
                                <div className="text-xs text-gray-400 flex justify-between">
                                    <span>100 cm</span>
                                    <span>400 cm</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-600">Altura del Asiento</label>
                                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">{seatHeight} cm</span>
                                </div>
                                <input
                                    type="range" min="30" max="60" step="1"
                                    value={seatHeight} onChange={e => setSeatHeight(Number(e.target.value))}
                                    className="w-full accent-amber-600 cursor-pointer mb-2"
                                />
                                <div className="text-xs text-gray-400 flex justify-between">
                                    <span>30 cm</span>
                                    <span>60 cm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Card */}
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                        <h3 className="font-bold text-amber-900 mb-6 flex items-center gap-2">
                            <span className="bg-white text-amber-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm shadow-sm">2</span>
                            Medidas Ideales de la Mesa
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                        <FontAwesomeIcon icon={faRulerHorizontal} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500">Largo Ideal</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {idealLengthMin} - {idealLengthMax} cm
                                </div>
                                <p className="text-xs text-gray-400 mt-1">2/3 del largo del sofá</p>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                        <FontAwesomeIcon icon={faRulerVertical} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500">Altura Ideal</span>
                                </div>
                                <div className="text-2xl font-bold text-gray-800">
                                    {idealHeightMin} - {idealHeightMax} cm
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Igual o más baja que el asiento</p>
                            </div>
                        </div>

                        <div className="mt-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-start gap-3">
                            <FontAwesomeIcon icon={faArrowsAltH} className="text-amber-500 mt-1" />
                            <div>
                                <span className="font-bold text-gray-800 block text-sm">Distancia de Paso</span>
                                <span className="text-gray-600 text-sm">Deja entre <strong>{idealGapMin} y {idealGapMax} cm</strong> entre el sofá y la mesa para las piernas.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-700">Visualización de Proporción</h3>
                    </div>
                    <div className="flex-grow flex items-center justify-center p-8 bg-grid-slate-100 min-h-[300px] relative">
                        {/* Container */}
                        <div className="relative w-full max-w-md flex flex-col items-center">

                            {/* Sofa Top View */}
                            <div
                                className="bg-gray-800 rounded-lg shadow-lg mb-8 relative transition-all duration-500 ease-in-out flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: '100%', height: '80px' }}
                            >
                                Sofá ({sofaLength} cm)
                                <div className="absolute -bottom-6 text-gray-400 text-[10px] w-full text-center flex items-center justify-center gap-2">
                                    <div className="h-px bg-gray-300 w-4"></div>
                                    <div className="h-4 border-l border-r border-gray-300 w-full flex items-center justify-center">
                                        <span className="bg-white px-1">{idealGapMin}-{idealGapMax} cm</span>
                                    </div>
                                    <div className="h-px bg-gray-300 w-4"></div>
                                </div>
                            </div>

                            {/* Table Top View */}
                            <div
                                className="bg-amber-500 rounded-lg shadow-md relative transition-all duration-500 ease-in-out flex items-center justify-center text-white text-xs font-bold"
                                style={{ width: '66%', height: '50px' }}
                            >
                                Mesa Ideal (~{Math.round((idealLengthMin + idealLengthMax) / 2)} cm)
                            </div>

                            {/* Legend */}
                            <div className="mt-12 text-center">
                                <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Vista Superior (Planta)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
