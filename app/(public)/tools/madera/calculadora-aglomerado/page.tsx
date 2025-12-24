import type { Metadata } from 'next';
import ParticleBoardClient from './ParticleBoardClient';

export const metadata: Metadata = {
    title: 'Calculadora de Aglomerado (Chipboard) y Peso | Toolero',
    description: 'Calcula el peso de tableros de aglomerado o partículas según su espesor y tamaño. Planifica tu carga y transporte.',
    keywords: [
        'peso aglomerado',
        'tablero particulas',
        'calcular peso maderas',
        'chipboard weight calculator',
        'densidad aglomerado'
    ],
};

export default function ParticleBoardPage() {
    return (
        <>
            <ParticleBoardClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Peso del Aglomerado</h2>
                    <p>
                        El aglomerado estándar (Chipboard) es más ligero que el MDF, con una densidad media de entre <strong>600 y 680 kg/m³</strong>.
                        Aún así, un paquete de tableros puede exceder rápidamente la capacidad de carga de un vehículo normal.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Usos Comunes</h3>
                    <ul className="list-disc pl-5 mb-6">
                        <li>Subsuelos y tarimas interiores.</li>
                        <li>Estructuras ocultas de sofás.</li>
                        <li>Embalaje industrial.</li>
                    </ul>
                </article>
            </div>
        </>
    );
}
