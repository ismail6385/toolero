'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';

export default function QuadraticSolverClient() {
    const [a, setA] = useState<number>(1);
    const [b, setB] = useState<number>(-3);
    const [c, setC] = useState<number>(2);
    const [result, setResult] = useState<string | null>(null);

    const solve = () => {
        if (a === 0) {
            setResult("No es una ecuación cuadrática (a no puede ser 0).");
            return;
        }

        const discriminant = b * b - 4 * a * c;

        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            setResult(`Dos soluciones reales:\nx1 = ${x1}\nx2 = ${x2}`);
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            setResult(`Una solución única (doble):\nx = ${x}`);
        } else {
            setResult("No tiene soluciones reales (raíces complejas).");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faWaveSquare} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Solucionador Ecuaciones Cuadráticas</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Resuelve ecuaciones de segundo grado (ax² + bx + c = 0) usando la fórmula general.
                </p>
            </div>

            <div className="max-w-lg mx-auto bg-surface p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-8 text-xl font-bold font-mono bg-gray-50 p-4 rounded-xl">
                    <input
                        type="number"
                        value={a} onChange={(e) => setA(parseFloat(e.target.value))}
                        className="w-16 p-2 text-center border-b-2 border-primary bg-transparent focus:outline-none"
                    />
                    <span>x² +</span>
                    <input
                        type="number"
                        value={b} onChange={(e) => setB(parseFloat(e.target.value))}
                        className="w-16 p-2 text-center border-b-2 border-primary bg-transparent focus:outline-none"
                    />
                    <span>x +</span>
                    <input
                        type="number"
                        value={c} onChange={(e) => setC(parseFloat(e.target.value))}
                        className="w-16 p-2 text-center border-b-2 border-primary bg-transparent focus:outline-none"
                    />
                    <span>= 0</span>
                </div>

                <button
                    onClick={solve}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-colors text-lg shadow-lg shadow-primary/30 mb-8"
                >
                    Calcular Raíces (x)
                </button>

                {result && (
                    <div className="bg-gray-900 text-white p-6 rounded-2xl font-mono whitespace-pre-line text-lg text-center animate-fade-in">
                        {result}
                    </div>
                )}
            </div>
        </div>
    );
}
