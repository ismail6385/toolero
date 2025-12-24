
import { Metadata } from 'next';
import VatCalculatorClient from './VatCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de IVA Online Gratis - Calcular Impuestos',
    description: 'Calcula el IVA (Impuesto al Valor Agregado) de cualquier cantidad fácil y rápido. Añade o quita el IVA para obtener el precio bruto o neto.',
    keywords: [
        'calculadora iva',
        'calcular iva',
        'precio sin iva',
        'precio con iva',
        'impuestos',
        'vat calculator',
        'calcular impuestos',
        'base imponible',
        'tipo impositivo',
        'toolero'
    ],
};

export default function VatCalculatorPage() {
    return (
        <>
            <VatCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de IVA (Impuesto al Valor Añadido)</h2>
                    <p className="text-gray-600 mb-4">
                        Calcular el IVA no debería ser complicado. Ya sea que necesites saber cuánto es el impuesto de un producto o quieras obtener el precio base (sin IVA) de una factura total,
                        nuestra herramienta hace los cálculos matemáticos por ti al instante. Soporta tasas personalizadas para cualquier país (España 21%, México 16%, etc.).
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Agregar IVA</h3>
                        <p className="text-gray-600">
                            Ingresa el precio neto y te diremos el total a cobrar incluyendo impuestos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Quitar IVA</h3>
                        <p className="text-gray-600">
                            ¿Tienes el precio final y necesitas saber la base imponible? Calculamos el desglose inverso.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Universal</h3>
                        <p className="text-gray-600">
                            Funciona para cualquier porcentaje. Útil para IVA, IGIC, IPSI o cualquier impuesto sobre ventas.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Fórmulas utilizadas</h2>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <p className="mb-2 font-mono text-sm text-slate-700"><strong>Para añadir IVA:</strong> Precio Total = Precio Base × (1 + %IVA/100)</p>
                        <p className="font-mono text-sm text-slate-700"><strong>Para quitar IVA:</strong> Precio Base = Precio Total / (1 + %IVA/100)</p>
                    </div>
                </section>
            </article>
        </>
    );
}
