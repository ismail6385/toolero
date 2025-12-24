
import { Metadata } from 'next';
import LoanCalculatorClient from './LoanCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Préstamos e Hipotecas - Simular Cuota Mensual',
    description: 'Calcula la cuota mensual de tu préstamo personal, hipoteca o crédito automotriz. Genera tabla de amortización con intereses y capital.',
    keywords: [
        'calculadora prestamos',
        'simulador hipoteca',
        'calcular cuota prestamo',
        'tabla amortizacion',
        'simulador credito',
        'prestamo coche',
        'calculo intereses',
        'loan calculator',
        'toolero'
    ],
};

export default function LoanCalculatorPage() {
    return (
        <>
            <LoanCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Simulador de Préstamos e Hipotecas</h2>
                    <p className="text-gray-600 mb-4">
                        Antes de solicitar financiación, es vital saber cuánto pagarás cada mes y cuánto acabarás pagando en total de intereses.
                        Esta calculadora te permite simular cualquier préstamo (personal, hipotecario, coche) y ver el cuadro de amortización completo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Cuota Mensual</h3>
                        <p className="text-gray-600">
                            Descubre el importe exacto que saldrá de tu cuenta cada mes para pagar el crédito.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Total Intereses</h3>
                        <p className="text-gray-600">
                            Visualiza el coste real del préstamo. A veces los intereses pueden superar el capital prestado.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Amortización</h3>
                        <p className="text-gray-600">
                            Generamos la tabla mes a mes mostrando cuánto capital amortizas y cuántos intereses pagas en cada cuota.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tipos de préstamos que puedes calcular</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Hipotecas a tipo fijo.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Préstamos personales para consumo.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Financiación de vehículos (coche o moto).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Créditos rápidos o microcréditos.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
