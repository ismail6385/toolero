
import { Metadata } from 'next';
import EmailExtractorClient from './EmailExtractorClient';

export const metadata: Metadata = {
    title: 'Extractor de Emails Online - Sacar Correos de Texto Gratis',
    description: 'Herramienta gratuita para extraer direcciones de correo electrónico de cualquier texto. Copia un texto largo y obtén una lista limpia de emails.',
    keywords: [
        'extraer emails',
        'extractor de correos',
        'sacar emails de texto',
        'email extractor',
        'limpiar lista correos',
        'filtrar emails',
        'buscar correos en texto',
        'email scraper online',
        'toolero'
    ],
};

export default function EmailExtractorPage() {
    return (
        <>
            <EmailExtractorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Extractor de Correos Electrónicos</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tienes un documento desordenado con un montón de direcciones de correo mezcladas con texto?
                        Nuestro extractor de emails analiza todo el contenido y te devuelve una lista limpia y ordenada de todos los correos electrónicos encontrados.
                        Es una herramienta esencial para tareas de marketing, administración y limpieza de bases de datos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Extracción Inteligente</h3>
                        <p className="text-gray-600">
                            Detecta patrones de correo electrónico válidos (nombre@dominio.com) ignorando el resto del texto basura.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Limpieza Automática</h3>
                        <p className="text-gray-600">
                            Opción para eliminar correos duplicados automáticamente, entregándote una lista única preparada para usar.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Opciones de Formato</h3>
                        <p className="text-gray-600">
                            Obtén los resultados separados por comas, saltos de línea o puntos y coma, según lo que necesites.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Casos de uso</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Extraer participantes de una cadena de correos o comentarios</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Recuperar contactos de archivos de log o bases de datos dañadas</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Preparar listas para campañas de Email Marketing</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacidad y Seguridad</h2>
                    <p className="text-gray-600">
                        Tus datos son importantes. El procesamiento se realiza 100% en tu navegador (Client-side).
                        <strong>Ningún correo electrónico de los que proceses se envía a nuestros servidores.</strong>
                        Puedes usar la herramienta con total confidencialidad.
                    </p>
                </section>
            </article>
        </>
    );
}
