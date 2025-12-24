'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faBorderAll, faTape } from '@fortawesome/free-solid-svg-icons';

export default function MelamineClient() {
    // Sheet inputs
    const [sheetWidth, setSheetWidth] = useState(122);
    const [sheetLength, setSheetLength] = useState(244);
    const [thickness, setThickness] = useState(15); // mm standard for carcasses, 18 for fronts

    // Part inputs
    const [partWidth, setPartWidth] = useState(60);
    const [partLength, setPartLength] = useState(40);
    const [partCount, setPartCount] = useState(1);
    const [wasteMargin, setWasteMargin] = useState(15); // Melamine chips easily, higher waste?

    // Edge Banding Inputs (Canto)
    const [edgeSides, setEdgeSides] = useState(4); // 0, 1, 2, 3, 4 sides

    // Constants
    const density = 700; // kg/m3

    // Calculations
    const sheetAreaM2 = (sheetWidth * sheetLength) / 10000;
    const sheetWeight = sheetAreaM2 * (thickness / 1000) * density;

    const partAreaM2 = (partWidth * partLength) / 10000;
    const totalRequiredArea = (partAreaM2 * partCount) * (1 + wasteMargin / 100);
    const sheetsNeeded = Math.ceil(totalRequiredArea / sheetAreaM2);

    // Edge Banding
    // Permiter of one part: (W + L) * 2 IF 4 sides
    // Smart logic: 
    // - 1 Long, 1 Short, 2 Long, 2 Short, etc?
    // Let's simplify: "Total Perimeter" or "Specific Sides".
    // For general estimation, usually people edge all exposed sides.
    // Let's stick to "Number of sides to edge: All 4? Long only? Short only?"
    // Simple selector: "Lados a cantear" -> "Todos (4)", "Largos (2)", "Cortos (2)", "Uno Largo (1)", "Ninguno".

    let edgePerPart = 0; // cm
    if (edgeSides === 4) edgePerPart = (partWidth * 2) + (partLength * 2);
    if (edgeSides === 2) edgePerPart = (partLength * 2); // Assume 2 Longs usually? Or 1L+1W?
    // Let's make it clearer in UI. But for calc:
    // User might enter "Linear meters of edge banding needed".
    // Best metric: Total Perimeter?
    // Let's start with Total Perimeter * Part Count if 4 sides. 
    // And allow a "Meters" result.

    const totalEdgeMeters = ((partWidth + partLength) * 2 * partCount) / 100; // Basic perimeter all sides approximation for now, valid if edging all.

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Melamine y Cantos</h1>
                    <p className="text-slate-200 text-lg">
                        Estima tableros y metros de tapacanto necesarios para tus muebles.
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
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Material Base</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho Tablero</label>
                                <input type="number" value={sheetWidth} onChange={e => setSheetWidth(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Largo Tablero</label>
                                <input type="number" value={sheetLength} onChange={e => setSheetLength(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-800 mb-4 pt-4 border-t border-gray-100">Piezas / Despiece</h3>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho Pieza</label>
                                <input type="number" value={partWidth} onChange={e => setPartWidth(Number(e.target.value))} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Largo Pieza</label>
                                <input type="number" value={partLength} onChange={e => setPartLength(Number(e.target.value))} className="w-full p-2 border rounded" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                            <input type="number" min="1" value={partCount} onChange={e => setPartCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-lg text-slate-700" />
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                                <FontAwesomeIcon icon={faTape} /> Tapacanto (Edge Banding)
                            </label>
                            <select className="w-full p-2 border rounded text-sm" value={edgeSides} onChange={e => setEdgeSides(Number(e.target.value))}>
                                <option value="0">Sin Cantos</option>
                                <option value="1">1 Largo (Frente)</option>
                                <option value="2">2 Largos</option>
                                <option value="3">1 Largo + 2 Anchos</option>
                                <option value="4">4 Lados (Todo el perímetro)</option>
                            </select>
                            <p className="text-xs text-slate-400 mt-2">
                                Calcula los metros lineales de cinta necesarios.
                            </p>
                        </div>
                    </div>


                </div>

                {/* Results */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-slate-400 font-bold uppercase text-xs mb-1">Tableros Necesarios</h3>
                            <div className="text-5xl font-black text-slate-700 leading-none">{sheetsNeeded}</div>
                            <div className="text-xs text-slate-500 mt-2">
                                Formato {sheetWidth}x{sheetLength}cm <br />
                                Peso aprox: <strong>{sheetWeight.toFixed(1)} kg</strong> c/u
                            </div>
                        </div>
                        <div className="border-l border-gray-100 pl-8">
                            <h3 className="text-slate-400 font-bold uppercase text-xs mb-1">Canto Necesario</h3>
                            <div className="text-5xl font-black text-orange-600 leading-none">
                                {
                                    edgeSides === 0 ? 0 :
                                        edgeSides === 4 ? ((partLength + partWidth) * 2 * partCount / 100).toFixed(1) :
                                            edgeSides === 1 ? (Math.max(partLength, partWidth) * partCount / 100).toFixed(1) :
                                                (Math.max(partLength, partWidth) * 2 * partCount / 100).toFixed(1) // rough approx for 2 sides
                                }
                                <span className="text-xl text-orange-400 ml-1">m</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-2">
                                Metros lineales totales <br />
                                (Incluyendo 10% merma: {
                                    (Number(
                                        edgeSides === 0 ? 0 :
                                            edgeSides === 4 ? ((partLength + partWidth) * 2 * partCount / 100) :
                                                edgeSides === 1 ? (Math.max(partLength, partWidth) * partCount / 100) :
                                                    (Math.max(partLength, partWidth) * 2 * partCount / 100)
                                    ) * 1.1).toFixed(1)
                                } m)
                            </div>
                        </div>
                    </div>

                    {/* Edge Visualizer */}
                    <div className="bg-slate-100 rounded-3xl h-[300px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">
                        <div
                            className="bg-white border text-center shadow-lg relative flex items-center justify-center transition-all"
                            style={{
                                width: `${Math.min(partWidth * 3, 300)}px`,
                                height: `${Math.min(partLength * 3, 250)}px`,
                                maxWidth: '100%',
                            }}
                        >
                            <span className="text-xs font-bold text-slate-300 z-10">{partWidth}x{partLength}</span>

                            {/* Edges */}
                            {/* Logic to show highlighted borders based on edgeSides */}
                            {edgeSides >= 1 && <div className="absolute top-0 w-full h-1 bg-orange-500"></div>} {/* Front Long */}
                            {edgeSides >= 2 && <div className="absolute bottom-0 w-full h-1 bg-orange-500"></div>} {/* Back Long */}
                            {edgeSides >= 3 && <div className="absolute left-0 h-full w-1 bg-orange-500"></div>} {/* Side Short */}
                            {edgeSides === 4 && <div className="absolute right-0 h-full w-1 bg-orange-500"></div>} {/* Side Short */}
                        </div>
                        <div className="absolute bottom-4 text-xs text-slate-400">Vista de la pieza con cantos (Naranja)</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
