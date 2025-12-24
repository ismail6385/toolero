import type { Metadata } from 'next';
import Link from 'next/link';
import ErgonomicHeightClient from './ErgonomicHeightClient';

export const metadata: Metadata = {
    title: 'Calculadora de Ergonomía - Altura de Silla y Escritorio | Toolero',
    description: 'Calcula la altura ideal para tu silla, escritorio y monitor según tu estatura. Evita dolores de espalda mejorando tu postura de trabajo.',
    keywords: [
        'altura silla escritorio',
        'calculadora ergonomica',
        'altura monitor ojos',
        'standing desk calculator',
        'postura correcta pc',
        'ergonomia oficina'
    ],
};

const relatedTools = [
    { name: 'Mesa Comedor', url: '/tools/muebles/mesa-comedor', icon: '🍽️' },
    { name: 'Sofá Seccional', url: '/tools/muebles/sofa-seccional', icon: '🛋️' },
    { name: 'Medidas Estantería', url: '/tools/muebles/estanteria-libros', icon: '📚' },
];

export default function ErgonomicPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <ErgonomicHeightClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Regla de los 90 Grados</h2>
                            <p>
                                Para conseguir una postura neutra y sin tensiones, busca siempre formar ángulos rectos:
                            </p>

                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Codos:</strong> Deben estar a 90º o ligeramente más abiertos (100º). El teclado debe estar a la altura de los codos, nunca más arriba.</li>
                                <li><strong>Caderas:</strong> Entre 90º y 100º. Muslos paralelos al suelo.</li>
                                <li><strong>Rodillas:</strong> A 90º. Los pies deben estar totalmente apoyados en el suelo. Si no llegan, usa un reposapiés.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">La Pantalla y tus Ojos</h3>
                            <p>
                                El error más común es tener el monitor demasiado bajo (provoca "cuello de texto" o joroba) o demasiado alto (seca los ojos).
                            </p>
                            <div className="bg-cyan-50 p-4 rounded-xl border-l-4 border-cyan-500 my-4 text-sm">
                                <strong>Regla de Oro:</strong> El borde superior del monitor debe estar al nivel de tu línea visual horizontal o ligeramente por debajo.
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
                                Salud y Mobiliario
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
                                        <div className="font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors">
                                            {tool.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

            </div>
        </div>
    );
}
