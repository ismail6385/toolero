'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faTree, faRulerCombined, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function WoodVolumeClient() {
    const [mode, setMode] = useState('sawn'); // sawn (aserrada) | round (rollo)

    // Sawn Inputs
    const [sawnCount, setSawnCount] = useState(1);
    const [sawnThickness, setSawnThickness] = useState(1); // inches usually or cm
    const [sawnWidth, setSawnWidth] = useState(4); // inches usually or cm
    const [sawnLength, setSawnLength] = useState(8); // feet usually or m

    const [unitThick, setUnitThick] = useState('in'); // in, cm, mm
    const [unitWidth, setUnitWidth] = useState('in'); // in, cm, mm
    const [unitLength, setUnitLength] = useState('ft'); // ft, m, cm

    // Round Inputs
    const [logDiameter, setLogDiameter] = useState(30); // cm
    const [logLength, setLogLength] = useState(2.5); // m
    const [logCount, setLogCount] = useState(1);

    // Results
    const [volM3, setVolM3] = useState(0);
    const [volFt3, setVolFt3] = useState(0);
    const [boardFeet, setBoardFeet] = useState(0);

    // Helpers
    const toMeters = (val: number, unit: string) => {
        if (unit === 'm') return val;
        if (unit === 'cm') return val / 100;
        if (unit === 'mm') return val / 1000;
        if (unit === 'in') return val * 0.0254;
        if (unit === 'ft') return val * 0.3048;
        return val;
    };

    // To Inches (for Board Feet)
    const toInches = (val: number, unit: string) => {
        if (unit === 'in') return val;
        if (unit === 'cm') return val / 2.54;
        if (unit === 'mm') return val / 25.4;
        if (unit === 'ft') return val * 12;
        if (unit === 'm') return val / 0.0254;
        return val;
    };

    useEffect(() => {
        if (mode === 'sawn') {
            // Calc Volume in m3
            const tM = toMeters(sawnThickness, unitThick);
            const wM = toMeters(sawnWidth, unitWidth);
            const lM = toMeters(sawnLength, unitLength);

            const vOneM3 = tM * wM * lM;
            const totalM3 = vOneM3 * sawnCount;

            setVolM3(totalM3);
            setVolFt3(totalM3 * 35.3147); // 1 m3 = 35.3147 ft3

            // Board Feet = (Thickness" x Width" x Length') / 12
            // Or (Vol in cubic inches) / 144
            const tIn = toInches(sawnThickness, unitThick);
            const wIn = toInches(sawnWidth, unitWidth);
            // Length needs to be in FEET for the standard formula (T" x W" x L') / 12
            let lFt = 0;
            if (unitLength === 'ft') lFt = sawnLength;
            else if (unitLength === 'm') lFt = sawnLength * 3.28084;
            else if (unitLength === 'cm') lFt = sawnLength / 30.48;
            else if (unitLength === 'in') lFt = sawnLength / 12; // Rare but possible

            const bf = (tIn * wIn * lFt) / 12;
            setBoardFeet(bf * sawnCount);

        } else {
            // Round Wood (Cylinder Volume) = Pi * r^2 * h
            // r = (diameter / 2)
            const dM = toMeters(logDiameter, 'cm'); // Always cm input usually for logs
            const lM = toMeters(logLength, 'm');

            const r = dM / 2;
            const vOneM3 = Math.PI * r * r * lM;
            const totalM3 = vOneM3 * logCount;

            setVolM3(totalM3);
            setVolFt3(totalM3 * 35.3147);

            // Board Feet for Round Logs (Doyle Scale rule or International 1/4 or Scribner)
            // Simplified approximation: Board Feet ≈ Volume (ft3) * 6 (very rough, actual yield is lower due to squaring)
            // Or use formula: ((Dia" - 4)^2 * Length') / 16 (Doyle Rule)
            const diaIn = logDiameter / 2.54;
            const lenFt = logLength * 3.28084;

            // Doyle Log Rule (Standard in many places)
            const bfDoyle = (Math.pow(diaIn - 4, 2) * lenFt) / 16;
            setBoardFeet(Math.max(0, bfDoyle * logCount));
        }
    }, [mode, sawnCount, sawnThickness, sawnWidth, sawnLength, unitThick, unitWidth, unitLength, logDiameter, logLength, logCount]);


    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Volumen de Madera</h1>
                    <p className="text-amber-100 text-lg">
                        Convierte medidas y calcula volúmenes exactos para aserraderos y carpintería.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faTree} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Mode Switch */}
                    <div className="bg-gray-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setMode('sawn')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'sawn' ? 'bg-white text-amber-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FontAwesomeIcon icon={faCube} /> Madera Aserrada
                        </button>
                        <button
                            onClick={() => setMode('round')}
                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${mode === 'round' ? 'bg-white text-amber-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <FontAwesomeIcon icon={faTree} /> Madera en Rollo
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        {mode === 'sawn' ? (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Dimensiones de Tabla/Viga</h3>

                                {/* Count */}
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                                    <input type="number" min="1" value={sawnCount} onChange={e => setSawnCount(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold text-amber-900" />
                                </div>

                                {/* Thickness */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Grosor</label>
                                        <input type="number" value={sawnThickness} onChange={e => setSawnThickness(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Unidad</label>
                                        <select value={unitThick} onChange={e => setUnitThick(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50">
                                            <option value="mm">mm</option>
                                            <option value="cm">cm</option>
                                            <option value="in">pulgadas (in)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Width */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Ancho</label>
                                        <input type="number" value={sawnWidth} onChange={e => setSawnWidth(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Unidad</label>
                                        <select value={unitWidth} onChange={e => setUnitWidth(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50">
                                            <option value="mm">mm</option>
                                            <option value="cm">cm</option>
                                            <option value="in">pulgadas (in)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Length */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Largo</label>
                                        <input type="number" value={sawnLength} onChange={e => setSawnLength(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Unidad</label>
                                        <select value={unitLength} onChange={e => setUnitLength(e.target.value)} className="w-full p-2 border rounded-lg bg-gray-50">
                                            <option value="m">metros (m)</option>
                                            <option value="ft">pies (ft)</option>
                                            <option value="cm">cm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Dimensiones del Tronco</h3>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                                    <input type="number" min="1" value={logCount} onChange={e => setLogCount(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold text-amber-900" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Diámetro (cm)</label>
                                        <input type="number" value={logDiameter} onChange={e => setLogDiameter(Number(e.target.value))} className="w-full p-2 border rounded-lg mt-1" />
                                        <p className="text-xs text-gray-400 mt-1">Promedio</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase">Largo (m)</label>
                                        <input type="number" value={logLength} onChange={e => setLogLength(Number(e.target.value))} className="w-full p-2 border rounded-lg mt-1" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Result Card */}
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 relative overflow-hidden">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">Volumen Total</h3>
                                <div className="text-3xl font-black text-amber-800">{volM3.toFixed(4)} <span className="text-base text-amber-600">m³</span></div>
                                <div className="text-sm font-medium text-amber-700/70">{volFt3.toFixed(2)} ft³</div>
                            </div>
                            <div className="border-l border-amber-200 pl-4">
                                <h3 className="text-gray-500 text-xs font-bold uppercase mb-1 flex items-center gap-1">Pies Tablares <FontAwesomeIcon icon={faExchangeAlt} className="text-amber-400" /></h3>
                                <div className="text-3xl font-black text-amber-600">{boardFeet.toFixed(2)} <span className="text-base">PT</span></div>
                                <div className="text-xs leading-tight text-amber-700/60 mt-1">
                                    {mode === 'round' ? '(Aprox. Regla Doyle)' : '(Medida Comercial)'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualizer */}
                <div className="lg:col-span-7">
                    <div className="bg-white rounded-3xl h-full min-h-[500px] border border-gray-200 relative flex items-center justify-center p-8 overflow-hidden shadow-inner bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]">

                        {/* 3D Representation */}
                        <div className="relative transform transition-all duration-500" style={{ transform: 'perspective(1000px) rotateX(60deg) rotateZ(-30deg)' }}>
                            {/* Objects array */}
                            {Array.from({ length: Math.min(mode === 'sawn' ? sawnCount : logCount, 5) }).map((_, i) => (
                                <div key={i} className="absolute" style={{ top: `${i * -20}px`, left: `${i * 20}px` }}>
                                    {mode === 'sawn' ? (
                                        // Box
                                        <div className="relative group">
                                            <div
                                                className="bg-amber-300 border border-amber-400"
                                                style={{
                                                    width: '100px', // Visual scale fixed for aesthetic? Or dynamic?
                                                    // Let's make it fixed size but label it. Real proportion tricky in CSS 3D fast.
                                                    height: '200px',
                                                    background: 'linear-gradient(90deg, #fcd34d 0%, #fbbf24 100%)'
                                                }}
                                            >
                                                {/* Top Face */}
                                                <div className="absolute -top-[20px] left-[10px] w-full bg-amber-200 h-[20px] transform skew-x-[-45deg] border border-amber-300 origin-bottom-left flex items-center justify-center text-[8px] text-amber-800"></div>
                                                {/* Side Face */}
                                                <div className="absolute top-0 -right-[10px] w-[10px] h-full bg-amber-500 transform skew-y-[-45deg] border border-amber-600 origin-top-left"></div>

                                                <span className="absolute inset-0 flex items-center justify-center font-bold text-amber-900/20 text-xl rotate-90">MADERA</span>
                                            </div>
                                        </div>
                                    ) : (
                                        // Cylinder (CSS approximation)
                                        <div className="relative">
                                            <div className="w-24 h-48 bg-gradient-to-r from-stone-600 via-stone-500 to-stone-700 rounded-lg relative border-l-2 border-r-2 border-stone-800 flex items-center justify-center shadow-2xl">
                                                {/* End cap */}
                                                <div className="absolute -top-4 w-24 h-8 bg-amber-200/90 rounded-[50%] border border-stone-600 shadow-inner flex items-center justify-center">
                                                    <div className="w-16 h-4 border border-amber-800/20 rounded-[50%]"></div>
                                                </div>
                                                <div className="absolute -bottom-4 w-24 h-8 bg-stone-800 rounded-[50%] -z-10"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Info Overlay */}
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-100 shadow-lg text-sm max-w-xs">
                            <h4 className="font-bold text-gray-800 mb-2">Resumen de Medidas</h4>
                            {mode === 'sawn' ? (
                                <ul className="space-y-1 text-gray-600">
                                    <li>Grosor: <strong>{sawnThickness} {unitThick}</strong></li>
                                    <li>Ancho: <strong>{sawnWidth} {unitWidth}</strong></li>
                                    <li>Largo: <strong>{sawnLength} {unitLength}</strong></li>
                                </ul>
                            ) : (
                                <ul className="space-y-1 text-gray-600">
                                    <li>Diámetro: <strong>{logDiameter} cm</strong></li>
                                    <li>Largo: <strong>{logLength} m</strong></li>
                                </ul>
                            )}
                        </div>

                        {/* Visualization Note */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            Vista Previa {Math.min(mode === 'sawn' ? sawnCount : logCount, 5)} {mode === 'sawn' ? sawnCount > 1 ? 'piezas' : 'pieza' : logCount > 1 ? 'troncos' : 'tronco'}
                            {(mode === 'sawn' ? sawnCount : logCount) > 5 && ' ...'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
