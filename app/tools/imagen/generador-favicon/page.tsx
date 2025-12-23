import { Metadata } from 'next';
import FaviconGeneratorClient from './FaviconGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Favicon Gratis - Crear Favicon Online',
    description: 'Crea favicons para tu sitio web gratis. Genera .ico desde imágenes JPG, PNG. Favicon generator online rápido y fácil.',
    keywords: [
        'generador favicon',
        'crear favicon',
        'favicon generator',
        'hacer favicon',
        'favicon gratis',
        'crear favicon online',
        'generador favicon gratis',
        'favicon maker',
        'convertir a favicon',
        'favicon ico',
        'crear icono web',
        'toolero'
    ],
};

export default function FaviconGeneratorPage() {
    return (
        <>
            <FaviconGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Favicon (Iconos Web) Online</h2>
                    <p className="text-gray-600 mb-4">
                        El favicon es ese pequeño icono que aparece en la pestaña del navegador junto al título de tu página.
                        Es esencial para la identidad de marca y la profesionalidad de tu sitio.
                        Con nuestra herramienta, puedes convertir cualquier imagen (Logo, foto, dibujo) en un archivo `.ico` compatible con todos los navegadores.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Formato Estándar .ico</h3>
                        <p className="text-gray-600">
                            Generamos archivos .ico reales que contienen múltiples tamaños para asegurar la mejor visualización en cualquier dispositivo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Múltiples Tamaños</h3>
                        <p className="text-gray-600">
                            Incluimos automáticamente las medidas estándar: 16x16, 32x32 y 48x48 píxeles.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">100% Gratuito</h3>
                        <p className="text-gray-600">
                            Crea todos los favicons que necesites para tus proyectos personales o comerciales sin coste alguno.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Dónde usar un favicon?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">En la pestaña del navegador de tu sitio web</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">En los marcadores o favoritos de los usuarios</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">En los accesos directos de escritorio y móviles</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Para reforzar el branding de tu marca online</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Qué es un archivo .ico?</h3>
                            <p className="text-gray-600">
                                Es un formato de imagen especial para iconos en Windows y la Web. Un solo archivo .ico puede contener varias imágenes de diferentes tamaños, permitiendo que el navegador elija la más adecuada.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Qué tamaño debe tener la imagen original?</h3>
                            <p className="text-gray-600">
                                Recomendamos usar una imagen cuadrada de al menos 256x256 píxeles para obtener la mejor calidad al reducirla.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Cómo instalo el favicon en mi web?</h3>
                            <p className="text-gray-600">
                                Sube el archivo favicon.ico a la raíz de tu sitio y añade la etiqueta &lt;link rel="icon" href="/favicon.ico" /&gt; en la sección &lt;head&gt; de tu HTML.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
