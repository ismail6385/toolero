'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faRedo,
    faFlag,
    faStopwatch
} from '@fortawesome/free-solid-svg-icons';

export default function StopwatchClient() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps(prevLaps => [time, ...prevLaps]);
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return (
            <div className="flex items-baseline justify-center font-mono text-text">
                <div className="flex flex-col items-center mx-2">
                    <span className="text-6xl md:text-8xl font-bold tracking-wider">
                        {minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs text-text/40 uppercase mt-2">Min</span>
                </div>
                <span className="text-4xl md:text-6xl text-text/30 mx-1">:</span>
                <div className="flex flex-col items-center mx-2">
                    <span className="text-6xl md:text-8xl font-bold tracking-wider text-teal-600">
                        {seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs text-text/40 uppercase mt-2">Sec</span>
                </div>
                <span className="text-4xl md:text-6xl text-text/30 mx-1">.</span>
                <div className="flex flex-col items-center mx-2">
                    <span className="text-4xl md:text-6xl font-medium tracking-wider text-text/60">
                        {milliseconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs text-text/40 uppercase mt-2">Ms</span>
                </div>
            </div>
        );
    };

    const formatLapTime = (ms: number) => {
        const mins = Math.floor(ms / 60000).toString().padStart(2, '0');
        const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const msecs = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${mins}:${secs}.${msecs}`;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-teal-100 rounded-full mb-4 text-teal-600">
                    <FontAwesomeIcon icon={faStopwatch} className="text-3xl" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">Cronómetro</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Mide el tiempo con precisión. Simple, rápido y con registro de vueltas.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
                {/* Timer Display */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-100 shadow-inner">
                    {formatTime(time)}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-6">
                    <button
                        onClick={handleStartPause}
                        className={`
                            px-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 text-white min-w-[200px] justify-center
                            ${isRunning ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/30' : 'bg-teal-600 hover:bg-teal-700 hover:shadow-teal-500/30'}
                        `}
                    >
                        <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
                        {isRunning ? 'Pausar' : (time > 0 ? 'Reanudar' : 'Iniciar')}
                    </button>

                    <button
                        onClick={handleLap}
                        disabled={!isRunning && time === 0}
                        className={`
                            px-8 py-4 rounded-2xl font-bold text-lg shadow-md flex items-center gap-3 transition-all border-2 border-gray-200 min-w-[150px] justify-center
                            ${!isRunning && time === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-text hover:border-teal-500 hover:text-teal-600'
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={faFlag} />
                        Vuelta
                    </button>

                    <button
                        onClick={handleReset}
                        disabled={time === 0}
                        className={`
                            px-8 py-4 rounded-2xl font-bold text-lg shadow-md flex items-center gap-3 transition-all border-2 border-gray-200 min-w-[150px] justify-center
                            ${time === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200'
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={faRedo} />
                        Reiniciar
                    </button>
                </div>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-2xl mx-auto">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-text">Vueltas Registradas</h3>
                        <span className="text-xs text-text/50 font-semibold uppercase">{laps.length} Vueltas</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/50 text-xs text-text/40 uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3 text-left">#</th>
                                    <th className="px-6 py-3 text-right">Tiempo</th>
                                    <th className="px-6 py-3 text-right">Diferencia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {laps.map((lapTime, index) => {
                                    const lapNum = laps.length - index;
                                    const prevLapTime = laps[index + 1] || 0;
                                    const diff = lapTime - prevLapTime;

                                    return (
                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-text/60">
                                                {lapNum.toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono font-bold text-teal-600 text-lg">
                                                {formatLapTime(lapTime)}
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono text-xs text-text/40">
                                                +{formatLapTime(diff)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
