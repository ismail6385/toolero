'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPiggyBank, faSeedling, faCoins } from '@fortawesome/free-solid-svg-icons';

export default function CompoundInterestClient() {
    const [principal, setPrincipal] = useState<number | ''>(1000);
    const [rate, setRate] = useState<number | ''>(5);
    const [years, setYears] = useState<number | ''>(10);
    const [contribution, setContribution] = useState<number | ''>(100);

    // Results
    const calculate = () => {
        if (!principal && principal !== 0) return null;
        if (!rate && rate !== 0) return null;
        if (!years) return null;

        const p = Number(principal);
        const r = Number(rate) / 100;
        const t = Number(years);
        const c = Number(contribution || 0); // Monthly contribution

        // FV = P(1 + r/n)^(nt) + PMT * ...
        // Simplified: Interest compounded yearly, contributions made at end of month (approx) or monthy compound?
        // Let's assume Monthly Compounding for standard savings accounts/ETFs usually calculated per period.
        // Or Yearly? Let's do Monthly Compounding (n=12) which is standard for these calcs.

        const n = 12;
        const totalMonths = t * n;

        // Future Value of Principal
        let futureValue = p * Math.pow(1 + r / n, totalMonths);

        // Future Value of Contributions
        // FV = PMT * [ (1 + r/n)^(nt) - 1 ] / (r/n)
        if (c > 0 && r > 0) {
            futureValue += c * (Math.pow(1 + r / n, totalMonths) - 1) / (r / n);
        } else if (c > 0 && r === 0) {
            futureValue += c * totalMonths;
        }

        const totalContributed = p + (c * totalMonths);
        const totalInterest = futureValue - totalContributed;

        return {
            futureValue,
            totalContributed,
            totalInterest
        };
    };

    const result = calculate();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4 text-green-600">
                    <FontAwesomeIcon icon={faChartLine} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Interés Compuesto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Visualiza el poder del interés compuesto y cómo crecen tus ahorros con el tiempo.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface p-6 rounded-2xl shadow-lg border border-gray-200">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-1">Depósito Inicial</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={principal}
                                        onChange={e => setPrincipal(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 hover:border-green-300 outline-none font-bold text-lg"
                                        placeholder="1000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-1">Aportación Mensual</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={contribution}
                                        onChange={e => setContribution(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 hover:border-green-300 outline-none font-bold text-lg"
                                        placeholder="100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-1">Tasa de Interés Anual (%)</label>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={e => setRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 hover:border-green-300 outline-none font-bold text-lg"
                                    placeholder="5"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-1">Años a Invertir</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={e => setYears(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 hover:border-green-300 outline-none font-bold text-lg"
                                    placeholder="10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-8">
                    <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 h-full flex flex-col justify-center">
                        {result ? (
                            <div className="animate-fade-in">
                                <h3 className="text-center text-sm font-bold text-text/50 uppercase tracking-widest mb-4">Saldo Final Proyectado</h3>
                                <div className="text-center text-5xl md:text-7xl font-black text-green-600 tracking-tight mb-12">
                                    ${result.futureValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <div className="absolute right-0 top-0 p-4 opacity-10">
                                            <FontAwesomeIcon icon={faSeedling} className="text-6xl" />
                                        </div>
                                        <div className="text-sm font-bold text-green-800/60 uppercase mb-1">Interés Ganado</div>
                                        <div className="text-2xl font-black text-green-700">
                                            +${result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <div className="absolute right-0 top-0 p-4 opacity-10">
                                            <FontAwesomeIcon icon={faPiggyBank} className="text-6xl" />
                                        </div>
                                        <div className="text-sm font-bold text-blue-800/60 uppercase mb-1">Total Aportado</div>
                                        <div className="text-2xl font-black text-blue-700">
                                            ${result.totalContributed.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <div className="absolute right-0 top-0 p-4 opacity-10">
                                            <FontAwesomeIcon icon={faCoins} className="text-6xl" />
                                        </div>
                                        <div className="text-sm font-bold text-yellow-800/60 uppercase mb-1">Crecimiento</div>
                                        <div className="text-2xl font-black text-yellow-700">
                                            {((result.futureValue / result.totalContributed - 1) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-text/40">
                                    * Cálculo basado en capitalización mensual. No constituye asesoramiento financiero real.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-text/30">
                                <FontAwesomeIcon icon={faChartLine} className="text-6xl mb-4" />
                                <p className="font-bold">Ingresa los datos para proyectar</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
