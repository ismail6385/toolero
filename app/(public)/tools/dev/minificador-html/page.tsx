
import { Metadata } from 'next';
import HtmlMinifierClient from './HtmlMinifierClient';

export const metadata: Metadata = {
    title: 'Minificador HTML Online Gratis - Comprimir Código Web',
    description: 'Reduce el tamaño de tus archivos HTML eliminando espacios, comentarios y saltos de línea innecesarios. Optimiza el rendimiento de tu sitio web.',
    keywords: [
        'minificador html',
        'html minifier',
        'comprimir html',
        'optimizar html',
        'reducir html',
        'minify html code',
        'web performance tool',
        'limpiar codigo html',
        'toolero'
    ],
};

export default function HtmlMinifierPage() {
    return (
        <>
            <HtmlMinifierClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Minificar HTML Online</h2>
                    <p className="text-gray-600 mb-4">
                        Optimiza tu código HTML para producción. Esta herramienta elimina espacios en blanco redundantes, saltos de línea y comentarios,
                        produciendo una versión compacta de tu página web que se transmite más rápido a través de la red.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Mejora el SEO</h3>
                        <p className="text-gray-600">
                            Google premia a los sitios rápidos. Minificar tu HTML es una de las optimizaciones básicas de rendimiento web (WPO).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Ahorro de Ancho de Banda</h3>
                        <p className="text-gray-600">
                            Reduce el consumo de datos tanto para tu servidor como para los usuarios móviles con planes de datos limitados.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Copia Fácil</h3>
                        <p className="text-gray-600">
                            Obtén el código minificado al instante para pegarlo en tu CMS o archivo de despliegue.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recomendaciones</h2>
                    <p className="text-gray-600 mb-4">
                        Recomendamos mantener siempre una versión "legible" (código fuente original) para desarrollo y usar la versión minificada solo para el entorno de producción (lo que ven los usuarios).
                        Herramientas modernas como esta te permiten hacer esa conversión rápidamente si no usas un sistema de build automático.
                    </p>
                </section>
            </article>
        </>
    );
}
