'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faHourglassHalf, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';

export default function AgeCalculatorClient() {
    const [birthDate, setBirthDate] = useState('');
    const [stats, setStats] = useState<any>(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const now = new Date();

        if (birth > now) {
            alert('La fecha de nacimiento no puede ser en el futuro.');
            return;
        }

        // Years, Months, Days
        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Total Diff
        const diffMs = now.getTime() - birth.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffWeek = Math.floor(diffDay / 7);

        // Next Birthday
        const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }
        const diffNextMs = nextBirthday.getTime() - now.getTime();
        const nextDays = Math.ceil(diffNextMs / (1000 * 60 * 60 * 24));

        setStats({
            years, months, days,
            totalWeeks: diffWeek,
            totalDays: diffDay,
            totalHours: diffHour,
            totalMinutes: diffMin,
            nextBirthdayDays: nextDays
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-4 text-teal-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Edad</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Descubre exactamente cuánto tiempo has vivido y cuándo es tu próximo cumpleaños.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">

                <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gray-200">
                    <label className="block text-sm font-bold text-text mb-2">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none text-xl font-bold transition-all mb-6"
                    />
                    <button
                        onClick={calculateAge}
                        disabled={!birthDate}
                        className="w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-teal-700 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <FontAwesomeIcon icon={faHourglassHalf} />
                        Calcular Edad
                    </button>
                </div>

                {stats ? (
                    <div className="space-y-4 animate-fade-in-up">
                        {/* Main Age Card */}
                        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <FontAwesomeIcon icon={faBirthdayCake} className="text-9xl" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">Tu Edad Exacta</div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-6xl font-black">{stats.years}</span>
                                    <span className="text-2xl font-bold opacity-80">años</span>
                                </div>
                                <div className="text-xl font-medium opacity-90">
                                    {stats.months} meses y {stats.days} días
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard label="Semanas" value={stats.totalWeeks.toLocaleString()} />
                            <StatCard label="Días" value={stats.totalDays.toLocaleString()} />
                            <StatCard label="Horas" value={stats.totalHours.toLocaleString()} />
                            <StatCard label="Minutos" value={stats.totalMinutes.toLocaleString()} />
                        </div>

                        {/* Next Birthday */}
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 text-center">
                            <div className="text-orange-800 font-bold mb-1">Próximo Cumpleaños</div>
                            <div className="text-3xl font-black text-orange-500">
                                {stats.nextBirthdayDays} <span className="text-lg font-bold text-orange-400">días</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gray-50 rounded-3xl border border-gray-100 h-full opacity-50">
                        <FontAwesomeIcon icon={faBirthdayCake} className="text-6xl mb-4 text-gray-300" />
                        <p className="font-bold text-gray-400">Ingresa tu fecha</p>
                    </div>
                )}

            </div>
        </div>
    );
}

function StatCard({ label, value }: any) {
    return (
        <div className="bg-surface p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-xs text-text/50 font-bold uppercase mb-1">{label} vividos</div>
            <div className="text-xl font-bold text-text/80">{value}</div>
        </div>
    );
}
