import type { Metadata } from 'next';
import Link from 'next/link';
import YouTubeMoneyClient from './YouTubeMoneyClient';

export const metadata: Metadata = {
    title: 'Calculadora de Ganancias YouTube - ¿Cuánto paga YouTube?',
    description: 'Calcula cuánto dinero puedes ganar en YouTube según tus visitas y CPM. Estimador de ingresos reales para youtubers e influencers.',
    keywords: [
        'calculadora dinero youtube',
        'cuanto paga youtube',
        'calcular ganancias youtube',
        'youtube money calculator',
        'estimar ingresos youtube',
        'calculadora visitas youtube',
        'cpm youtube'
    ],
};

const relatedTools = [
    {
        name: 'Descargar Miniaturas',
        desc: 'Bajar carátulas de videos',
        url: '/tools/social/youtube-thumbnail',
        icon: '🖼️'
    },
    {
        name: 'Generador de Tags',
        desc: 'Mejora tu SEO',
        url: '/tools/social/youtube-tags',
        icon: '🏷️'
    },
    {
        name: 'Link a WhatsApp',
        desc: 'Generador de enlaces',
        url: '/tools/social/link-whatsapp',
        icon: '📱'
    },
];

export default function YouTubeMoneyPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <YouTubeMoneyClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona la Calculadora de YouTube?</h2>
                        <p>
                            Nuestra calculadora utiliza una fórmula estándar basada en el <strong>CPM (Coste por Mil impresiones)</strong> para estimar los ingresos potenciales de un canal.
                            Es importante entender que no todas las visitas generan dinero, ya que depende de si se muestran anuncios y si el espectador los ve.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">¿Qué es el CPM y RPM?</h3>
                        <ul className="space-y-2">
                            <li><strong>CPM (Coste Por Mil):</strong> Es lo que los anunciantes pagan por cada 1,000 visualizaciones de sus anuncios.</li>
                            <li><strong>RPM (Ingresos Por Mil):</strong> Es lo que tú, como creador, realmente ganas por cada 1,000 visitas totales a tu video (después de que YouTube cobre su parte).</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Factores que afectan tus ganancias</h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6 not-prose">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="font-bold text-gray-900 block mb-1">🌍 País</span>
                                <span className="text-sm">Las visitas de EE.UU., Reino Unido o Australia pagan mucho más que las de Latam o India.</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="font-bold text-gray-900 block mb-1">🎯 Nicho</span>
                                <span className="text-sm">Finanzas, Tech y Seguros tienen CPMs altos ($10+). Vlogs y comedia suelen ser bajos ($1-2).</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="font-bold text-gray-900 block mb-1">⏳ Duración</span>
                                <span className="text-sm">Videos de más de 8 minutos permiten colocar anuncios intermedios (mid-rolls).</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <span className="font-bold text-gray-900 block mb-1">👶 Audiencia</span>
                                <span className="text-sm">El contenido "Made for Kids" tiene restricciones de anuncios y paga menos.</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
                        <div className="space-y-4 not-prose">
                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Cuántas visitas necesito para ganar 100 dólares?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    Depende de tu CPM, pero con un promedio de $2 USD por mil visitas, necesitarías aproximadamente <strong>50,000 visitas</strong> para ganar $100.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿YouTube paga por suscriptores o likes?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    No directamente. YouTube paga por las <strong>visualizaciones de anuncios</strong> en tus videos. Sin embargo, tener más suscriptores y likes ayuda a que el algoritmo recomiende más tus videos, lo que trae más visitas y, por ende, más dinero.
                                </div>
                            </details>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                            Más Herramientas Social
                        </h3>
                        <div className="space-y-3">
                            {relatedTools.map((tool) => (
                                <Link
                                    key={tool.url}
                                    href={tool.url}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                                >
                                    <div className="text-2xl bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                            {tool.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {tool.desc}
                                        </div>
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
