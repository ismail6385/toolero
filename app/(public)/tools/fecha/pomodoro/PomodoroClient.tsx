'use client';

import React, { useState, useEffect, useRef } from 'react';
import { faClock, faPlay, faPause, faRedo, faCoffee, faBrain, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODES: { [key in TimerMode]: { label: string; time: number; color: string; icon: any } } = {
    pomodoro: { label: 'Pomodoro', time: 25 * 60, color: 'text-red-500', icon: faBrain },
    shortBreak: { label: 'Descanso Corto', time: 5 * 60, color: 'text-teal-500', icon: faCoffee },
    longBreak: { label: 'Descanso Largo', time: 15 * 60, color: 'text-blue-500', icon: faCoffee }
};

export default function PomodoroClient() {
    const [mode, setMode] = useState<TimerMode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.time);
    const [isActive, setIsActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setTimeLeft(MODES[mode].time);
        setIsActive(false);
    }, [mode]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (audioRef.current) {
                audioRef.current.play();
            }
            if (Notification.permission === 'granted') {
                new Notification('¡Tiempo completado!', {
                    body: mode === 'pomodoro' ? 'Hora de un descanso.' : 'Hora de volver a trabajar.',
                    icon: '/favicon.ico'
                });
            }
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
        if (!isActive && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(MODES[mode].time);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((MODES[mode].time - timeLeft) / MODES[mode].time) * 100;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <audio ref={audioRef} src="/sounds/alarm.mp3" /> {/* Note: Assuming a sound file or use browser beep fallback */}

            <div className="text-center mb-10">
                <div className={`inline-block p-4 rounded-full bg-gray-100 ${MODES[mode].color} mb-4 text-3xl transition-colors`}>
                    <FontAwesomeIcon icon={MODES[mode].icon} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Técnica Pomodoro</h1>
                <p className="text-gray-600">Enfócate en tu trabajo, nosotros nos encargamos del tiempo.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex justify-center space-x-2 mb-8">
                    {(Object.keys(MODES) as TimerMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${mode === m
                                    ? `bg-gray-800 text-white shadow-lg transform scale-105`
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {MODES[m].label}
                        </button>
                    ))}
                </div>

                <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
                    {/* Ring SVG */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 120}
                            strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                            className={`${MODES[mode].color} transition-all duration-1000 ease-linear`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="text-6xl font-mono font-bold text-gray-800 z-10">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="flex justify-center space-x-6">
                    <button
                        onClick={toggleTimer}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-lg transition-transform hover:scale-110 active:scale-95 ${isActive ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                    >
                        <FontAwesomeIcon icon={isActive ? faPause : faPlay} />
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xl transition-colors hover:bg-gray-300"
                    >
                        <FontAwesomeIcon icon={faRedo} />
                    </button>
                </div>
            </div>

            <div className="mt-12 text-gray-600 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2 text-blue-500" />
                    ¿Cómo funciona?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Elige una tarea para completar.</li>
                    <li>Pon el temporizador en 25 minutos (Pomodoro).</li>
                    <li>Trabaja hasta que suene la alarma.</li>
                    <li>Tómate un descanso corto de 5 minutos.</li>
                    <li>Cada 4 Pomodoros, toma un descanso largo de 15 minutos.</li>
                </ul>
            </div>
        </div>
    );
}
