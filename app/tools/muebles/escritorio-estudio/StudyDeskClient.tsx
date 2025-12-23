'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLaptopHouse, faPencilRuler, faDesktop } from '@fortawesome/free-solid-svg-icons';

export default function StudyDeskClient() {
    // Inputs
    const [userType, setUserType] = useState('student'); // child | student | laptop | dual

    // Configuration Data
    const configs = {
        'child': {
            label: 'Niño (Primaria)',
            minW: 90, minD: 50,
            recW: 105, recD: 60,
            items: ['notebook', 'pencilcase'],
            desc: 'Espacio para un cuaderno abierto y estuche.'
        },
        'student': {
            label: 'Estudiante (ESO/Uni)',
            minW: 110, minD: 60,
            recW: 120, recD: 65,
            items: ['laptop', 'notebook', 'mouse'],
            desc: 'Laptop + Cuaderno A4 lado a lado.'
        },
        'laptop': {
            label: 'Trabajo (Laptop)',
            minW: 100, minD: 50,
            recW: 120, recD: 60,
            items: ['laptop', 'mouse', 'coffee'],
            desc: 'Portátil y ratón. Setup minimalista.'
        },
        'dual': {
            label: 'Trabajo (Doble Monitor)',
            minW: 140, minD: 70,
            recW: 160, recD: 80,
            items: ['monitor', 'monitor_2', 'keyboard', 'mouse'],
            desc: 'Dos pantallas requieren profundidad para los ojos.'
        }
    };

    const currentConfig = configs[userType as keyof typeof configs];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Escritorio</h1>
                    <p className="text-emerald-100 text-lg">
                        ¿Qué tamaño de mesa necesito para estudiar o trabajar?
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-2 -translate-y-2">
                    <FontAwesomeIcon icon={faLaptopHouse} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Tipo de Uso
                        </h3>

                        <div className="grid gap-3">
                            <button onClick={() => setUserType('child')} className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${userType === 'child' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 text-lg shadow-sm"><FontAwesomeIcon icon={faPencilRuler} /></div>
                                <div>
                                    <div className="font-bold text-sm">Infantil</div>
                                    <div className="text-xs text-gray-500">Deberes y manualidades</div>
                                </div>
                            </button>

                            <button onClick={() => setUserType('student')} className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${userType === 'student' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 text-lg shadow-sm"><FontAwesomeIcon icon={faGraduationCap} /></div>
                                <div>
                                    <div className="font-bold text-sm">Estudiante</div>
                                    <div className="text-xs text-gray-500">Libros + Ordenador</div>
                                </div>
                            </button>

                            <button onClick={() => setUserType('laptop')} className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${userType === 'laptop' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 text-lg shadow-sm"><FontAwesomeIcon icon={faLaptopHouse} /></div>
                                <div>
                                    <div className="font-bold text-sm">Home Office</div>
                                    <div className="text-xs text-gray-500">Solo Laptop</div>
                                </div>
                            </button>

                            <button onClick={() => setUserType('dual')} className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${userType === 'dual' ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 text-lg shadow-sm"><FontAwesomeIcon icon={faDesktop} /></div>
                                <div>
                                    <div className="font-bold text-sm">Pro / Gaming</div>
                                    <div className="text-xs text-gray-500">Doble Monitor</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Medidas Ideales
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Mínimo Viable</span>
                            <div className="text-2xl font-bold text-gray-700 mt-1">
                                {currentConfig.minW} x {currentConfig.minD} cm
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Recomendado (Cómodo)</span>
                            <div className="text-3xl font-black text-emerald-700 mt-1">
                                {currentConfig.recW} x {currentConfig.recD} cm
                            </div>
                            <div className="text-xs text-emerald-800 mt-2 leading-relaxed">
                                {currentConfig.desc}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer (Top Down) */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden">

                        {/* Floor Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                        {/* Desk Surface */}
                        <div
                            className="relative bg-amber-100 shadow-xl border border-amber-200 rounded-lg transition-all duration-500"
                            style={{
                                width: `${currentConfig.recW * 3}px`, // visual scale
                                height: `${currentConfig.recD * 3}px`,
                            }}
                        >
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

                            {/* Dimensions */}
                            <div className="absolute -top-6 w-full text-center text-xs font-bold text-gray-400">{currentConfig.recW} cm</div>
                            <div className="absolute -left-8 top-0 h-full flex items-center text-xs font-bold text-gray-400 -rotate-90">{currentConfig.recD} cm</div>

                            {/* Items on Desk */}
                            <div className="absolute inset-0 p-4 flex items-center justify-center gap-4 flex-wrap content-center">

                                {currentConfig.items.includes('laptop') && (
                                    <div className="w-[105px] h-[70px] bg-gray-700 rounded-md shadow-lg relative flex items-center justify-center">
                                        <div className="text-[8px] text-gray-400">Laptop</div>
                                        <div className="absolute -bottom-2 w-full h-1 bg-black/20 rounded-full blur-sm"></div>
                                    </div>
                                )}

                                {currentConfig.items.includes('monitor') && (
                                    <div className="w-[150px] h-[20px] bg-black rounded-sm border-b-4 border-gray-800 shadow-xl relative mb-8">
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-b"></div>
                                        <div className="absolute -bottom-6 w-full text-center text-[8px] text-gray-400">Monitor</div>
                                    </div>
                                )}

                                {currentConfig.items.includes('monitor_2') && (
                                    <div className="w-[150px] h-[20px] bg-black rounded-sm border-b-4 border-gray-800 shadow-xl relative mb-8">
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-600 rounded-b"></div>
                                    </div>
                                )}

                                {currentConfig.items.includes('keyboard') && (
                                    <div className="w-[120px] h-[40px] bg-gray-200 rounded shadow-sm border border-gray-300 relative flex items-center justify-center">
                                        <div className="text-[8px] text-gray-400">Teclado</div>
                                    </div>
                                )}

                                {currentConfig.items.includes('notebook') && (
                                    <div className="w-[85px] h-[110px] bg-white border border-gray-200 shadow-sm relative rotate-3 rounded-sm flex items-center justify-center">
                                        <div className="w-full text-center text-[8px] text-gray-400 rotate-90">Cuaderno A4</div>
                                        <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-red-200"></div>
                                    </div>
                                )}

                                {currentConfig.items.includes('pencilcase') && (
                                    <div className="w-[60px] h-[20px] bg-blue-400 rounded-full shadow-sm rotate-12 absolute top-10 right-10"></div>
                                )}

                                {currentConfig.items.includes('mouse') && (
                                    <div className="w-[20px] h-[30px] bg-white border border-gray-300 rounded-full shadow-sm absolute bottom-10 right-20"></div>
                                )}

                                {currentConfig.items.includes('coffee') && (
                                    <div className="w-[25px] h-[25px] bg-white border-2 border-gray-200 rounded-full shadow-sm absolute top-4 left-4 flex items-center justify-center">
                                        <div className="w-[18px] h-[18px] bg-amber-800 rounded-full"></div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 text-xs text-gray-400">Vista Superior</div>

                    </div>
                </div>

            </div>
        </div>
    );
}
