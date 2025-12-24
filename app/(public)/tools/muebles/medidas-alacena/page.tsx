import type { Metadata } from 'next';
import Link from 'next/link';
import PantryClient from './PantryClient';

export const metadata: Metadata = {
    title: 'Calculadora de Alacena y Despensa - Alturas Ideales | Toolero',
    description: 'Diseña el interior de tu cocina. Calcula la altura exacta de las baldas para guardar botellas, cereales, latas y ollas sin desperdiciar espacio.',
    keywords: [
        'medidas alacena cocina',
        'altura estantes despensa',
        'organizar armario cocina',
        'espacio botellas aceite',
        'kitchen cabinet calculator',
        'diseño interiores cocina'
    ],
};

const relatedTools = [
    { name: 'Mesa Comedor', url: '/tools/muebles/mesa-comedor', icon: '🍽️' },
    { name: 'Medidas Zapatero', url: '/tools/muebles/zapatero', icon: '👠' },
    { name: 'Medidas Cajón (proximamente)', url: '#', icon: '🗄️' },
];

export default function PantryPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <PantryClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Despensa Perfecta</h2>
                            <p>
                                El secreto de una cocina ordenada no es tener muchos armarios, sino tener las baldas a la altura correcta.
                                El error más común es dejar espacios de 40-50 cm "por defecto" para todo, desperdiciando la mitad superior del hueco cuando guardas latas pequeñas.
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Medidas Clave de Alimentos</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Botellas (Aceite, Vino, Refrescos):</strong> 30 a 33 cm. Necesitas baldas de al menos 35 cm de altura libre.</li>
                                <li><strong>Cajas de Cereales:</strong> Las familiares suelen medir entre 28 y 32 cm.</li>
                                <li><strong>Latas de Conserva:</strong> Estándar de 11 cm. Puedes apilar dos (22 cm) o usar estantes bajos de 15 cm.</li>
                                <li><strong>Tarros de Legumbres/Pasta:</strong> Suelen rondar los 18-20 cm.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Ergonomía en la Cocina</h3>
                            <p>
                                <strong>Lo más pesado, abajo.</strong> Ollas, paelleras y garrafas de agua deben ir en las zonas inferiores (hasta 60 cm del suelo).
                                De 80 cm a 160 cm (nivel de ojos y manos) coloca lo que uses a diario: platos, vasos y alimentos de rotación constante.
                            </p>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                                Organización Cocina
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
                                        <div className="font-semibold text-gray-700 group-hover:text-teal-600 transition-colors">
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
