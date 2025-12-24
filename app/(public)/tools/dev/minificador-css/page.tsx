
import { Metadata } from 'next';
import CssMinifierClient from './CssMinifierClient';

export const metadata: Metadata = {
    title: 'Minificador CSS Online Gratis - Comprimir Hojas de Estilo',
    description: 'Comprime tu código CSS eliminando espacios innecesarios, comentarios y saltos de línea para optimizar la velocidad de carga de tu web.',
    keywords: [
        'minificador css',
        'css minifier',
        'comprimir css',
        'optimizar css',
        'reducir css',
        'minify css online',
        'optimizador web',
        'compress stylesheet',
        'toolero'
    ],
};

export default function CssMinifierPage() {
    return (
        <>
            <CssMinifierClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Minificar y Comprimir CSS Online</h2>
                    <p className="text-gray-600 mb-4">
                        La velocidad de carga es un factor clave para el SEO y la experiencia de usuario.
                        Nuestro minificador de CSS reduce el tamaño de tus hojas de estilo eliminando caracteres innecesarios como espacios en blanco, nuevas líneas y comentarios, sin cambiar la funcionalidad de tu diseño.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Reducción Significativa</h3>
                        <p className="text-gray-600">
                            Puede reducir el tamaño de tus archivos CSS entre un 20% y un 50% dependiendo de tu estilo de codificación.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Carga Más Rápida</h3>
                        <p className="text-gray-600">
                            Archivos más pequeños significan descargas más rápidas y una renderización de página más ágil.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Seguro</h3>
                        <p className="text-gray-600">
                            El proceso de minificación respeta tu sintaxis CSS válida para asegurar que no se "rompa" tu diseño.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué hace la minificación?</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Elimina todos los comentarios del código.</li>
                        <li>Quita espacios en blanco y saltos de línea extra.</li>
                        <li>Elimina el último punto y coma de un bloque de reglas (opcional pero seguro).</li>
                        <li>Compacta reglas de color (ej. `#ffffff` a `#fff`) y valores cero (ej. `0px` a `0`).</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
