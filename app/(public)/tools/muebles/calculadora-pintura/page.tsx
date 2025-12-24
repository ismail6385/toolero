import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from './PaintCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Pintura por m2 - ¿Cuánta pintura necesito? | Toolero',
    description: 'Calcula los litros de pintura necesarios para pintar paredes, techos o habitaciones completas. Herramienta precisa para bricolaje y reformas.',
    keywords: [
        'calculadora pintura',
        'cuanta pintura necesito',
        'litros de pintura por metro cuadrado',
        'calcular m2 pared',
        'pintar habitacion',
        'herramientas bricolaje'
    ],
};

const relatedTools = [
    { name: 'Calculadora de ROI', url: '/tools/finanzas/roi', icon: '💰' },
    { name: 'Generador de Fichas', url: '/tools/educacion/generador-fichas', icon: '📝' },
    { name: 'Eliminar Duplicados', url: '/tools/texto/eliminar-duplicados', icon: '🧹' },
];

export default function PaintCalculatorPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <PaintCalculatorClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo calcular cuánta pintura necesito?</h2>
                        <p>
                            Uno de los errores más comunes al pintar una casa es comprar demasiada pintura o quedarse corto a mitad del trabajo.
                            Nuestra calculadora te ayuda a estimar la cantidad exacta necesaria basándose en la superficie de tus paredes y el número de capas.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Fórmula básica de cálculo</h3>
                        <p>
                            Para hacer el cálculo manual, sigue estos pasos:
                        </p>
                        <ol className="list-decimal pl-5 mb-6">
                            <li>Mide el ancho y alto de cada pared para obtener los m² (Ancho x Alto).</li>
                            <li>Suma todas las paredes para obtener el Área Total.</li>
                            <li>Resta el área de puertas (aprox 1.6 m²) y ventanas (aprox 1.5 m²).</li>
                            <li>Multiplica el resultado por el número de manos (capas) que vas a dar (generalmente 2).</li>
                            <li>Divide el total por el rendimiento de la pintura (usualmente <strong>10 m²/litro</strong>).</li>
                        </ol>

                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 not-prose mb-8">
                            <h4 className="font-bold text-yellow-800 mb-2">Consejos para comprar pintura</h4>
                            <ul className="space-y-2 text-sm text-yellow-800">
                                <li>• <strong>Superficies rugosas:</strong> El gotelé o ladrillo absorbe un 20-30% más de pintura.</li>
                                <li>• <strong>Cambios de color:</strong> Si pasas de un color oscuro a uno claro, es posible que necesites 3 manos.</li>
                                <li>• <strong>Muebles:</strong> Para pintar muebles, mide la superficie visible y recuerda que la pintura para madera suele rendir un poco más (12 m²/L).</li>
                            </ul>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
                            Otras Utilidades
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
    );
}
