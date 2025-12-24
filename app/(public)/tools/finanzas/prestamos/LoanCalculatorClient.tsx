'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faMoneyBillWave, faChartPie, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

export default function LoanCalculatorClient() {
    const [amount, setAmount] = useState<number | ''>(10000);
    const [rate, setRate] = useState<number | ''>(5);
    const [years, setYears] = useState<number | ''>(5);
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [totalInterest, setTotalInterest] = useState<number | null>(null);
    const [totalPayment, setTotalPayment] = useState<number | null>(null);

    useEffect(() => {
        calculate();
    }, [amount, rate, years]);

    const calculate = () => {
        if (!amount || !rate || !years) {
            setMonthlyPayment(null);
            setTotalInterest(null);
            setTotalPayment(null);
            return;
        }

        const principal = Number(amount);
        const annualRate = Number(rate) / 100;
        const monthlyRate = annualRate / 12;
        const months = Number(years) * 12;

        if (monthlyRate === 0) {
            // No interest
            setMonthlyPayment(principal / months);
            setTotalInterest(0);
            setTotalPayment(principal);
            return;
        }

        // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const x = Math.pow(1 + monthlyRate, months);
        const monthly = (principal * x * monthlyRate) / (x - 1);

        setMonthlyPayment(monthly);
        setTotalPayment(monthly * months);
        setTotalInterest((monthly * months) - principal);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4 text-yellow-600">
                    <FontAwesomeIcon icon={faCalculator} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Préstamos</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Simula tu préstamo personal o hipotecario y conoce tu cuota mensual.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">

                {/* Inputs */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-text mb-2">Monto del Préstamo</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 text-lg">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none text-lg font-bold"
                                        placeholder="10000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-text mb-2">Tasa de Interés Anual (%)</label>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={e => setRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none text-lg font-bold"
                                    placeholder="5.0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-text mb-2">Plazo (Años)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="40"
                                        value={years || 1}
                                        onChange={e => setYears(parseInt(e.target.value))}
                                        className="flex-1 accent-yellow-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <input
                                        type="number"
                                        value={years}
                                        onChange={e => setYears(e.target.value === '' ? '' : parseInt(e.target.value))}
                                        className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-7">
                    <div className="bg-surface rounded-2xl shadow-xl border border-gray-200 p-8 h-full flex flex-col justify-center">
                        {monthlyPayment ? (
                            <div className="animate-fade-in space-y-8">
                                <div className="text-center">
                                    <h3 className="text-sm font-bold text-text/50 uppercase tracking-widest mb-2">Cuota Mensual Estimada</h3>
                                    <div className="text-6xl md:text-7xl font-black text-yellow-500 tracking-tight flex items-start justify-center gap-2">
                                        <span className="text-3xl mt-4 opacity-50">$</span>
                                        {monthlyPayment.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                        <FontAwesomeIcon icon={faMoneyBillWave} className="text-yellow-500 text-xl mb-2" />
                                        <div className="text-xs font-bold text-text/40 uppercase mb-1">Total a Pagar</div>
                                        <div className="text-lg font-bold text-text">
                                            ${totalPayment?.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                                        <FontAwesomeIcon icon={faChartPie} className="text-red-400 text-xl mb-2" />
                                        <div className="text-xs font-bold text-text/40 uppercase mb-1">Intereses</div>
                                        <div className="text-lg font-bold text-red-500">
                                            ${totalInterest?.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center col-span-2 md:col-span-1">
                                        <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-400 text-xl mb-2" />
                                        <div className="text-xs font-bold text-text/40 uppercase mb-1">Pagos Totales</div>
                                        <div className="text-lg font-bold text-text">
                                            {years ? years * 12 : 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative pt-4">
                                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                        <div
                                            className="bg-green-400 h-full"
                                            style={{ width: `${(Number(amount) / Number(totalPayment)) * 100}%` }}
                                            title="Capital"
                                        ></div>
                                        <div
                                            className="bg-red-400 h-full flex-1"
                                            title="Intereses"
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold mt-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                            <span>Capital ({((Number(amount) / Number(totalPayment)) * 100).toFixed(0)}%)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <span>Interés ({((Number(totalInterest) / Number(totalPayment)) * 100).toFixed(0)}%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-text/30">
                                <FontAwesomeIcon icon={faCalculator} className="text-6xl mb-4" />
                                <p className="font-bold">Ingresa los datos para calcular</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
