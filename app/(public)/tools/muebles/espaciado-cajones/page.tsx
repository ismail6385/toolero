import type { Metadata } from 'next';
import Link from 'next/link';
import DrawerSpacingClient from './DrawerSpacingClient';

export const metadata: Metadata = {
    title: 'Calculadora de Frentes de Cajón - Distribución Vertical | Toolero',
    description: 'Calcula la altura exacta de los frentes de tus cajones repartiendo el espacio del hueco. Incluye cálculo de holguras y separaciones.',
    keywords: [
        'distribucion cajonera',
        'altura frentes cajon',
        'calcular hueco cajones',
        'separacion cajones 3mm',
        'drawer spacing calculator',
        'diseño mueble cajones'
    ],
};

const relatedTools = [
    { name: 'Medidas Cajón (Caja)', url: '/tools/muebles/tamano-cajon', icon: '📦' },
    { name: 'Medidas Armario', url: '/tools/muebles/medidas-armario', icon: '🚪' },
    { name: 'Medidas Escritorio', url: '/tools/muebles/escritorio-estudio', icon: '💻' },
];

export default function DrawerSpacingPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <DrawerSpacingClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">La importancia de las holguras</h2>
                            <p>
                                Al diseñar una cajonera, no puedes simplemente dividir la altura total por el número de cajones. Debes descontar el espacio que hay <strong>entre</strong> los frentes para que no rocen al abrir y cerrar.
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Estándares de Separación</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>3 mm:</strong> Es el estándar en carpintería moderna. Suficiente para que no rocen y estéticamente limpio.</li>
                                <li><strong>2 mm:</strong> Para muebles muy minimalistas y bien calibrados. Requiere precisión milimétrica.</li>
                                <li><strong>4-5 mm:</strong> Usado en estilo rústico o cuando los frentes tienen cantos redondeados.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Estilos de Distribución</h3>
                            <p>
                                <strong>Iguales:</strong> Todos los cajones tienen la misma altura. Da sensación de orden y es fácil de construir.
                            </p>
                            <p>
                                <strong>Progresivos:</strong> Los cajones inferiores son más altos que los superiores. Ergonómicamente superior porque los objetos pesados van abajo y los pequeños (cubiertos, útiles) arriba a la mano.
                            </p>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                                Diseño de Muebles
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
        </div>
    );
}
