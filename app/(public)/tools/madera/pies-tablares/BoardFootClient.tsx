'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faPlus, faTrash, faFileInvoiceDollar, faCalculator } from '@fortawesome/free-solid-svg-icons';

interface WoodItem {
    id: number;
    name: string;
    thickness: number;
    width: number;
    length: number; // in feet
    count: number;
    bf: number;
    price: number;
}

export default function BoardFootClient() {
    // Inputs
    const [thickness, setThickness] = useState(1); // inches
    const [width, setWidth] = useState(6); // inches
    const [length, setLength] = useState(8); // feet
    const [count, setCount] = useState(1);
    const [pricePerBF, setPricePerBF] = useState(0); // Price per Board Foot
    const [description, setDescription] = useState('');

    const [items, setItems] = useState<WoodItem[]>([]);

    // Quick Add Presets
    const presets = [
        { name: '2x4x8', t: 2, w: 4, l: 8 },
        { name: '1x6x10', t: 1, w: 6, l: 10 },
        { name: '4x4x8', t: 4, w: 4, l: 8 },
    ];

    const loadPreset = (p: typeof presets[0]) => {
        setThickness(p.t);
        setWidth(p.w);
        setLength(p.l);
        setDescription(p.name);
    };

    const addItem = () => {
        // Formula: (T" x W" x L') / 12 * Count
        const singleBF = (thickness * width * length) / 12;
        const totalBF = singleBF * count;
        const totalCost = totalBF * pricePerBF;

        const newItem: WoodItem = {
            id: Date.now(),
            name: description || `${thickness}"x${width}"x${length}'`,
            thickness,
            width,
            length,
            count,
            bf: totalBF,
            price: totalCost
        };

        setItems([...items, newItem]);
        // Reset count but keep dims? Or reset all? Keep dims usually better for repetitive entry
        setCount(1);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    // Totals
    const grandTotalBF = items.reduce((sum, item) => sum + item.bf, 0);
    const grandTotalCost = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Pies Tablares y Costos</h1>
                    <p className="text-orange-100 text-lg">
                        Presupuesta tu proyecto de carpintería sumando todas las piezas de madera.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Input Form */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex justify-between items-center">
                            Agregar Pieza
                            <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded">Medidas en Pulgadas / Pies</span>
                        </h3>

                        <div className="space-y-4">
                            {/* Presets */}
                            <div className="flex gap-2 pb-2 overflow-x-auto">
                                {presets.map(p => (
                                    <button key={p.name} onClick={() => loadPreset(p)} className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded border border-amber-100 hover:bg-amber-100 whitespace-nowrap">
                                        {p.name}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Grosor (")</label>
                                    <input type="number" step="0.25" value={thickness} onChange={e => setThickness(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-center" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Ancho (")</label>
                                    <input type="number" step="0.25" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-center" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Largo (')</label>
                                    <input type="number" step="0.5" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-center" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cantidad</label>
                                    <input type="number" min="1" value={count} onChange={e => setCount(Number(e.target.value))} className="w-full p-2 border rounded font-bold text-lg text-center text-amber-700" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Precio / Pié</label>
                                    <input type="number" min="0" step="0.01" value={pricePerBF} onChange={e => setPricePerBF(Number(e.target.value))} className="w-full p-2 border rounded text-center text-gray-600" placeholder="$0.00" />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Descripción (Opcional)</label>
                                <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded text-sm" placeholder="Ej: Patas mesa" />
                            </div>

                            <button
                                onClick={addItem}
                                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Agregar a la Lista
                            </button>
                        </div>
                    </div>
                </div>

                {/* List & Totals */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Totals Banner */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <h3 className="text-slate-400 font-bold uppercase text-xs mb-1">Total Pies Tablares</h3>
                            <div className="text-4xl font-black">{grandTotalBF.toFixed(2)} <small className="text-lg text-slate-400 font-normal">PT</small></div>
                            <div className="absolute right-4 top-4 opacity-20 text-4xl"><FontAwesomeIcon icon={faRulerCombined} /></div>
                        </div>
                        <div className="bg-emerald-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <h3 className="text-emerald-300 font-bold uppercase text-xs mb-1">Costo Estimado</h3>
                            <div className="text-4xl font-black">${grandTotalCost.toFixed(2)}</div>
                            <div className="absolute right-4 top-4 opacity-20 text-4xl"><FontAwesomeIcon icon={faCalculator} /></div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[300px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-200">
                                        <th className="p-4 font-bold">Descripción</th>
                                        <th className="p-4 font-bold text-center">Medidas</th>
                                        <th className="p-4 font-bold text-center">Cant.</th>
                                        <th className="p-4 font-bold text-right">Volumen (PT)</th>
                                        <th className="p-4 font-bold text-right">Costo</th>
                                        <th className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {items.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-12 text-center text-gray-400">
                                                No hay piezas en la lista. Agrega la primera arriba.
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map(item => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="p-4 text-gray-800 font-medium">{item.name}</td>
                                                <td className="p-4 text-center text-gray-500 font-mono text-xs">
                                                    {item.thickness}" × {item.width}" × {item.length}'
                                                </td>
                                                <td className="p-4 text-center font-bold">{item.count}</td>
                                                <td className="p-4 text-right font-bold text-amber-700">{item.bf.toFixed(2)}</td>
                                                <td className="p-4 text-right text-emerald-600 font-bold">
                                                    {item.price > 0 ? `$${item.price.toFixed(2)}` : '-'}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
