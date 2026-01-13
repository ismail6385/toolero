'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faGlassWhiskey } from '@fortawesome/free-solid-svg-icons';

export default function WaterIntakeClient() {
    const [weight, setWeight] = useState<number | ''>(''); // kg
    const [activity, setActivity] = useState<number | ''>(''); // minutes per day

    const calculateWater = () => {
        if (!weight) return null;

        // Basic Formula: Weight (kg) * 35 ml
        // Add 0.5L for every 30 mins of exercise

        let waterMl = weight * 35;

        if (typeof activity === 'number' && activity > 0) {
            const extra = (activity / 30) * 500; // 500ml per 30 mins
            waterMl += extra;
        }

        return Math.round(waterMl);
    };

    const waterMl = calculateWater();
    const glasses = waterMl ? Math.round(waterMl / 250) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
                    <FontAwesomeIcon icon={faTint} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Agua</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Descubre cuánta agua necesita tu cuerpo para funcionar óptimamente.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">

                <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gray-200">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-text mb-2">
                                ¿Cuánto pesas? (kg)
                            </label>
                            <input
                                type="number"
                                value={weight}
                                onChange={e => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-xl font-bold transition-all"
                                placeholder="Ej. 70"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text mb-2">
                                Ejercicio diario (minutos)
                            </label>
                            <input
                                type="number"
                                value={activity}
                                onChange={e => setActivity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-xl font-bold transition-all"
                                placeholder="Ej. 45"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-left">
                    {waterMl ? (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-text mb-2">Tu objetivo diario:</h2>

                            <div className="flex items-baseline gap-2 justify-center md:justify-start mb-6">
                                <span className="text-6xl font-black text-blue-600 tracking-tight">{(waterMl / 1000).toFixed(1)}</span>
                                <span className="text-2xl font-bold text-blue-400">Litros</span>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-6 inline-block md:block w-full">
                                <div className="flex items-center justify-center gap-4 mb-2">
                                    <FontAwesomeIcon icon={faGlassWhiskey} className="text-3xl text-blue-500" />
                                    <span className="text-3xl font-bold text-text/80">≈ {glasses}</span>
                                </div>
                                <div className="text-sm font-semibold text-blue-400">Vasos de 250ml</div>
                            </div>

                            <p className="mt-6 text-sm text-text/60 leading-relaxed max-w-sm mx-auto md:mx-0">
                                * Esta es una recomendación aproximada. En climas cálidos o con mucha sudoración, aumenta tu ingesta.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full opacity-30">
                            <FontAwesomeIcon icon={faTint} className="text-8xl mb-4" />
                            <p className="font-bold text-lg">Ingresa tus datos</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
