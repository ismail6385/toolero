'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faRulerHorizontal, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default function DrawerClient() {
    // Inputs
    const [cabinetInnerWidth, setCabinetInnerWidth] = useState(56.4); // cm (standard 60 module usually 56.4 interior)
    const [sliderType, setSliderType] = useState('ball_bearing'); // ball_bearing | undermount | wooden
    const [materialThickness, setMaterialThickness] = useState(1.6); // cm (16mm melamine standard)

    // configurations
    const slideConfigs = {
        'ball_bearing': {
            name: 'Guías Telescópicas (Bolitas)',
            gapPerSide: 1.27, // Standard 12.7mm (1/2 inch)
            desc: 'Las más comunes. Requieren 12.7mm a cada lado exactos.'
        },
        'undermount': {
            name: 'Guías Ocultas (Undermount)',
            gapPerSide: 0.5, // Typically small clearance for box, but tricky calc. Usually box width = internal - (varies). 
            // Lets assume generic Blum TANDEM style: Internal Cabinet Width - 10mm total? Or specific.
            // Simplified: Box Width = Interior Width - 10mm (approx for side walls allowance + locking mechanisms)
            // Wait, for undermount, the drawer *sidewalls* thickness matters heavily.
            // Let's stick to: "Gap needed between drawer side and cabinet side".
            // Typically with 16mm sides, undermount needs ~5-7mm clearance per side?
            // Let's use a simplified logical gap: 2.1cm total reduction usually
            gapPerSide: 0.5, // Visual placeholder. Real calculation: Box Outer Width = Inner Width - 10mm.
            desc: 'Profesionales (Blum/Hettich). El cajón suele ser 10mm más estrecho que el hueco.'
        },
        'wooden': {
            name: 'Corredera de Madera (Clásica)',
            gapPerSide: 0.2, // Just friction tolerance
            desc: 'Carpintería tradicional. Solo se deja una holgura de 2-3mm.'
        }
    };

    const currentSlide = slideConfigs[sliderType as keyof typeof slideConfigs];

    // Calculations
    // 1. Drawer Box Outer Width
    let boxOuterWidth = 0;

    if (sliderType === 'ball_bearing') {
        // Strict: Inner - (1.27 * 2) = Inner - 2.54
        boxOuterWidth = cabinetInnerWidth - 2.54;
    } else if (sliderType === 'undermount') {
        // Generic heuristic: Inner - 1.0 (some brands vary 10mm to 20mm deduction)
        // Let's use standard -10mm total
        boxOuterWidth = cabinetInnerWidth - 1.0;
    } else {
        // Wooden: Inner - 0.4 (2mm per side gap)
        boxOuterWidth = cabinetInnerWidth - 0.4;
    }

    // 2. Useful Inner Width
    // Box Outer - (2 * Material Thinkess)
    const usefulWidth = boxOuterWidth - (materialThickness * 2);

    // 3. Bottom Panel Width (if inserted into groove)
    // Typically Groove depth is ~0.8cm per side. So Useful Width + 1.6?
    // Or Box Outer - (2 * Thickness) + (2 * GrooveDepth)
    // Simply: Box Outer - (2 * Thickness) + 1.2 (approx)
    const bottomPanelWidth = usefulWidth + 1.2;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Cajones</h1>
                    <p className="text-zinc-100 text-lg">
                        Calcula el despiece exacto para fabricar cajones perfectos.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-zinc-100 text-zinc-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Medidas Hueco
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                                    Ancho Interior Mueble
                                    <span className="font-bold text-zinc-700">{cabinetInnerWidth} cm</span>
                                </label>
                                <input
                                    type="number" step="0.1"
                                    value={cabinetInnerWidth}
                                    onChange={e => setCabinetInnerWidth(Number(e.target.value))}
                                    className="w-full p-2 border border-300 rounded-lg font-bold text-zinc-700 focus:ring-zinc-500 focus:border-zinc-500"
                                />
                                <div className="mt-2 text-xs text-gray-400">
                                    Ejemplo: Módulo 60cm con melamina 18mm = 56.4cm interior.
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-2">Tipo de Guías</label>
                                <select
                                    value={sliderType}
                                    onChange={e => setSliderType(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                >
                                    <option value="ball_bearing">Telescópicas (Lateral)</option>
                                    <option value="undermount">Ocultas (Bajo cajón)</option>
                                    <option value="wooden">Sin guías (Madera)</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
                                    Grosor Material Cajón
                                </label>
                                <div className="flex gap-2">
                                    {[1.0, 1.2, 1.5, 1.6, 1.8].map(t => (
                                        <button key={t} onClick={() => setMaterialThickness(t)} className={`flex-1 py-1 text-xs rounded border ${materialThickness === t ? 'bg-zinc-700 text-white border-zinc-700' : 'bg-white border-gray-200'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
                        <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faTools} /> Despiece (Corte)
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                                <span className="text-sm text-gray-600">Ancho Exterior Cajón</span>
                                <span className="text-xl font-bold text-zinc-800">{boxOuterWidth.toFixed(2)} cm</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                                <span className="text-sm text-gray-600">Interior Útil</span>
                                <span className="text-xl font-bold text-gray-500">{usefulWidth.toFixed(2)} cm</span>
                            </div>

                            <div className="mt-4 text-xs text-zinc-500 bg-white p-3 rounded border border-zinc-100">
                                <strong>Nota:</strong> Cortar el suelo (fondo) a: <br />
                                Ancho: aprox <strong>{bottomPanelWidth.toFixed(2)} cm</strong> (si va ranurado). <br />
                                Profundidad: Igual al lateral - 1cm.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer (Cross Section Front View) */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl h-full min-h-[400px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden shadow-inner">

                        {/* Cabinet Walls */}
                        <div className="relative h-[300px] flex justify-between items-stretch transition-all duration-500" style={{
                            width: `${Math.min(cabinetInnerWidth * 5 + 40, 500)}px` // Scale
                        }}>
                            {/* Left Wall */}
                            <div className="w-5 bg-gray-300 h-full border-r border-gray-400 relative">
                                <span className="absolute -left-16 top-1/2 text-xs text-gray-400 w-12 text-right">Mueble</span>
                            </div>

                            {/* The Space */}
                            <div className="flex-1 relative flex items-center justify-center">

                                {/* Top Dimension Arrow */}
                                <div className="absolute top-0 w-full flex items-center justify-center">
                                    <div className="w-full h-px bg-black/30 absolute top-1/2"></div>
                                    <div className="bg-white px-2 text-xs font-bold text-gray-500 relative z-10">{cabinetInnerWidth} cm Interior</div>
                                </div>

                                {/* Drawer Box */}
                                <div
                                    className="h-[200px] bg-amber-100 border border-amber-300 relative flex justify-between shadow-lg transition-all duration-500"
                                    style={{
                                        width: `${(boxOuterWidth / cabinetInnerWidth) * 100}%`
                                    }}
                                >
                                    {/* Drawer Sides (Material) */}
                                    <div className="h-full bg-amber-200 border-r border-amber-300 relative flex items-center justify-center" style={{ width: '20px' }}> {/* visual width roughly */}
                                        <div className="absolute -top-6 text-[10px] text-amber-600 font-bold whitespace-nowrap">Lat. {materialThickness}</div>
                                    </div>
                                    <div className="h-full bg-amber-200 border-l border-amber-300 relative flex items-center justify-center" style={{ width: '20px' }}>
                                        <div className="absolute -top-6 text-[10px] text-amber-600 font-bold whitespace-nowrap">Lat. {materialThickness}</div>
                                    </div>

                                    {/* Center Label */}
                                    <div className="absolute inset-x-0 bottom-4 text-center">
                                        <div className="text-lg font-black text-amber-800 opacity-50">CAJÓN</div>
                                        <div className="text-xs font-bold text-amber-700">{boxOuterWidth.toFixed(2)} cm ext.</div>
                                    </div>

                                </div>

                                {/* Gaps / Sliders */}
                                <div className="absolute left-0 h-[30px] bg-blue-500/20 flex items-center justify-center"
                                    style={{ width: `${((cabinetInnerWidth - boxOuterWidth) / 2 / cabinetInnerWidth) * 100}%` }}>
                                    <div className="text-[10px] font-bold text-blue-600 rotate-90 whitespace-nowrap opacity-0 md:opacity-100">{(cabinetInnerWidth - boxOuterWidth) / 2}cm</div>
                                </div>
                                <div className="absolute right-0 h-[30px] bg-blue-500/20 flex items-center justify-center"
                                    style={{ width: `${((cabinetInnerWidth - boxOuterWidth) / 2 / cabinetInnerWidth) * 100}%` }}>
                                    <div className="text-[10px] font-bold text-blue-600 rotate-90 whitespace-nowrap opacity-0 md:opacity-100">{(cabinetInnerWidth - boxOuterWidth) / 2}cm</div>
                                </div>
                            </div>

                            {/* Right Wall */}
                            <div className="w-5 bg-gray-300 h-full border-l border-gray-400"></div>

                        </div>

                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
                        <strong>Sobre {currentSlide.name}:</strong> {currentSlide.desc} <br />
                        Holgura calculada: <strong>{((cabinetInnerWidth - boxOuterWidth) / 2).toFixed(2)} cm</strong> por lado.
                    </div>
                </div>

            </div>
        </div>
    );
}
