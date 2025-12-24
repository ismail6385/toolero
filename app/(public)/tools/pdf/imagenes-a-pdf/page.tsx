
import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
    title: 'Convertir Imágenes a PDF Gratis - JPG, PNG a PDF Online',
    description: 'Convierte JPG, PNG y fotos a PDF gratis online. Crea documentos PDF desde imágenes en segundos. 100% privado, sin límites ni registro.',
    keywords: [
        'imagenes a pdf',
        'convertir imagenes a pdf',
        'jpg a pdf',
        'png a pdf',
        'convertir jpg a pdf',
        'convertir png a pdf',
        'fotos a pdf',
        'convertir fotos a pdf',
        'imagen a pdf',
        'convertir imagen a pdf',
        'crear pdf de imagenes',
        'hacer pdf con imagenes',
        'pasar imagenes a pdf',
        'transformar imagenes a pdf',
        'imagenes a pdf gratis',
        'jpg to pdf',
        'png to pdf',
        'image to pdf',
        'convertidor de imagenes a pdf',
        'toolero'
    ],
};

export default function ImageToPdfPage() {
    return (
        <>
            <ImageToPdfClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertir Imágenes (JPG, PNG) a PDF</h2>
                    <p className="text-gray-600 mb-4">
                        Crea un documento PDF profesional a partir de tus fotos o imágenes escaneadas.
                        Nuestra herramienta soporta los formatos de imagen más populares (JPG, PNG, GIF, BMP) y los combina en un único archivo PDF listo para compartir.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Fácil Conversión</h3>
                        <p className="text-gray-600">
                            Simplemente selecciona tus fotos, ordénalas si es necesario y pulsa el botón para convertir.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Ajuste Automático</h3>
                        <p className="text-gray-600">
                            Las imágenes se ajustan automáticamente al tamaño de la página del PDF (A4 generalmente) para una impresión perfecta.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Múltiples Formatos</h3>
                        <p className="text-gray-600">
                            No importa si mezclas JPG con PNG. La herramienta maneja diferentes formatos en el mismo documento.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos frecuentes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Crear un portafolio fotográfico en PDF</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Digitalizar documentos escaneados como imágenes</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Convertir capturas de pantalla en un manual o guía</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacidad</h2>
                    <p className="text-gray-600">
                        Tus fotos son personales. El proceso de conversión se realiza localmente en tu navegador cuando es posible, garantizando la máxima privacidad.
                    </p>
                </section>
            </article>
        </>
    );
}
