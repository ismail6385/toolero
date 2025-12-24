'use client';

import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCouch,
    faArrowsAlt,
    faExchangeAlt,
    faRulerCombined,
    faExclamationTriangle,
    faUndo
} from '@fortawesome/free-solid-svg-icons';

export default function SectionalSofaClient() {
    // Room and Sofa State (in cm)
    const [room, setRoom] = useState({ width: 400, length: 500 });
    const [sofa, setSofa] = useState({
        width: 280,       // Total width of the back
        depth: 95,        // Depth of the main seat
        chaiseLength: 170,// Total length of the chaise part (from back to front)
        chaiseWidth: 100, // Width of the chaise module
        orientation: 'left' as 'left' | 'right' // 'left' means chaise is on the left when facing the sofa
    });

    // Position State (relative to room container in pixels)
    // We store this to calculate clearances
    const [position, setPosition] = useState({ x: 50, y: 50 });

    // Scale factor for visualization
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5); // pixels per cm

    useEffect(() => {
        if (containerRef.current) {
            // autosize scale
            const availableWidth = containerRef.current.offsetWidth - 40; // margin
            const availableHeight = 500; // max height for view
            const scaleX = availableWidth / room.width;
            const scaleY = availableHeight / room.length;
            // Use the smaller scale to fit both dimensions
            setScale(Math.min(scaleX, scaleY, 1.5)); // cap max scale
        }
    }, [room.width, room.length]);

    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    // Calculations
    const sofaAreaCm = (sofa.width * sofa.depth) + ((sofa.chaiseLength - sofa.depth) * sofa.chaiseWidth);
    const roomAreaCm = room.width * room.length;
    const occupation = (sofaAreaCm / roomAreaCm) * 100;

    // Convert cm to px for rendering
    const roomW_px = room.width * scale;
    const roomL_px = room.length * scale;

    // Sofa rendering dims
    const totalW_px = sofa.width * scale;
    const mainD_px = sofa.depth * scale;
    const chaiseL_px = sofa.chaiseLength * scale;
    const chaiseW_px = sofa.chaiseWidth * scale;

    // Clearance Calculations
    const sofaBoundingHeight = Math.max(sofa.depth, sofa.chaiseLength);

    // Distances in cm
    const distLeft = position.x / scale;
    const distTop = position.y / scale;
    const distRight = room.width - (position.x / scale + sofa.width);
    const distBottom = room.length - (position.y / scale + sofaBoundingHeight);

    // Warnings
    const tightClearance = 60; // cm
    const warnings = [];
    if (Math.min(distLeft, distRight, distTop, distBottom) < 0) warnings.push("El sofá se sale de la habitación");
    else if (Math.min(distLeft, distRight, distTop, distBottom) < tightClearance) warnings.push("Pasillos estrechos detected (<60cm)");

    const resetPosition = () => setPosition({ x: roomW_px / 2 - totalW_px / 2, y: roomL_px / 2 - chaiseL_px / 2 });

    return (
        <div className="w-full select-none">
            {/* Header / Premium Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden border border-indigo-700/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/10">
                            <FontAwesomeIcon icon={faCouch} className="text-3xl text-indigo-200" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 tracking-tight">Simulador de Sofá Seccional</h1>
                        <p className="text-indigo-200 max-w-lg text-lg">
                            Diseña tu espacio con precisión. Arrastra el sofá para visualizar el flujo de paso en tu salón.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm text-indigo-300 uppercase tracking-widest font-semibold text-[10px] mb-1">Ocupación</span>
                        <span className={`text-3xl font-bold ${occupation > 35 ? 'text-amber-300' : 'text-green-300'}`}>
                            {occupation.toFixed(0)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* SETTINGS PANEL */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Room Config */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
                            <FontAwesomeIcon icon={faRulerCombined} className="text-indigo-500" />
                            Dimensiones Salón
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Ancho (cm)</label>
                                <input
                                    type="number"
                                    value={room.width}
                                    onChange={e => setRoom({ ...room, width: Number(e.target.value) })}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 font-medium"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 ml-1">Largo (cm)</label>
                                <input
                                    type="number"
                                    value={room.length}
                                    onChange={e => setRoom({ ...room, length: Number(e.target.value) })}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sofa Config */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCouch} className="text-indigo-500" />
                                Medidas Sofá
                            </h3>
                            <button
                                onClick={() => setSofa({ ...sofa, orientation: sofa.orientation === 'left' ? 'right' : 'left' })}
                                className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faExchangeAlt} /> Invertir L
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="text-xs font-semibold text-gray-500">Ancho Total (Respaldo)</label>
                                    <span className="text-xs font-bold text-indigo-600">{sofa.width} cm</span>
                                </div>
                                <input
                                    type="range" min="150" max="450" step="5"
                                    value={sofa.width} onChange={e => setSofa({ ...sofa, width: Number(e.target.value) })}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="text-xs font-semibold text-gray-500">Largo Chaise (L)</label>
                                    <span className="text-xs font-bold text-indigo-600">{sofa.chaiseLength} cm</span>
                                </div>
                                <input
                                    type="range" min="100" max="300" step="5"
                                    value={sofa.chaiseLength} onChange={e => setSofa({ ...sofa, chaiseLength: Number(e.target.value) })}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 block mb-1">Prof. Asiento</label>
                                    <input
                                        type="number"
                                        value={sofa.depth}
                                        onChange={e => setSofa({ ...sofa, depth: Number(e.target.value) })}
                                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 block mb-1">Ancho Chaise</label>
                                    <input
                                        type="number"
                                        value={sofa.chaiseWidth}
                                        onChange={e => setSofa({ ...sofa, chaiseWidth: Number(e.target.value) })}
                                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clearance Info */}
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Distancias a Pared</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className={`p-2 rounded border ${distLeft < 60 ? 'bg-red-50 border-red-100 text-red-700 font-bold' : 'bg-white border-gray-100'}`}>
                                Izq: {Math.max(0, distLeft).toFixed(0)} cm
                            </div>
                            <div className={`p-2 rounded border ${distRight < 60 ? 'bg-red-50 border-red-100 text-red-700 font-bold' : 'bg-white border-gray-100'}`}>
                                Der: {Math.max(0, distRight).toFixed(0)} cm
                            </div>
                            <div className={`p-2 rounded border ${distTop < 60 ? 'bg-red-50 border-red-100 text-red-700 font-bold' : 'bg-white border-gray-100'}`}>
                                Trasera: {Math.max(0, distTop).toFixed(0)} cm
                            </div>
                            <div className={`p-2 rounded border ${distBottom < 60 ? 'bg-red-50 border-red-100 text-red-700 font-bold' : 'bg-white border-gray-100'}`}>
                                Frontal: {Math.max(0, distBottom).toFixed(0)} cm
                            </div>
                        </div>
                        {warnings.length > 0 && (
                            <div className="mt-3 text-xs text-red-600 flex items-start gap-2 bg-red-50 p-2 rounded">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="mt-0.5" />
                                <div>
                                    {warnings.map((w, i) => <div key={i}>{w}</div>)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* VISUALIZER */}
                <div className="lg:col-span-8 flex flex-col">
                    <div
                        ref={containerRef}
                        className="flex-grow bg-white rounded-3xl border border-gray-200 shadow-inner relative overflow-hidden flex items-center justify-center p-10 min-h-[500px]"
                        style={{ backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, #e0e7ff 1px, transparent 1px)' }}
                    >
                        {/* ROOM CONTAINER */}
                        <div
                            className="bg-white border-4 border-gray-800 shadow-2xl relative"
                            style={{
                                width: roomW_px,
                                height: roomL_px,
                                transition: 'width 0.3s, height 0.3s'
                            }}
                        >
                            {/* Ruler Labels for Room */}
                            <div className="absolute -top-6 left-0 w-full text-center text-xs font-bold text-gray-500">{room.width} cm</div>
                            <div className="absolute top-0 -left-6 h-full flex items-center text-xs font-bold text-gray-500 -rotate-90 origin-center">{room.length} cm</div>

                            {/* DRAGGABLE SOFA */}
                            <Draggable
                                bounds="parent"
                                position={position}
                                onDrag={handleDrag}
                                scale={1} // We are dragging in pixel space
                            >
                                <div
                                    className="absolute cursor-move group"
                                    style={{
                                        width: totalW_px,
                                        height: Math.max(mainD_px, chaiseL_px), // Bounding box height
                                        zIndex: 50
                                    }}
                                >
                                    {/* Sofa Visual Construction */}
                                    <div className="w-full h-full relative drop-shadow-lg transition-transform group-active:scale-[1.02]">

                                        {/* Main Section (Back) */}
                                        <div
                                            className="absolute bg-indigo-600 rounded-sm border border-indigo-700"
                                            style={{
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: mainD_px
                                            }}
                                        >
                                            <div className="w-full h-full bg-gradient-to-b from-transparent to-black/10 rounded-sm"></div>
                                            {/* Cushion lines */}
                                            <div className="absolute inset-0 flex divide-x divide-indigo-800/30">
                                                <div className="flex-1"></div>
                                                <div className="flex-1"></div>
                                                <div className="flex-1"></div>
                                            </div>
                                        </div>

                                        {/* Chaise Section */}
                                        <div
                                            className="absolute bg-indigo-600 rounded-sm border border-indigo-700"
                                            style={{
                                                top: 0, // Starts aligned with top
                                                [sofa.orientation === 'left' ? 'left' : 'right']: 0, // Left or Right
                                                width: chaiseW_px,
                                                height: chaiseL_px
                                            }}
                                        >
                                            <div className="w-full h-full bg-gradient-to-b from-transparent to-black/10 rounded-sm"></div>
                                        </div>

                                        {/* Drag Handle Icon - Center visually if possible, or just floating */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <div className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                                                <FontAwesomeIcon icon={faArrowsAlt} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dimensions on Sofa */}
                                    <div className="absolute -bottom-5 w-full text-center text-[10px] font-bold text-indigo-700 bg-white/70 px-1 rounded">
                                        {sofa.width} cm
                                    </div>
                                    <div
                                        className="absolute top-0 text-[10px] font-bold text-indigo-700 bg-white/70 px-1 rounded flex items-center justify-center"
                                        style={{
                                            height: chaiseL_px,
                                            [sofa.orientation === 'left' ? 'left' : 'right']: -20,
                                            writingMode: 'vertical-rl',
                                            transform: 'rotate(180deg)'
                                        }}
                                    >
                                        {sofa.chaiseLength} cm
                                    </div>
                                </div>
                            </Draggable>
                        </div>

                        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                            * Arrastra el sofá para posicionarlo
                        </div>
                        <button
                            onClick={resetPosition}
                            className="absolute bottom-4 left-4 text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
                        >
                            <FontAwesomeIcon icon={faUndo} /> Centrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
