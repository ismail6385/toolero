import type { Metadata } from 'next';
import Link from 'next/link';
import DiningTableClient from './DiningTableClient';

export const metadata: Metadata = {
    title: 'Medidas de Mesa de Comedor - Calculadora por Personas | Toolero',
    description: 'Calcula el tamaño ideal de tu mesa de comedor (rectangular o redonda) según el número de personas. Asegura espacio para sillas y comodidad.',
    keywords: [
        'medidas mesa comedor 6 personas',
        'mesa redonda medidas',
        'tamaño mesa rectangular',
        'calculadora mesa comedor',
        'espacio sillas comedor',
        'dining table calculator'
    ],
};

const relatedTools = [
    { name: 'Mesa Centro', url: '/tools/muebles/mesa-centro', icon: '☕' },
    { name: 'Calculadora Pintura', url: '/tools/muebles/calculadora-pintura', icon: '🎨' },
    { name: 'Tamaño Sofá', url: '/tools/muebles/tamano-sofa', icon: '🛋️' },
];

export default function DiningTablePage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <DiningTableClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cuánto espacio necesita cada persona?</h2>
                            <p>
                                Para cenar cómodamente sin chocar los codos con el vecino, existen medidas estándar ergonómicas que debes respetar.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 my-6">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                                    <h4 className="font-bold text-red-900 mb-2">Ancho Individual</h4>
                                    <p className="text-3xl font-bold text-red-600 mb-1">60 cm</p>
                                    <p className="text-sm text-red-800">Mínimo por comensal.</p>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-2">Profundidad</h4>
                                    <p className="text-3xl font-bold text-gray-600 mb-1">40 cm</p>
                                    <p className="text-sm text-gray-500">Para plato, cubiertos y copa.</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">La Zona de Paso</h3>
                            <p>
                                No olvides el espacio detrás de las sillas. Si alguien quiere levantarse mientras otros comen, necesitas espacio.
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>75 cm:</strong> Mínimo para poder arrastrar la silla hacia atrás y levantarse.</li>
                                <li><strong>120 cm:</strong> Ideal si alguien necesita cruzar por detrás mientras estás sentado (tránsito).</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                                Diseño de Comedor
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
                                        <div className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
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
