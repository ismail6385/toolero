
import { Metadata } from 'next';
import PercentageClient from './PercentageClient';

export const metadata: Metadata = {
    title: 'Calculadora de Porcentajes Online Gratis - Aumentos y Descuentos',
    description: 'Calcula porcentajes fácilmente. Encuentra el tanto por ciento de una cantidad, calcula descuentos, aumentos, y la diferencia porcentual entre dos valores.',
    keywords: [
        'calculadora porcentaje',
        'calcular tanto por ciento',
        'sacar porcentaje',
        'formula porcentaje',
        'calcular IVA',
        'aumento porcentual',
        'disminucion porcentual',
        'percentage calculator',
        'toolero'
    ],
};

export default function PercentagePage() {
    return (
        <>
            <PercentageClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Porcentajes Universal</h2>
                    <p className="text-gray-600 mb-4">
                        Los porcentajes están en todas partes: impuestos, descuentos, propinas, intereses bancarios.
                        Nuestra herramienta te permite realizar cualquier cálculo porcentual al instante sin necesidad de recordar las fórmulas matemáticas.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">X% de Y</h3>
                        <p className="text-gray-600">
                            El cálculo clásico. Ej: ¿Cuánto es el 21% de 1500? Ideal para impuestos y comisiones.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Aumentos y Descuentos</h3>
                        <p className="text-gray-600">
                            Suma o resta un porcentaje a una cantidad. Ej: Precio final tras un 30% de descuento.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Qué porcentaje es...</h3>
                        <p className="text-gray-600">
                            Descubre qué parte del total representa una cifra. Ej: ¿Qué porcentaje es 50 de 200? (Respuesta: 25%).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas frecuentes</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-gray-800 mb-2">¿Cómo se calcula el tanto por ciento?</h3>
                            <p className="text-gray-600">La fórmula básica es: (Cantidad Parcial / Cantidad Total) × 100.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-gray-800 mb-2">¿Cómo restar un porcentaje a una cantidad?</h3>
                            <p className="text-gray-600">Multiplica la cantidad inicial por (1 - porcentaje en decimal). Ejemplo para restar 20% a 100: 100 × 0.80 = 80.</p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
