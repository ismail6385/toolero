
import { Metadata } from 'next';
import CompoundInterestClient from './CompoundInterestClient';

export const metadata: Metadata = {
    title: 'Calculadora de Interés Compuesto - Simular Inversiones',
    description: 'Calcula el crecimiento de tus inversiones con interés compuesto. Simula aportaciones mensuales, interés anual y plazos para ver cómo crece tu dinero.',
    keywords: [
        'calculadora interes compuesto',
        'calcular interes compuesto',
        'simulador inversiones',
        'crecimiento dinero',
        'rendimiento anual',
        'calculadora financiera',
        'compound interest',
        'plan de ahorro',
        'toolero'
    ],
};

export default function CompoundInterestPage() {
    return (
        <>
            <CompoundInterestClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Interés Compuesto</h2>
                    <p className="text-gray-600 mb-4">
                        Albert Einstein llamó al interés compuesto "la octava maravilla del mundo".
                        Esta calculadora te permite visualizar el poder de reinvertir tus ganancias. Descubre cuánto podrías acumular en 10, 20 o 30 años haciendo pequeñas aportaciones periódicas.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Proyección a Futuro</h3>
                        <p className="text-gray-600">
                            Observa la curva exponencial de tu dinero. Compara el total invertido vs. el total ganado por intereses.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Aportaciones Periódicas</h3>
                        <p className="text-gray-600">
                            Simula escenarios realistas añadiendo una cantidad mensual o anual a tu capital inicial.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Frecuencia Flexible</h3>
                        <p className="text-gray-600">
                            Ajusta la capitalización (mensual, anual, diaria) para mayor precisión según tu producto financiero.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Conceptos Clave</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Capital Inicial:</strong> El dinero con el que empiezas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Tasa de Interés:</strong> El porcentaje de ganancia anual esperado.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Horizonte Temporal:</strong> Cuántos años dejarás el dinero invertido.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
