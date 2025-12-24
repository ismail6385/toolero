'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faWineBottle, faCookieBite, faBox } from '@fortawesome/free-solid-svg-icons';

export default function PantryClient() {
    // Inputs
    const [cabinetHeight, setCabinetHeight] = useState(200); // cm

    // Logic: Optimizing shelf spacing for common kitchen items.
    // Zones:
    // 1. Bottom: Large/Heavy (Pots, Bulk) - ~40cm
    // 2. Middle: Daily Use (Cereal, Plates, Glasses) - ~25-30cm
    // 3. Eye Level: Cans/Jars (Small) - ~15-20cm
    // 4. Top: Light/Rare (Tupperware, Spare) - ~30cm

    // We will generate a "Smart Layout" based on height.
    // Iteratively fill from bottom to top prioritizing useful zones.

    const generateLayout = (h: number) => {
        let remaining = h;
        const shelves = [];

        // Base Zone (Heavy)
        if (remaining > 50) {
            shelves.push({ type: 'large', height: 40, label: 'Ollas / Electrodomésticos / Agua' });
            remaining -= 40;
        }

        // Cereal/Bottles Zone
        if (remaining > 40) {
            shelves.push({ type: 'medium', height: 32, label: 'Cereales / Aceites / Botellas' });
            remaining -= 32;
        }

        // Cans Zone (Multiple small shelves are efficient here)
        // Try to fit at least 2 small ones if possible
        while (remaining > 35) { // If enough for 2 small ones or 1 medium
            // Prioritize diversity. Do we have small shelves?
            const smallCount = shelves.filter(s => s.type === 'small').length;
            if (smallCount < 2) {
                shelves.push({ type: 'small', height: 18, label: 'Conservas / Latas / Tazas' });
                remaining -= 18;
            } else {
                // Add generic medium
                shelves.push({ type: 'medium', height: 28, label: 'Platos / Vasos / Tupper' });
                remaining -= 28;
            }
        }

        // Remainder logic
        if (remaining > 15) {
            shelves.push({ type: 'rest', height: remaining, label: 'Varios / Sobrante' });
        } else if (shelves.length > 0) {
            // Add remainder to last shelf if too small to be useful
            shelves[shelves.length - 1].height += remaining;
        }

        return shelves.reverse(); // Draw from top to bottom usually, but logical build was bottom-up
    };

    const layout = generateLayout(cabinetHeight);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Diseñador de Alacena</h1>
                    <p className="text-teal-100 text-lg">
                        Optimiza tu despensa con las alturas correctas para cada alimento.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faUtensils} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Altura Disponible
                        </h3>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-600">Altura Interior (cm)</label>
                                <span className="font-bold text-teal-600">{cabinetHeight} cm</span>
                            </div>
                            <input type="range" min="60" max="250" step="5" value={cabinetHeight} onChange={e => setCabinetHeight(Number(e.target.value))} className="w-full accent-teal-600" />
                        </div>
                    </div>

                    <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                        <h3 className="font-bold text-teal-900 mb-4">Guía Rápida</h3>
                        <ul className="space-y-3 text-sm text-teal-800">
                            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faWineBottle} className="w-4" /> <strong>32-35 cm:</strong> Botellas de aceite / Vino vertical.</li>
                            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faBox} className="w-4" /> <strong>28-30 cm:</strong> Cajas de cereales estándar.</li>
                            <li className="flex items-center gap-2"><FontAwesomeIcon icon={faCookieBite} className="w-4" /> <strong>15-20 cm:</strong> Latas apiladas (x2) o Botes de legumbres.</li>
                        </ul>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[600px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Cabinet Visual */}
                        <div
                            className="bg-white border-x-8 border-t-8 border-gray-300 shadow-2xl relative flex flex-col w-full max-w-sm transition-all duration-500"
                            style={{
                                height: `${Math.min(cabinetHeight * 2.5, 550)}px`, // Scale
                            }}
                        >
                            <div className="absolute -top-6 w-full text-center text-xs font-bold text-gray-400">Interior {cabinetHeight} cm</div>

                            {/* Render Shelves */}
                            {layout.map((shelf, i) => (
                                <div
                                    key={i}
                                    className="w-full border-b-4 border-amber-200 relative group flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
                                    style={{
                                        height: `${(shelf.height / cabinetHeight) * 100}%`
                                    }}
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-300 group-hover:text-teal-600 transition-colors">{shelf.height} cm</div>
                                        <div className="text-[10px] uppercase tracking-wide font-bold text-gray-400 group-hover:text-teal-500">{shelf.label}</div>
                                    </div>

                                    {/* Visual Contents Hint */}
                                    {shelf.type === 'small' && (
                                        <div className="absolute bottom-1 right-2 w-4 h-6 bg-red-200 rounded-sm opacity-50"></div>
                                    )}
                                    {shelf.type === 'large' && (
                                        <div className="absolute bottom-1 right-2 w-12 h-10 bg-gray-200 rounded-sm opacity-50"></div>
                                    )}
                                </div>
                            ))}

                            {/* Floor/Legs */}
                            <div className="absolute top-full w-full h-8 flex justify-between px-4">
                                <div className="w-4 h-8 bg-gray-400"></div>
                                <div className="w-4 h-8 bg-gray-400"></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
