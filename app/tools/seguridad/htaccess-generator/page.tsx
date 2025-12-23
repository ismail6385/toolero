
import { Metadata } from 'next';
import HtaccessGeneratorClient from './HtaccessGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador .htaccess Online - Configuración Apache',
    description: 'Genera archivos .htaccess personalizados para proteger directorios, redireccionar HTTP a HTTPS, bloquear IPs y configurar caché en servidores Apache.',
    keywords: [
        'generador htaccess',
        'htaccess generator',
        'configuracion apache',
        'redireccion 301',
        'bloquear ips',
        'proteger directorio',
        'forzar https',
        'servidor web',
        'toolero'
    ],
};

export default function HtaccessGeneratorPage() {
    return (
        <>
            <HtaccessGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Archivos .htaccess</h2>
                    <p className="text-gray-600 mb-4">
                        El archivo <code>.htaccess</code> es una herramienta poderosa para configurar servidores web Apache sin necesidad de editar los archivos principales del servidor.
                        Desde redirecciones SEO hasta capas de seguridad extra, nuestra herramienta crea el código perfecto y libre de errores para tu sitio web.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Redirecciones</h3>
                        <p className="text-gray-600">
                            Fuerza el uso de HTTPS (SSL), redirige de www a no-www (o viceversa) y crea reglas SEO friendly.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Seguridad</h3>
                        <p className="text-gray-600">
                            Bloquea IPs maliciosas, evita el listado de directorios y protege carpetas específicas con contraseña.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Rendimiento</h3>
                        <p className="text-gray-600">
                            Activa la compresión Gzip para que tu web cargue más rápido y configura la caché del navegador.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Dónde colocar el archivo?</h2>
                    <p className="text-gray-600 mb-4">
                        Debes subir el archivo generado a la <strong>raíz</strong> de tu sitio web (generalmente la carpeta <code>public_html</code> o <code>www</code>).
                        Asegúrate de que el nombre sea exactamente <code>.htaccess</code> (empezando con un punto).
                    </p>
                </section>
            </article>
        </>
    );
}
