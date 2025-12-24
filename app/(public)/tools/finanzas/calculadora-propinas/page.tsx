
import { Metadata } from 'next';
import TipCalculatorClient from './TipCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Propinas Online - Dividir Cuenta Restaurante',
    description: 'Calcula la propina justa en restaurantes y divide la cuenta entre amigos fácilmente (Split Bill). Herramienta rápida para calcular cuánto poner por persona.',
    keywords: [
        'calculadora propinas',
        'calcular propina',
        'dividir cuenta',
        'split bill',
        'propina restaurante',
        'cuanto dejar propina',
        'repartir gastos',
        'tip calculator',
        'toolero'
    ],
};

export default function TipCalculatorPage() {
    return (
        <>
            <TipCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Propinas y División de Cuenta</h2>
                    <p className="text-gray-600 mb-4">
                        Evita momentos incómodos al final de la cena. Nuestra calculadora te dice exactamente cuánto debe pagar cada persona, incluyendo la propina que decidas dejar.
                        Ideal para comidas de grupo, viajes con amigos o cenas de empresa.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Propina Justa</h3>
                        <p className="text-gray-600">
                            Calcula el 10%, 15%, 20% o cualquier porcentaje personalizado según la calidad del servicio.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Split Bill</h3>
                        <p className="text-gray-600">
                            Divide el total (cuenta + propina) entre el número de comensales equitativamente.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Redondeo</h3>
                        <p className="text-gray-600">
                            Te sugerimos totales redondeados para facilitar el pago en efectivo.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Etiqueta de propinas mundial</h2>
                    <p className="text-gray-600 mb-4">
                        Recuerda que la propina varía según el país:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li><strong>EE.UU:</strong> Obligatoria/Esperada (15-25%).</li>
                        <li><strong>Europa:</strong> Opcional/Redondeo (5-10%).</li>
                        <li><strong>Japón:</strong> No se deja propina (se considera falta de respeto).</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
