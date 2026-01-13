'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function PregnancyCalculatorClient() {
    const [lastPeriod, setLastPeriod] = useState('');
    const [cycleLength, setCycleLength] = useState(28);

    interface Result {
        dueDate: string;
        weeks: number;
        days: number;
        trimester: number;
        conceptionDate: string;
    }

    const [result, setResult] = useState<Result | null>(null);

    const calculatePregnancy = () => {
        if (!lastPeriod) return;

        const lmp = new Date(lastPeriod);
        const cycleAdjustment = cycleLength - 28;

        // Naegele's rule: LMP + 280 days + cycle adjustment
        const dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);

        // Current gestation
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lmp.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(totalDays / 7);
        const days = totalDays % 7;

        let trimester = 1;
        if (weeks >= 13 && weeks <= 26) trimester = 2;
        if (weeks >= 27) trimester = 3;

        // Approx conception date (LMP + 14 days + cycle adjustment)
        const conception = new Date(lmp);
        conception.setDate(conception.getDate() + 14 + cycleAdjustment);

        setResult({
            dueDate: dueDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            weeks,
            days,
            trimester,
            conceptionDate: conception.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4 text-pink-500">
                    <FontAwesomeIcon icon={faBaby} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Embarazo</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Conoce tu fecha probable de parto y sigue el desarrollo de tu bebé.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8 items-end">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Fecha de Última Regla (FUR)</label>
                        <input
                            type="date"
                            value={lastPeriod}
                            onChange={(e) => setLastPeriod(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Duración del Ciclo (Días)</label>
                        <input
                            type="number"
                            min="20"
                            max="45"
                            value={cycleLength}
                            onChange={(e) => setCycleLength(Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 outline-none"
                        />
                        <p className="text-xs text-text/40 mt-1">Lo normal es 28 días.</p>
                    </div>
                </div>

                <button
                    onClick={calculatePregnancy}
                    className="w-full py-4 bg-pink-500 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-pink-600 transition-all mb-8"
                >
                    Calcular Fecha de Parto
                </button>

                {result && (
                    <div className="animate-fade-in-up">
                        <div className="bg-gradient-to-r from-pink-50 to-white border border-pink-100 rounded-2xl p-8 text-center mb-8">
                            <div className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-2">Fecha Probable de Parto</div>
                            <div className="text-2xl md:text-3xl font-bold text-pink-600 capitalize">{result.dueDate}</div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">{result.weeks} Semanas</div>
                                <div className="text-sm text-gray-500">y {result.days} días de gestación</div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                                <div className="text-3xl font-bold text-gray-800 mb-1">{result.trimester}º</div>
                                <div className="text-sm text-gray-500">Trimestre actual</div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                                <div className="text-sm font-bold text-gray-400 mb-2">Concepción Aprox.</div>
                                <div className="text-lg font-bold text-gray-700">{result.conceptionDate}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
