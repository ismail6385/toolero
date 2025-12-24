'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function VatCalculatorClient() {
    const [price, setPrice] = useState<number | ''>('');
    const [rate, setRate] = useState<number | ''>(21); // Default Spain IVA

    const calculate = () => {
        const p = Number(price);
        const r = Number(rate) / 100;

        if (!p) return { withVat: 0, withoutVat: 0, vatAmount: 0 };

        // We assume input is "Base Price" (Without VAT) to -> With VAT
        const vatAmount = p * r;
        const withVat = p + vatAmount;

        // We also allow reverse calc? Let's just do straightforward "Add VAT" and "Remove VAT" from the entered amount.
        // Option A: Input is Base -> Calc VAT and Total
        // Option B: Input is Total -> Calc Base and VAT

        // Let's return both scenarios based on the input being the respective starting point

        // Scene 1: Input is Net (Sin IVA)
        const netToGrossVat = p * r;
        const netToGrossTotal = p + netToGrossVat;

        // Scene 2: Input is Gross (Con IVA)
        const grossToNetBase = p / (1 + r);
        const grossToNetVat = p - grossToNetBase;

        return {
            netToGross: {
                base: p,
                vat: netToGrossVat,
                total: netToGrossTotal
            },
            grossToNet: {
                base: grossToNetBase,
                vat: grossToNetVat,
                total: p
            }
        };
    };

    const res = calculate();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 text-purple-600">
                    <FontAwesomeIcon icon={faPercentage} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de IVA</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Calcula fácilmente el precio con y sin impuestos.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Cantidad</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-2xl font-bold transition-all"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Porcentaje IVA (%)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={rate}
                                onChange={e => setRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none text-2xl font-bold transition-all"
                                placeholder="21"
                            />
                            {[21, 10, 4].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRate(r)}
                                    className={`px-4 rounded-xl font-bold border transition-colors ${rate === r ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-50 text-text/60 border-gray-200 hover:bg-gray-100'}`}
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {price !== '' && (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
                    {/* Scene 1: Add VAT */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg relative overflow-hidden group hover:border-purple-300 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <h3 className="text-lg font-bold text-text">Añadir IVA</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text/60">Base (Sin IVA)</span>
                                <span className="font-bold text-text">{res.netToGross.base.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text/60">IVA ({rate}%)</span>
                                <span className="font-bold text-red-500">+{res.netToGross.vat.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-lg text-text">Total</span>
                                <span className="font-black text-3xl text-purple-600">{res.netToGross.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Scene 2: Remove VAT */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg relative overflow-hidden group hover:border-purple-300 transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <h3 className="text-lg font-bold text-text">Quitar IVA (Desglosar)</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text/60">Total (Con IVA)</span>
                                <span className="font-bold text-text">{res.grossToNet.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text/60">IVA Incluido</span>
                                <span className="font-bold text-red-500">{res.grossToNet.vat.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-lg text-text">Base</span>
                                <span className="font-black text-3xl text-purple-600">{res.grossToNet.base.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
