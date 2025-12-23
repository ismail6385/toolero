
import { Metadata } from 'next';
import RuleOfThreeClient from './RuleOfThreeClient';

export const metadata: Metadata = {
    title: 'Calculadora Regla de Tres Simple - Directa e Inversa',
    description: 'Resuelve problemas matemáticos de proporcionalidad con la Regla de Tres. Calculadora para regla de tres simple directa e inversa online y gratis.',
    keywords: [
        'regla de tres',
        'regla de 3',
        'calculadora regla tres',
        'proporcionalidad directa',
        'regla de tres inversa',
        'resolver problemas matematicos',
        'cross multiplication',
        'toolero'
    ],
};

export default function RuleOfThreePage() {
    return (
        <>
            <RuleOfThreeClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Regla de Tres</h2>
                    <p className="text-gray-600 mb-4">
                        La regla de tres es una de las herramientas matemáticas más útiles para la vida diaria.
                        Nos permite resolver problemas de proporcionalidad a partir de tres valores conocidos para hallar una incógnita (X).
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Directa</h3>
                        <p className="text-gray-600">
                            Si A aumenta, B aumenta. Ej: Si 1 kilo cuesta 5€, ¿cuánto cuestan 3 kilos? (Más kilos = Más dinero).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Inversa</h3>
                        <p className="text-gray-600">
                            Si A aumenta, B disminuye. Ej: Si 2 pintores tardan 6 días, ¿cuánto tardarán 4 pintores? (Más pintores = Menos tiempo).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Paso a Paso</h3>
                        <p className="text-gray-600">
                            Te mostramos la fórmula y el procedimiento utilizado para llegar al resultado.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Fórmulas Matemáticas</h2>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid gap-4">
                        <div>
                            <p className="font-bold text-gray-700">Regla de Tres Directa:</p>
                            <code className="bg-white px-2 py-1 rounded border">X = (B · C) / A</code>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700">Regla de Tres Inversa:</p>
                            <code className="bg-white px-2 py-1 rounded border">X = (A · B) / C</code>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
