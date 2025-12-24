'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage, faCalculator, faDivide, faEquals } from '@fortawesome/free-solid-svg-icons';

export default function FractionCalculatorClient() {
    const [num1, setNum1] = useState(1);
    const [den1, setDen1] = useState(2);
    const [op, setOp] = useState('+');
    const [num2, setNum2] = useState(1);
    const [den2, setDen2] = useState(3);
    const [result, setResult] = useState({ num: 0, den: 0, decimal: 0 });

    useEffect(() => {
        calculate();
    }, [num1, den1, op, num2, den2]);

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculate = () => {
        if (den1 === 0 || den2 === 0) return; // Avoid div by zero

        let n = 0;
        let d = 0;

        if (op === '+') {
            n = (num1 * den2) + (num2 * den1);
            d = den1 * den2;
        } else if (op === '-') {
            n = (num1 * den2) - (num2 * den1);
            d = den1 * den2;
        } else if (op === '*') {
            n = num1 * num2;
            d = den1 * den2;
        } else if (op === '/') {
            n = num1 * den2;
            d = den1 * num2;
        }

        if (d === 0) return; // Should not happen unless input error

        // Simplify
        const common = Math.abs(gcd(n, d));
        setResult({
            num: n / common,
            den: d / common,
            decimal: n / d
        });
    };

    // Percentage Calculator State
    const [percAmount, setPercAmount] = useState(50);
    const [percTotal, setPercTotal] = useState(200);
    const [percValue, setPercValue] = useState(25); // "25% of..."

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Fracciones y Porcentajes</h1>
                    <p className="text-teal-100 text-lg">
                        Resuelve operaciones matemáticas paso a paso.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faCalculator} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Fraction Calculator */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm"><FontAwesomeIcon icon={faDivide} /></span>
                        Fracciones
                    </h3>

                    <div className="flex items-center gap-4 justify-center">
                        {/* Fraction 1 */}
                        <div className="flex flex-col gap-2 w-20">
                            <input type="number" value={num1} onChange={e => setNum1(Number(e.target.value))} className="w-full text-center p-2 border-2 border-gray-200 rounded-lg font-bold text-gray-700 outline-none focus:border-teal-500" />
                            <div className="h-0.5 bg-gray-800 w-full rounded-full"></div>
                            <input type="number" value={den1} onChange={e => setDen1(Number(e.target.value))} className="w-full text-center p-2 border-2 border-gray-200 rounded-lg font-bold text-gray-700 outline-none focus:border-teal-500" />
                        </div>

                        {/* Operator */}
                        <select
                            value={op}
                            onChange={e => setOp(e.target.value)}
                            className="bg-gray-100 p-2 rounded-lg font-black text-xl text-teal-600 outline-none cursor-pointer"
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                        </select>

                        {/* Fraction 2 */}
                        <div className="flex flex-col gap-2 w-20">
                            <input type="number" value={num2} onChange={e => setNum2(Number(e.target.value))} className="w-full text-center p-2 border-2 border-gray-200 rounded-lg font-bold text-gray-700 outline-none focus:border-teal-500" />
                            <div className="h-0.5 bg-gray-800 w-full rounded-full"></div>
                            <input type="number" value={den2} onChange={e => setDen2(Number(e.target.value))} className="w-full text-center p-2 border-2 border-gray-200 rounded-lg font-bold text-gray-700 outline-none focus:border-teal-500" />
                        </div>

                        {/* Equals */}
                        <div className="text-2xl font-bold text-gray-400">=</div>

                        {/* Result */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col gap-2 w-20">
                                <div className="w-full text-center p-2 bg-teal-50 rounded-lg font-black text-teal-800 h-10 flex items-center justify-center">{result.num}</div>
                                <div className="h-0.5 bg-teal-600 w-full rounded-full"></div>
                                <div className="w-full text-center p-2 bg-teal-50 rounded-lg font-black text-teal-800 h-10 flex items-center justify-center">{result.den}</div>
                            </div>
                            <div className="mt-2 text-xs font-mono text-gray-400">
                                {result.decimal.toFixed(4)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Percentage Calculator */}
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        <span className="bg-cyan-100 text-cyan-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm"><FontAwesomeIcon icon={faPercentage} /></span>
                        Porcentajes
                    </h3>

                    <div className="space-y-8">
                        {/* Type 1: X% of Y */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="text-sm font-bold text-gray-400 uppercase mb-2">Calcular Porcentaje</div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-gray-600">El</span>
                                <input type="number" value={percValue} onChange={e => setPercValue(Number(e.target.value))} className="w-20 p-2 text-center border-b-2 border-cyan-400 bg-transparent outline-none font-bold text-lg" />
                                <span className="font-bold text-cyan-600">%</span>
                                <span className="font-medium text-gray-600">de</span>
                                <input type="number" value={percTotal} onChange={e => setPercTotal(Number(e.target.value))} className="w-24 p-2 text-center border-b-2 border-cyan-400 bg-transparent outline-none font-bold text-lg" />
                                <span className="font-medium text-gray-600">es:</span>

                                <span className="ml-auto text-3xl font-black text-cyan-600 bg-white px-4 py-1 rounded shadow-sm border border-cyan-100">
                                    {((percValue / 100) * percTotal).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Type 2: X is what % of Y */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="text-sm font-bold text-gray-400 uppercase mb-2">Inverso</div>
                            <div className="flex flex-wrap items-center gap-2">
                                <input type="number" value={percAmount} onChange={e => setPercAmount(Number(e.target.value))} className="w-24 p-2 text-center border-b-2 border-cyan-400 bg-transparent outline-none font-bold text-lg" />
                                <span className="font-medium text-gray-600">es el</span>
                                <span className="text-2xl font-black text-cyan-600 bg-white px-3 py-1 rounded shadow-sm border border-cyan-100">
                                    {((percAmount / percTotal) * 100).toFixed(1)}%
                                </span>
                                <span className="font-medium text-gray-600">de</span>
                                <input type="number" value={percTotal} onChange={e => setPercTotal(Number(e.target.value))} className="w-24 p-2 text-center border-b-2 border-cyan-400 bg-transparent outline-none font-bold text-lg" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
