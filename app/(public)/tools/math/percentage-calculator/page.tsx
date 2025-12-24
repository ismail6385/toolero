'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalculator,
    faPercentage,
    faEquals
} from '@fortawesome/free-solid-svg-icons';

export default function PercentageCalculator() {
    // Case 1: X% of Y
    const [c1_percent, setC1_Percent] = useState<number>(15);
    const [c1_value, setC1_Value] = useState<number>(200);

    // Case 2: X is what percent of Y
    const [c2_part, setC2_Part] = useState<number>(25);
    const [c2_total, setC2_Total] = useState<number>(100);

    // Case 3: Percentage Change (Increase/Decrease)
    const [c3_from, setC3_From] = useState<number>(50);
    const [c3_to, setC3_To] = useState<number>(75);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                    Matemáticas
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Calculadora de Porcentajes</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Resuelve fácilmente todo tipo de cálculos porcentuales. Descuentos, aumentos y proporciones.
                </p>
            </div>

            <div className="grid gap-6">

                {/* 1. Percentage OF */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">1</span>
                        Calcular Porcentaje de una cifra
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                        <span>¿Cuánto es el</span>
                        <div className="relative w-24">
                            <input
                                type="number"
                                value={c1_percent}
                                onChange={(e) => setC1_Percent(Number(e.target.value))}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-green-600 outline-none focus:border-green-500"
                            />
                            <span className="absolute right-2 top-2.5 text-xs text-text/40">%</span>
                        </div>
                        <span>de</span>
                        <input
                            type="number"
                            value={c1_value}
                            onChange={(e) => setC1_Value(Number(e.target.value))}
                            className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-text outline-none focus:border-green-500"
                        />
                        <span className="md:ml-4 text-text/50"><FontAwesomeIcon icon={faEquals} /></span>
                        <span className="text-3xl font-bold text-green-600 ml-2">
                            {((c1_percent / 100) * c1_value).toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* 2. What Percentage IS */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                        ¿Qué porcentaje representa?
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                        <input
                            type="number"
                            value={c2_part}
                            onChange={(e) => setC2_Part(Number(e.target.value))}
                            className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-text outline-none focus:border-blue-500"
                        />
                        <span>es el</span>
                        <span className="text-2xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                            {c2_total > 0 ? ((c2_part / c2_total) * 100).toLocaleString('es-ES', { maximumFractionDigits: 2 }) : 0}%
                        </span>
                        <span>de</span>
                        <input
                            type="number"
                            value={c2_total}
                            onChange={(e) => setC2_Total(Number(e.target.value))}
                            className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-text outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* 3. Percentage Change */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">3</span>
                        Cambio Porcentual (Aumento/Disminución)
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg">
                        <span>De</span>
                        <input
                            type="number"
                            value={c3_from}
                            onChange={(e) => setC3_From(Number(e.target.value))}
                            className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-text outline-none focus:border-purple-500"
                        />
                        <span>a</span>
                        <input
                            type="number"
                            value={c3_to}
                            onChange={(e) => setC3_To(Number(e.target.value))}
                            className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-center font-bold text-text outline-none focus:border-purple-500"
                        />
                        <span className="md:ml-auto text-text/50">Diferencia:</span>
                        {(() => {
                            const diff = c3_to - c3_from;
                            const percent = c3_from !== 0 ? (diff / c3_from) * 100 : 0;
                            const isPositive = diff > 0;

                            return (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xl ${isPositive ? 'bg-green-100 text-green-700' : diff < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {isPositive ? '+' : ''}{percent.toLocaleString('es-ES', { maximumFractionDigits: 2 })}%
                                </div>
                            );
                        })()}
                    </div>
                </div>

            </div>
        </div>
    );
}
