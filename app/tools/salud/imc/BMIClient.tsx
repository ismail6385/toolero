'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeight, faRulerVertical, faInfoCircle, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function BMIClient() {
    const [weight, setWeight] = useState<number | ''>('');
    const [height, setHeight] = useState<number | ''>(''); // in cm
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    const calculateBMI = () => {
        if (!weight || !height) return null;
        let bmi = 0;
        if (unit === 'metric') {
            // weight in kg, height in cm
            // BMI = kg / (m^2)
            const hM = height / 100;
            bmi = weight / (hM * hM);
        } else {
            // Imperial: lb / (in^2) * 703
            // Assume input is lb and inches? Or ft/in? Let's just do metric input for now or convert.
            // Let's stick to Metric for MVP simplicity in UI, or offer a switch that just changes labels/calc.
            // If imperial selected, assume inputs are kg/cm converted? No, just render different inputs.
            // Simplification: Let's stick to Metric which is standard in ES.
            return null;
        }
        return bmi;
    };

    const getStatus = (bmi: number) => {
        if (bmi < 18.5) return { label: 'Bajo Peso', color: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500' };
        if (bmi < 25) return { label: 'Peso Normal', color: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500' };
        if (bmi < 30) return { label: 'Sobrepeso', color: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500' };
        return { label: 'Obesidad', color: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500' };
    };

    const bmi = unit === 'metric' ? calculateBMI() : null;
    const status = bmi ? getStatus(bmi) : null;

    // Scale position (15 to 40 range approx)
    const getScalePos = (val: number) => {
        const min = 15;
        const max = 40;
        const p = Math.min(Math.max(val, min), max);
        return ((p - min) / (max - min)) * 100;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full mb-4 text-rose-600">
                    <FontAwesomeIcon icon={faWeight} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de IMC</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Conoce tu Índice de Masa Corporal y evalúa tu estado físico.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gray-200 h-full flex flex-col justify-center">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-text mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faRulerVertical} className="text-rose-500" />
                            Altura (cm)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={e => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            placeholder="Ej. 170"
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-xl font-bold transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faWeight} className="text-rose-500" />
                            Peso (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            placeholder="Ej. 70"
                            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none text-xl font-bold transition-all"
                        />
                    </div>
                </div>

                {/* Result */}
                <div className={`bg-surface p-8 rounded-3xl shadow-lg border-2 h-full flex flex-col items-center justify-center text-center transition-all ${status ? status.border : 'border-gray-100'}`}>
                    {bmi ? (
                        <>
                            <div className="text-6xl font-black text-text mb-2 tracking-tight">
                                {bmi.toFixed(1)}
                            </div>
                            <div className={`text-xl font-bold uppercase tracking-widest mb-8 ${status?.color}`}>
                                {status?.label}
                            </div>

                            {/* Visual Scale */}
                            <div className="w-full relative mt-4">
                                <div className="h-4 w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-50% to-red-500 relative overflow-hidden">
                                    {/* Markers could go here */}
                                </div>
                                <div
                                    className="absolute -top-3 transition-all duration-500"
                                    style={{ left: `${getScalePos(bmi)}%`, transform: 'translateX(-50%)' }}
                                >
                                    <FontAwesomeIcon icon={faArrowDown} className="text-text text-2xl" />
                                </div>
                                <div className="flex justify-between text-xs text-text/40 mt-2 font-mono">
                                    <span>15</span>
                                    <span>18.5</span>
                                    <span>25</span>
                                    <span>30</span>
                                    <span>40</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-text/40">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-6xl mb-4 opacity-50" />
                            <p className="font-medium">Ingresa tus datos para ver el resultado.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-200 text-sm text-text/70 leading-relaxed max-w-3xl mx-auto">
                <h3 className="font-bold text-text mb-2">Clasificación IMC (OMS)</h3>
                <ul className="grid grid-cols-2 gap-2">
                    <li className="flex justify-between"><span className="text-blue-500 font-medium">Bajo Peso</span> <span>&lt; 18.5</span></li>
                    <li className="flex justify-between"><span className="text-green-500 font-medium">Normal</span> <span>18.5 - 24.9</span></li>
                    <li className="flex justify-between"><span className="text-orange-500 font-medium">Sobrepeso</span> <span>25 - 29.9</span></li>
                    <li className="flex justify-between"><span className="text-red-500 font-medium">Obesidad</span> <span>&ge; 30</span></li>
                </ul>
            </div>
        </div>
    );
}
