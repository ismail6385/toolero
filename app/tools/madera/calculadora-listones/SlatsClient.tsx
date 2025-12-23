'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerHorizontal, faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

export default function SlatsClient() {
    // Area Dimensions
    const [areaWidth, setAreaWidth] = useState(300); // cm
    const [areaLength, setAreaLength] = useState(200); // cm (Direction of slats usually runs along Length or Width? Let's say Slats run along LENGTH)

    // Slat Config
    const [slatWidth, setSlatWidth] = useState(10); // cm
    const [gap, setGap] = useState(0.5); // cm (5mm)
    const [standardLength, setStandardLength] = useState(240); // cm (Buying length)

    // Calculation
    // Total Width to cover = areaWidth.
    // Each Slat Module = slatWidth + gap.
    // Number of runs = areaWidth / (slatWidth + gap).
    // Total Linear length = Number of runs * areaLength.

    const moduleWidth = slatWidth + gap;
    const numRuns = Math.ceil((areaWidth - gap) / moduleWidth); // Subtract last gap? Usually minimal impact.

    const totalLinearCm = numRuns * areaLength;
    const totalLinearM = totalLinearCm / 100;

    // Pieces needed (buying)
    // Naive: Total Length / Standard Length
    // Smart: Cut optimization (how many parts fit in 1 piece).
    // Let's do: How many parts per piece = floor(standard / requiredLength). 
    // If requiredLength > standard, we need joinery (we add 10% waste). Assuming requiredLength < standard for now or simple division.

    // Pieces Estimation
    let piecesNeeded = 0;
    if (areaLength <= standardLength) {
        // We can cut X parts from 1 standard piece
        const partsPerPiece = Math.floor(standardLength / areaLength);
        if (partsPerPiece >= 1) {
            piecesNeeded = Math.ceil(numRuns / partsPerPiece);
        } else {
            // Slat is longer than stock... need splicing.
            // Just use linear meters + waste.
            piecesNeeded = Math.ceil((totalLinearCm * 1.1) / standardLength);
        }
    } else {
        // Long runs. Just linear meters / standard + waste
        piecesNeeded = Math.ceil((totalLinearCm * 1.1) / standardLength);
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Listones / Tarima</h1>
                    <p className="text-green-100 text-lg">
                        Calcula material lineal para decks, revestimientos de pared y pérgolas.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faGripLinesVertical} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Área a Cubrir</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho Total (cm)</label>
                                <input type="number" value={areaWidth} onChange={e => setAreaWidth(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                                <p className="text-[10px] text-gray-400 mt-1">Dirección perpendicular a los listones</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Largo (cm)</label>
                                <input type="number" value={areaLength} onChange={e => setAreaLength(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                                <p className="text-[10px] text-gray-400 mt-1">Dirección de los listones</p>
                            </div>
                        </div>

                        <h3 className="font-bold text-gray-800 mb-4 pt-4 border-t border-gray-100">Dimensiones del Listón</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho Listón (cm)</label>
                                <input type="number" step="0.5" value={slatWidth} onChange={e => setSlatWidth(Number(e.target.value))} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Separación (gap)</label>
                                <input type="number" step="0.1" value={gap} onChange={e => setGap(Number(e.target.value))} className="w-full p-2 border rounded" />
                                <p className="text-[10px] text-gray-400 mt-1">cm</p>
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Largo de Compra (cm)</label>
                            <select value={standardLength} onChange={e => setStandardLength(Number(e.target.value))} className="w-full p-2 border rounded bg-gray-50 font-medium">
                                <option value="244">244 cm (8 pies)</option>
                                <option value="305">305 cm (10 pies)</option>
                                <option value="366">366 cm (12 pies)</option>
                                <option value="488">488 cm (16 pies)</option>
                            </select>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-green-800 text-xs font-bold uppercase mb-1">Total Metros Lineales</h3>
                                <div className="text-3xl font-black text-green-700">{totalLinearM.toFixed(1)} <span className="text-lg">m</span></div>
                            </div>
                            <div className="border-l border-green-200 pl-4">
                                <h3 className="text-green-800 text-xs font-bold uppercase mb-1">Piezas a Comprar</h3>
                                <div className="text-3xl font-black text-green-700">{piecesNeeded}</div>
                                <div className="text-xs text-green-600 font-medium">de {standardLength} cm</div>
                            </div>
                        </div>
                        <div className="text-xs text-green-800/60 mt-4 bg-green-100 p-2 rounded">
                            Filas calculadas: <strong>{numRuns}</strong>. Incluye merma si hay mucho recorte.
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-7">
                    <div className="bg-white rounded-3xl h-full min-h-[400px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden shadow-inner">

                        {/* Deck Visual */}
                        <div
                            className="bg-gray-100 border border-gray-300 relative shadow-lg overflow-hidden flex"
                            style={{
                                width: `${Math.min(areaWidth * 1.5, 400)}px`,
                                height: `${Math.min(areaLength * 1.5, 500)}px`,
                                gap: `${(gap / areaWidth) * 100}%` // Percentage gap
                            }}
                        >
                            {/* Create Slat Lines */}
                            {Array.from({ length: Math.min(numRuns, 50) }).map((_, i) => (
                                <div key={i} className="h-full bg-amber-700/80 border-r border-amber-900/20" style={{
                                    flex: `0 0 ${((slatWidth) / areaWidth) * 100}%` // Percent width
                                }}></div>
                            ))}

                            {/* Dimensions Overlay */}
                            <div className="absolute top-0 w-full text-center bg-white/50 text-xs font-bold backdrop-blur-sm">{areaWidth} cm</div>
                            <div className="absolute left-0 top-1/2 -rotate-90 origin-left text-xs font-bold bg-white/50 px-2 backdrop-blur-sm">{areaLength} cm</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
