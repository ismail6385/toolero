import type { Metadata } from 'next';
import WoodVolumeClient from './WoodVolumeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Volumen de Madera (m³ / ft³ / PT) | Toolero',
    description: 'Calcula el volumen exacto de madera aserrada o troncos en rollo. Convierte automáticamente entre metros cúbicos, pies cúbicos y pies tablares.',
    keywords: [
        'calcular volumen madera',
        'metros cubicos aserradero',
        'cubic feet wood calculator',
        'formula doyle volumen troncos',
        'pies tablares formula',
        'cubicar madera rollo'
    ],
};

export default function WoodVolumePage() {
    return (
        <>
            <WoodVolumeClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Fórmulas de Volumen de Madera</h2>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Madera Aserrada</h3>
                    <p>
                        Para piezas cuadradas o rectangulares (tablas, vigas, polines), la fórmula es simple geometría:
                        <br /><code>Volumen = Grosor × Ancho × Largo</code>
                    </p>
                    <p>
                        El reto principal son las unidades. Esta herramienta convierte automáticamente pulgadas, pies, centímetros y metros para darte el resultado exacto en <strong>m³</strong> y <strong>ft³</strong>.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Pie Tablar (Board Foot)</h3>
                    <p>
                        El "Pie Tablar" es la unidad estándar en la industria de EE.UU. para la compraventa de madera. Representa un volumen de 144 pulgadas cúbicas.
                        <br /><code>PT = (Grosor" × Ancho" × Largo') / 12</code>
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Madera en Rollo (Troncos)</h3>
                    <p>
                        Para estimar los pies tablares útiles que saldrán de un tronco, se usan "Reglas de Trosas" (Log Rules). Esta calculadora utiliza una aproximación basada en la <strong>Regla Doyle</strong>, una de las más comunes, que penaliza bastante los troncos pequeños por el desperdicio de corteza y orillas.
                    </p>
                </article>
            </div>
        </>
    );
}
