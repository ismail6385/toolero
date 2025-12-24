import type { Metadata } from 'next';
import Link from 'next/link';
import ShoeRackClient from './ShoeRackClient';

export const metadata: Metadata = {
    title: 'Medidas de Zapatero - Calculadora de Capacidad | Toolero',
    description: 'Diseña tu zapatero ideal. Calcula cuántos pares de zapatos caben en tu mueble o qué medidas necesitas para tu colección.',
    keywords: [
        'medidas zapatero',
        'fondo zapatero ideal',
        'altura baldas zapatos',
        'capacidad mueble zapatos',
        'shoe rack calculator',
        'organizar calzado'
    ],
};

const relatedTools = [
    { name: 'Medidas Armario', url: '/tools/muebles/medidas-armario', icon: '🚪' },
    { name: 'Estantería', url: '/tools/muebles/estanteria-libros', icon: '📚' },
    { name: 'Medidas Alacena', url: '/tools/muebles/medidas-alacena', icon: '🥫' },
];

export default function ShoeRackPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">

                <ShoeRackClient />

                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué fondo debe tener un zapatero?</h2>
                            <p>
                                El fondo (profundidad) determina cómo guardarás los zapatos.
                            </p>

                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>35 cm (Ideal):</strong> Permite guardar los zapatos en plano (horizontal). Es la forma que más aprovecha el espacio vertical.</li>
                                <li><strong>25-30 cm (Estrecho):</strong> Necesitarás baldas inclinadas. Pierdes altura útil pero ganas espacio en pasillos.</li>
                                <li><strong>15-20 cm (Muy estrecho):</strong> Solo posible con zapateros basculantes (de trampones) donde el zapato entra casi vertical.</li>
                            </ul>

                            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Alturas entre baldas</h3>
                            <ul className="list-disc pl-5 mb-6">
                                <li><strong>Zapatos planos / Zapatillas:</strong> 15-18 cm.</li>
                                <li><strong>Tacones altos:</strong> 20-25 cm (o guárdalos tumbados uno frente al otro).</li>
                                <li><strong>Botas de caña alta:</strong> 40-50 cm. Ocupan mucho, mejor túmbalas o usa la balda superior.</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:block">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                                Organización
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
                                        <div className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
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
