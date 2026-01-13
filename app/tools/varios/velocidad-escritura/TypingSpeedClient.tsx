'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faRedo } from '@fortawesome/free-solid-svg-icons';

const TEXTS = [
    "El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.",
    "Aquel biógrafo de Chicago rechazó con extrañeza la injerencia de los flamantes antropólogos en la cuestión del hampa.",
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero.",
    "Todo lo que se puede imaginar es real. La lógica te llevará de la A a la Z; la imaginación te llevará a cualquier parte.",
    "El éxito consiste en ir de fracaso en fracaso sin perder el entusiasmo. La vida es lo que pasa mientras estás ocupado haciendo otros planes."
];

export default function TypingSpeedClient() {
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        setText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setFinished(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (val === text) {
            finish(val);
        }
    };

    const finish = (finalInput: string) => {
        setFinished(true);
        if (startTime) {
            const timeMin = (Date.now() - startTime) / 60000;
            const words = finalInput.trim().split(/\s+/).length;
            setWpm(Math.round(words / timeMin));
        }
    };

    // Calculate live accuracy
    useEffect(() => {
        if (input.length > 0) {
            let errors = 0;
            for (let i = 0; i < input.length; i++) {
                if (input[i] !== text[i]) errors++;
            }
            const acc = Math.max(0, ((input.length - errors) / input.length) * 100);
            setAccuracy(Math.round(acc));
        }
    }, [input, text]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faKeyboard} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Test de Velocidad de Escritura (WPM)</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    ¿Qué tan rápido escribes? Copia el texto lo más rápido posible sin errores.
                </p>
            </div>

            <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="mb-6 p-6 bg-gray-50 rounded-2xl text-lg leading-relaxed font-serif text-gray-700 select-none relative">
                    {text.split('').map((char, index) => {
                        let color = 'text-gray-400';
                        let bg = 'bg-transparent';
                        if (index < input.length) {
                            color = input[index] === char ? 'text-green-600' : 'text-red-500';
                            if (input[index] !== char) bg = 'bg-red-100';
                        }
                        if (index === input.length) bg = 'bg-primary/20 animate-pulse'; // Cursor

                        return (
                            <span key={index} className={`${color} ${bg} rounded-sm transition-colors`}>{char}</span>
                        );
                    })}
                </div>

                <textarea
                    value={input}
                    onChange={handleChange}
                    disabled={finished}
                    className="w-full p-4 border-2 border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 text-lg shadow-inner"
                    placeholder="Empieza a escribir aquí..."
                    rows={3}
                    autoFocus
                />

                {finished && (
                    <div className="mt-8 grid grid-cols-2 gap-4 text-center animate-fade-in">
                        <div className="bg-green-100 p-6 rounded-2xl text-green-800">
                            <div className="text-sm font-bold uppercase tracking-wider mb-1">Velocidad</div>
                            <div className="text-5xl font-black">{wpm} <span className="text-lg">WPM</span></div>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-2xl text-blue-800">
                            <div className="text-sm font-bold uppercase tracking-wider mb-1">Precisión</div>
                            <div className="text-5xl font-black">{accuracy}%</div>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={reset}
                        className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-black transition-colors flex items-center gap-2 mx-auto"
                    >
                        <FontAwesomeIcon icon={faRedo} />
                        Probar otro texto
                    </button>
                </div>
            </div>
        </div>
    );
}
