
import { Metadata } from 'next';
import BMIClient from './BMIClient';

export const metadata: Metadata = {
    title: 'Calculadora IMC Online Gratis - Índice de Masa Corporal',
    description: 'Calcula tu Índice de Masa Corporal (IMC) o BMI. Descubre si estás en tu peso ideal, bajo peso o sobrepeso según los estándares de la OMS.',
    keywords: [
        'calculadora imc',
        'indice masa corporal',
        'calcular bmi',
        'peso ideal',
        'obesidad',
        'sobrepeso',
        'salud',
        'body mass index',
        'toolero'
    ],
};

export default function BMIPage() {
    return (
        <>
            <BMIClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora IMC (Índice de Masa Corporal)</h2>
                    <p className="text-gray-600 mb-4">
                        El IMC es una medida internacional utilizada para evaluar si una persona tiene un peso saludable en relación con su altura.
                        Nuestra calculadora utiliza la fórmula estándar de la OMS para indicarte tu clasificación (Peso bajo, Normal, Sobrepeso, Obesidad).
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Clasificación OMS</h3>
                        <p className="text-gray-600">
                            Te mostramos exactamente en qué categoría te encuentras con un gráfico de colores fácil de entender.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Peso Ideal</h3>
                        <p className="text-gray-600">
                            Calculamos el rango de peso saludable recomendado específicamente para tu altura.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Para Adultos</h3>
                        <p className="text-gray-600">
                            Herramienta diseñada para hombres y mujeres mayores de 18 años (no aplicable directamente a niños o atletas de élite).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Rangos de IMC</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-rose-50 text-rose-800">
                                    <th className="p-3 border border-rose-100">IMC (kg/m²)</th>
                                    <th className="p-3 border border-rose-100">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr><td className="p-3 border">Menos de 18.5</td><td className="p-3 border font-semibold text-blue-500">Bajo Peso</td></tr>
                                <tr><td className="p-3 border">18.5 - 24.9</td><td className="p-3 border font-semibold text-green-500">Peso Normal (Saludable)</td></tr>
                                <tr><td className="p-3 border">25.0 - 29.9</td><td className="p-3 border font-semibold text-yellow-600">Sobrepeso</td></tr>
                                <tr><td className="p-3 border">30.0 o más</td><td className="p-3 border font-semibold text-red-600">Obesidad</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </>
    );
}
