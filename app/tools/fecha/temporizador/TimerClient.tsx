'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faPause,
    faStop,
    faHourglassHalf,
    faBell
} from '@fortawesome/free-solid-svg-icons';

export default function TimerClient() {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
    const [duration, setDuration] = useState(300);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Preset inputs
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize Audio (We can use a simple beep or generate one, or use a public URL)
        // For privacy/offline, generating a beep via Web Audio API is best, but HTML5 Audio with a data URI is easier.
        // Let's use a simple beep data URI for now.
        // Or just visual alarm which is safer client-side without external assets.
        // Let's stick to Visual only for MVP to avoid asset issues, or try a simple beep.
    }, []);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsFinished(true);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, timeLeft]);

    const handleStartPause = () => {
        if (timeLeft === 0 && !isRunning) {
            handleReset(); // Restart if finished and clicked play
            return;
        }
        setIsFinished(false);
        setIsRunning(!isRunning);
    };

    const handleStop = () => {
        setIsRunning(false);
        setTimeLeft(duration);
        setIsFinished(false);
    };

    const handleSetTime = () => {
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        if (totalSeconds > 0) {
            setDuration(totalSeconds);
            setTimeLeft(totalSeconds);
            setIsRunning(false);
            setIsFinished(false);
        }
    };

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return { h, m, s };
    };

    const { h, m, s } = formatTime(timeLeft);

    // Quick presets
    const setPreset = (m: number) => {
        setHours(0);
        setMinutes(m);
        setSeconds(0);
        const total = m * 60;
        setDuration(total);
        setTimeLeft(total);
        setIsRunning(true);
        setIsFinished(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-teal-100 rounded-full mb-4 text-teal-600">
                    <FontAwesomeIcon icon={faHourglassHalf} className="text-3xl" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">Temporizador</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Cuenta regresiva para tus tareas. Configura el tiempo y concéntrate.
                </p>
            </div>

            <div className={`bg-surface rounded-3xl shadow-xl border p-8 md:p-12 mb-8 transition-colors duration-500 ${isFinished ? 'border-red-500 shadow-red-500/20 bg-red-50' : 'border-gray-100'}`}>

                {/* Visual Feedback on Finish */}
                <div className="relative">
                    {/* Timer Display */}
                    <div className="flex justify-center items-center gap-2 md:gap-4 mb-12 text-text font-mono">
                        <div className="flex flex-col items-center">
                            <div className="text-5xl md:text-8xl font-bold bg-white px-4 py-2 rounded-xl shadow-inner border border-gray-100">
                                {h.toString().padStart(2, '0')}
                            </div>
                            <span className="text-xs uppercase font-semibold text-text/40 mt-2">Horas</span>
                        </div>
                        <span className="text-4xl md:text-6xl font-bold text-text/30 mb-6">:</span>
                        <div className="flex flex-col items-center">
                            <div className="text-5xl md:text-8xl font-bold bg-white px-4 py-2 rounded-xl shadow-inner border border-gray-100">
                                {m.toString().padStart(2, '0')}
                            </div>
                            <span className="text-xs uppercase font-semibold text-text/40 mt-2">Min</span>
                        </div>
                        <span className="text-4xl md:text-6xl font-bold text-text/30 mb-6">:</span>
                        <div className="flex flex-col items-center">
                            <div className={`text-5xl md:text-8xl font-bold bg-white px-4 py-2 rounded-xl shadow-inner border border-gray-100 transition-colors ${timeLeft <= 10 && timeLeft > 0 ? 'text-red-500' : 'text-teal-600'}`}>
                                {s.toString().padStart(2, '0')}
                            </div>
                            <span className="text-xs uppercase font-semibold text-text/40 mt-2">Sec</span>
                        </div>
                    </div>

                    {isFinished && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl animate-pulse">
                            <div className="text-center">
                                <FontAwesomeIcon icon={faBell} className="text-6xl text-red-500 mb-4 animate-bounce" />
                                <h2 className="text-4xl font-bold text-red-600">¡Tiempo Terminado!</h2>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <button
                        onClick={handleStartPause}
                        className={`
                            px-8 py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 text-white min-w-[200px] justify-center
                            ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-teal-600 hover:bg-teal-700'}
                        `}
                    >
                        <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
                        {isRunning ? 'Pausar' : (timeLeft === duration ? 'Iniciar' : 'Reanudar')}
                    </button>

                    <button
                        onClick={handleStop}
                        className="px-8 py-4 rounded-2xl font-bold text-lg shadow-md flex items-center gap-3 transition-all border-2 border-gray-200 min-w-[150px] justify-center bg-white text-red-500 hover:border-red-200 hover:bg-red-50"
                    >
                        <FontAwesomeIcon icon={faStop} />
                        Detener
                    </button>
                </div>

                {/* Configuration */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-text mb-4 text-center">Configurar Tiempo</h3>
                    <div className="flex flex-wrap justify-center items-end gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-text/50 uppercase">Horas</label>
                            <input
                                type="number"
                                min="0"
                                max="24"
                                value={hours}
                                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center font-bold text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-text/50 uppercase">Min</label>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center font-bold text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-text/50 uppercase">Sec</label>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={seconds}
                                onChange={(e) => setSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-20 px-3 py-2 rounded-lg border border-gray-300 text-center font-bold text-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSetTime}
                            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 shadow-md ml-2"
                        >
                            Fijar
                        </button>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {[1, 5, 10, 25, 45, 60].map(m => (
                            <button
                                key={m}
                                onClick={() => setPreset(m)}
                                className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-text/70 hover:border-teal-500 hover:text-teal-600 transition-colors"
                            >
                                {m} Min
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
