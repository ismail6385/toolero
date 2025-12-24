'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUserFriends, faCoins, faReceipt } from '@fortawesome/free-solid-svg-icons';

export default function TipCalculatorClient() {
    const [bill, setBill] = useState<number | ''>('');
    const [tipPercent, setTipPercent] = useState<number>(15);
    const [people, setPeople] = useState<number>(1);

    const billAmount = Number(bill) || 0;
    const tipAmount = billAmount * (tipPercent / 100);
    const totalAmount = billAmount + tipAmount;

    const perPerson = people > 0 ? totalAmount / people : 0;
    const tipPerPerson = people > 0 ? tipAmount / people : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-4 text-teal-600">
                    <FontAwesomeIcon icon={faUtensils} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Propinas</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Evita líos matemáticos después de comer. Calcula la propina y divide la cuenta al instante.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faReceipt} className="text-teal-500" />
                            Total de la Cuenta
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input
                                type="number"
                                value={bill}
                                onChange={(e) => setBill(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-2xl font-bold text-teal-900 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-4">¿Cuánta propina?</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[10, 15, 20].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setTipPercent(p)}
                                    className={`py-3 rounded-xl font-bold transition-all ${tipPercent === p ? 'bg-teal-600 text-white shadow-lg scale-105' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'}`}
                                >
                                    {p}%
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={tipPercent}
                                onChange={(e) => setTipPercent(Number(e.target.value))}
                                className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:border-teal-500 outline-none font-bold text-right"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-text mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faUserFriends} className="text-teal-500" />
                            Número de Personas
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={people}
                            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
                            className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-teal-500 outline-none text-2xl font-bold text-center bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Results - Receipt Style */}
                <div className="bg-teal-900 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="space-y-8 relative z-10">
                        <div className="flex justify-between items-center pb-6 border-b border-white/10">
                            <div>
                                <span className="block text-teal-200 text-sm font-medium mb-1">Propina Total</span>
                                <span className="text-sm opacity-50">({tipPerPerson.toFixed(2)} / persona)</span>
                            </div>
                            <div className="text-4xl font-bold text-teal-300">
                                ${tipAmount.toFixed(2)}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <span className="block text-teal-200 text-sm font-medium mb-1">Total a Pagar</span>
                                <span className="text-sm opacity-50">Incluyendo propina</span>
                            </div>
                            <div className="text-4xl font-bold">
                                ${totalAmount.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 mt-8 relative z-10 backdrop-blur-sm">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="block text-teal-100 text-sm font-bold uppercase tracking-wider mb-2">Total por Persona</span>
                                <div className="text-5xl font-bold text-white">
                                    ${perPerson.toFixed(2)}
                                </div>
                            </div>
                            <FontAwesomeIcon icon={faCoins} className="text-teal-300/50 text-4xl" />
                        </div>
                    </div>

                    <div className="mt-8 text-center relative z-10">
                        <button
                            onClick={() => { setBill(''); setPeople(1); setTipPercent(15); }}
                            className="text-teal-200 text-sm hover:text-white transition-colors uppercase font-bold tracking-widest"
                        >
                            Resetear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
