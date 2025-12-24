
import { Metadata } from 'next';
import DiscountCalculatorClient from './DiscountCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Descuentos Online - Precio Final y Ahorro',
    description: 'Calcula el precio final de un producto con descuento. Descubre cuánto ahorras en rebajas y ofertas con nuestra calculadora de descuentos gratis.',
    keywords: [
        'calculadora descuentos',
        'calcular rebajas',
        'precio con descuento',
        'calcular ahorro',
        'descuento porcentaje',
        'calcular oferta',
        'precio final',
        'toolero'
    ],
};

export default function DiscountCalculatorPage() {
    return (
        <>
            <DiscountCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Descuentos y Rebajas</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Ves una etiqueta con un 20% + 10% extra y no sabes cuánto vas a pagar realmente?
                        Nuestra calculadora de descuentos te ayuda a saber el precio final de cualquier producto en rebajas y cuánto dinero estás ahorrando exactamente.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Precio Final</h3>
                        <p className="text-gray-600">
                            Obtén el precio exacto que pagarás en caja después de aplicar el porcentaje de descuento.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Ahorro Total</h3>
                        <p className="text-gray-600">
                            Visualiza claramente cuánto dinero se queda en tu bolsillo gracias a la oferta.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Doble Descuento</h3>
                        <p className="text-gray-600">
                            Calcula ofertas acumuladas fácilmente (no es lo mismo 50% directo que 25% + 25%).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ejemplos comunes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Black Friday y Cyber Monday.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Rebajas de temporada en ropa y calzado.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Descuentos por pronto pago en facturas.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
