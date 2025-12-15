'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt,
    faCalculator,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export default function DateDiffClient() {
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [result, setResult] = useState<{
        days: number;
        weeks: number;
        months: number;
        years: number;
        workDays: number;
    } | null>(null);

    const calculateDiff = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Time difference in milliseconds
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Years and Months (Approximate)
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            // days += new Date(year, month, 0).getDate(); // Not strictly needed for diff but for precise Y-M-D breakdown
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Work days (Mon-Fri)
        let workDays = 0;
        let current = new Date(start);
        while (current <= end) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                workDays++;
            }
            current.setDate(current.getDate() + 1);
        }
        // If start > end, we swapped logically in Math.abs but loop assumes order. 
        // For workdays, let's just handle start < end or swap for calculation.
        if (start > end) {
            // Recalculate workdays correctly if swapped
            workDays = 0;
            current = new Date(end);
            const properEnd = new Date(start);
            while (current <= properEnd) {
                const dayOfWeek = current.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    workDays++;
                }
                current.setDate(current.getDate() + 1);
            }
        } else {
            // Already calculated
        }

        setResult({
            days: totalDays,
            weeks: Math.floor(totalDays / 7),
            months: (years * 12) + months, // Total months approx
            years: years, // Full years
            workDays: Math.max(0, workDays - 1) // Exclude start date from count usually, or inclusive? Let's say inclusive range count.
            // Actually standard diff usually counts full days passed. 
            // Let's stick to total days.
            // For workdays, usually inclusive of both start and end if they are workdays? 
            // Let's just output logic: Count of M-F in the range.
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-teal-100 rounded-full mb-4 text-teal-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">Diferencia de Fechas</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Calcula el tiempo exacto entre dos fechas. Días, semanas y días laborales.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-end mb-8">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Fecha Inicial</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg"
                        />
                    </div>
                    <div className="hidden md:flex justify-center pb-4 text-teal-500">
                        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Fecha Final</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none text-lg"
                        />
                    </div>
                </div>

                <div className="flex justify-center mb-12">
                    <button
                        onClick={calculateDiff}
                        className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faCalculator} />
                        Calcular Diferencia
                    </button>
                </div>

                {result && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="text-4xl font-bold text-teal-600 mb-1">{result.days}</div>
                            <div className="text-sm font-bold text-text/50 uppercase">Días Totales</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="text-4xl font-bold text-teal-600 mb-1">{result.weeks}</div>
                            <div className="text-sm font-bold text-text/50 uppercase">Semanas</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="text-4xl font-bold text-teal-600 mb-1">{result.workDays}</div>
                            <div className="text-sm font-bold text-text/50 uppercase">Días Laborales</div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
                            <div className="text-4xl font-bold text-teal-600 mb-1">{result.months}</div>
                            <div className="text-sm font-bold text-text/50 uppercase">Meses (Aprox)</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
