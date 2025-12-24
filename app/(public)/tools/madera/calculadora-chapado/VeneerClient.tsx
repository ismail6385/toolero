'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faScroll } from '@fortawesome/free-solid-svg-icons';

export default function VeneerClient() {
    // Surface to cover
    const [width, setWidth] = useState(100); // cm
    const [length, setLength] = useState(200); // cm
    const [count, setCount] = useState(1);

    // Waste
    const [waste, setWaste] = useState(20); // Veneer has high waste due to matching

    // Veneer Sheet Size (if purchasing backed sheets)
    const [sheetWidth, setSheetWidth] = useState(122);
    const [sheetLength, setSheetLength] = useState(244);

    // Calc
    const areaM2 = (width * length * count) / 10000;
    const totalAreaM2 = areaM2 * (1 + waste / 100);

    const sheetAreaM2 = (sheetWidth * sheetLength) / 10000;
    const sheetsNeeded = Math.ceil(totalAreaM2 / sheetAreaM2);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-800 to-amber-950 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Chapa / Veneer</h1>
                    <p className="text-amber-200 text-lg">
                        Calcula metros cuadrados de chapa necesarios, incluyendo empalmes y desperdicio.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faScroll} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid md:grid-cols-3 gap-8">

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-800 border-b pb-2">Superficie a Enchapar</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Ancho (cm)</label>
                                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Largo (cm)</label>
                                <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full p-2 border rounded" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-800 border-b pb-2">Configuración</h3>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Margen Desperdicio (%)</label>
                            <input type="range" min="0" max="50" step="5" value={waste} onChange={e => setWaste(Number(e.target.value))} className="w-full accent-amber-800" />
                            <div className="text-right text-sm font-bold text-amber-900">{waste}%</div>
                            <p className="text-xs text-gray-400">Recomendado 20-30% para empalmes complejos.</p>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex flex-col justify-center items-center text-center">
                        <h3 className="text-amber-800 font-bold uppercase text-xs mb-2">Total Necesario</h3>
                        <div className="text-4xl font-black text-amber-900 mb-1">{totalAreaM2.toFixed(2)} <span className="text-lg">m²</span></div>
                        <div className="text-sm text-amber-800 font-medium">Equivale a aprox. <strong>{sheetsNeeded}</strong> hojas de {sheetWidth}x{sheetLength}cm</div>
                    </div>

                </div>
            </div>
        </div>
    );
}
