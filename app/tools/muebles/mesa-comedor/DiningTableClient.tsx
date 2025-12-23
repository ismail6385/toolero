'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faRulerCombined, faChair, faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function DiningTableClient() {
    // State
    const [numPeople, setNumPeople] = useState(6);
    const [shape, setShape] = useState('rectangular'); // rectangular | round

    // Constants (cm)
    const widthPerPerson = 60; // Minimum width per place setting
    const depthPerPerson = 40; // Depth for plate/glass
    const centerZone = 20; // Space in middle for serving dishes

    // Calculations
    let minLength = 0, minWidth = 0, optimalLength = 0, optimalWidth = 0;

    if (shape === 'rectangular') {
        // Standard rectangular logic (assuming heads of table)
        // 4 people: 2 per side (no heads) or 1 per side + 2 heads
        // Let's assume standard layout
        if (numPeople <= 4) {
            minLength = 120; minWidth = 80;
            optimalLength = 140; optimalWidth = 90;
        } else if (numPeople <= 6) {
            minLength = 160; minWidth = 90;
            optimalLength = 180; optimalWidth = 95;
        } else if (numPeople <= 8) {
            minLength = 200; minWidth = 90;
            optimalLength = 240; optimalWidth = 100;
        } else if (numPeople <= 10) {
            minLength = 260; minWidth = 100;
            optimalLength = 300; optimalWidth = 110;
        } else {
            // 12+ linear scaling
            const sidePeople = Math.ceil((numPeople - 2) / 2);
            minLength = sidePeople * widthPerPerson + 40; // +40 for buffer
            minWidth = 100;
            optimalLength = minLength + 40;
            optimalWidth = 120;
        }
    } else {
        // Round Table
        // Circumference = numPeople * widthPerPerson
        // Diameter = Circumference / PI
        const circ = numPeople * widthPerPerson;
        const minDiameter = Math.round(circ / Math.PI);
        // Optimize: Round tables need more space for legs as people increase
        minLength = minDiameter;
        minWidth = minDiameter;
        optimalLength = minDiameter + 20; // Breathing room
        optimalWidth = minDiameter + 20;
    }

    // Clearance for chairs
    const chairPushBack = 75; // 75cm needed to push back chair and stand
    const chairSit = 45; // 45cm occupied while sitting

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora Mesa Comedor</h1>
                    <p className="text-red-100 text-lg">
                        Encuentra el tamaño ideal de mesa según el número de comensales.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                    <FontAwesomeIcon icon={faUtensils} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="bg-red-100 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
                            Configuración
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Forma</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setShape('rectangular')}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${shape === 'rectangular' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <FontAwesomeIcon icon={faSquare} className="text-xl" />
                                        <span className="text-sm font-medium">Rectangular</span>
                                    </button>
                                    <button
                                        onClick={() => setShape('round')}
                                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${shape === 'round' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        <FontAwesomeIcon icon={faCircle} className="text-xl" />
                                        <span className="text-sm font-medium">Redonda</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                                    <span>Nº de Personas</span>
                                    <span className="font-bold text-red-600 bg-red-50 px-2 rounded">{numPeople}</span>
                                </label>
                                <input
                                    type="range" min="2" max="16" step={shape === 'rectangular' ? 2 : 1}
                                    value={numPeople}
                                    onChange={e => setNumPeople(Number(e.target.value))}
                                    className="w-full accent-red-600 cursor-pointer"
                                />
                                <div className="text-xs text-gray-400 mt-2 flex justify-between">
                                    <span>2</span>
                                    <span>16</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-red-100 text-red-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
                            Tamaño Recomendado
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-500 block mb-1">Mínimo Necesario</span>
                                <div className="text-2xl font-bold text-gray-800">
                                    {shape === 'rectangular' ? `${minLength} x ${minWidth} cm` : `Ø ${minLength} cm`}
                                </div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <span className="text-sm text-red-600 font-semibold block mb-1">Ideal (Cómodo)</span>
                                <div className="text-2xl font-bold text-red-800">
                                    {shape === 'rectangular' ? `${optimalLength} x ${optimalWidth} cm` : `Ø ${optimalLength} cm`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-100 rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-12 overflow-hidden">

                        {/* Floor */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>

                        {/* Room Area Clearance Visuals (Dashed lines showing chair pull-back) */}
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-3xl absolute flex items-center justify-center"
                            style={{
                                width: shape === 'rectangular' ? (optimalLength * 1.5) : (optimalLength * 1.5),
                                height: shape === 'rectangular' ? (optimalWidth + (chairPushBack * 2)) * 1.2 : (optimalLength + (chairPushBack * 2)) * 1.2,
                                // Simple scaling multiplier for visibility, not exact pixel scale
                                maxWidth: '90%',
                                maxHeight: '90%'
                            }}
                        >
                            <span className="absolute top-4 text-xs font-bold text-gray-400 bg-white/50 px-2 rounded">Zona de Paso (sillas afuera)</span>
                        </div>

                        {/* The Table */}
                        <div
                            className={`bg-white shadow-xl relative flex items-center justify-center transition-all duration-500`}
                            style={{
                                width: shape === 'rectangular' ? '300px' : '300px', // Fixed base visual size
                                height: shape === 'rectangular' ? `${(optimalWidth / optimalLength) * 300}px` : '300px',
                                borderRadius: shape === 'round' ? '50%' : '8px'
                            }}
                        >
                            {/* Table Surface */}
                            <div className="text-center">
                                <div className="text-gray-900 font-bold">{numPeople} pax</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {shape === 'rectangular'
                                        ? `${optimalLength}cm x ${optimalWidth}cm`
                                        : `Ø ${optimalLength}cm`
                                    }
                                </div>
                            </div>

                            {/* Chairs (Visual Representation Logic) */}
                            {Array.from({ length: numPeople }).map((_, i) => {
                                // Positioning chairs around the center
                                const angle = (i * (360 / numPeople)) * (Math.PI / 180);
                                const radius = shape === 'rectangular' ? 0 : 180; // Only useful for round logic here

                                // Simplified Placement for RECTANGULAR
                                // This is tricky to do dynamically and perfectly for N people with CSS only without canvas interaction.
                                // For simplicity, we just put simple dots for Rectangle.
                                // For Round, we can use rotation.

                                if (shape === 'round') {
                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-12 h-12 bg-red-500 rounded-full shadow-md flex items-center justify-center text-white text-xs font-bold"
                                            style={{
                                                transform: `translate(${Math.cos(angle) * 190}px, ${Math.sin(angle) * 190}px)`
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faChair} />
                                        </div>
                                    )
                                } else {
                                    // Rectangle Simplified: 
                                    // We won't accurately place N chairs dynamically in this quick iteration for all numbers
                                    // Just showing a generic "Chairs around" indicator
                                    return null;
                                }
                            })}

                            {/* Simplified Rectangular Chairs Manual Placement for common numbers */}
                            {shape === 'rectangular' && (
                                <>
                                    {/* Heads */}
                                    <div className="absolute -left-16 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white"><FontAwesomeIcon icon={faChair} /></div>
                                    <div className="absolute -right-16 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white"><FontAwesomeIcon icon={faChair} /></div>
                                    {/* Sides */}
                                    {/* Quick visual hack: show "Side" blocks covering approximate length */}
                                    <div className="absolute -top-16 w-full flex justify-center gap-4">
                                        {Array.from({ length: Math.ceil((numPeople - 2) / 2) }).map((_, k) => (
                                            <div key={k} className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white"><FontAwesomeIcon icon={faChair} /></div>
                                        ))}
                                    </div>
                                    <div className="absolute -bottom-16 w-full flex justify-center gap-4">
                                        {Array.from({ length: Math.ceil((numPeople - 2) / 2) }).map((_, k) => (
                                            <div key={k} className="w-12 h-12 bg-red-500 rounded-lg transform rotate-180 flex items-center justify-center text-white"><FontAwesomeIcon icon={faChair} /></div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="mt-4 flex gap-4 text-xs text-gray-500 justify-center">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Silla
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 border border-dashed border-gray-400 rounded-sm"></span> Espacio para levantarse (75cm)
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
