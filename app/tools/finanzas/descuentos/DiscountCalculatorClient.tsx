'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faPercentage, faArrowRight, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

export default function DiscountCalculatorClient() {
    const [price, setPrice] = useState<number | ''>('');
    const [discount, setDiscount] = useState<number | ''>('');
    const [extraDiscount, setExtraDiscount] = useState<number | ''>(''); // Optional second discount

    const p = Number(price) || 0;
    const d1 = Number(discount) || 0;
    const d2 = Number(extraDiscount) || 0;

    // Calculate Price after 1st discount
    const priceAfterD1 = p - (p * (d1 / 100));
    // Calculate final price after 2nd discount (applied to the reduced price usually)
    const finalPrice = priceAfterD1 - (priceAfterD1 * (d2 / 100));

    const totalSavings = p - finalPrice;
    const totalPercentage = p > 0 ? ((totalSavings / p) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4 text-amber-600">
                    <FontAwesomeIcon icon={faTag} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Descuentos</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Calcula cuánto pagarás realmente en rebajas y cuánto dinero estás ahorrando.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Precio Original</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-300 focus:border-amber-500 outline-none text-xl font-bold"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Descuento (%)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="w-full pl-4 pr-10 py-4 rounded-xl border border-gray-300 focus:border-amber-500 outline-none text-xl font-bold text-red-500"
                                placeholder="20"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-text mb-2">Desc. Extra (Opcional)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={extraDiscount}
                                onChange={(e) => setExtraDiscount(Number(e.target.value))}
                                className="w-full pl-4 pr-10 py-4 rounded-xl border border-gray-300 focus:border-amber-500 outline-none text-xl font-bold text-red-400"
                                placeholder="5"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                        </div>
                    </div>
                </div>

                {(p > 0) && (
                    <div className="animate-fade-in-up">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 relative">
                            {/* Arrows */}
                            <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 text-gray-200 text-4xl">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                            <div className="hidden md:block absolute right-1/3 top-1/2 -translate-y-1/2 text-gray-200 text-4xl">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>

                            <div className="text-center w-full md:w-auto">
                                <div className="text-sm font-bold text-text/40 uppercase mb-1">Precio Original</div>
                                <div className="text-3xl font-bold text-text line-through opacity-50 block decoration-red-500 decoration-2">${p.toFixed(2)}</div>
                            </div>

                            <div className="bg-red-50 px-8 py-4 rounded-2xl border border-red-100 text-center w-full md:w-auto">
                                <div className="text-sm font-bold text-red-500 uppercase mb-1">Ahorro Total ({totalPercentage.toFixed(1)}%)</div>
                                <div className="text-4xl font-bold text-red-600 flex items-center justify-center gap-2">
                                    -${totalSavings.toFixed(2)}
                                </div>
                            </div>

                            <div className="text-center w-full md:w-auto">
                                <div className="text-sm font-bold text-text/40 uppercase mb-1">Precio Final</div>
                                <div className="text-4xl font-bold text-green-600">${finalPrice.toFixed(2)}</div>
                            </div>
                        </div>

                        {d2 > 0 && (
                            <div className="text-center text-sm text-text/50 bg-gray-50 p-2 rounded-lg">
                                * Se calculó primero el {d1}% y luego el {d2}% sobre el precio ya rebajado.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
