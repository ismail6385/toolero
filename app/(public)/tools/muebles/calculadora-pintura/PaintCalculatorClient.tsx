'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintRoller, faRulerCombined, faWindowMaximize, faDoorClosed, faCalculator, faUndo } from '@fortawesome/free-solid-svg-icons';

export default function PaintCalculatorClient() {
    // Standard coverage: 10-12 m2 per liter
    const COVERAGE_PER_LITER = 10;

    const [walls, setWalls] = useState([{ id: 1, width: 4, height: 2.5 }]);
    const [doors, setDoors] = useState(1);
    const [windows, setWindows] = useState(1);
    const [coats, setCoats] = useState(2);

    // Standard dimensions (meters)
    const DOOR_AREA = 1.6; // 0.8 * 2.0
    const WINDOW_AREA = 1.5; // 1.2 * 1.25 approx

    const addWall = () => {
        setWalls([...walls, { id: Date.now(), width: 4, height: 2.5 }]);
    };

    const updateWall = (id: number, field: 'width' | 'height', value: number) => {
        setWalls(walls.map(w => w.id === id ? { ...w, [field]: value || 0 } : w));
    };

    const removeWall = (id: number) => {
        if (walls.length > 1) {
            setWalls(walls.filter(w => w.id !== id));
        }
    };

    // Calculations
    const totalWallArea = walls.reduce((acc, wall) => acc + (wall.width * wall.height), 0);
    const deductions = (doors * DOOR_AREA) + (windows * WINDOW_AREA);
    const paintableArea = Math.max(0, totalWallArea - deductions);
    const totalAreaWithCoats = paintableArea * coats;
    const litersNeeded = Math.ceil((totalAreaWithCoats / COVERAGE_PER_LITER) * 10) / 10; // Round to 1 decimal

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                        <FontAwesomeIcon icon={faPaintRoller} className="text-3xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Pintura</h1>
                    <p className="text-teal-50 text-lg">
                        Calcula cuántos litros de pintura necesitas para renovar tus habitaciones y muebles.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Inputs Section */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Walls Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faRulerCombined} className="text-teal-500" />
                                Paredes (Metros)
                            </h3>
                            <button onClick={addWall} className="text-sm bg-teal-50 text-teal-600 px-3 py-1 rounded-lg font-bold hover:bg-teal-100 transition-colors">
                                + Añadir Pared
                            </button>
                        </div>

                        <div className="space-y-3">
                            {walls.map((wall, index) => (
                                <div key={wall.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl animate-fade-in">
                                    <span className="font-bold text-gray-400 w-6">#{index + 1}</span>
                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 font-semibold block mb-1">Ancho (m)</label>
                                            <input
                                                type="number"
                                                value={wall.width}
                                                onChange={(e) => updateWall(wall.id, 'width', parseFloat(e.target.value))}
                                                className="w-full p-2 rounded-lg border border-gray-300 focus:border-teal-500 outline-none text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-semibold block mb-1">Alto (m)</label>
                                            <input
                                                type="number"
                                                value={wall.height}
                                                onChange={(e) => updateWall(wall.id, 'height', parseFloat(e.target.value))}
                                                className="w-full p-2 rounded-lg border border-gray-300 focus:border-teal-500 outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                    {walls.length > 1 && (
                                        <button onClick={() => removeWall(wall.id)} className="text-gray-400 hover:text-red-500 px-2">
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exclusions Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                            <FontAwesomeIcon icon={faWindowMaximize} className="text-teal-500" />
                            Puertas y Ventanas
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faDoorClosed} className="mr-2 text-gray-400" />
                                    Número de Puertas
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={doors}
                                    onChange={(e) => setDoors(parseInt(e.target.value) || 0)}
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none transition-all"
                                />
                                <p className="text-xs text-gray-400 mt-1">Calculado como 1.6 m² por puerta</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FontAwesomeIcon icon={faWindowMaximize} className="mr-2 text-gray-400" />
                                    Número de Ventanas
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={windows}
                                    onChange={(e) => setWindows(parseInt(e.target.value) || 0)}
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none transition-all"
                                />
                                <p className="text-xs text-gray-400 mt-1">Calculado como 1.5 m² por ventana</p>
                            </div>
                        </div>
                    </div>

                    {/* Coats Card */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <label className="block text-sm font-bold text-gray-700 mb-4">Número de Manos (Capas) de Pintura</label>
                        <div className="flex gap-4">
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setCoats(num)}
                                    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${coats === num
                                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                                            : 'border-gray-200 text-gray-500 hover:border-teal-200'
                                        }`}
                                >
                                    {num} {num === 1 ? 'Mano' : 'Manos'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div>
                    <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-xl sticky top-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalculator} className="text-teal-400" />
                            Resultado Total
                        </h3>

                        <div className="space-y-6">
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                                <div className="text-gray-400 text-sm mb-1">Área a Pintar</div>
                                <div className="text-3xl font-bold">{paintableArea.toFixed(2)} m²</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Total paredes: {totalWallArea.toFixed(2)} m²
                                    <br />
                                    Descuentos: -{deductions.toFixed(2)} m²
                                </div>
                            </div>

                            <div className="bg-teal-500 p-4 rounded-2xl shadow-lg transform scale-105 border border-teal-400">
                                <div className="text-teal-100 text-sm font-bold mb-1 uppercase tracking-wide">Pintura Necesaria</div>
                                <div className="text-4xl font-black mb-1">{litersNeeded} L</div>
                                <div className="text-teal-100 text-xs">
                                    Para {coats} {coats === 1 ? 'mano' : 'manos'} de pintura.
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 leading-relaxed">
                                * Cálculo basado en un rendimiento estándar de 10m² por litro. Recomendamos comprar un 10% extra para retoques y desperdicios.
                            </div>

                            <button
                                onClick={() => { setWalls([{ id: 1, width: 4, height: 2.5 }]); setDoors(1); setWindows(1); }}
                                className="w-full py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
                            >
                                <FontAwesomeIcon icon={faUndo} /> Reiniciar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
