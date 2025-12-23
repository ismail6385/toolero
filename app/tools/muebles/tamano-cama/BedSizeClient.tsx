'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faRulerCombined, faCheck, faTimes, faUserFriends, faChild } from '@fortawesome/free-solid-svg-icons';

export default function BedSizeClient() {
    // Bed Sizes Data (Standard EU/US approx mix, focusing on global standards or customizable)
    // Using EU/Spain common standards mostly but including US terms for clarity
    const bedSizes = [
        { id: 'single', name: 'Individual (90)', width: 90, length: 190, desc: 'Ideal para niños o habitaciones pequeñas.' },
        { id: 'twin', name: 'Twin / Plaza 1.5 (105)', width: 105, length: 190, desc: 'Un poco más ancha, perfecto para jóvenes.' },
        { id: 'double', name: 'Matrimonio (135)', width: 135, length: 190, desc: 'Estándar clásico para parejas, ajustado.' },
        { id: 'queen', name: 'Queen Size (150)', width: 150, length: 200, desc: 'El estándar moderno para parejas.' },
        { id: 'king', name: 'King Size (180)', width: 180, length: 200, desc: 'Máximo confort y espacio individual.' },
        { id: 'superking', name: 'Presidential (200)', width: 200, length: 200, desc: 'Lujo total, como dos camas de 100 unidas.' }
    ];

    const [selectedBed, setSelectedBed] = useState(bedSizes[2]); // Default 135
    const [roomWidth, setRoomWidth] = useState(300);
    const [roomLength, setRoomLength] = useState(350);

    // Clearance logic
    const clearanceSide = (roomWidth - selectedBed.width) / 2;
    const clearanceEnd = roomLength - selectedBed.length;

    // Recommendations
    const isTightSide = clearanceSide < 60;
    const isTightEnd = clearanceEnd < 60;
    const fits = roomWidth >= selectedBed.width && roomLength >= selectedBed.length;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Cama</h1>
                    <p className="text-indigo-100 text-lg">
                        Compara tamaños y verifica si la cama de tus sueños cabe en tu dormitorio.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faBed} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Input Panel */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Bed Selection */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Elige el tamaño
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {bedSizes.map(bed => (
                                <button
                                    key={bed.id}
                                    onClick={() => setSelectedBed(bed)}
                                    className={`p-3 rounded-xl border text-left transition-all ${selectedBed.id === bed.id
                                            ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="font-bold text-gray-800 text-sm">{bed.name}</div>
                                    <div className="text-xs text-gray-500">{bed.width} x {bed.length} cm</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                            <strong>Info:</strong> {selectedBed.desc}
                        </div>
                    </div>

                    {/* Room Input */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Tu Dormitorio (cm)
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 flex justify-between">
                                    Ancho Habitación
                                    <span className="text-indigo-600">{roomWidth} cm</span>
                                </label>
                                <input
                                    type="range" min="150" max="600" step="10"
                                    value={roomWidth} onChange={e => setRoomWidth(Number(e.target.value))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 flex justify-between">
                                    Largo Habitación
                                    <span className="text-indigo-600">{roomLength} cm</span>
                                </label>
                                <input
                                    type="range" min="200" max="600" step="10"
                                    value={roomLength} onChange={e => setRoomLength(Number(e.target.value))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Analysis */}
                    <div className={`p-6 rounded-2xl border ${fits ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'}`}>
                        <h3 className="font-bold text-gray-800 mb-3">Análisis de Espacio</h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                                <span className="text-sm text-gray-600">Paso Lateral (x2)</span>
                                <span className={`font-bold ${isTightSide ? 'text-red-500' : 'text-green-600'}`}>
                                    {Math.floor(clearanceSide)} cm
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                                <span className="text-sm text-gray-600">Paso a los pies</span>
                                <span className={`font-bold ${isTightEnd ? 'text-red-500' : 'text-green-600'}`}>
                                    {Math.floor(clearanceEnd)} cm
                                </span>
                            </div>
                        </div>

                        {(!fits) && (
                            <div className="mt-3 text-sm text-red-600 font-semibold flex gap-2">
                                <FontAwesomeIcon icon={faTimes} className="mt-1" />
                                La cama es más grande que la habitación.
                            </div>
                        )}
                        {(isTightSide || isTightEnd) && fits && (
                            <div className="mt-3 text-sm text-amber-600 font-semibold flex gap-2">
                                <FontAwesomeIcon icon={faRulerCombined} className="mt-1" />
                                El paso es muy estrecho (menos de 60cm). Será incómodo hacer la cama.
                            </div>
                        )}
                        {!isTightSide && !isTightEnd && fits && (
                            <div className="mt-3 text-sm text-green-600 font-semibold flex gap-2">
                                <FontAwesomeIcon icon={faCheck} className="mt-1" />
                                ¡Tamaño perfecto! Tienes espacio de sobra.
                            </div>
                        )}
                    </div>

                </div>

                {/* Visualizer Panel */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Floor Pattern */}
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {/* Room Box */}
                        <div
                            className="bg-white border-4 border-gray-800 shadow-xl relative transition-all duration-500 ease-in-out"
                            style={{
                                width: `${roomWidth * 0.8}px`, // Scaled for view
                                height: `${roomLength * 0.8}px`,
                                maxHeight: '100%',
                                maxWidth: '100%'
                            }}
                        >
                            {/* Dimensions Labels */}
                            <span className="absolute -top-6 left-0 w-full text-center text-xs font-bold text-gray-400">{roomWidth} cm</span>
                            <span className="absolute -left-8 top-0 h-full flex items-center text-xs font-bold text-gray-400 -rotate-90">{roomLength} cm</span>

                            {/* Bed Object */}
                            <div
                                className="absolute bg-indigo-200 border-2 border-indigo-400 rounded-md shadow-sm transition-all duration-500 ease-in-out flex flex-col items-center justify-between p-2"
                                style={{
                                    width: `${selectedBed.width * 0.8}px`,
                                    height: `${selectedBed.length * 0.8}px`,
                                    left: '50%',
                                    top: '0', // Headboard against wall
                                    transform: 'translateX(-50%)' // Centered
                                }}
                            >
                                {/* Pillow Area */}
                                <div className="w-full flex justify-center gap-2">
                                    <div className="h-6 w-12 bg-white/50 rounded-sm"></div>
                                    {selectedBed.width > 105 && <div className="h-6 w-12 bg-white/50 rounded-sm"></div>}
                                </div>
                                <div className="text-indigo-800 font-bold text-xs opacity-50">{selectedBed.name}</div>
                                <div className="h-4"></div>
                            </div>

                            {/* Clearance Arrows - Side */}
                            <div className="absolute top-1/2 left-0 w-1/2 border-b border-red-300 border-dashed" style={{ width: `calc(50% - ${selectedBed.width * 0.4}px)` }}></div>
                            <span className="absolute top-1/2 left-2 -translate-y-4 text-[10px] text-red-500">{Math.floor(clearanceSide)}</span>

                            {/* Clearance Arrows - End */}
                            <div className="absolute bottom-0 left-1/2 h-full border-l border-red-300 border-dashed" style={{ height: `calc(100% - ${selectedBed.length * 0.8}px)` }}></div>
                            <span className="absolute bottom-2 left-1/2 translate-x-2 text-[10px] text-red-500">{Math.floor(clearanceEnd)}</span>

                        </div>

                        <div className="absolute bottom-4 left-6 text-xs text-gray-500 bg-white/80 p-2 rounded backdrop-blur-sm">
                            * Vista superior (Planta)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
