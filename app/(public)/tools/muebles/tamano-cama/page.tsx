import type { Metadata } from 'next';
import Link from 'next/link';
import BedSizeClient from './BedSizeClient';

export const metadata: Metadata = {
    title: 'Medidas de Camas y Colchones - Calculadora de Espacio | Toolero',
    description: 'Compara tamaños de cama (Individual, Matrimonio, Queen, King) y comprueba si caben en tu dormitorio con nuestra calculadora visual.',
    keywords: [
        'medidas cama matrimonio',
        'tamaño kinze size',
        'queen size medidas',
        'calculadora dormitorio',
        'espacio cama habitacion',
        'bed dimension calculator'
    ],
};

const relatedTools = [
    { name: 'Tamaño Sofá', url: '/tools/muebles/tamano-sofa', icon: '🛋️' },
    { name: 'Mesa Noche', url: '#', icon: '🌙' }, // Placeholder
    { name: 'Armario', url: '/tools/muebles/medidas-armario', icon: '🚪' },
];

export default function BedSizePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <BedSizeClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guía de Tamaños de Caña</h2>
                        <p>
                            Elegir el tamaño de cama correcto depende de dos factores: tu comodidad al dormir y el espacio disponible en la habitación.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Medidas Estándar (España / Internacional)</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left">
                                <thead className="bg-gray-50 font-bold text-gray-800">
                                    <tr>
                                        <th className="p-3">Nombre</th>
                                        <th className="p-3">Medidas (cm)</th>
                                        <th className="p-3">Uso Recomendado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="p-3">Individual / Twin</td>
                                        <td className="p-3">90 x 190</td>
                                        <td className="p-3">Niños, habitaciones invitadados</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Plaza y Media</td>
                                        <td className="p-3">105 x 190/200</td>
                                        <td className="p-3">Adolescentes, confort individual</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Matrimonio</td>
                                        <td className="p-3">135 x 190</td>
                                        <td className="p-3">Parejas (dormitorios pequeños)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">Queen Size</td>
                                        <td className="p-3">150 x 200</td>
                                        <td className="p-3">Parejas (estándar moderno)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3">King Size</td>
                                        <td className="p-3">180 x 200</td>
                                        <td className="p-3">Parejas (máximo confort)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">¿Cuánto espacio dejar alrededor?</h3>
                        <p>
                            Para poder hacer la cama cómodamente y no sentirte "encajonado", necesitas dejar pasos libres.
                        </p>
                        <ul className="list-disc pl-5 mb-6">
                            <li><strong>Mínimo absoluto:</strong> 50 cm (apenas pasas de lado).</li>
                            <li><strong>Recomendado:</strong> 60-70 cm (paso cómodo).</li>
                            <li><strong>Ideal:</strong> 90 cm (espacio visual amplio).</li>
                        </ul>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                            Más Muebles
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
                                    <div className="font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
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
