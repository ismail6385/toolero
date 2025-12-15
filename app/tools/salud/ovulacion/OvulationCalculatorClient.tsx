'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faHeartbeat, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

export default function OvulationCalculatorClient() {
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState(28);

    interface Result {
        fertileStart: string;
        fertileEnd: string;
        ovulationDate: string;
        nextPeriod: string;
    }

    const [result, setResult] = useState<Result | null>(null);

    const calculate = () => {
        if (!lastPeriod) return;

        const lmp = new Date(lastPeriod);

        // Ovulation is usually 14 days before the NEXT period.
        // So Ovulation Date = LMP + Cycle Length - 14
        const ovulation = new Date(lmp);
        ovulation.setDate(ovulation.getDate() + cycleLength - 14);

        // Fertile window: 5 days before ovulation + ovulation day
        const fertileStart = new Date(ovulation);
        fertileStart.setDate(fertileStart.getDate() - 5);

        const fertileEnd = new Date(ovulation); // Day of ovulation is peak

        // Next Period
        const nextPer = new Date(lmp);
        nextPer.setDate(nextPer.getDate() + cycleLength);

        setResult({
            ovulationDate: ovulation.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
            fertileStart: fertileStart.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
            fertileEnd: fertileEnd.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
            nextPeriod: nextPer.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 text-purple-600">
                    <FontAwesomeIcon icon={faVenus} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Ovulación</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Identifica tus días más fértiles y maximiza tus probabilidades de concebir.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8 items-end">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Primer día de tu última regla</label>
                        <input
                            type="date"
                            value={lastPeriod}
                            onChange={(e) => setLastPeriod(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Duración media del ciclo (días)</label>
                        <input
                            type="number"
                            min="21"
                            max="40"
                            value={cycleLength}
                            onChange={(e) => setCycleLength(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="w-full py-4 bg-purple-600 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-purple-700 transition-all mb-8"
                >
                    Calcular Días Fértiles
                </button>

                {result && (
                    <div className="animate-fade-in-up space-y-6">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Día de Ovulación Estimado</div>
                                <div className="text-3xl md:text-4xl font-bold capitalize mb-4">{result.ovulationDate}</div>
                                <div className="inline-flex items-center bg-white/20 backdrop-blur rounded-full px-4 py-1 text-sm font-medium">
                                    <FontAwesomeIcon icon={faHeartbeat} className="mr-2" />
                                    Máxima Fertilidad
                                </div>
                            </div>
                            {/* Decorative circle */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                </div>
                                <div className="text-sm font-bold text-green-800 uppercase mb-1">Ventana Fértil</div>
                                <div className="text-xl font-bold text-green-900">{result.fertileStart} - {result.fertileEnd}</div>
                                <p className="text-xs text-green-600/70 mt-2">Días con probabilidad alta</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
                                <div className="text-sm font-bold text-gray-400 uppercase mb-1">Próximo Periodo</div>
                                <div className="text-xl font-bold text-gray-700">{result.nextPeriod}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
