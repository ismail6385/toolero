import { Metadata } from 'next';
import GpaCalculatorClient from './GpaCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Promedio y GPA (4.0) | Notas Ponderadas',
    description: 'Calcula tu promedio ponderado académico y conviértelo a escala GPA 4.0. Compatible con sistemas de 0-10, 0-100 y Letras (A-F).',
    keywords: [
        'calculadora gpa',
        'promedio ponderado',
        'calcular nota media',
        'gpa 4.0 scale',
        'convertir notas a gpa',
        'calculadora universitaria'
    ],
};

export default function GpaPage() {
    return (
        <>
            <GpaCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calcula el impacto de tus notas</h2>
                    <p className="text-gray-600 mb-4">
                        El GPA (Grade Point Average) es el estándar internacional para medir el rendimiento académico. Muchas becas y universidades en el extranjero lo solicitan.
                        Esta herramienta te permite calcular tu promedio ponderado (donde los créditos importan) y ver su equivalente en GPA.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tabla de Conversión Típica</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-bold text-green-800">A / 9-10</div>
                            <div className="text-green-600">4.0 GPA</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-bold text-blue-800">B / 8-8.9</div>
                            <div className="text-blue-600">3.0 - 3.9 GPA</div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="font-bold text-yellow-800">C / 7-7.9</div>
                            <div className="text-yellow-600">2.0 - 2.9 GPA</div>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                            <div className="font-bold text-red-800">D/F / &lt;6</div>
                            <div className="text-red-600">0.0 - 1.0 GPA</div>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
