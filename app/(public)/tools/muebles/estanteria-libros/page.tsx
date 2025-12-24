import type { Metadata } from 'next';
import Link from 'next/link';
import BookshelfClient from './BookshelfClient';

export const metadata: Metadata = {
    title: 'Calculadora de Estantería - Diseño y Medidas de Baldas | Toolero',
    description: 'Diseña tu estantería o librería a medida. Calcula cuántas baldas caben según la altura de tus libros y el espacio disponible.',
    keywords: [
        'diseño estanteria',
        'medidas baldas libros',
        'altura estante biblioteca',
        'calcular maderas estanteria',
        'bookshelf calculator',
        'bricolaje muebles'
    ],
};

const relatedTools = [
    { name: 'Medidas Armario', url: '/tools/muebles/medidas-armario', icon: '🚪' },
    { name: 'Escritorio (proximamente)', url: '#', icon: '💻' },
    { name: 'Mueble TV', url: '/tools/muebles/mueble-tv', icon: '📺' },
];

export default function BookshelfPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <BookshelfClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alturas Estándar para Libros</h2>
                            <p>
                                Para maximizar el espacio en tu biblioteca, es fundamental agrupar los libros por tamaño. Aquí tienes las medidas de referencia:
                            </p>

                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Libros de Bolsillo (Paperbacks):</strong> 19-20 cm de alto. Deja un hueco de 22-23 cm.</li>
                                <li><strong>Novelas (Trade/Hardcover):</strong> 23-24 cm de alto. Deja un hueco de 26-27 cm.</li>
                                <li><strong>Libros de Arte / Gran Formato:</strong> 28-30 cm. Necesitas huecos de 32-35 cm.</li>
                                <li><strong>Vinilos (LPs):</strong> Miden 31.5 x 31.5 cm. Necesitas al menos 33-34 cm de altura libre.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Consejos de Construcción</h3>
                            <p>
                                Si vas a construir tu propia estantería de madera:
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Ancho máximo:</strong> Si usas madera de 19mm o aglomerado, no hagas baldas de más de <strong>75-80 cm</strong> de ancho o se curvarán con el peso de los libros.</li>
                                <li><strong>Zócalo:</strong> Deja siempre un zócalo o base de 6-10 cm en la parte inferior para evitar la humedad y el polvo del suelo.</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
                                Más Herramientas
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
        </div>
    );
}
