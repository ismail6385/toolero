import { Metadata } from 'next';
import FractionCalculatorClient from './FractionCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Fracciones y Porcentajes | Matemáticas Online',
    description: 'Calculadora gratuita para sumar, restar, multiplicar y dividir fracciones simplificando el resultado. También calcula porcentajes fácilmente.',
    keywords: [
        'calculadora fracciones',
        'sumar quebrados',
        'calcular porcentaje de un numero',
        'simplificar fracciones online',
        'matematicas financieras',
        'operaciones con fracciones'
    ],
};

export default function FractionCalculatorPage() {
    return (
        <>
            <FractionCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Operaciones Exactas y Rápidas</h2>
                    <p className="text-gray-600 mb-4">
                        Las calculadoras normales suelen darnos decimales (0.333...) que son difíciles de reusar.
                        Nuestra herramienta mantiene el formato de fracción (1/3) y lo simplifica automáticamente usando el Máximo Común Divisor (MCD).
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Fracciones</h3>
                        <p className="text-sm text-gray-500">
                            Ideal para carpintería, cocina (recetas) o deberes escolares. Soporta las 4 operaciones básicas y siempre reduce al término más simple.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Porcentajes</h3>
                        <p className="text-sm text-gray-500">
                            Resuelve las dudas típicas: ¿Cuánto es el X% de Y? o ¿Qué porcentaje representa X sobre Y? Muy útil para calcular descuentos o impuestos.
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
