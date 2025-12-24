'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRulerVertical, faLayerGroup, faTools } from '@fortawesome/free-solid-svg-icons';

export default function BookshelfClient() {
    // Inputs
    const [unitHeight, setUnitHeight] = useState(200); // cm
    const [unitWidth, setUnitWidth] = useState(80); // cm
    const [materialThickness, setMaterialThickness] = useState(2); // cm (approx 19mm standard MDF)
    const [bookType, setBookType] = useState('mixed'); // paperback | large | manual | mixed

    // Standard Book Heights (with finger gap)
    const heightMap: Record<string, number> = {
        'paperback': 22, // average pocketbook is 18-20cm
        'hardcover': 26, // trade novels 23-24cm
        'large': 32, // Art books / A4 approx 30cm
        'vinyl': 34, // LPs are 31.5cm
        'mixed': 30 // Safe average
    };

    const targetShelfHeight = heightMap[bookType] || 30;

    // Calculation:
    // Available vertical space = Unit Height - (Thickness * Top/Bottom) - Baseboard?
    // Let's assume Top + Bottom thickness + Kickplate (Zócalo) usually 8cm
    const kickplate = 8;
    const usableVerticalSpace = unitHeight - (materialThickness * 2) - kickplate;

    // Iterative fit: (ShelfSpace + Thickness) * N = Usable?
    // Not exactly. N shelves creates N+1 spaces? No.
    // Fixed shelves case:
    // If we want N spaces of height H:
    // Total Height = Kickplate + Bottom + (N * H) + ((N-1) * ShelfThickness) + Top
    // We calculate Max N spaces that fit.

    // Let H = targetShelfHeight
    // Space needed for 1 shelf bay = H + materialThickness
    // Approximate count:
    let numSpaces = Math.floor(usableVerticalSpace / (targetShelfHeight + materialThickness));
    // Adjustment: The last shelf doesn't need a thickness above it inside the usable space calculation if we treat top as separate.
    // Let's refine:
    // Total Internal Height = unitHeight - kickplate - (2 * thickness) [Top & Bottom]
    // We want to fit X shelves. 
    // Height consumed = (numShelves * thickness) + (numSpaces * actualSpaceHeight)
    // numSpaces = numShelves + 1

    // Formula: InternalHeight >= (numShelves * thickness) + ((numShelves + 1) * targetHeight)
    // InternalHeight >= numShelves * (thickness + targetHeight) + targetHeight

    // Solve for numShelves:
    // InternalHeight - targetHeight >= numShelves * (thickness + targetHeight)
    // numShelves = (InternalHeight - targetHeight) / (thickness + targetHeight)

    const internalHeight = unitHeight - kickplate - (materialThickness * 2);
    const numShelves = Math.floor((internalHeight - targetShelfHeight) / (materialThickness + targetShelfHeight));
    const numSpacesFinal = numShelves + 1;

    // Distribute remaining space evenly
    const totalThicknessUsed = numShelves * materialThickness;
    const remainingForSpaces = internalHeight - totalThicknessUsed;
    const actualShelfHeight = remainingForSpaces / numSpacesFinal;

    // Capacity Estimation (Books per shelf)
    // Avg book thickness ~2.5cm
    const avgBookThickness = 2.5;
    const booksPerShelf = Math.floor((unitWidth - (materialThickness * 2)) / avgBookThickness);
    const totalBooks = booksPerShelf * numSpacesFinal;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Diseñador de Estantería</h1>
                    <p className="text-amber-100 text-lg">
                        Calcula los cortes y espacios para tu biblioteca perfecta.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-4">
                    <FontAwesomeIcon icon={faBook} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-amber-100 text-amber-800 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Dimensiones Mueble
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 flex justify-between">
                                    Alto Total
                                    <span className="text-amber-700 font-bold">{unitHeight} cm</span>
                                </label>
                                <input
                                    type="range" min="60" max="300" step="5"
                                    value={unitHeight} onChange={e => setUnitHeight(Number(e.target.value))}
                                    className="w-full accent-amber-700 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 flex justify-between">
                                    Ancho Total
                                    <span className="text-amber-700 font-bold">{unitWidth} cm</span>
                                </label>
                                <input
                                    type="range" min="30" max="150" step="5"
                                    value={unitWidth} onChange={e => setUnitWidth(Number(e.target.value))}
                                    className="w-full accent-amber-700 cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-2 block">Grosor Madera (cm)</label>
                                <div className="flex gap-2">
                                    {[1.6, 1.9, 2.5, 3].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setMaterialThickness(t)}
                                            className={`flex-1 py-1 rounded border text-sm ${materialThickness === t ? 'bg-amber-700 text-white border-amber-700' : 'border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-amber-100 text-amber-800 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Contenido
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'paperback', label: 'Bolsillo', h: '22cm' },
                                { id: 'hardcover', label: 'Novela', h: '26cm' },
                                { id: 'large', label: 'Gran Formato', h: '32cm' },
                                { id: 'vinyl', label: 'Vinilos', h: '34cm' }
                            ].map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setBookType(type.id)}
                                    className={`p-2 rounded-lg border text-left flex flex-col ${bookType === type.id ? 'border-amber-600 bg-amber-50 ring-1 ring-amber-600' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <span className="font-bold text-gray-800 text-sm">{type.label}</span>
                                    <span className="text-xs text-gray-500">Espacio: {type.h}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                            <FontAwesomeIcon icon={faTools} /> Materiales
                        </h3>
                        <ul className="text-sm space-y-1 text-amber-900 opacity-80">
                            <li>• {numSpacesFinal} Huecos de <strong>{actualShelfHeight.toFixed(1)} cm</strong></li>
                            <li>• {numShelves} Baldas de {unitWidth - (materialThickness * 2)} x Fondo</li>
                            <li>• {2} Laterales de {unitHeight} cm</li>
                            <li>• Capacidad: ~{totalBooks} libros</li>
                        </ul>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-end justify-center p-8 overflow-hidden shadow-inner bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">

                        {/* Bookshelf Draw */}
                        <div
                            className="relative bg-amber-800 shadow-xl flex flex-col border-x border-t border-amber-900 transition-all duration-300"
                            style={{
                                width: `${Math.min(unitWidth * 3, 500)}px`, // Visual scale
                                height: `${Math.min(unitHeight * 2.5, 600)}px`, // Visual scale
                            }}
                        >
                            {/* Top Panel */}
                            <div className="w-full bg-amber-700 border-b border-amber-900" style={{ height: `${materialThickness * 2}px` }}></div>

                            {/* Shelves Container */}
                            <div className="flex-1 flex flex-col bg-amber-100 relative">
                                {/* Render Spaces */}
                                {Array.from({ length: numSpacesFinal }).map((_, i) => (
                                    <div key={i} className="flex-1 border-b border-amber-700 relative w-full group flex items-end px-4 gap-1">

                                        {/* Shelf Wood Visual (Bottom of space) */}
                                        {i < numSpacesFinal - 1 && (
                                            <div className="absolute bottom-0 left-0 w-full bg-amber-600" style={{ height: `${materialThickness}px` }}></div>
                                        )}

                                        {/* Books Visual (Randomized) */}
                                        {Array.from({ length: Math.floor(Math.random() * 5) + 3 }).map((_, k) => {
                                            const hPct = 60 + Math.random() * 30;
                                            const colorClass = ['bg-red-700', 'bg-blue-800', 'bg-green-800', 'bg-yellow-700', 'bg-gray-700'][Math.floor(Math.random() * 5)];
                                            return (
                                                <div
                                                    key={k}
                                                    className={`${colorClass} w-3 rounded-sm shadow-sm opacity-90`}
                                                    style={{ height: `${hPct}%` }}
                                                ></div>
                                            )
                                        })}

                                        {/* Dimension Label on Hover */}
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-800 opacity-50 bg-white/50 px-1 rounded">
                                            {actualShelfHeight.toFixed(1)} cm
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Kickplate */}
                            <div className="w-full bg-amber-900" style={{ height: `${kickplate * 2}px` }}>
                                <div className="text-center text-[10px] text-amber-200 pt-1">Zócalo {kickplate}cm</div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
