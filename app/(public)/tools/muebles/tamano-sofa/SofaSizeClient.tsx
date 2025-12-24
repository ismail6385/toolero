'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faDoorOpen, faRulerCombined, faCheckCircle, faTimesCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function SofaSizeClient() {
    // Dimensions in cm
    const [sofa, setSofa] = useState({ width: 220, depth: 95, height: 85, diagonal: 0 });
    const [room, setRoom] = useState({ width: 400, length: 500 });
    const [door, setDoor] = useState({ width: 80, height: 210 });

    // Derived calculations
    const sofaArea = (sofa.width * sofa.depth) / 10000; // m2
    const roomArea = (room.width * room.length) / 10000; // m2
    const occupation = (sofaArea / roomArea) * 100;

    // "Will it fit through the door?" Logic
    // 1. If door width > sofa height OR door width > sofa depth -> EASY FIT
    // 2. If door width < both, we need diagonal depth check.
    // Diagonal Depth (approx) = sqrt(depth^2 + height^2) if not provided? 
    // Usually measured from top back corner to front leg.
    // Simplified check:
    const fitsDoorWidth = (door.width > sofa.height) || (door.width > sofa.depth);
    const fitsDoorHeight = door.height > sofa.width; // Can stand it up?

    // Often you tilt the sofa. If diagonal depth < door width, it fits.
    // Calculating approximate diagonal if 0
    const calcDiagonal = sofa.diagonal || Math.sqrt(Math.pow(sofa.depth, 2) + Math.pow(sofa.height, 2));
    const fitsTilt = calcDiagonal < door.height && sofa.depth < door.width;

    // Overall fit check (Simplified logic for UI)
    const canEnter = fitsDoorWidth || (sofa.diagonal > 0 && sofa.diagonal < door.height);
    const fitsInRoom = (sofa.width < room.width || sofa.width < room.length) && (sofa.depth < room.width || sofa.depth < room.length);

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                        <FontAwesomeIcon icon={faCouch} className="text-3xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Tamaño de Sofá</h1>
                    <p className="text-blue-100 text-lg">
                        Verifica si tu sofá cabe en tu salón y si pasará por la puerta.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Sofa Input */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Dimensiones del Sofá (cm)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Ancho (Largo)</label>
                                <input type="number" value={sofa.width} onChange={e => setSofa({ ...sofa, width: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Profundidad</label>
                                <input type="number" value={sofa.depth} onChange={e => setSofa({ ...sofa, depth: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Altura</label>
                                <input type="number" value={sofa.height} onChange={e => setSofa({ ...sofa, height: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Diagonal (Opcional)</label>
                                <input type="number" value={sofa.diagonal} onChange={e => setSofa({ ...sofa, diagonal: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" placeholder="Auto" />
                            </div>
                        </div>
                    </div>

                    {/* Room & Door Input */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Habitación y Acceso (cm)
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Largo Habitación</label>
                                <input type="number" value={room.length} onChange={e => setRoom({ ...room, length: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Ancho Habitación</label>
                                <input type="number" value={room.width} onChange={e => setRoom({ ...room, width: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                        </div>
                        <div className="border-t pt-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 flex items-center gap-1"><FontAwesomeIcon icon={faDoorOpen} /> Ancho Puerta</label>
                                <input type="number" value={door.width} onChange={e => setDoor({ ...door, width: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Alto Puerta</label>
                                <input type="number" value={door.height} onChange={e => setDoor({ ...door, height: Number(e.target.value) })} className="w-full p-2 border rounded-lg mt-1" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Analysis */}
                <div className="space-y-6">
                    {/* Access Check */}
                    <div className={`p-6 rounded-2xl border ${canEnter ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} transition-all`}>
                        <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${canEnter ? 'text-green-800' : 'text-red-800'}`}>
                            <FontAwesomeIcon icon={canEnter ? faCheckCircle : faTimesCircle} />
                            {canEnter ? 'Pasa por la puerta' : 'Difícil acceso'}
                        </h3>
                        <p className={`text-sm ${canEnter ? 'text-green-700' : 'text-red-700'}`}>
                            {canEnter
                                ? 'El sofá debería pasar sin problemas, ya sea recto o inclinado.'
                                : 'Las dimensiones del sofá son mayores que el ancho de la puerta. Mide la diagonal o considera un sofá desmontable.'}
                        </p>
                    </div>

                    {/* Room Fit Check */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Análisis de Espacio</h3>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Ocupación del Salón</span>
                            <span className="font-bold text-indigo-600">{occupation.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min(occupation, 100)}%` }}></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 uppercase font-bold">Área Sofá</div>
                                <div className="text-xl font-bold text-gray-800">{sofaArea.toFixed(2)} m²</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 uppercase font-bold">Área Libre</div>
                                <div className="text-xl font-bold text-gray-800">{(roomArea - sofaArea).toFixed(2)} m²</div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
                            <strong>Consejo:</strong> Se recomienda dejar al menos 60-90 cm de espacio libre alrededor del sofá para circular cómodamente.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
