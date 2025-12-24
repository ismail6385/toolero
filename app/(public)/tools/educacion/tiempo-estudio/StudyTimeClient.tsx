'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendarAlt, faBookOpen, faGraduationCap, faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface Subject {
    id: string;
    name: string;
    topics: number;
    difficulty: number; // 1-3 multiplier
}

export default function StudyTimeClient() {
    // State
    const [examDate, setExamDate] = useState('');
    const [dailyHours, setDailyHours] = useState(2);
    const [subjects, setSubjects] = useState<Subject[]>([
        { id: '1', name: 'Matemáticas', topics: 10, difficulty: 2 },
        { id: '2', name: 'Historia', topics: 5, difficulty: 1 }
    ]);

    // Add/Remove Subjects logic
    const addSubject = () => {
        const newId = Math.random().toString(36).substr(2, 9);
        setSubjects([...subjects, { id: newId, name: '', topics: 0, difficulty: 1 }]);
    };

    const removeSubject = (id: string) => {
        setSubjects(subjects.filter(s => s.id !== id));
    };

    const updateSubject = (id: string, field: keyof Subject, value: any) => {
        setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    // Calculation Logic
    const calculatePlan = () => {
        if (!examDate) return null;

        const today = new Date();
        const exam = new Date(examDate);
        const diffTime = Math.abs(exam.getTime() - today.getTime());
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (daysLeft <= 0) return { error: 'La fecha del examen debe ser en el futuro.' };

        let totalLoad = 0;
        subjects.forEach(s => {
            // Difficulty 1: 0.5hr/topic, 2: 1hr/topic, 3: 1.5hr/topic
            const multiplier = s.difficulty === 1 ? 0.5 : s.difficulty === 2 ? 1 : 1.5;
            totalLoad += s.topics * multiplier;
        });

        const requiredHoursTotal = totalLoad;
        const requiredHoursDaily = requiredHoursTotal / daysLeft;
        const isFeasible = requiredHoursDaily <= dailyHours;
        const overloadPercentage = (requiredHoursDaily / dailyHours) * 100;

        return {
            daysLeft,
            requiredHoursTotal,
            requiredHoursDaily,
            isFeasible,
            overloadPercentage
        };
    };

    const result = calculatePlan();

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de Tiempo de Estudio</h1>
                    <p className="text-blue-100 text-lg">
                        Planifica tu estudio según tus temas y tiempo disponible.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faClock} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Configuration Panel */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                            Configuración General
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">¿Cuándo es tu examen?</label>
                                <input
                                    type="date"
                                    value={examDate}
                                    onChange={(e) => setExamDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-600 mb-1 block">¿Cuántas horas puedes estudiar al día?</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range" min="1" max="16" step="0.5"
                                        value={dailyHours}
                                        onChange={(e) => setDailyHours(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="font-bold text-blue-600 w-12 text-center">{dailyHours}h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBookOpen} className="text-blue-600" />
                                Materias / Temas
                            </h3>
                            <button onClick={addSubject} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold hover:bg-blue-100 transition-colors">
                                + Añadir
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {subjects.map((subject, index) => (
                                <div key={subject.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative group">
                                    <button
                                        onClick={() => removeSubject(subject.id)}
                                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        &times;
                                    </button>

                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Nombre de la materia"
                                            value={subject.name}
                                            onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                                            className="w-full bg-transparent font-semibold text-gray-800 placeholder-gray-400 outline-none border-b border-dashed border-gray-300 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500 block mb-1">Temas</label>
                                            <input
                                                type="number" min="1"
                                                value={subject.topics || ''}
                                                onChange={(e) => updateSubject(subject.id, 'topics', Number(e.target.value))}
                                                className="w-full p-2 bg-white border border-gray-200 rounded text-sm"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-gray-500 block mb-1">Dificultad</label>
                                            <select
                                                value={subject.difficulty}
                                                onChange={(e) => updateSubject(subject.id, 'difficulty', Number(e.target.value))}
                                                className="w-full p-2 bg-white border border-gray-200 rounded text-sm"
                                            >
                                                <option value="1">Fácil</option>
                                                <option value="2">Media</option>
                                                <option value="3">Difícil</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-7">
                    {!examDate ? (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl h-full flex flex-col items-center justify-center text-gray-400 p-8 min-h-[300px]">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl mb-4 opacity-50" />
                            <p>Selecciona la fecha de tu examen para ver el plan.</p>
                        </div>
                    ) : result && 'error' in result ? (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center">
                            {result.error}
                        </div>
                    ) : result && !('error' in result) ? (
                        <div className="space-y-6">
                            {/* Main Status */}
                            <div className={`p-8 rounded-3xl text-white shadow-lg transition-all ${result.isFeasible ? 'bg-green-500' : 'bg-amber-500'}`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">
                                            {result.isFeasible ? '¡Plan Viable!' : '¡Sobrecarga de Estudio!'}
                                        </h2>
                                        <p className="opacity-90">
                                            {result.isFeasible
                                                ? 'Tienes tiempo suficiente para cubrir todos los temas con tu ritmo actual.'
                                                : `Necesitas estudiar más tiempo del que tienes disponible (${Math.round(result.overloadPercentage)}% de carga). Considera reducir temas o aumentar horas.`
                                            }
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={result.isFeasible ? faCheckCircle : faExclamationTriangle} className="text-5xl opacity-80" />
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="text-sm text-gray-500 mb-1">Días Restantes</div>
                                    <div className="text-3xl font-bold text-blue-600">{result.daysLeft}</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="text-sm text-gray-500 mb-1">Horas Totales Necesarias</div>
                                    <div className="text-3xl font-bold text-indigo-600">{result.requiredHoursTotal.toFixed(1)}h</div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm col-span-2">
                                    <div className="text-sm text-gray-500 mb-1">Ritmo Diario Recomendado</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-bold ${result.requiredHoursDaily > dailyHours ? 'text-red-500' : 'text-green-600'}`}>
                                            {result.requiredHoursDaily.toFixed(1)}
                                        </span>
                                        <span className="text-gray-400">horas / día</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${result.requiredHoursDaily > dailyHours ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${Math.min((result.requiredHoursDaily / 12) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Basado en una estimación de: Fácil (30m), Media (1h), Difícil (1.5h) por tema.
                                    </p>
                                </div>
                            </div>

                            {/* Simple Advice */}
                            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
                                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGraduationCap} />
                                    Consejo de Estudio
                                </h4>
                                <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
                                    <li>Divide tus {result.requiredHoursDaily.toFixed(1)} horas diarias en bloques de 25-50 minutos (Técnica Pomodoro).</li>
                                    <li>Prioriza los temas con dificultad "Alta" al principio del día cuando estás más fresco.</li>
                                    <li>Deja un día libre antes del examen solo para repaso general, no para aprender temas nuevos.</li>
                                </ul>
                            </div>

                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
