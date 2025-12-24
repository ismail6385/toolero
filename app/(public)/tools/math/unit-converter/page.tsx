'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExchangeAlt,
    faRuler,
    faWeightHanging,
    faThermometerHalf,
    faClock
} from '@fortawesome/free-solid-svg-icons';

type UnitType = 'length' | 'weight' | 'temperature' | 'time';

const conversionRates: any = {
    length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701
    },
    weight: {
        kilograms: 1,
        grams: 1000,
        milligrams: 1000000,
        pounds: 2.20462,
        ounces: 35.274,
        stones: 0.157473
    },
    time: {
        seconds: 1,
        minutes: 1 / 60,
        hours: 1 / 3600,
        days: 1 / 86400,
        weeks: 1 / 604800,
        years: 1 / 31536000
    }
};

export default function UnitConverter() {
    const [activeTab, setActiveTab] = useState<UnitType>('length');
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('meters');
    const [toUnit, setToUnit] = useState<string>('feet');

    const convert = (val: number, from: string, to: string, type: UnitType) => {
        if (type === 'temperature') {
            // Special handling for temp
            if (from === to) return val;
            let celsius = val;

            // Convert to Celsius first
            if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9;
            if (from === 'kelvin') celsius = val - 273.15;

            // Convert from Celsius to Target
            if (to === 'celsius') return celsius;
            if (to === 'fahrenheit') return (celsius * 9 / 5) + 32;
            if (to === 'kelvin') return celsius + 273.15;
            return val;
        } else {
            const rates = conversionRates[type];
            // Base unit conversion: (Input / RateFrom) * RateTo
            // Wait, logic above: 1 meter = 1 meter, 1 meter = 3.28 feet.
            // So if Input is meters (1), Output feet (3.28).
            // Formula: (ValueIn / RateOfInputUnit) * RateOfOutputUnit

            // Example: 1 km to meters.
            // rates: m=1, km=0.001.
            // 1 / 0.001 * 1 = 1000. Correct.

            // Example: 100 cm to meters.
            // rates: m=1, cm=100.
            // 100 / 100 * 1 = 1. Correct.

            if (!rates[from] || !rates[to]) return 0;
            return (val / rates[from]) * rates[to];
        }
    };

    const result = convert(amount, fromUnit, toUnit, activeTab);

    // Initial defaults when switching tabs
    const setTab = (tab: UnitType) => {
        setActiveTab(tab);
        if (tab === 'length') { setFromUnit('meters'); setToUnit('feet'); }
        if (tab === 'weight') { setFromUnit('kilograms'); setToUnit('pounds'); }
        if (tab === 'temperature') { setFromUnit('celsius'); setToUnit('fahrenheit'); }
        if (tab === 'time') { setFromUnit('minutes'); setToUnit('seconds'); }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    Conversión
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Conversor de Unidades</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Convierte rápidamente entre diferentes unidades de medida. Longitud, peso, temperatura y tiempo.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    {[
                        { id: 'length', label: 'Longitud', icon: faRuler },
                        { id: 'weight', label: 'Massa / Peso', icon: faWeightHanging },
                        { id: 'temperature', label: 'Temperatura', icon: faThermometerHalf },
                        { id: 'time', label: 'Tiempo', icon: faClock },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setTab(tab.id as UnitType)}
                            className={`flex-1 py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 transition-all min-w-[120px] ${activeTab === tab.id ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-text/60 hover:text-text hover:bg-gray-50'}`}
                        >
                            <FontAwesomeIcon icon={tab.icon} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {/* FROM */}
                        <div className="flex-1 w-full">
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">De</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full px-4 py-3 text-2xl font-bold border border-gray-200 rounded-xl mb-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-text outline-none"
                            >
                                {activeTab === 'temperature' ? ['celsius', 'fahrenheit', 'kelvin'].map(u => <option key={u} value={u}>{u}</option>) :
                                    Object.keys(conversionRates[activeTab]).map(u => (
                                        <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                                    ))}
                            </select>
                        </div>

                        {/* Icon */}
                        <div className="text-orange-300 text-2xl rotate-90 md:rotate-0">
                            <FontAwesomeIcon icon={faExchangeAlt} />
                        </div>

                        {/* TO */}
                        <div className="flex-1 w-full text-right md:text-left">
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2 text-right">A</label>
                            <div className="w-full px-4 py-3 text-2xl font-bold bg-orange-50 text-orange-700 rounded-xl mb-3 border border-orange-100 truncate">
                                {result.toLocaleString('es-ES', { maximumFractionDigits: 4 })}
                            </div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-text outline-none"
                                dir="rtl" // Right align content for symmetry
                            >
                                {activeTab === 'temperature' ? ['celsius', 'fahrenheit', 'kelvin'].map(u => <option key={u} value={u}>{u}</option>) :
                                    Object.keys(conversionRates[activeTab]).map(u => (
                                        <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
