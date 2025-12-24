'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCalculator, faTrashAlt, faPlus, faUniversity } from '@fortawesome/free-solid-svg-icons';

type GradeSystem = 'letters' | 'decimal_10' | 'percentage';

interface Course {
    id: string;
    name: string;
    grade: string;
    credits: number;
}

export default function GpaCalculatorClient() {
    const [system, setSystem] = useState<GradeSystem>('decimal_10');
    const [courses, setCourses] = useState<Course[]>([
        { id: '1', name: 'Matemáticas', grade: '9', credits: 4 },
        { id: '2', name: 'Historia', grade: '8.5', credits: 3 },
        { id: '3', name: 'Ciencias', grade: '7', credits: 4 }
    ]);

    // Helpers
    const addCourse = () => {
        setCourses([...courses, { id: Math.random().toString(), name: '', grade: '', credits: 3 }]);
    };

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: string, field: keyof Course, value: string | number) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const convertToGPAPOINT = (grade: string): number => {
        const g = grade.trim().toUpperCase();
        if (!g) return 0;

        if (system === 'letters') {
            if (g === 'A+' || g === 'A') return 4.0;
            if (g === 'A-') return 3.7;
            if (g === 'B+') return 3.3;
            if (g === 'B') return 3.0;
            if (g === 'B-') return 2.7;
            if (g === 'C+') return 2.3;
            if (g === 'C') return 2.0;
            if (g === 'C-') return 1.7;
            if (g === 'D+') return 1.3;
            if (g === 'D') return 1.0;
            return 0; // F
        } else if (system === 'decimal_10') {
            const val = parseFloat(grade);
            if (isNaN(val)) return 0;
            // Rough conversion 0-10 to GPA 4.0
            // 9-10 = 4.0
            // 8-8.9 = 3.0 - 3.9 ... simplistic linear mapping often used:
            // Let's use standard table:
            if (val >= 9) return 4.0;
            if (val >= 8) return 3.0 + (val - 8); // 8.5 -> 3.5
            if (val >= 7) return 2.0 + (val - 7); // 7.5 -> 2.5
            if (val >= 6) return 1.0 + (val - 6);
            return 0; // standard fail < 6 in many places, or < 5. Assuming linear.
        } else {
            // Percentage
            const val = parseFloat(grade);
            if (isNaN(val)) return 0;
            if (val >= 93) return 4.0;
            if (val >= 90) return 3.7;
            if (val >= 87) return 3.3;
            if (val >= 83) return 3.0;
            if (val >= 80) return 2.7;
            if (val >= 77) return 2.3;
            if (val >= 73) return 2.0;
            if (val >= 70) return 1.7;
            if (val >= 67) return 1.3;
            if (val >= 65) return 1.0;
            return 0;
        }
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;
        let weightedSum = 0; // For average in original scale

        courses.forEach(c => {
            const credits = Number(c.credits) || 0;
            const gpaPoints = convertToGPAPOINT(c.grade);

            // Raw value for average
            let rawVal = 0;
            if (system === 'letters') {
                // map back for average calculation? Hard with letters. Use GPA points.
                rawVal = gpaPoints; // Just track GPA
            } else {
                rawVal = parseFloat(c.grade) || 0;
            }

            totalPoints += gpaPoints * credits;
            totalCredits += credits;
            weightedSum += rawVal * credits;
        });

        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        const average = totalCredits > 0 ? weightedSum / totalCredits : 0;

        return { gpa, average, totalCredits };
    };

    const { gpa, average, totalCredits } = calculate();

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Calculadora de GPA / Promedio</h1>
                    <p className="text-green-100 text-lg">
                        Calcula tu media ponderada y conviértela a escala GPA (4.0).
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faUniversity} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Main Calculator */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                        {/* Toolbar */}
                        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-bold text-gray-600">Sistema:</label>
                                <select
                                    value={system}
                                    onChange={(e) => setSystem(e.target.value as GradeSystem)}
                                    className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="decimal_10">0 - 10 (España/Latam)</option>
                                    <option value="letters">Letras (EE.UU A-F)</option>
                                    <option value="percentage">Porcentaje (0-100%)</option>
                                </select>
                            </div>
                            <button
                                onClick={addCourse}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Añadir Materia
                            </button>
                        </div>

                        {/* Table */}
                        <div className="p-4">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
                                        <th className="pb-3 pl-2">Materia</th>
                                        <th className="pb-3 w-24">Nota</th>
                                        <th className="pb-3 w-20">Créditos</th>
                                        <th className="pb-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {courses.map((course) => (
                                        <tr key={course.id} className="group">
                                            <td className="py-3">
                                                <input
                                                    type="text"
                                                    value={course.name}
                                                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                                                    placeholder="Nombre de la clase"
                                                    className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-300 font-medium focus:text-green-700"
                                                />
                                            </td>
                                            <td className="py-3">
                                                <input
                                                    type="text"
                                                    value={course.grade}
                                                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                                                    placeholder={system === 'letters' ? 'A' : '10'}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-center font-bold text-gray-700 focus:border-green-500 outline-none"
                                                />
                                            </td>
                                            <td className="py-3">
                                                <input
                                                    type="number" min="1"
                                                    value={course.credits}
                                                    onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-center text-gray-600 focus:border-green-500 outline-none"
                                                />
                                            </td>
                                            <td className="py-3 text-center">
                                                <button
                                                    onClick={() => removeCourse(course.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                                >
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Results */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl sticky top-6">
                        <h3 className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-4 text-center">Resultados</h3>

                        <div className="text-center mb-6">
                            <div className="text-6xl font-black text-green-600 mb-2">{gpa.toFixed(2)}</div>
                            <div className="text-sm font-bold text-gray-400 uppercase bg-gray-100 inline-block px-3 py-1 rounded-full">GPA (Escala 4.0)</div>
                        </div>

                        {system !== 'letters' && (
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-6 text-center">
                                <span className="block text-xs text-green-600 uppercase font-bold mb-1">Promedio Real (Ponderado)</span>
                                <span className="text-2xl font-bold text-green-800">
                                    {average.toFixed(2)}
                                    <span className="text-sm font-normal text-green-600 ml-1">
                                        / {system === 'percentage' ? '100' : '10'}
                                    </span>
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <span>Créditos Totales:</span>
                            <span className="font-bold text-gray-800">{totalCredits}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 pt-2">
                            <span>Materias:</span>
                            <span className="font-bold text-gray-800">{courses.length}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
