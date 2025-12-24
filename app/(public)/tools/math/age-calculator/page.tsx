'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBirthdayCake,
    faCalendarAlt,
    faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';

export default function AgeCalculator() {
    const today = new Date().toISOString().split('T')[0];
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [targetDate, setTargetDate] = useState(today);

    const [age, setAge] = useState<{ years: number, months: number, days: number } | null>(null);
    const [nextBirthday, setNextBirthday] = useState<{ months: number, days: number } | null>(null);
    const [summary, setSummary] = useState<{ totalMonths: number, totalWeeks: number, totalDays: number, totalHours: number, totalMinutes: number } | null>(null);

    useEffect(() => {
        calculateAge();
    }, [birthDate, targetDate]);

    const calculateAge = () => {
        if (!birthDate || !targetDate) return;

        const start = new Date(birthDate);
        const end = new Date(targetDate);

        if (start > end) {
            setAge(null); // Invalid: born in future
            return;
        }

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            // Days in previous month
            const prevMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonthDate.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setAge({ years, months, days });

        // Summary Calculations
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        setSummary({
            totalMonths: (years * 12) + months,
            totalWeeks: Math.floor(totalDays / 7),
            totalDays: totalDays,
            totalHours: totalDays * 24,
            totalMinutes: totalDays * 24 * 60
        });

        // Next Birthday
        const nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
        if (nextBday < end) {
            nextBday.setFullYear(end.getFullYear() + 1);
        }

        const diffNext = nextBday.getTime() - end.getTime();
        const daysNext = Math.ceil(diffNext / (1000 * 60 * 60 * 24));
        // Simple approx for months/days next birthday
        setNextBirthday({
            months: Math.floor(daysNext / 30.5), // Approx
            days: daysNext % 31 // Rough approx to display "X months Y days"
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                    Edad & Tiempo
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Calculadora de Edad</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Calcula tu edad exacta en años, meses y días. Descubre cuántos segundos has vivido.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8 h-fit">
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-text mb-2 block">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 transition-colors bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-text mb-2 block">Calcular a la fecha</label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => setTargetDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 transition-colors bg-gray-50"
                            />
                        </div>

                        <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                            <h4 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBirthdayCake} /> Próximo Cumpleaños
                            </h4>
                            {nextBirthday && (
                                <p className="text-pink-600 text-sm">
                                    Faltan aproximadamente <b>{nextBirthday.months} meses</b> y <b>{nextBirthday.days} días</b>.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="flex flex-col gap-4">
                    {/* Main Age Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center flex-1 flex flex-col justify-center">
                        <span className="text-text/50 uppercase tracking-widest text-xs font-bold mb-4">Tu edad exacta es</span>
                        {age ? (
                            <div className="space-y-2">
                                <div className="text-6xl font-bold text-pink-600 tracking-tight">
                                    {age.years} <span className="text-2xl font-normal text-text/40">Años</span>
                                </div>
                                <div className="text-2xl font-medium text-text/60">
                                    {age.months} <span className="text-base font-normal">Meses</span> y {age.days} <span className="text-base font-normal">Días</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-500 font-medium">Fecha inválida (Futuro)</div>
                        )}
                    </div>

                    {/* Summary Stats */}
                    {summary && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                <div className="text-lg font-bold text-text">{summary.totalWeeks.toLocaleString()}</div>
                                <div className="text-xs text-text/50">Semanas Totales</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                <div className="text-lg font-bold text-text">{summary.totalDays.toLocaleString()}</div>
                                <div className="text-xs text-text/50">Días Totales</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                <div className="text-lg font-bold text-text">{summary.totalHours.toLocaleString()}</div>
                                <div className="text-xs text-text/50">Horas Totales</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                <div className="text-lg font-bold text-text">{summary.totalMinutes.toLocaleString()}</div>
                                <div className="text-xs text-text/50">Minutos Totales</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
