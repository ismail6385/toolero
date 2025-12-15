'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faRulerCombined, faWeightHanging, faThermometerHalf, faCube } from '@fortawesome/free-solid-svg-icons';

export default function UnitConverterClient() {
    const [type, setType] = useState('length');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [value, setValue] = useState<number | ''>('');

    // Units Data
    const unitsData: any = {
        length: {
            icon: faRulerCombined,
            label: 'Longitud',
            units: [
                { id: 'm', label: 'Metros (m)', factor: 1 },
                { id: 'km', label: 'Kilómetros (km)', factor: 1000 },
                { id: 'cm', label: 'Centímetros (cm)', factor: 0.01 },
                { id: 'mm', label: 'Milímetros (mm)', factor: 0.001 },
                { id: 'mi', label: 'Millas (mi)', factor: 1609.34 },
                { id: 'yd', label: 'Yardas (yd)', factor: 0.9144 },
                { id: 'ft', label: 'Pies (ft)', factor: 0.3048 },
                { id: 'in', label: 'Pulgadas (in)', factor: 0.0254 }
            ]
        },
        weight: {
            icon: faWeightHanging,
            label: 'Peso / Masa',
            units: [
                { id: 'kg', label: 'Kilogramos (kg)', factor: 1 },
                { id: 'g', label: 'Gramos (g)', factor: 0.001 },
                { id: 'mg', label: 'Miligramos (mg)', factor: 0.000001 },
                { id: 'lb', label: 'Libras (lb)', factor: 0.453592 },
                { id: 'oz', label: 'Onzas (oz)', factor: 0.0283495 },
                { id: 'st', label: 'Piedras (st)', factor: 6.35029 }
            ]
        },
        temp: {
            icon: faThermometerHalf,
            label: 'Temperatura',
            units: [
                { id: 'c', label: 'Celsius (°C)' },
                { id: 'f', label: 'Fahrenheit (°F)' },
                { id: 'k', label: 'Kelvin (K)' }
            ]
        },
        volume: {
            icon: faCube,
            label: 'Volumen',
            units: [
                { id: 'l', label: 'Litros (l)', factor: 1 },
                { id: 'ml', label: 'Mililitros (ml)', factor: 0.001 },
                { id: 'gal', label: 'Galones US (gal)', factor: 3.78541 },
                { id: 'qt', label: 'Cuartos US (qt)', factor: 0.946353 },
                { id: 'pt', label: 'Pintas US (pt)', factor: 0.473176 },
                { id: 'cup', label: 'Tazas (cup)', factor: 0.236588 }
            ]
        }
    };

    // Initialize defaults on type change
    const changeType = (newType: string) => {
        setType(newType);
        setFromUnit(unitsData[newType].units[0].id);
        setToUnit(unitsData[newType].units[1].id);
        setValue('');
    };

    // Ensure defaults are set initially
    if (!fromUnit && unitsData[type]) {
        changeType(type);
    }

    const calculate = () => {
        if (value === '' || !fromUnit || !toUnit) return '-';
        if (type === 'temp') {
            const v = value as number;
            // Temp conversion logic
            let result = 0;
            // Base C
            let valInC = v;
            if (fromUnit === 'f') valInC = (v - 32) * 5 / 9;
            if (fromUnit === 'k') valInC = v - 273.15;

            // C to Target
            if (toUnit === 'c') result = valInC;
            if (toUnit === 'f') result = (valInC * 9 / 5) + 32;
            if (toUnit === 'k') result = valInC + 273.15;

            return result.toFixed(2);
        } else {
            // Factor based
            const v = value as number;
            const fromFactor = unitsData[type].units.find((u: any) => u.id === fromUnit)?.factor || 1;
            const toFactor = unitsData[type].units.find((u: any) => u.id === toUnit)?.factor || 1;

            // Convert to base then to target
            // Base value = Value * FromFactor
            // Target Value = Base Value / ToFactor
            const baseVal = v * fromFactor;
            const result = baseVal / toFactor;

            // Smart rounding
            if (result > 1000) return result.toFixed(2);
            if (result < 0.01) return result.toExponential(4);
            return result.toFixed(4).replace(/\.?0+$/, '');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Conversor de Unidades</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma medidas de longitud, peso, temperatura y más al instante.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">

                {/* Type Selector */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {Object.keys(unitsData).map((key) => (
                        <button
                            key={key}
                            onClick={() => changeType(key)}
                            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${type === key
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-50 text-text/60 hover:bg-gray-100 hover:text-text'
                                }`}
                        >
                            <FontAwesomeIcon icon={unitsData[key].icon} />
                            {unitsData[key].label}
                        </button>
                    ))}
                </div>

                {/* Conversion Area */}
                <div className="grid md:grid-cols-7 gap-4 items-center">

                    {/* From */}
                    <div className="md:col-span-3 space-y-2">
                        <label className="text-xs font-bold text-text/40 uppercase pl-1">De</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                className="w-full text-2xl font-bold p-4 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none pr-32"
                                placeholder="0"
                            />
                            <div className="absolute top-2 bottom-2 right-2">
                                <select
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="h-full bg-gray-50 border-none rounded-lg text-sm font-semibold text-text/80 focus:ring-0 cursor-pointer pl-2 pr-8"
                                >
                                    {unitsData[type]?.units.map((u: any) => (
                                        <option key={u.id} value={u.id}>{u.id}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-sm text-text/50 text-right px-1 truncate">
                            {unitsData[type]?.units.find((u: any) => u.id === fromUnit)?.label}
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-1 flex justify-center text-indigo-300">
                        <FontAwesomeIcon icon={faExchangeAlt} className="text-2xl transform md:rotate-0 rotate-90" />
                    </div>

                    {/* To */}
                    <div className="md:col-span-3 space-y-2">
                        <label className="text-xs font-bold text-text/40 uppercase pl-1">A</label>
                        <div className="relative">
                            <div className="w-full text-2xl font-bold p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 min-h-[66px] flex items-center pr-32 overflow-hidden">
                                {calculate()}
                            </div>
                            <div className="absolute top-2 bottom-2 right-2">
                                <select
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="h-full bg-white border border-indigo-100 rounded-lg text-sm font-semibold text-text/80 focus:ring-0 cursor-pointer pl-2 pr-8 shadow-sm"
                                >
                                    {unitsData[type]?.units.map((u: any) => (
                                        <option key={u.id} value={u.id}>{u.id}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-sm text-text/50 text-right px-1 truncate">
                            {unitsData[type]?.units.find((u: any) => u.id === toUnit)?.label}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
