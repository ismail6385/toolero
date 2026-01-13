'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

type State = 'waiting' | 'ready' | 'now' | 'result' | 'early';

export default function ReactionTestClient() {
    const [state, setState] = useState<State>('waiting');
    const [time, setTime] = useState(0);
    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        setState('ready');
        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
        timeoutRef.current = setTimeout(() => {
            setState('now');
            startTimeRef.current = Date.now();
        }, randomDelay);
    };

    const handleClick = () => {
        if (state === 'waiting') {
            start();
        } else if (state === 'ready') {
            // Early click
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setState('early');
        } else if (state === 'now') {
            const reactionTime = Date.now() - startTimeRef.current;
            setTime(reactionTime);
            setState('result');
        } else if (state === 'result' || state === 'early') {
            setState('waiting');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faBolt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Test de Reacción</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Mide tus reflejos. Haz clic en cuanto la pantalla se ponga VERDE.
                </p>
            </div>

            <div
                className={`w-full h-[500px] rounded-3xl shadow-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-200 p-8 text-center ${state === 'waiting' ? 'bg-primary text-white hover:bg-secondary' :
                        state === 'ready' ? 'bg-red-500 text-white' :
                            state === 'now' ? 'bg-green-500 text-white' :
                                state === 'early' ? 'bg-orange-500 text-white' :
                                    'bg-slate-800 text-white' // result
                    }`}
                onClick={handleClick}
            >
                {state === 'waiting' && (
                    <>
                        <FontAwesomeIcon icon={faBolt} className="text-6xl mb-6 opacity-80" />
                        <div className="text-4xl font-black mb-2">Clic para Empezar</div>
                        <div className="text-xl opacity-80">Cuando estés listo</div>
                    </>
                )}
                {state === 'ready' && (
                    <>
                        <div className="text-6xl font-black mb-4">...</div>
                        <div className="text-2xl font-bold uppercase tracking-widest">Espera al verde</div>
                    </>
                )}
                {state === 'now' && (
                    <div className="text-6xl font-black uppercase tracking-widest scale-125 animate-pulse">¡CLIC YA!</div>
                )}
                {state === 'early' && (
                    <>
                        <div className="text-8xl font-black mb-4">⚠️</div>
                        <div className="text-4xl font-bold mb-2">¡Muy rápido!</div>
                        <div className="text-xl opacity-80">Haz clic para intentar de nuevo</div>
                    </>
                )}
                {state === 'result' && (
                    <>
                        <div className="text-2xl font-bold uppercase tracking-widest mb-4 opacity-60">Tiempo de Reacción</div>
                        <div className="text-8xl font-black mb-8">{time} <span className="text-4xl">ms</span></div>
                        <div className="text-xl opacity-80 bg-white/10 px-6 py-3 rounded-full">Clic para guardar y reiniciar</div>
                    </>
                )}
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
                Promedio humano: ~250ms. ¿Puedes superarlo?
            </div>
        </div>
    );
}
