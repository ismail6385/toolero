import type { Metadata } from 'next';
import Link from 'next/link';
import YouTubeThumbnailClient from './YouTubeThumbnailClient';

export const metadata: Metadata = {
    title: 'Descargar Miniatura YouTube (4K/HD) - Toolero',
    description: 'Descarga gratis miniaturas de YouTube en máxima calidad (4K, HD 1080p). Extrae la imagen de portada de cualquier video fácil y rápido.',
    keywords: [
        'descargar miniatura youtube',
        'youtube thumbnail downloader',
        'bajar imagen youtube',
        'guardar miniatura 4k',
        'extraer foto video',
        'youtube cover',
        'imagen destacada youtube'
    ],
};

const relatedTools = [
    {
        name: 'Generador de Tags',
        desc: 'Optimiza el SEO de tus videos',
        url: '/tools/social/youtube-tags',
        icon: '🏷️'
    },
    {
        name: 'Generador Hashtags',
        desc: 'Para YouTube, TikTok e Instagram',
        url: '/tools/social/hashtag-generator',
        icon: '#️⃣'
    },
    {
        name: 'Link a WhatsApp',
        desc: 'Crea enlaces directos con mensaje',
        url: '/tools/social/link-whatsapp',
        icon: '📱'
    },
    {
        name: 'Fuentes para Bio',
        desc: 'Letras bonitas para redes',
        url: '/tools/social/bio-fonts',
        icon: '✍️'
    }
];

export default function YouTubeThumbnailPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <YouTubeThumbnailClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo descargar miniaturas de YouTube en HD?</h2>
                        <p>
                            Nuestra herramienta gratuita te permite extraer y guardar la imagen destacada de cualquier video de YouTube en segundos.
                            Simplemente sigue estos pasos:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 mb-8">
                            <li>Copia la URL del video de YouTube (ej: <code>https://www.youtube.com/watch?v=...</code>).</li>
                            <li>Pégala en el campo de texto de arriba.</li>
                            <li>La herramienta generará automáticamente las vistas previas.</li>
                            <li>Elige la calidad deseada (recomendamos <strong>HD/4K</strong>) y haz clic en "Descargar".</li>
                        </ol>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Características Principales</h2>
                        <div className="grid sm:grid-cols-2 gap-4 mb-8 not-prose">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">⚡ Rápido y Gratis</h3>
                                <p className="text-sm">Sin esperas, sin registros y 100% gratuito para siempre.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">💎 Alta Calidad</h3>
                                <p className="text-sm">Acceso a miniaturas en resolución 1080p, 720p y 4K si están disponibles.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">🔒 Seguro</h3>
                                <p className="text-sm">No almacenamos ningún dato. Todo el proceso es seguro.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">📱 Multi-dispositivo</h3>
                                <p className="text-sm">Funciona perfecto en móviles, tablets y ordenadores de escritorio.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
                        <div className="space-y-4 not-prose">
                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Es legal descargar miniaturas de YouTube?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    Sí, es legal descargar las miniaturas para uso personal, educativo o como referencia ("Fair Use"). Sin embargo, no debes usar la imagen protegida por derechos de autor de otra persona como si fuera tuya en tus propios videos sin permiso.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Por qué algunos videos no tienen calidad HD?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    La miniatura en alta resolución (MaxRes) solo está disponible si el video original fue subido en alta calidad (720p o superior) y el creador subió una miniatura personalizada de alta calidad. Si no existe, nuestra herramienta te mostrará la siguiente mejor calidad disponible.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Dónde se guardan las imágenes descargadas?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    Las imágenes se guardarán automáticamente en la carpeta de "Descargas" predeterminada de tu dispositivo o navegador.
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
                            Herramientas Relacionadas
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

                        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-sm text-blue-800 font-medium mb-2">💡 ¿Sabías que?</p>
                            <p className="text-xs text-blue-600">
                                Una buena miniatura puede aumentar el CTR de tu video hasta en un 15%. Úsalas como inspiración para crear las tuyas.
                            </p>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
