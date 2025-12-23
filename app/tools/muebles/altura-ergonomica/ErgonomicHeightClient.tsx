'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faChair, faLaptop, faDesktop, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

export default function ErgonomicHeightClient() {
    // Input
    const [userHeight, setUserHeight] = useState(175); // cm

    // Calculations (Based on average anthropometric data)
    // Sources vary, using standard multipliers for "Corpus Standard"

    // Knee Height (Chair Seat)
    // Approx 25-29% of stature. Let's use 0.28 which is common for "popliteal height + shoe"
    const chairHeight = Math.round(userHeight * 0.28);

    // Elbow Height Seated (Desk Keyboarding Height)
    // Approx Chair Height + 20-25cm usually. Or Height * 0.41
    // Let's use Height * 0.40 since elbows hang down.
    const deskHeight = Math.round(userHeight * 0.40);

    // Eye Level Seated (Monitor Top)
    // Floor to Eye ~ Height * 0.7
    const monitorHeight = Math.round(userHeight * 0.70);

    // Standing Desk Height (Elbow standing)
    // Approx Height * 0.63
    const standingDeskHeight = Math.round(userHeight * 0.63);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora Ergonómica</h1>
                    <p className="text-cyan-100 text-lg">
                        Configura tu espacio de trabajo para evitar dolores de espalda y cuello.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2">
                    <FontAwesomeIcon icon={faPerson} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-cyan-100 text-cyan-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Tu Altura
                        </h3>

                        <div className="space-y-4">
                            <div className="flex justify-center mb-4">
                                <div className="text-5xl font-black text-cyan-600">{userHeight} <span className="text-xl font-medium text-gray-400">cm</span></div>
                            </div>
                            <input
                                type="range" min="140" max="210" step="1"
                                value={userHeight}
                                onChange={e => setUserHeight(Number(e.target.value))}
                                className="w-full accent-cyan-600 cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>140 cm</span>
                                <span>210 cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-cyan-100 text-cyan-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Medidas Recomendadas
                        </h3>

                        <div className="grid gap-4">
                            {/* Chair */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-600 text-xl shadow-sm">
                                    <FontAwesomeIcon icon={faChair} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold">Altura Silla</div>
                                    <div className="text-2xl font-bold text-gray-800">{chairHeight} cm</div>
                                    <div className="text-xs text-gray-400">Desde el suelo al asiento</div>
                                </div>
                            </div>

                            {/* Desk */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-600 text-xl shadow-sm">
                                    <FontAwesomeIcon icon={faLaptop} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold">Altura Escritorio</div>
                                    <div className="text-2xl font-bold text-gray-800">{deskHeight} cm</div>
                                    <div className="text-xs text-gray-400">Teclado a altura del codo</div>
                                </div>
                            </div>

                            {/* Monitor */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-600 text-xl shadow-sm">
                                    <FontAwesomeIcon icon={faDesktop} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 font-semibold">Borde Superior Monitor</div>
                                    <div className="text-2xl font-bold text-gray-800">{monitorHeight} cm</div>
                                    <div className="text-xs text-gray-400">A la altura de los ojos</div>
                                </div>
                            </div>

                            {/* Standing */}
                            <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cyan-600 text-xl shadow-sm">
                                    <FontAwesomeIcon icon={faArrowsAltV} />
                                </div>
                                <div>
                                    <div className="text-sm text-cyan-800 font-semibold">Standing Desk</div>
                                    <div className="text-2xl font-bold text-cyan-900">{standingDeskHeight} cm</div>
                                    <div className="text-xs text-cyan-700">Modo de pie</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-end justify-center p-8 overflow-hidden">

                        {/* Floor */}
                        <div className="absolute inset-0 bg-white"></div>
                        <div className="absolute bottom-0 w-full h-16 bg-gray-100 border-t border-gray-200"></div>

                        {/* Setup Container (Scaled) */}
                        <div
                            className="relative w-full max-w-md h-[500px] flex items-end justify-center mb-16"
                        >
                            {/* Person - Simplified SVG representation using CSS shapes */}
                            <div className="relative z-10 mr-8 flex flex-col items-center">
                                {/* Head */}
                                <div className="w-16 h-16 bg-blue-500 rounded-full z-20 relative">
                                    {/* Eye Line */}
                                    <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-red-400 -translate-y-1 w-[300px]" style={{ left: '50%' }}></div>
                                    <span className="absolute left-[80px] top-1/2 -translate-y-4 text-xs font-bold text-red-500 bg-white px-1 rounded whitespace-nowrap">Ojos ({monitorHeight}cm)</span>
                                </div>
                                {/* Body */}
                                <div className="w-20 h-32 bg-blue-600 rounded-xl -mt-2 z-10 relative">
                                    {/* Arm L shape */}
                                    <div className="absolute top-8 -right-8 w-16 h-4 bg-blue-400 rounded-full origin-left rotate-[15deg]"></div>
                                    <div className="absolute top-[48px] right-6 w-20 h-4 bg-blue-400 rounded-full"></div>
                                </div>
                                {/* Legs */}
                                <div className="flex gap-1 -mt-4">
                                    <div className="w-8 h-32 bg-blue-700 rounded-b-lg"></div> {/* Thigh horizontal ish? No assume sitting straight */}
                                    <div className="w-8 h-32 bg-blue-700 rounded-b-lg hidden"></div>
                                </div>
                                {/* Legs seated style... simplifying CSS drawing is hard. Let's make a stick figure box style */}
                                {/* Thighs */}
                                <div className="w-32 h-8 bg-blue-700 rounded-full absolute bottom-[100px] left-2"></div>
                                {/* Lower Leg */}
                                <div className="w-8 h-32 bg-blue-700 rounded-full absolute bottom-0 left-2"></div>
                            </div>

                            {/* Chair */}
                            <div
                                className="absolute bg-gray-800 rounded shadow-lg transition-all duration-300 z-0"
                                style={{
                                    width: '60px',
                                    height: '10px',
                                    bottom: `${(chairHeight / 2)}px`, // Visual scale / 2
                                    left: '80px'
                                }}
                            >
                                {/* Back rest */}
                                <div className="absolute bottom-0 -left-2 w-2 h-[100px] bg-gray-700 rounded"></div>
                                {/* Leg Stand */}
                                <div className="absolute top-full left-1/2 w-2 h-full bg-gray-400 -translate-x-1/2" style={{ height: `${(chairHeight / 2)}px` }}></div>
                                {/* Wheels base */}
                                <div className="absolute bottom-[-100px] left-1/2 w-16 h-2 bg-gray-600 -translate-x-1/2 rounded-full"></div>
                            </div>

                            {/* Desk */}
                            <div
                                className="absolute right-10 bg-white border-2 border-gray-300 rounded shadow transition-all duration-300 z-0"
                                style={{
                                    width: '120px',
                                    height: '8px',
                                    bottom: `${(deskHeight / 2)}px`, // Visual Scale
                                }}
                            >
                                {/* Legs */}
                                <div className="absolute top-full left-4 w-2 h-[500px] bg-gray-300"></div>
                                <div className="absolute top-full right-4 w-2 h-[500px] bg-gray-300"></div>

                                {/* Monitor */}
                                <div
                                    className="absolute bottom-full right-8 w-2 h-16 bg-gray-800"
                                    style={{
                                        marginBottom: `${(monitorHeight - deskHeight) / 2 - 30}px`, // Adjusting stand height based on monitor height relative to desk
                                        height: `${((monitorHeight - deskHeight) / 2)}px` // Stand height
                                    }}
                                ></div>
                                <div
                                    className="absolute bottom-[calc(100%+20px)] right-2 w-24 h-16 bg-black border-4 border-gray-700 rounded"
                                    style={{
                                        bottom: `${((monitorHeight - deskHeight) / 2) + 8}px`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-blue-400 opacity-20 animate-pulse"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="mt-4 text-center text-xs text-gray-500">
                        * Escala visual aproximada. Usa las medidas numéricas para ajustar tus muebles.
                    </div>
                </div>

            </div>
        </div>
    );
}
