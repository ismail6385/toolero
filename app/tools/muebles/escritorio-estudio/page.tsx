import type { Metadata } from 'next';
import Link from 'next/link';
import StudyDeskClient from './StudyDeskClient';

export const metadata: Metadata = {
    title: 'Medidas de Escritorio - Calculadora Tamaño Ideal | Toolero',
    description: 'Calcula el tamaño perfecto para tu mesa de estudio o escritorio de oficina. Infórmate sobre las medidas mínimas para ordenador, portátil o estudiar.',
    keywords: [
        'medidas escritorio estudio',
        'tamaño mesa ordenador',
        'fondo escritorio gaming',
        'ancho mesa oficina',
        'desk size calculator',
        'home office medidas'
    ],
};

const relatedTools = [
    { name: 'Ergonomía', url: '/tools/muebles/altura-ergonomica', icon: '🧘' },
    { name: 'Estantería', url: '/tools/muebles/estanteria-libros', icon: '📚' },
    { name: 'Silla Oficina (proximamente)', url: '#', icon: '🪑' },
];

export default function StudyDeskPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <StudyDeskClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué profundidad debe tener un escritorio?</h2>
                            <p>
                                La profundidad (fondo) es la medida más crítica para la salud visual y la comodidad, especialmente si usas ordenador.
                            </p>

                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>50 cm (Mínimo):</strong> Solo aceptable para escribir a mano o usar un portátil pequeño esporádicamente. No recomendado para uso diario.</li>
                                <li><strong>60-65 cm (Estándar):</strong> Medida habitual. Permite tener un monitor, teclado y espacio para apoyar las muñecas.</li>
                                <li><strong>75-80 cm (Óptimo PC):</strong> Necesario si usas monitores grandes (27" o más) para mantener la distancia visual correcta sin forzar la vista.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Ancho según el uso</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Estudiantes (<120 cm):</strong> Se quedará corto en cuanto tengan que abrir un libro y usar el ordenador a la vez.</li>
                                <li><strong>Ideal (140-160 cm):</strong> Permite tener zonas diferenciadas: zona de ordenador y zona de escritura limpia a un lado.</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                                Oficina en Casa
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
                                        <div className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors">
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
