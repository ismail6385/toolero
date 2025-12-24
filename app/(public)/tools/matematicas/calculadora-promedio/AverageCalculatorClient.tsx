'use client';

import React, { useState, useEffect } from 'react';
import { faCalculator, faChartBar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Stats = {
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: number[];
    min: number;
    max: number;
    range: number;
};

export default function AverageCalculatorClient() {
    const [input, setInput] = useState('');
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        calculateStats();
    }, [input]);

    const calculateStats = () => {
        // Parse numbers from input (allow commas, spaces, newlines)
        // Regex to separate by non-digit/dot/minus chars
        const numbers = input.split(/[\s,;]+/).map(s => parseFloat(s)).filter(n => !isNaN(n));

        if (numbers.length === 0) {
            setStats(null);
            return;
        }

        numbers.sort((a, b) => a - b);

        const count = numbers.length;
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / count;
        const min = numbers[0];
        const max = numbers[count - 1];
        const range = max - min;

        // Median
        let median = 0;
        if (count % 2 === 0) {
            median = (numbers[count / 2 - 1] + numbers[count / 2]) / 2;
        } else {
            median = numbers[Math.floor(count / 2)];
        }

        // Mode
        const frequency: { [key: number]: number } = {};
        let maxFreq = 0;
        numbers.forEach(n => {
            frequency[n] = (frequency[n] || 0) + 1;
            if (frequency[n] > maxFreq) maxFreq = frequency[n];
        });

        let mode: number[] = [];
        if (maxFreq > 1) {
            mode = Object.keys(frequency)
                .map(Number)
                .filter(n => frequency[n] === maxFreq)
                .sort((a, b) => a - b);
        }

        setStats({ count, sum, mean, median, mode, min, max, range });
    };

    const clear = () => {
        setInput('');
        setStats(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-8">
                <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faCalculator} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Promedio</h1>
                <p className="text-gray-600">Calcula media, mediana, moda y más estadísticas básicas al instante.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Input Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <label className="font-bold text-gray-700">Introduce tus números:</label>
                        <button
                            onClick={clear}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-1" /> Borrar
                        </button>
                    </div>
                    <textarea
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-lg resize-none"
                        placeholder="Ejemplo:&#10;10&#10;5.5&#10;8, 9, 7.5"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <p className="mt-2 text-xs text-gray-400">Separa los valores por comas, espacios o saltos de línea.</p>
                </div>

                {/* Results Section */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-center">
                    {stats ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                                <div className="text-sm text-indigo-500 font-bold uppercase mb-1">Promedio (Media)</div>
                                <div className="text-4xl font-bold text-indigo-700">{stats.mean.toLocaleString('es-ES', { maximumFractionDigits: 4 })}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Mediana</div>
                                    <div className="text-2xl font-bold text-gray-800">{stats.median.toLocaleString('es-ES', { maximumFractionDigits: 4 })}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-xs text-gray-500 font-bold uppercase mb-1">Moda</div>
                                    <div className="text-lg font-bold text-gray-800">
                                        {stats.mode.length > 0 ? stats.mode.join(', ') : 'N/A'}
                                        {stats.mode.length > 5 && '...'}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Suma total:</span>
                                    <span className="font-semibold">{stats.sum.toLocaleString('es-ES')}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Cantidad:</span>
                                    <span className="font-semibold">{stats.count}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Mínimo:</span>
                                    <span className="font-semibold">{stats.min.toLocaleString('es-ES')}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Máximo:</span>
                                    <span className="font-semibold">{stats.max.toLocaleString('es-ES')}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                            <FontAwesomeIcon icon={faChartBar} className="text-6xl mb-4" />
                            <p>Introduce números para ver las estadísticas</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
