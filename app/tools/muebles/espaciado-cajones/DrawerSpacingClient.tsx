'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faThList, faGripLines, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';

export default function DrawerSpacingClient() {
    // Inputs
    const [totalHeight, setTotalHeight] = useState(70); // cm (Front space available)
    const [numDrawers, setNumDrawers] = useState(3);
    const [gap, setGap] = useState(0.3); // cm (3mm standard)
    const [layoutMode, setLayoutMode] = useState('equal'); // equal | progressive

    // Calculation
    // Total Gap Space = (numDrawers - 1) * gap
    // Wait, usually top and bottom might have gaps too or overlays.
    // Let's assume "Overlay" (Solapado) where top/bottom align with cabinet, or "Inset" (Embutido) where there is gap all around.
    // Let's simplify: Gaps BETWEEN drawers. The calculation returns "Front Panel Height".

    // Gap Count: Between drawers = N-1. 
    // If Inset, gaps at top/bottom too = N+1 gaps.
    // Let's assume modern "Overlay" style: Just gaps between fronts.

    const totalGapSpace = (numDrawers - 1) * gap;
    const usableHeight = totalHeight - totalGapSpace;

    let drawerHeights: number[] = [];

    if (layoutMode === 'equal') {
        const h = usableHeight / numDrawers;
        drawerHeights = Array(numDrawers).fill(h);
    } else {
        // Progressive (Bottom larger)
        // Simple logic: Each drawer is X% larger than the one above?
        // Or specific ratios: Small, Medium, Large.
        if (numDrawers === 3) {
            // Ratio 1:2:3 ? No, too extreme. 
            // Ratio 15%, 35%, 50% ?
            // Let's divide usable into "Shares". 1+2+3 = 6 shares.
            const share = usableHeight / 6;
            drawerHeights = [share * 1, share * 2, share * 3];
        } else if (numDrawers === 4) {
            // 1 + 1 + 2 + 2 = 6 shares?
            const share = usableHeight / 6;
            drawerHeights = [share, share, share * 2, share * 2];
        } else {
            // Fallback to equal for other counts in this simple tool
            const h = usableHeight / numDrawers;
            drawerHeights = Array(numDrawers).fill(h);
        }
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora Frentes de Cajón</h1>
                    <p className="text-indigo-100 text-lg">
                        Calcula la altura exacta de los frentes distribuyendo los espacios uniformemente.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faThList} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Configuración
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Altura Total Hueco (cm)</label>
                                <input
                                    type="number" step="0.1"
                                    value={totalHeight} onChange={e => setTotalHeight(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg font-bold text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Número de Cajones</label>
                                <div className="flex gap-2">
                                    {[2, 3, 4, 5, 6].map(n => (
                                        <button key={n} onClick={() => setNumDrawers(n)} className={`flex-1 py-1 rounded border ${numDrawers === n ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>{n}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Separación (mm)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(mm => (
                                        <button key={mm} onClick={() => setGap(mm / 10)} className={`flex-1 py-1 text-sm rounded border ${gap === mm / 10 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>{mm}</button>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">Holgura entre frentes: {gap * 10}mm</div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">Distribución</label>
                                <div className="flex bg-gray-100 p-1 rounded-lg">
                                    <button onClick={() => setLayoutMode('equal')} className={`flex-1 py-1 text-xs rounded font-bold ${layoutMode === 'equal' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>Iguales</button>
                                    {(numDrawers === 3 || numDrawers === 4) && (
                                        <button onClick={() => setLayoutMode('progressive')} className={`flex-1 py-1 text-xs rounded font-bold ${layoutMode === 'progressive' ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>Progresivos</button>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faRulerHorizontal} /> Resultados (Corte)
                        </h3>
                        <div className="space-y-1">
                            {drawerHeights.map((h, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-indigo-200 last:border-0">
                                    <span className="text-sm text-indigo-800">Cajón {i + 1} (Arriba)</span>
                                    <span className="text-xl font-bold text-indigo-900">{h.toFixed(1)} cm</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-12 overflow-hidden shadow-inner bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">

                        {/* Cabinet Front View */}
                        <div
                            className="w-[300px] bg-gray-800 p-1 shadow-2xl relative flex flex-col"
                            style={{
                                height: `${Math.min(totalHeight * 4, 600)}px` // Scale
                            }}
                        >
                            {/* Dimension Line Left */}
                            <div className="absolute -left-12 top-0 h-full border-l border-gray-400 flex items-center">
                                <span className="text-xs font-bold text-gray-500 -ml-2 -rotate-90 bg-white px-1 whitespace-nowrap">{totalHeight} cm</span>
                            </div>

                            {/* Drawers */}
                            {drawerHeights.map((h, i) => (
                                <div key={i} style={{ flex: h }} className="w-full relative">
                                    {/* The Front Panel */}
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-white border border-gray-300 relative flex items-center justify-center group overflow-hidden">

                                        <span className="font-bold text-indigo-900 z-10">{h.toFixed(1)} cm</span>
                                        <div className="text-[10px] text-indigo-400 absolute bottom-1 right-2 uppercase tracking-widest">{i === 0 ? 'Superior' : 'Cajón'}</div>

                                        {/* Handle */}
                                        <div className="w-16 h-2 bg-gray-300 rounded-full shadow-sm absolute top-1/2 -translate-y-4"></div>

                                        {/* Highlight */}
                                        <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                    </div>

                                    {/* The Gap (Rendered below unless it's last) */}
                                    {i < numDrawers - 1 && (
                                        <div
                                            className="absolute w-full bg-red-400/50 flex items-center justify-center z-20 pointer-events-none"
                                            style={{ height: `${(gap / totalHeight) * 100}%`, bottom: `-${(gap / totalHeight) * 100}%`, display: 'none' }} // Conceptually CSS gap handled by flex gap?
                                        >
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Flex Gap Implementation */}
                            <div className="absolute inset-0 flex flex-col" style={{ gap: `${(gap / totalHeight) * 100}%` }}>
                                {drawerHeights.map((h, i) => (
                                    <div key={i} style={{ height: `${(h / totalHeight) * 100}%` }} className="opacity-0">Placeholder for layout</div> // Invisible lattice to prove gap calc logic?
                                    // Actually easier to just render divs with margins in main loop. 
                                    // But previous loop used flex: h which is ratio base. 
                                    // Let's use absolute positioning or style gap.
                                ))}
                            </div>

                            {/* Re-render properly with Gap */}
                            <div className="absolute inset-0 flex flex-col bg-gray-900" style={{ gap: `${(gap / totalHeight) * 100}%` }}>
                                {drawerHeights.map((h, i) => (
                                    <div key={i} style={{ height: `${(h / totalHeight) * 100}%` }} className="w-full bg-white border border-gray-300 relative flex items-center justify-center shadow-sm">
                                        <div className="absolute left-2 top-2 text-xs text-gray-300 font-mono">#{i + 1}</div>
                                        <div className="font-bold text-gray-700">{h.toFixed(1)} cm</div>
                                        <div className="w-24 h-1 bg-gray-200 mt-2 rounded"></div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
