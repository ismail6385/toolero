'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faLayerGroup, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function GradientGenerator() {
    const [type, setType] = useState<'linear' | 'radial'>('linear');
    const [direction, setDirection] = useState('90deg');
    const [colors, setColors] = useState([{ color: '#7129cc', stop: 0 }, { color: '#fe9305', stop: 100 }]);
    const [copied, setCopied] = useState(false);

    const addColor = () => {
        setColors([...colors, { color: '#000000', stop: 50 }]);
    };

    const removeColor = (index: number) => {
        if (colors.length > 2) {
            setColors(colors.filter((_, i) => i !== index));
        }
    };

    const updateColor = (index: number, field: 'color' | 'stop', value: string | number) => {
        const updated = [...colors];
        updated[index][field] = value;
        setColors(updated);
    };

    const generateGradient = () => {
        const sortedColors = [...colors].sort((a, b) => a.stop - b.stop);
        const colorStops = sortedColors.map(c => `${c.color} ${c.stop}%`).join(', ');
        
        if (type === 'linear') {
            return `linear-gradient(${direction}, ${colorStops})`;
        } else {
            return `radial-gradient(circle, ${colorStops})`;
        }
    };

    const generateCSS = () => {
        const gradient = generateGradient();
        return `background: ${gradient};`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const gradientStyle = generateGradient();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faLayerGroup} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador de Degradados</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Diseña degradados CSS lineales y radiales personalizados y copia el código.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faLayerGroup} className="text-primary" />
                        Configuración
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Tipo de Degradado</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setType('linear')}
                                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
                                        type === 'linear'
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-background text-text border border-gray-200 hover:border-primary'
                                    }`}
                                >
                                    Lineal
                                </button>
                                <button
                                    onClick={() => setType('radial')}
                                    className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-colors ${
                                        type === 'radial'
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-background text-text border border-gray-200 hover:border-primary'
                                    }`}
                                >
                                    Radial
                                </button>
                            </div>
                        </div>

                        {type === 'linear' && (
                            <div>
                                <label className="block text-sm font-semibold text-text mb-2">Dirección</label>
                                <select
                                    value={direction}
                                    onChange={(e) => setDirection(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                >
                                    <option value="0deg">Arriba (0deg)</option>
                                    <option value="45deg">Diagonal Superior Derecha (45deg)</option>
                                    <option value="90deg">Derecha (90deg)</option>
                                    <option value="135deg">Diagonal Inferior Derecha (135deg)</option>
                                    <option value="180deg">Abajo (180deg)</option>
                                    <option value="225deg">Diagonal Inferior Izquierda (225deg)</option>
                                    <option value="270deg">Izquierda (270deg)</option>
                                    <option value="315deg">Diagonal Superior Izquierda (315deg)</option>
                                </select>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-semibold text-text">Colores</label>
                                <button
                                    onClick={addColor}
                                    className="flex items-center gap-2 px-3 py-1 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors text-sm"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Añadir Color
                                </button>
                            </div>
                            <div className="space-y-3">
                                {colors.map((colorStop, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-gray-200">
                                        <input
                                            type="color"
                                            value={colorStop.color}
                                            onChange={(e) => updateColor(index, 'color', e.target.value)}
                                            className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={colorStop.color}
                                            onChange={(e) => updateColor(index, 'color', e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono text-sm"
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={colorStop.stop}
                                                onChange={(e) => updateColor(index, 'stop', parseInt(e.target.value))}
                                                className="w-20 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                                            />
                                            <span className="text-sm text-text/60">%</span>
                                        </div>
                                        {colors.length > 2 && (
                                            <button
                                                onClick={() => removeColor(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6">Vista Previa</h2>
                    <div
                        className="h-64 rounded-xl border border-gray-200 mb-6 shadow-md"
                        style={{ background: gradientStyle }}
                    />
                    <div className="bg-background rounded-xl p-4 border border-gray-200 mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-text">Código CSS:</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors text-sm"
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                        <pre className="text-sm text-text font-mono whitespace-pre-wrap break-all">
                            {generateCSS()}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

