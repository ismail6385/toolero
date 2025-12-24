import type { Metadata } from 'next';
import VeneerClient from './VeneerClient';

export const metadata: Metadata = {
    title: 'Calculadora de Chapa de Madera (Veneer) | Toolero',
    description: 'Calcula el área total de enchape o chapa de madera necesaria para tu proyecto. Incluye cálculo de desperdicio por empalmes.',
    keywords: [
        'calcular chapa madera',
        'metros cuadrados veneer',
        'cantidad enchape',
        'wood veneer calculator',
        'hojas chapa raiz'
    ],
};

export default function VeneerPage() {
    return (
        <>
            <VeneerClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Trabajando con Chapa de Madera</h2>
                    <p>
                        La chapa de madera (veneer) permite dar un acabado de madera fina a tableros económicos como el MDF.
                        Al ser un material natural, las hojas suelen ser estrechas (si se compran al natural) o venir en formatos estándar (si son precompuestas o con respaldo).
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">La Importancia del Desperdicio</h3>
                    <p>
                        A diferencia de la melamina, en la chapa natural debes casar las vetas ("bookmatch" o "slipmatch"). Esto genera un desperdicio considerable al recortar los bordes para que coincidan perfectamente.
                        Recomendamos calcular entre un <strong>20% y un 30%</strong> de excedente.
                    </p>
                </article>
            </div>
        </>
    );
}
