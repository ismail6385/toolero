import type { Metadata } from 'next';
import BoardFootClient from './BoardFootClient';

export const metadata: Metadata = {
    title: 'Calculadora de Pies Tablares (Board Feet) y Presupuesto | Toolero',
    description: 'Calcula los pies tablares de tu proyecto de carpintería pieza por pieza. Suma volúmenes y estima el costo total de la madera.',
    keywords: [
        'calcular pies tablares',
        'presupuesto madera',
        'lista de cortes carpinteria',
        'precio madera board feet',
        'fbm calculator',
        'calcular pt madera'
    ],
};

export default function BoardFootPage() {
    return (
        <>
            <BoardFootClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo usar la calculadora de Pies Tablares?</h2>
                    <p>
                        Esta herramienta te permite crear una "Lista de Corte" (Cut List) virtual para tu proyecto.
                    </p>
                    <ol>
                        <li>Introduce las medidas de la pieza en pulgadas (grosor y ancho) y pies (largo).</li>
                        <li>Indica cuántas piezas iguales necesitas.</li>
                        <li>Opcional: Si conoces el precio por pie tablar de tu proveedor, ingrésalo para calcular el costo.</li>
                        <li>Pulsa "Agregar" y repite para todas las partes de tu mueble.</li>
                    </ol>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Fórmula del Pie Tablar</h3>
                    <p className="bg-gray-100 p-4 rounded-lg font-mono text-sm border-l-4 border-amber-500">
                        (Grosor" × Ancho" × Largo') ÷ 12
                    </p>
                    <p>
                        Nota: Recuerda que la madera comercial se vende por medidas nominales antes del cepillado. Una tabla de "1 pulgada" suele tener 3/4" reales, pero se cobra como 1". Usa siempre la medida nominal para calcular el costo.
                    </p>
                </article>
            </div>
        </>
    );
}
