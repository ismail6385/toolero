'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export default function CoinFlipClient() {
    const [result, setResult] = useState<'cara' | 'cruz' | null>(null);
    const [flipping, setFlipping] = useState(false);

    const flip = () => {
        setFlipping(true);
        setResult(null); // Hide previous result momentarily

        setTimeout(() => {
            const isHeads = Math.random() < 0.5;
            setResult(isHeads ? 'cara' : 'cruz');
            setFlipping(false);
        }, 1000); // 1 second flip animation
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faCoins} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Lanzar Moneda (Cara o Cruz)</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Toma decisiones rápidas con un lanzamiento de moneda virtual. 50% de probabilidad.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div
                    className={`w-48 h-48 rounded-full border-8 border-yellow-500 shadow-2xl flex items-center justify-center text-4xl font-bold uppercase text-yellow-600 bg-yellow-100 transition-all duration-1000 transform ${flipping ? 'animate-[spin_0.5s_linear_infinite]' : ''
                        } ${result ? 'scale-110' : ''}`}
                    style={{ perspective: '1000px' }}
                >
                    {flipping ? '...' : (result || '¿?')}
                </div>

                {result && !flipping && (
                    <div className="mt-8 text-3xl font-bold text-gray-800 animate-fade-in">
                        ¡Es <span className="text-primary capitalize">{result}</span>!
                    </div>
                )}

                <button
                    onClick={flip}
                    disabled={flipping}
                    className="mt-12 bg-primary text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:bg-secondary transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {flipping ? 'Lanzando...' : 'Lanzar Moneda'}
                </button>
            </div>
        </div>
    );
}
