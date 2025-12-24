import type { Metadata } from 'next';
import Link from 'next/link';
import TvStandClient from './TvStandClient';

export const metadata: Metadata = {
    title: 'Calculadora de Mueble TV - Altura y Ancho Ideal | Toolero',
    description: 'Calcula el tamaño perfecto para tu mueble de TV. Asegura la altura correcta para tus ojos y el ancho ideal para tu televisor (pulgadas a cm).',
    keywords: [
        'medidas mueble tv',
        'altura tv pared',
        'ancho mesa tv',
        'tv stand size calculator',
        'distancia ver tv 4k',
        'decoracion salon tv'
    ],
};

const relatedTools = [
    { name: 'Tamaño Sofá', url: '/tools/muebles/tamano-sofa', icon: '🛋️' },
    { name: 'Sofá Seccional', url: '/tools/muebles/sofa-seccional', icon: '📐' },
    { name: 'Mesa Centro', url: '/tools/muebles/mesa-centro', icon: '☕' },
    { name: 'Calculadora Pintura', url: '/tools/muebles/calculadora-pintura', icon: '🎨' },
];

export default function TvStandPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <TvStandClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Ciencia de Colocar la TV</h2>
                            <p>
                                Más allá de la estética, colocar mal la televisión puede causar dolores de cuello y fatiga visual. Aquí están las reglas ergonómicas clave:
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Altura de los Ojos (Eye Level)</h3>
                            <p>
                                El centro de la pantalla debe estar a la altura de tus ojos cuando estás sentado en el sofá. Para una persona promedio, esto es aproximadamente a <strong>106 cm (42 pulgadas)</strong> del suelo.
                            </p>
                            <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-500 my-4 text-sm">
                                <strong>Fórmula:</strong> Altura Mueble = 106cm - (Altura TV / 2)
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. El Ancho del Mueble</h3>
                            <p>
                                Nunca compres un mueble del mismo ancho exacto que la TV. Se ve inestable y "cabezón".
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Ideal:</strong> El mueble debe ser al menos 10-20 cm más ancho por cada lado.</li>
                                <li><strong>Estético:</strong> Busca que sea un 25% más ancho que la pantalla total.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Distancia de Visionado (4K vs HD)</h3>
                            <p>
                                Con los televisores 4K modernos, puedes sentarte más cerca sin ver los píxeles.
                            </p>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Uso Mixto (Cine/TV):</strong> 1.5 a 2.5 veces la diagonal de la pantalla.</li>
                                <li><strong>Inmersión (Cine):</strong> 1.2 veces la diagonal (llenando 40º de tu campo visual).</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-slate-500 rounded-full"></span>
                                Otras Herramientas
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
                                        <div className="font-semibold text-gray-700 group-hover:text-slate-600 transition-colors">
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
