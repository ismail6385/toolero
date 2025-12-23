import type { Metadata } from 'next';
import Link from 'next/link';
import SofaSizeClient from './SofaSizeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Tamaño de Sofá - ¿Cabe en mi salón? | Toolero',
    description: 'Calcula si un sofá cabe en tu salón y si pasa por la puerta. Herramienta gratuita para planificar la compra de muebles y diseño de interiores.',
    keywords: [
        'calculadora tamaño sofa',
        'sofa size calculator',
        'medidas sofa salon',
        'pasa el sofa por la puerta',
        'distribucion salon',
        'medidas muebles'
    ],
};

const relatedTools = [
    { name: 'Sofá Seccional', url: '/tools/muebles/sofa-seccional', icon: '🛋️' },
    { name: 'Mesa de Centro', url: '/tools/muebles/mesa-centro', icon: '☕' },
    { name: 'Mueble TV', url: '/tools/muebles/mueble-tv', icon: '📺' },
    { name: 'Calculadora Pintura', url: '/tools/muebles/calculadora-pintura', icon: '🎨' },
];

export default function SofaSizePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <SofaSizeClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo saber si el sofá cabe en tu salón?</h2>
                        <p>
                            Elegir el sofá perfecto va más allá del estilo y el color. El tamaño es el factor más crítico.
                            Un sofá demasiado grande puede bloquear el paso y hacer que la habitación se sienta pequeña, mientras que uno muy pequeño puede perderse en el espacio.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">La Regla de Oro: El Acceso</h3>
                        <p>
                            Antes de preocuparte por cómo queda en el salón, ¡asegúrate de que entra en casa! Mide:
                        </p>
                        <ul className="list-disc pl-5 mb-6">
                            <li><strong>Ancho de la puerta principal:</strong> Es el obstáculo número uno.</li>
                            <li><strong>Altura del ascensor o ancho de escaleras:</strong> Si vives en un piso, esto es vital.</li>
                            <li><strong>Giros en pasillos:</strong> Si hay un ángulo de 90 grados justo después de la puerta, necesitas más margen.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Medidas Estándar de Sofás</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 text-left">Tipo</th>
                                        <th className="p-3 text-left">Ancho Aprox.</th>
                                        <th className="p-3 text-left">Profundidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-3">Sofá 2 Plazas</td>
                                        <td className="p-3">140 - 180 cm</td>
                                        <td className="p-3">90 - 100 cm</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3">Sofá 3 Plazas</td>
                                        <td className="p-3">180 - 230 cm</td>
                                        <td className="p-3">90 - 100 cm</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3">Chaise Longue</td>
                                        <td className="p-3">250 - 300 cm</td>
                                        <td className="p-3">150 - 180 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h4 className="font-bold text-indigo-900 mb-2">Tip de Diseño</h4>
                            <p className="text-indigo-800 text-sm">
                                Para visualizar el tamaño real, coloca cinta de carrocero (cinta de pintor) en el suelo marcando el contorno del sofá.
                                Así verás exactamente cuánto espacio ocupa y si puedes caminar alrededor cómodamente.
                            </p>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            Relacionado Muebles
                        </h3>
                        <div className="space-y-3">
                            {relatedTools.map((tool) => (
                                <Link
                                    key={tool.name}
                                    href={tool.url}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                                >
                                    <div className="text-xl bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                        {tool.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
