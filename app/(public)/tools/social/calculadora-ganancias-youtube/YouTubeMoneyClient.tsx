'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCalculator, faMoneyBillWave, faChartLine, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function YouTubeMoneyClient() {
    const [views, setViews] = useState(10000);
    const [cpm, setCpm] = useState(2.50); // Default CPM in USD
    const [earnings, setEarnings] = useState({ daily: 0, monthly: 0, yearly: 0 });

    useEffect(() => {
        calculateEarnings();
    }, [views, cpm]);

    const calculateEarnings = () => {
        // YouTube typically takes ~45%, so creator gets ~55%. 
        // But CPM is usually "earnings per 1000 monetized playbacks".
        // A gross simplification is: Views / 1000 * CPM. 
        // We will assume "Views" are total views and only ~60% are monetized ? 
        // Or we treat CPM as "RPM" (Revenue Per Mille views) which is simpler for users.
        // Let's treat the slider as RPM (Estimated earning per 1k views).

        const daily = (views / 1000) * cpm;
        const monthly = daily * 30;
        const yearly = daily * 365;

        setEarnings({
            daily: daily,
            monthly: monthly,
            yearly: yearly
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 mb-10 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                    <FontAwesomeIcon icon={faYoutube} className="text-9xl" />
                </div>

                <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                        <FontAwesomeIcon icon={faCalculator} className="text-3xl" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        Calculadora de Dinero YouTube
                    </h1>
                    <p className="text-red-100 text-lg max-w-2xl mx-auto">
                        Estima cuánto podrías ganar con tu canal basado en tus visitas diarias y el CPM promedio.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Controls */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faChartLine} className="text-red-500" />
                        Configuración
                    </h3>

                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <label className="font-semibold text-gray-700">Visitas Diarias</label>
                            <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg">
                                {new Intl.NumberFormat('en-US').format(views)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="1000000"
                            step="500"
                            value={views}
                            onChange={(e) => setViews(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>1,000</span>
                            <span>100,000+</span>
                            <span>1M+</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-end mb-2">
                            <label className="font-semibold text-gray-700 flex items-center gap-1">
                                CPM Estimado ($)
                                <div className="group relative">
                                    <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400 cursor-help text-sm" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs p-2 rounded hidden group-hover:block z-20">
                                        Coste por mil impresiones. Varía según el país y la temática (0.5$ - 10$+).
                                    </div>
                                </div>
                            </label>
                            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg">
                                ${cpm.toFixed(2)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0.25"
                            max="20.00"
                            step="0.25"
                            value={cpm}
                            onChange={(e) => setCpm(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Bajo ($0.25)</span>
                            <span>Promedio ($2-5)</span>
                            <span>Alto ($20)</span>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-500" />
                        Ganancias Estimadas
                    </h3>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
                            <div className="text-gray-500 text-sm font-medium mb-1">Diarias</div>
                            <div className="text-3xl font-bold text-gray-900">{formatCurrency(earnings.daily)}</div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border border-green-100 relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-3 opacity-10">
                                <FontAwesomeIcon icon={faMoneyBillWave} className="text-4xl text-green-600" />
                            </div>
                            <div className="text-green-700 text-sm font-bold mb-1">Mensuales (30 días)</div>
                            <div className="text-4xl font-bold text-green-600">{formatCurrency(earnings.monthly)}</div>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100">
                            <div className="text-gray-500 text-sm font-medium mb-1">Anuales</div>
                            <div className="text-3xl font-bold text-gray-900">{formatCurrency(earnings.yearly)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 text-xl mt-1" />
                <div>
                    <h4 className="font-bold text-blue-900 mb-1">Nota importante</h4>
                    <p className="text-sm text-blue-800">
                        Estas cifras son estimaciones brutas. Las ganancias reales varían según la retención de audiencia,
                        ubicación de los espectadores, bloqueadores de anuncios y tipología del contenido. YouTube generalmente se queda con el 45% de los ingresos publicitarios.
                    </p>
                </div>
            </div>
        </div>
    );
}
