import type { Metadata } from 'next';
import PlywoodClient from './PlywoodClient';

export const metadata: Metadata = {
    title: 'Calculadora de Contrachapado (Plywood/Triplay) | Toolero',
    description: 'Calcula el peso y la cantidad de hojas de contrachapado fenolico o triplay necesarias para tu obra o muebles.',
    keywords: [
        'calcular contrachapado',
        'peso triplay 18mm',
        'plywood weight calculator',
        'hojas madera necesarias',
        'tableros construccion',
        'madera laminada'
    ],
};

export default function PlywoodPage() {
    return (
        <>
            <PlywoodClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es el Contrachapado?</h2>
                    <p>
                        El contrachapado (conocido como Plywood, Triplay o Mulitplaca) está formado por chapas de madera pegadas perpendicularmente una sobre otra. Esto le da una gran estabilidad dimensional y resistencia.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Densidad y Peso</h3>
                    <p>
                        Su densidad varía según la madera usada (pino, abedul, okume...), pero un estándar general es <strong>600 kg/m³</strong>.
                        Un tablero de 18mm de 4x8 pies suele pesar alrededor de 32 kg.
                    </p>
                </article>
            </div>
        </>
    );
}
