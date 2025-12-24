import type { Metadata } from 'next';
import Link from 'next/link';
import SectionalSofaClient from './SectionalSofaClient';

export const metadata: Metadata = {
    title: 'Simulador de Sofá Seccional en L - Calculadora de Espacios | Toolero',
    description: 'Herramienta interactiva para planificar tu salón con un sofá Chaise Longue. Mueve el sofá virtualmente, comprueba los pasos y asegura que las medidas sean perfectas.',
    keywords: [
        'simulador sofa salon',
        'medidas chaise longue',
        'distribucion salon app',
        'sectional sofa calculator',
        'planificador espacio',
        'distancia paso muebles'
    ],
};

const relatedTools = [
    { name: 'Tamaño Sofá', url: '/tools/muebles/tamano-sofa', icon: '🛋️' },
    { name: 'Mesa Centro', url: '/tools/muebles/mesa-centro', icon: '☕' },
    { name: 'Mueble TV', url: '/tools/muebles/mueble-tv', icon: '📺' },
    { name: 'Alfombra (proximamente)', url: '#', icon: '🎨' },
];

export default function SectionalSofaPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <SectionalSofaClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guía para el Sofá Perfecto</h2>
                        <p>
                            Elegir un sofá seccional (o rinconera) es una gran inversión. Nuestra herramienta te ayuda a evitar el error número 1: <strong>comprar un sofá que bloquea el paso</strong>.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">¿Cómo usar el simulador?</h3>
                        <ol className="list-decimal pl-5 mb-6 space-y-2">
                            <li><strong>Mide tu salón:</strong> Introduce el ancho y largo total de la habitación.</li>
                            <li><strong>Configura el sofá:</strong> Ajusta el largo, la "mano" (izquierda/derecha) y el tamaño del Chaise Longue.</li>
                            <li><strong>¡Arrástralo!:</strong> Mueve el sofá por el plano virtual para ver cómo queda en diferentes posiciones.</li>
                            <li><strong>Verifica las zonas rojas:</strong> Si los bordes se ponen rojos, significa que estás dejando menos de 60cm de paso, lo cual puede ser incómodo.</li>
                        </ol>

                        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 my-8">
                            <h4 className="font-bold text-indigo-900 mb-2">Regla de Oro: El Flujo de Paso</h4>
                            <p className="text-indigo-800 text-sm">
                                Los diseñadores de interiores recomiendan dejar al menos <strong>60-80 cm</strong> de espacio libre alrededor de las zonas de circulación. Si hay una mesa de centro, la distancia ideal al sofá es de <strong>40-50 cm</strong> (alcanzable pero con espacio para piernas).
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">¿Mano Izquierda o Derecha? (Left vs Right Facing)</h3>
                        <p>
                            La confusión eterna. La industria del mueble siempre define la "mano" imaginando que estás <strong>de pie frente al sofá, mirándolo</strong>.
                        </p>
                        <ul className="list-disc pl-5 mb-6">
                            <li>Si el brazo largo está a tu <strong>izquierda</strong>, es un sofá "Left Arm Facing" (Brazo Izquierdo).</li>
                            <li>Si el brazo largo está a tu <strong>derecha</strong>, es un sofá "Right Arm Facing" (Brazo Derecho).</li>
                        </ul>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
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
                                    <div className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                                        {tool.name}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                            <h4 className="font-bold text-purple-900 text-sm mb-2">¿Necesitas ayuda?</h4>
                            <p className="text-xs text-purple-800">
                                Si tienes dudas con las medidas, siempre es mejor usar cinta de carrocero (masking tape) en el suelo real para visualizar el tamaño antes de comprar.
                            </p>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
