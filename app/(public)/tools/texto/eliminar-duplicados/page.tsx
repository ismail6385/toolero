import type { Metadata } from 'next';
import Link from 'next/link';
import RemoveDuplicatesClient from './RemoveDuplicatesClient';

export const metadata: Metadata = {
    title: 'Eliminar Líneas Duplicadas - Limpiar Listas Online Gratis',
    description: 'Herramienta gratuita para eliminar líneas repetidas de una lista de texto. Ordena alfabéticamente, limpia espacios y remueve duplicados al instante. Ideal para SEO, programadores y bases de datos.',
    keywords: [
        'eliminar duplicados texto',
        'remove duplicate lines',
        'limpiar lista online',
        'quitar repetidos',
        'ordenar lista alfabeticamente',
        'filtro de texto',
        'toolero'
    ],
};

const relatedTools = [
    { name: 'Contador de Palabras', url: '/tools/texto/contador-palabras', icon: '📝' },
    { name: 'Conversor Mayúsculas', url: '/tools/texto/conversor-mayusculas', icon: '🔠' },
    { name: 'Formateador JSON', url: '/tools/dev/json-formatter', icon: '💻' },
    { name: 'Extractor de Emails', url: '/tools/texto/extractor-emails', icon: '📧' },
];

export default function RemoveDuplicatesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <RemoveDuplicatesClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo eliminar líneas duplicadas de una lista?</h2>
                        <p>
                            Esta herramienta te permite limpiar listas de datos desordenadas en cuestión de segundos. Es perfecta para procesar correos electrónicos,
                            listas de inventario, palabras clave SEO o cualquier otro tipo de texto que contenga elementos repetidos.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Características de la herramienta</h3>
                        <ul className="grid sm:grid-cols-2 gap-4 list-none pl-0 not-prose">
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="text-green-500 font-bold">✓</span>
                                <span><strong>Rapidez extrema:</strong> Procesa miles de líneas instantáneamente en tu navegador.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="text-green-500 font-bold">✓</span>
                                <span><strong>Privacidad total:</strong> Tus datos nunca se envían a ningún servidor.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="text-green-500 font-bold">✓</span>
                                <span><strong>Opciones flexibles:</strong> Ignora mayúsculas/minúsculas o espacios en blanco según necesites.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                                <span className="text-green-500 font-bold">✓</span>
                                <span><strong>Ordenamiento:</strong> Organiza tu lista final de A a Z o Z a A automáticamente.</span>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Preguntas Frecuentes</h2>
                        <div className="space-y-4 not-prose">
                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Cuántas líneas puedo procesar?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    No hay un límite estricto, pero la herramienta funciona fluidamente con listas de hasta 50,000 o 100,000 líneas. Todo depende de la memoria de tu dispositivo.
                                </div>
                            </details>

                            <details className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 font-medium text-gray-800 hover:bg-gray-100 transition-colors">
                                    ¿Distingue entre mayúsculas y minúsculas?
                                    <span className="transform group-open:rotate-180 transition-transform text-gray-400">▼</span>
                                </summary>
                                <div className="p-4 text-gray-600 border-t border-gray-100 bg-white">
                                    Por defecto sí, pero puedes activar la opción "Ignorar Mayúsculas" para que, por ejemplo, "Hola" y "hola" se consideren el mismo elemento y se elimine uno de ellos.
                                </div>
                            </details>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            Herramientas de Texto
                        </h3>
                        <div className="space-y-3">
                            {relatedTools.map((tool) => (
                                <Link
                                    key={tool.name}
                                    href={tool.url}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                                >
                                    <div className="text-xl bg-blue-50 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                                        {tool.name}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <p className="text-sm text-orange-800 font-medium mb-1">🔥 Tip Pro</p>
                            <p className="text-xs text-orange-700">
                                Usa esta herramienta antes de enviar campañas de email marketing para evitar enviar correos repetidos y cuidar tu reputación.
                            </p>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
