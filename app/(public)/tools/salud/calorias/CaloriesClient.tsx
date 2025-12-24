'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faMars, faVenus, faRunning } from '@fortawesome/free-solid-svg-icons';

export default function CaloriesClient() {
    const [age, setAge] = useState<number | ''>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [weight, setWeight] = useState<number | ''>(''); // kg
    const [height, setHeight] = useState<number | ''>(''); // cm
    const [activity, setActivity] = useState(1.2);

    const calculateBMR = () => {
        if (!weight || !height || !age) return null;

        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }
        return Math.round(bmr);
    };

    const bmr = calculateBMR();
    const tdee = bmr ? Math.round(bmr * activity) : null;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4 text-orange-600">
                    <FontAwesomeIcon icon={faFire} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Calculadora de Calorías</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Estima tu Tasa Metabólica Basal (TMB) y las calorías que necesitas según tu actividad.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-surface p-8 rounded-3xl shadow-lg border border-gray-200">
                        {/* Gender */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setGender('male')}
                                className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 font-bold transition-all border-2 ${gender === 'male' ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white text-text/40 hover:border-blue-200'}`}
                            >
                                <FontAwesomeIcon icon={faMars} className="text-2xl" />
                                Hombre
                            </button>
                            <button
                                onClick={() => setGender('female')}
                                className={`flex-1 py-4 rounded-xl flex flex-col items-center gap-2 font-bold transition-all border-2 ${gender === 'female' ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-100 bg-white text-text/40 hover:border-pink-200'}`}
                            >
                                <FontAwesomeIcon icon={faVenus} className="text-2xl" />
                                Mujer
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-2">Edad</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={e => setAge(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-text/50 mb-2">Peso (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none font-bold"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase text-text/50 mb-2">Altura (cm)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={e => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none font-bold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-text/50 mb-2">Nivel de Actividad</label>
                            <div className="space-y-2">
                                {[
                                    { val: 1.2, label: 'Sedentario', desc: 'Poco o nada de ejercicio' },
                                    { val: 1.375, label: 'Ligero', desc: '1-3 días/semana' },
                                    { val: 1.55, label: 'Moderado', desc: '3-5 días/semana' },
                                    { val: 1.725, label: 'Intenso', desc: '6-7 días/semana' },
                                    { val: 1.9, label: 'Muy Intenso', desc: 'Doble sesión/día' },
                                ].map((opt) => (
                                    <button
                                        key={opt.val}
                                        onClick={() => setActivity(opt.val)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex justify-between items-center group ${activity === opt.val ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
                                    >
                                        <span className={`font-bold ${activity === opt.val ? 'text-orange-700' : 'text-text'}`}>{opt.label}</span>
                                        <span className="text-xs text-text/50 group-hover:text-text/70">{opt.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-5">
                    <div className="bg-surface p-8 rounded-3xl shadow-xl border border-gray-200 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {tdee ? (
                            <div className="animate-fade-in w-full">
                                <div className="mb-8">
                                    <div className="text-sm font-bold text-text/40 uppercase mb-2">Calorías Diarias (Mantenimiento)</div>
                                    <div className="text-6xl font-black text-orange-500 tracking-tight">{tdee}</div>
                                    <div className="text-sm font-semibold text-text/30 mt-1">Kcal / día</div>
                                </div>

                                <div className="space-y-4 w-full">
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-green-700">Perder Peso</span>
                                            <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">-500 kcal</span>
                                        </div>
                                        <div className="text-3xl font-bold text-green-600">{tdee - 500} <span className="text-sm">kcal</span></div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-blue-700">Ganar Peso</span>
                                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">+500 kcal</span>
                                        </div>
                                        <div className="text-3xl font-bold text-blue-600">{tdee + 500} <span className="text-sm">kcal</span></div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 w-full flex justify-between px-4">
                                    <div className="text-center">
                                        <div className="text-xs text-text/40 font-bold uppercase">TMB (Basal)</div>
                                        <div className="text-xl font-bold text-text/60">{bmr}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-text/40 font-bold uppercase">IMC</div>
                                        <div className="text-xl font-bold text-text/60">--</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-text/40 flex flex-col items-center">
                                <FontAwesomeIcon icon={faRunning} className="text-6xl mb-4 opacity-50" />
                                <p className="font-medium">Completa el formulario</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
