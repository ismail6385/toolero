'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faRuler, faWeightHanging, faThermometerHalf, faCube, faClock } from '@fortawesome/free-solid-svg-icons';

type UnitCategory = 'length' | 'mass' | 'volume' | 'temp' | 'time';

const categories = {
    length: {
        label: 'Longitud', icon: faRuler, units: {
            m: { label: 'Metros (m)', factor: 1 },
            km: { label: 'Kilómetros (km)', factor: 1000 },
            cm: { label: 'Centímetros (cm)', factor: 0.01 },
            mm: { label: 'Milímetros (mm)', factor: 0.001 },
            mi: { label: 'Millas (mi)', factor: 1609.34 },
            yd: { label: 'Yardas (yd)', factor: 0.9144 },
            ft: { label: 'Pies (ft)', factor: 0.3048 },
            in: { label: 'Pies (in)', factor: 0.0254 }
        }
    },
    mass: {
        label: 'Masa / Peso', icon: faWeightHanging, units: {
            kg: { label: 'Kilogramos (kg)', factor: 1 },
            g: { label: 'Gramos (g)', factor: 0.001 },
            mg: { label: 'Miligramos (mg)', factor: 0.000001 },
            lb: { label: 'Libras (lb)', factor: 0.453592 },
            oz: { label: 'Onzas (oz)', factor: 0.0283495 },
            t: { label: 'Toneladas (t)', factor: 1000 }
        }
    },
    volume: {
        label: 'Volumen', icon: faCube, units: {
            l: { label: 'Litros (L)', factor: 1 },
            ml: { label: 'Mililitros (mL)', factor: 0.001 },
            gal: { label: 'Galones US (gal)', factor: 3.78541 },
            pt: { label: 'Pintas US', factor: 0.473176 },
            cup: { label: 'Tazas (cup)', factor: 0.236588 },
            floz: { label: 'Onzas líquidas (fl oz)', factor: 0.0295735 }
        }
    },
    time: {
        label: 'Tiempo', icon: faClock, units: {
            s: { label: 'Segundos', factor: 1 },
            min: { label: 'Minutos', factor: 60 },
            h: { label: 'Horas', factor: 3600 },
            d: { label: 'Días', factor: 86400 },
            wk: { label: 'Semanas', factor: 604800 },
            mo: { label: 'Meses (30d)', factor: 2592000 },
            y: { label: 'Años (365d)', factor: 31536000 }
        }
    },
    temp: {
        label: 'Temperatura', icon: faThermometerHalf, units: {
            c: { label: 'Celsius (°C)' },
            f: { label: 'Fahrenheit (°F)' },
            k: { label: 'Kelvin (K)' }
        }
    }
};

export default function UnitConverterClient() {
    const [category, setCategory] = useState<UnitCategory>('length');
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('m');
    const [toUnit, setToUnit] = useState<string>('ft');
    const [result, setResult] = useState<number>(0);

    useEffect(() => {
        // Reset units when category changes
        const units = Object.keys(categories[category].units);
        if (!units.includes(fromUnit)) setFromUnit(units[0]);
        if (!units.includes(toUnit)) setToUnit(units[1] || units[0]);
    }, [category]);

    useEffect(() => {
        calculate();
    }, [amount, fromUnit, toUnit, category]);

    const calculate = () => {
        if (category === 'temp') {
            // Custom logic for temp
            let valInC = amount;
            // To Celsius
            if (fromUnit === 'f') valInC = (amount - 32) * 5 / 9;
            if (fromUnit === 'k') valInC = amount - 273.15;

            // From Celsius to Target
            let finalVal = valInC;
            if (toUnit === 'f') finalVal = (valInC * 9 / 5) + 32;
            if (toUnit === 'k') finalVal = valInC + 273.15;

            setResult(finalVal);
        } else {
            // Factor based
            // @ts-ignore
            const factorFrom = categories[category].units[fromUnit]?.factor || 1;
            // @ts-ignore
            const factorTo = categories[category].units[toUnit]?.factor || 1;

            // Base unit value
            const inBase = amount * factorFrom;
            // Target unit value
            const finalVal = inBase / factorTo;
            setResult(finalVal);
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Conversor de Unidades</h1>
                    <p className="text-violet-100 text-lg">
                        Transforma medidas de todo tipo: longitud, peso, temperatura y más.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-9xl" />
                </div>
            </div>

            {/* Category Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {Object.entries(categories).map(([key, data]) => (
                    <button
                        key={key}
                        onClick={() => setCategory(key as UnitCategory)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${category === key ? 'border-violet-500 bg-violet-50 text-violet-700 font-bold shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200 text-gray-500'}`}
                    >
                        <FontAwesomeIcon icon={data.icon} className="text-2xl" />
                        <span className="text-sm">{data.label}</span>
                    </button>
                ))}
            </div>

            {/* Converter */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6">

                    {/* From Section */}
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">De</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                            className="w-full text-3xl font-bold text-gray-800 p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-violet-500 outline-none"
                        />
                        <select
                            value={fromUnit}
                            onChange={e => setFromUnit(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-600 focus:border-violet-500 outline-none"
                        >
                            {Object.entries(categories[category].units).map(([key, u]: any) => (
                                <option key={key} value={key}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Swap Icon */}
                    <div className="text-gray-300 md:pt-8 rotate-90 md:rotate-0">
                        <FontAwesomeIcon icon={faExchangeAlt} className="text-2xl" />
                    </div>

                    {/* To Section */}
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase">A</label>
                        <div className="w-full text-3xl font-bold text-violet-600 p-4 bg-violet-50 rounded-xl border border-violet-100 flex items-center overflow-x-auto">
                            {Number.isInteger(result) ? result : result.toFixed(4).replace(/\.?0+$/, '')}
                        </div>
                        <select
                            value={toUnit}
                            onChange={e => setToUnit(e.target.value)}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl font-medium text-gray-600 focus:border-violet-500 outline-none"
                        >
                            {Object.entries(categories[category].units).map(([key, u]: any) => (
                                <option key={key} value={key}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* Common Table */}
            <div className="mt-12 max-w-2xl mx-auto">
                <h3 className="text-center font-bold text-gray-700 mb-6">Conversiones Comunes</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    {category === 'length' && (
                        <>
                            <div className="flex justify-between border-b pb-2"><span>1 pulgada</span> <strong>2.54 cm</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 pie</span> <strong>30.48 cm</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 milla</span> <strong>1.609 km</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 metro</span> <strong>3.28 pies</strong></div>
                        </>
                    )}
                    {category === 'mass' && (
                        <>
                            <div className="flex justify-between border-b pb-2"><span>1 libra</span> <strong>0.453 kg</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 kg</span> <strong>2.204 lb</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 onza</span> <strong>28.35 g</strong></div>
                        </>
                    )}
                    {category === 'volume' && (
                        <>
                            <div className="flex justify-between border-b pb-2"><span>1 galón</span> <strong>3.78 litros</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 litro</span> <strong>33.81 fl oz</strong></div>
                        </>
                    )}
                    {category === 'temp' && (
                        <>
                            <div className="flex justify-between border-b pb-2"><span>0 °C</span> <strong>32 °F</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>100 °C</span> <strong>212 °F</strong></div>
                        </>
                    )}
                    {category === 'time' && (
                        <>
                            <div className="flex justify-between border-b pb-2"><span>1 día</span> <strong>86,400 s</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>1 año</span> <strong>8,760 h</strong></div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}
