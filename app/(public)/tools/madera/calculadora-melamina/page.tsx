import type { Metadata } from 'next';
import MelamineClient from './MelamineClient';

export const metadata: Metadata = {
    title: 'Calculadora de Melamina y Tapacantos (Cubre Cantos) | Toolero',
    description: 'Calcula cuántos tableros de melamina necesitas y los metros lineales de tapacanto (cubre cantos) para tu proyecto de carpintería.',
    keywords: [
        'calcular melamina',
        'metros tapacanto',
        'cubre cantos metraje',
        'tableros necesarios',
        'despiece melamina',
        'edge banding calculator'
    ],
};

export default function MelaminePage() {
    return (
        <>
            <MelamineClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Melamina y Tapacantos</h2>
                    <p>
                        Al trabajar con aglomerado plastificado (melamina), el cálculo de los cantos es tan importante como el de los tableros.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Tipos de Canto</h3>
                    <ul className="list-disc pl-5 mb-6">
                        <li><strong>Canto Delgado (0.45mm):</strong> Económico y flexible. Ideal para interiores de cajones y estructuras ocultas.</li>
                        <li><strong>Canto Grueso (2mm - 3mm PVC):</strong> Resistente a golpes (tapacanto rígido). Se usa en puertas, frentes de cajón y cubiertas de escritorio.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Consejo de Despiece</h3>
                    <p>
                        Si vas a usar canto grueso (2mm o 3mm), recuerda <strong>descontar el grosor del canto</strong> a la medida de corte de la pieza.
                        <br />Ejemplo: Para una puerta final de 60cm de ancho con canto de 2mm a cada lado, debes cortar la madera a 59.6cm.
                    </p>
                </article>
            </div>
        </>
    );
}
