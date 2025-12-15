'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPercentage,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function PercentageClient() {
    // Case 1: X% of Y
    const [val1A, setVal1A] = useState<number | ''>('');
    const [val1B, setVal1B] = useState<number | ''>('');

    // Case 2: X is what % of Y
    const [val2A, setVal2A] = useState<number | ''>('');
    const [val2B, setVal2B] = useState<number | ''>('');

    // Case 3: Increase/Decrease from X to Y
    const [val3A, setVal3A] = useState<number | ''>(''); // From
    const [val3B, setVal3B] = useState<number | ''>(''); // To

    // Calculation functions
    const calc1 = () => {
        if (typeof val1A !== 'number' || typeof val1B !== 'number') return '-';
        return ((val1A / 100) * val1B).toFixed(2).replace(/\.00$/, '');
    };

    const calc2 = () => {
        if (typeof val2A !== 'number' || typeof val2B !== 'number' || val2B === 0) return '-';
        return ((val2A / val2B) * 100).toFixed(2).replace(/\.00$/, '') + '%';
    };

    const calc3 = () => {
        if (typeof val3A !== 'number' || typeof val3B !== 'number' || val3A === 0) return '-';
        const diff = val3B - val3A;
        const percent = (diff / val3A) * 100;
        return (percent > 0 ? '+' : '') + percent.toFixed(2).replace(/\.00$/, '') + '%';
    };

    const clearAll = () => {
        setVal1A(''); setVal1B('');
        setVal2A(''); setVal2B('');
        setVal3A(''); setVal3B('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faPercentage} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Porcentajes</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Resuelve cualquier problema de porcentajes al instante.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={clearAll}
                        className="text-sm text-text/40 hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Limpiar Todo
                    </button>
                </div>

                {/* Case 1 */}
                <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg font-medium text-text">
                        <span>¿Cuánto es el</span>
                        <input
                            type="number"
                            placeholder="Ej. 20"
                            value={val1A}
                            onChange={e => setVal1A(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span>% de</span>
                        <input
                            type="number"
                            placeholder="Ej. 150"
                            value={val1B}
                            onChange={e => setVal1B(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span className="md:ml-auto text-2xl font-bold text-indigo-600 bg-indigo-50 px-6 py-2 rounded-xl min-w-[100px] text-center">
                            {calc1()}
                        </span>
                    </div>
                </div>

                {/* Case 2 */}
                <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg font-medium text-text">
                        <input
                            type="number"
                            placeholder="Ej. 25"
                            value={val2A}
                            onChange={e => setVal2A(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span>es qué % de</span>
                        <input
                            type="number"
                            placeholder="Ej. 100"
                            value={val2B}
                            onChange={e => setVal2B(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span className="md:ml-auto text-2xl font-bold text-indigo-600 bg-indigo-50 px-6 py-2 rounded-xl min-w-[100px] text-center">
                            {calc2()}
                        </span>
                    </div>
                </div>

                {/* Case 3 */}
                <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-lg font-medium text-text">
                        <span>Cambio de</span>
                        <input
                            type="number"
                            placeholder="Ej. 50"
                            value={val3A}
                            onChange={e => setVal3A(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span>a</span>
                        <input
                            type="number"
                            placeholder="Ej. 75"
                            value={val3B}
                            onChange={e => setVal3B(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 rounded-lg border focus:ring-2 ring-indigo-200 outline-none text-center bg-gray-50"
                        />
                        <span className={`md:ml-auto text-2xl font-bold px-6 py-2 rounded-xl min-w-[100px] text-center ${calc3().includes('-') ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                            {calc3()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
