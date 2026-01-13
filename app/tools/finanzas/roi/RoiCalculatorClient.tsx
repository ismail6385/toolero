'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCoins, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function RoiCalculatorClient() {
    const [investment, setInvestment] = useState<number | ''>('');
    const [revenue, setRevenue] = useState<number | ''>('');

    const inv = Number(investment) || 0;
    const rev = Number(revenue) || 0;

    // ROI = (Revenue - Investment) / Investment * 100
    const profit = rev - inv;
    const roi = inv > 0 ? (profit / inv) * 100 : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
                    <FontAwesomeIcon icon={faChartLine} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de ROI</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Mide la rentabilidad de tus inversiones. ¿Cuánto ganaste (o perdiste) realmente?
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Inversión Total (Coste)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input
                                type="number"
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 outline-none text-xl font-bold"
                                placeholder="1000"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Ingresos Generados (Retorno)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input
                                type="number"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 outline-none text-xl font-bold"
                                placeholder="2500"
                            />
                        </div>
                    </div>
                </div>

                {(inv > 0 || rev > 0) && (
                    <div className="animate-fade-in-up grid md:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-2xl border text-center ${profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <div className={`text-sm font-bold uppercase mb-2 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>ROI (Retorno)</div>
                            <div className={`text-4xl font-bold ${profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                                {roi.toFixed(2)}%
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center">
                            <div className="text-sm font-bold text-text/50 uppercase mb-2">Beneficio Neto</div>
                            <div className="text-3xl font-bold text-gray-800">
                                {profit >= 0 ? '+' : ''}{profit.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 text-center">
                            <div className="text-sm font-bold text-text/50 uppercase mb-2">Multiplicador</div>
                            <div className="text-3xl font-bold text-gray-800">
                                x{(rev / (inv || 1)).toFixed(2)}
                            </div>
                            <div className="text-xs text-text/40 mt-1">Por cada $1 invertido</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center text-sm text-text/40 max-w-lg mx-auto">
                <p>ROI = (Ingresos - Inversión) / Inversión x 100.</p>
            </div>
        </div>
    );
}
