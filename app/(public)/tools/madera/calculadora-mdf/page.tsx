import type { Metadata } from 'next';
import MDFClient from './MDFClient';

export const metadata: Metadata = {
    title: 'Calculadora de Peso y Cortes de Tableros MDF | Toolero',
    description: 'Calcula el peso de tus tableros MDF para el transporte y estima cuántas hojas necesitas para las piezas de tu proyecto.',
    keywords: [
        'peso tablero mdf',
        'calcular material mdf',
        'hojas mdf necesarias',
        'densidad mdf 18mm',
        'mdf weight calculator',
        'optimizar cortes madera'
    ],
};

export default function MDFPage() {
    return (
        <>
            <MDFClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cuánto pesa un tablero de MDF?</h2>
                    <p>
                        El MDF es significativamente más pesado que la madera natural o el aglomerado debido a su alta densidad (aprox. 750 kg/m³).
                    </p>
                    <p>
                        <strong>Pesos aproximados por hoja estándar (1.22 x 2.44m):</strong>
                    </p>
                    <ul className="list-disc pl-5 mb-6">
                        <li><strong>3 mm:</strong> ~6.5 kg</li>
                        <li><strong>5.5 mm:</strong> ~12 kg</li>
                        <li><strong>15 mm:</strong> ~33 kg</li>
                        <li><strong>18 mm:</strong> ~40 kg (¡Cuidado al cargar solo!)</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Estimación de Cortes</h3>
                    <p>
                        Esta calculadora utiliza un método de estimación por área con un factor de desperdicio. Para proyectos complejos con muchas piezas diferentes, te recomendamos usar un software especializado de optimización de corte (Cut Optimizer) o pedir el servicio de despiece en tu proveedor.
                    </p>
                </article>
            </div>
        </>
    );
}
