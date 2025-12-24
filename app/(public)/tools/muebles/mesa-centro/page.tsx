import type { Metadata } from 'next';
import Link from 'next/link';
import CoffeeTableClient from './CoffeeTableClient';

export const metadata: Metadata = {
    title: 'Medidas de Mesa de Centro - Calculadora por Tamaño de Sofá | Toolero',
    description: 'Calcula el tamaño ideal de tu mesa de centro según tu sofá. Altura, largo y distancia perfecta para decorar tu salón como un profesional.',
    keywords: [
        'medidas mesa centro',
        'altura mesa centro',
        'distancia sofa mesa',
        'coffee table size calculator',
        'decoracion salon',
        'proporcion muebles'
    ],
};

const relatedTools = [
    { name: 'Tamaño Sofá', url: '/tools/muebles/tamano-sofa', icon: '🛋️' },
    { name: 'Sofá Seccional', url: '/tools/muebles/sofa-seccional', icon: '📐' },
    { name: 'Mueble TV', url: '/tools/muebles/mueble-tv', icon: '📺' },
    { name: 'Alfombra (proximamente)', url: '#', icon: '🎨' },
];

export default function CoffeeTablePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <CoffeeTableClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">La Regla de los 2/3 para Mesas de Centro</h2>
                        <p>
                            Una mesa de centro bien proporcionada es la clave para un salón equilibrado. La regla de oro que usan los diseñadores de interiores es simple:
                        </p>
                        <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 my-6">
                            <p className="font-bold text-amber-900 text-lg mb-2">La Regla de Oro:</p>
                            <p className="text-amber-800">
                                La mesa de centro debe medir aproximadamente <strong>dos tercios (2/3)</strong> del largo de tu sofá.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">¿Qué altura debe tener?</h3>
                        <p>
                            La funcionalidad es lo primero. Nadie quiere una mesa que sea incomoda para apoyar una taza o estirar las piernas (aunque no debas hacerlo).
                        </p>
                        <ul className="list-disc pl-5 mb-6 space-y-2">
                            <li><strong>Altura Ideal:</strong> La misma altura que los cojines del asiento de tu sofá.</li>
                            <li><strong>Aceptable:</strong> Hasta 2-5 cm más baja que el asiento.</li>
                            <li><strong>Nunca:</strong> Más alta que el asiento del sofá (crea un efecto visual extraño y es incómodo).</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Distancia entre Sofá y Mesa</h3>
                        <p>
                            El espacio para las piernas es vital. La distancia estándar recomendada es de <strong>35 a 45 cm</strong>.
                        </p>
                        <ul className="list-disc pl-5 mb-6">
                            <li><strong>Menos de 35 cm:</strong> Se sentirá apretado y será difícil sentarse o levantarse.</li>
                            <li><strong>Más de 45 cm:</strong> La mesa quedará demasiado lejos para alcanzar tu bebida cómodamente.</li>
                        </ul>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                            Completa tu Salón
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
                                    <div className="font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">
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
