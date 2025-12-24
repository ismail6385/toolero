import type { Metadata } from 'next';
import Link from 'next/link';
import DrawerClient from './DrawerClient';

export const metadata: Metadata = {
    title: 'Calculadora de Medidas de Cajón y Guías | Toolero',
    description: 'Calcula el ancho exacto de tus cajones según el hueco del mueble y el tipo de guías (telescópicas, ocultas o madera). Evita errores de corte.',
    keywords: [
        'medidas cajon cocina',
        'calcular ancho cajon',
        'holgura guias correderas',
        'despiece cajon melamina',
        'drawer size calculator',
        'bricolaje carpinteria'
    ],
};

const relatedTools = [
    { name: 'Medidas Armario', url: '/tools/muebles/medidas-armario', icon: '🚪' },
    { name: 'Medidas Alacena', url: '/tools/muebles/medidas-alacena', icon: '🥫' },
    { name: 'Estantería', url: '/tools/muebles/estanteria-libros', icon: '📚' },
];

export default function DrawerPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <DrawerClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Holguras según el tipo de guía</h2>
                            <p>
                                El error más frecuente al hacer cajones es cortar la caja del mismo ancho que el hueco menos un centímetro "a ojo".
                                Cada fabricante de herrajes exige una medida exacta.
                            </p>

                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Guías Telescópicas (Bolitas):</strong> Estándar internacional de <strong>12.7 mm (1/2 pulgada)</strong> por lado. El cajón debe ser exactamente 2.54 cm más estrecho que el hueco.</li>
                                <li><strong>Guías Ocultas (Blum/Hettich):</strong> Suelen requerir que el cajón sea unos 10 mm más estrecho que el hueco en total, pero depende del modelo exacto. Además, el grosor del lateral del cajón es crítico (máximo 16mm habitualmente).</li>
                                <li><strong>Guías de Rueda (Epoxi):</strong> Generalmente también piden 12.5 - 13 mm por lado.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Consejos de Montaje</h3>
                            <p>
                                Si usas melamina de 16mm, recuerda descontar 32mm al ancho total del cajón para calcular el ancho de las piezas frontal y trasera (si estás armando el cajón con los laterales "abrazando" al frente/trasera).
                            </p>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-zinc-500 rounded-full"></span>
                                Taller de Bricolaje
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
                                        <div className="font-semibold text-gray-700 group-hover:text-zinc-600 transition-colors">
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
