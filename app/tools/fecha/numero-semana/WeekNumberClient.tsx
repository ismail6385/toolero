'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function WeekNumberClient() {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    const getWeekNumber = (d: Date) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
        return weekNo;
    };

    if (!date) return null;

    const week = getWeekNumber(date);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Número de Semana Actual</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Consulta el número de semana ISO-8601 del año en curso.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-3xl p-12 shadow-xl max-w-2xl mx-auto">
                <div className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4">Estamos en la semana</div>
                <div className="text-[150px] leading-none font-black text-primary drop-shadow-sm">
                    {week}
                </div>
                <div className="mt-8 text-xl font-medium text-gray-700 bg-gray-50 px-6 py-2 rounded-full border border-gray-200">
                    de {date.getFullYear()}
                </div>

                <div className="mt-8 text-sm text-gray-400 max-w-md text-center">
                    * Calculado según el estándar ISO-8601 (la semana comienza el lunes).
                </div>
            </div>
        </div>
    );
}
