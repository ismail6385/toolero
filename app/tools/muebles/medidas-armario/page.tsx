import type { Metadata } from 'next';
import Link from 'next/link';
import WardrobeClient from './WardrobeClient';

export const metadata: Metadata = {
    title: 'Medidas de Armario - Calculadora de Puertas y Capacidad | Toolero',
    description: 'Diseña tu armario ideal. Calcula cuántas puertas necesitas según el ancho de tu pared y estima la capacidad de almacenaje de ropa.',
    keywords: [
        'medidas armario empotrado',
        'calcular puertas armario',
        'fondo armario ropero',
        'capacidad armario',
        'diseño vestidor',
        'wardrobe calculator'
    ],
};

const relatedTools = [
    { name: 'Tamaño Cama', url: '/tools/muebles/tamano-cama', icon: '🛏️' },
    { name: 'Calculadora Pintura', url: '/tools/muebles/calculadora-pintura', icon: '🎨' },
    { name: 'Zapatero (proximamente)', url: '#', icon: '👠' },
];

export default function WardrobePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <WardrobeClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Medidas Estándar para Armarios</h2>
                            <p>
                                Un buen armario debe aprovechar cada centímetro sin sacrificar la comodidad de uso.
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Profundidad (Fondo)</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>60 cm (Estándar):</strong> Es la medida ideal para colgar perchas de ropa (chaquetas, camisas) sin que rocen las puertas.</li>
                                <li><strong>40-45 cm (Reducido):</strong> Para pasillos o habitaciones pequeñas. Requiere usar perchas extraíbles frontales o guardar solo ropa doblada.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Ancho de Puertas</h3>
                            <p>
                                El ancho de las puertas abatibles no debe ser excesivo para evitar que pesen mucho sobre las bisagras y ocupen demasiado espacio al abrirse.
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Ideal:</strong> 40 a 50 cm por hoja.</li>
                                <li><strong>Máximo:</strong> 60 cm (más de esto es incómodo y pesado).</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Alturas Clave</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Barra larga (vestidos/abrigos):</strong> 130-150 cm de altura libre.</li>
                                <li><strong>Barra corta (camisas/pantalones):</strong> 90-110 cm de altura libre.</li>
                                <li><strong>Cajones:</strong> Altura ideal entre 15 y 25 cm.</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-stone-500 rounded-full"></span>
                                Organiza tu Hogar
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
                                        <div className="font-semibold text-gray-700 group-hover:text-stone-600 transition-colors">
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
