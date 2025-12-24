
import { Metadata } from 'next';
import UrlExtractorClient from './ExtractorUrlsClient';

export const metadata: Metadata = {
    title: 'Extractor de URLs - Sacar Enlaces de Texto Online',
    description: 'Extrae todas las URLs y enlaces de un texto o código HTML. Herramienta gratuita para obtener una lista de links limpia.',
    keywords: [
        'extraer urls',
        'extractor de enlaces',
        'sacar links',
        'url extractor',
        'html link extractor',
        'buscar urls',
        'extraer hypervínculos',
        'link grabber',
        'toolero'
    ],
};

export default function UrlExtractorPage() {
    return (
        <>
            <UrlExtractorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Extractor de URLs y Enlaces</h2>
                    <p className="text-gray-600 mb-4">
                        Analiza cualquier bloque de texto o código fuente HTML para encontrar y extraer todas las direcciones web (URLs) que contiene.
                        Esta herramienta es perfecta para desarrolladores, analistas SEO y cualquiera que necesite recopilar enlaces de un documento grande.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Detecta HTTP y HTTPS</h3>
                        <p className="text-gray-600">
                            Reconoce automáticamente enlaces que comienzan con http://, https:// y www.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Limpia Resultados</h3>
                        <p className="text-gray-600">
                            Elimina duplicados y ordena la lista alfabéticamente para facilitar su gestión.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Versatilidad</h3>
                        <p className="text-gray-600">
                            Funciona igual de bien pegando un artículo de blog que pegando el código fuente crudo de una página web.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Para qué sirve?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600">Auditoría SEO: Extraer todos los enlaces salientes de una página</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600">Recopilación de recursos bibliográficos web</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600">Análisis de seguridad para revisar dominios enlazados</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Seguridad</h2>
                    <p className="text-gray-600">
                        El análisis se realiza localmente en tu navegador. Tus textos y los enlaces extraídos no se guardan ni se envían a ningún servidor externo.
                    </p>
                </section>
            </article>
        </>
    );
}
