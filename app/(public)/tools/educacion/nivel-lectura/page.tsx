import { Metadata } from 'next';
import ReadingLevelClient from './ReadingLevelClient';

export const metadata: Metadata = {
    title: 'Verificador de Nivel de Lectura | Legibilidad de Textos Online',
    description: 'Analiza la dificultad de lectura de tus textos con el índice de legibilidad Fernández-Huerta (adaptación Flesch). Ideal para profesores y escritores.',
    keywords: [
        'nivel de lectura',
        'legibilidad texto español',
        'fernandez huerta',
        'flesch kincaid español',
        'dificultad texto',
        'analisis legibilidad',
        'herramienta educativa'
    ],
};

export default function ReadingLevelPage() {
    return (
        <>
            <ReadingLevelClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Qué tan fácil es leer tu texto?</h2>
                    <p className="text-gray-600 mb-4">
                        Escribir claro es fundamental, pero a veces no nos damos cuenta de que usamos palabras demasiado largas o frases complejas.
                        Esta herramienta utiliza la fórmula de <strong>Fernández-Huerta</strong>, el estándar para medir la legibilidad en español (equivalente al Flesch-Kincaid del inglés).
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Escala de Interpretación</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-bold uppercase">
                                <tr>
                                    <th className="p-3 rounded-l-lg">Puntuación</th>
                                    <th className="p-3">Dificultad</th>
                                    <th className="p-3 rounded-r-lg">Nivel Educativo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-3 font-mono font-bold text-green-600">90 - 100</td>
                                    <td>Muy Fácil</td>
                                    <td>4º Primaria</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-emerald-600">80 - 90</td>
                                    <td>Fácil</td>
                                    <td>6º Primaria</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-blue-600">60 - 70</td>
                                    <td>Normal</td>
                                    <td>Secundaria (ESO)</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-indigo-600">50 - 60</td>
                                    <td>Algo Difícil</td>
                                    <td>Bachillerato</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-purple-600">30 - 50</td>
                                    <td>Difícil</td>
                                    <td>Universitario</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-mono font-bold text-red-600">0 - 30</td>
                                    <td>Muy Difícil</td>
                                    <td>Científico / Técnico</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </>
    );
}
