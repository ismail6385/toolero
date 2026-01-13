'use client';

import React, { useState } from 'react';
import { faBed, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SleepCalculatorClient() {
    const [mode, setMode] = useState<'wake' | 'sleep'>('wake'); // 'wake' = I want to wake up at..., 'sleep' = I am sleeping now / at...
    const [time, setTime] = useState('');
    const [results, setResults] = useState<{ time: string; cycles: number; label: string }[]>([]);

    const calculateSleep = () => {
        const cycleMinutes = 90;
        const fallingAsleepMinutes = 15;
        let baseTime = new Date();

        if (time) {
            const [hours, mins] = time.split(':').map(Number);
            baseTime.setHours(hours, mins, 0, 0);
        } else if (mode === 'sleep' && !time) {
            // "I'm going to sleep NOW"
            baseTime = new Date();
        } else {
            return; // Need input if not "Now"
        }

        const calculatedTimes = [];
        // Cycles: 3 (4.5h), 4 (6h), 5 (7.5h), 6 (9h)
        const cyclesToCalc = [6, 5, 4, 3];

        for (const cycles of cyclesToCalc) {
            const totalMinutes = (cycles * cycleMinutes) + (mode === 'wake' ? fallingAsleepMinutes : fallingAsleepMinutes); // Add falling asleep time 

            const resultDate = new Date(baseTime);

            if (mode === 'wake') {
                // If I want to wake up at X, I need to sleep at X - duration
                // Actually standard algo: WakeTime - (Cycles * 90 + 15 min to fall asleep)
                resultDate.setMinutes(resultDate.getMinutes() - (cycles * cycleMinutes + fallingAsleepMinutes));
            } else {
                // If I sleep at X, I should wake up at X + duration
                // SleepTime + 15 min + Cycles * 90
                resultDate.setMinutes(resultDate.getMinutes() + (cycles * cycleMinutes + fallingAsleepMinutes));
            }

            let label = 'Recomendado'; // 5-6 cycles
            if (cycles < 4) label = 'Poco descanso';
            if (cycles > 6) label = 'Demasiado';

            calculatedTimes.push({
                time: resultDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                cycles: cycles,
                label: `${cycles} ciclos (${cycles * 1.5} horas)`
            });
        }

        // If "wake up at", we count backwards, so the first in list (6 cycles) is the earliest time to sleep. 
        // We might want to sort them by time chronological? 
        // Actually usually users want "When should I sleep?" -> List of times. 
        // "If I wake at 7am, sleep at: 10pm, 11:30pm, 1am, 2:30am"

        if (mode === 'wake') {
            calculatedTimes.reverse(); // Show latest time last
        }

        setResults(calculatedTimes);
    };

    const handleCalculateNow = () => {
        setMode('sleep');
        setTime('');
        // Trigger calculation in useEffect or imperative
        // We'll just call logic directly but need state update to flush first usually. 
        // Actually let's just create a separate calc function accepting date.

        const now = new Date();
        const cycleMinutes = 90;
        const fallingAsleepMinutes = 14; // Average
        const cyclesToCalc = [3, 4, 5, 6];

        const calculated = cyclesToCalc.map(cycles => {
            const resultDate = new Date(now);
            resultDate.setMinutes(resultDate.getMinutes() + (cycles * cycleMinutes) + fallingAsleepMinutes);
            return {
                time: resultDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                cycles: cycles,
                label: `${cycles} ciclos (${cycles * 1.5} horas)`
            };
        });
        setResults(calculated);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faBed} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Sueño</h1>
                <p className="text-gray-600">Calcula los momentos óptimos para dormir despertando entre ciclos de sueño.</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                    <button
                        onClick={() => { setMode('wake'); setResults([]); }}
                        className={`flex-1 w-full md:w-auto p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${mode === 'wake' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-200'}`}
                    >
                        <FontAwesomeIcon icon={faSun} className="text-xl" />
                        <div className="text-left">
                            <div className="font-bold">Quiero despertar a las...</div>
                            <div className="text-xs opacity-75">Calcula hora de dormir</div>
                        </div>
                    </button>

                    <button
                        onClick={() => { setMode('sleep'); setResults([]); }}
                        className={`flex-1 w-full md:w-auto p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-3 ${mode === 'sleep' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-200'}`}
                    >
                        <FontAwesomeIcon icon={faMoon} className="text-xl" />
                        <div className="text-left">
                            <div className="font-bold">Voy a dormir a las...</div>
                            <div className="text-xs opacity-75">Calcula hora de despertar</div>
                        </div>
                    </button>
                </div>

                <div className="max-w-sm mx-auto">
                    <div className="flex gap-2 mb-4">
                        <input
                            type="time"
                            className="w-full p-4 text-xl text-center border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={calculateSleep}
                        disabled={!time}
                        className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Calcular
                    </button>

                    {mode === 'sleep' && (
                        <div className="mt-4 text-center">
                            <span className="text-gray-400 text-sm">o</span>
                            <button
                                onClick={handleCalculateNow}
                                className="block w-full mt-2 text-indigo-600 font-medium hover:underline"
                            >
                                💤 Me voy a dormir ahora mismo
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {results.length > 0 && (
                <div className="animate-fade-in-up">
                    <h3 className="text-center text-xl font-bold text-gray-700 mb-6">
                        {mode === 'wake' ? 'Deberías intentar dormir a estas horas:' : 'Deberías intentar despertar a estas horas:'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {results.map((res, index) => (
                            <div key={index} className={`p-4 rounded-xl text-center border-2 ${res.cycles >= 5 ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                                <div className="text-3xl font-bold text-gray-800 mb-1">{res.time}</div>
                                <div className={`text-sm font-medium ${res.cycles >= 5 ? 'text-green-600' : 'text-gray-500'}`}>{res.label}</div>
                                {res.cycles >= 5 && <div className="mt-2 text-xs bg-green-200 text-green-800 py-1 px-2 rounded-full inline-block">Sugerido</div>}
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm max-w-lg mx-auto">
                        Los humanos dormimos en ciclos de aproximadamente 90 minutos. Despertar en medio de un ciclo puede hacerte sentir cansado aunque hayas dormido mucho.
                    </p>
                </div>
            )}
        </div>
    );
}
