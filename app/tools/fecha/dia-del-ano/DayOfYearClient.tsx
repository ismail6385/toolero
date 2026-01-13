'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function DayOfYearClient() {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    const getDayOfYear = (d: Date) => {
        const start = new Date(d.getFullYear(), 0, 0);
        const diff = d.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };

    if (!date) return null;

    const day = getDayOfYear(date);
    const totalDays = ((date.getFullYear() % 4 === 0 && date.getFullYear() % 100 > 0) || date.getFullYear() % 400 === 0) ? 366 : 365;
    const percentage = Math.round((day / totalDays) * 100);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Día del Año</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    ¿Qué día es hoy (1-{totalDays})? Visualiza el progreso del año.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-3xl p-12 shadow-xl max-w-2xl mx-auto space-y-8">
                <div>
                    <div className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-4 text-center">Hoy es el día</div>
                    <div className="text-[150px] leading-none font-black text-primary drop-shadow-sm text-center">
                        {day}
                    </div>
                    <div className="text-gray-400 font-bold text-xl text-center mt-2">de {totalDays}</div>
                </div>

                <div className="w-full">
                    <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
                        <span>Progreso del {date.getFullYear()}</span>
                        <span>{percentage}%</span>
                    </div>
                    <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
