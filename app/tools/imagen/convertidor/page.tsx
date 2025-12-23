
import type { Metadata } from 'next';
import ImageConverterClient from './ImageConverterClient';

export const metadata: Metadata = {
    title: 'Convertidor de Imágenes Gratis - JPG a PNG, PNG a JPG Online',
    description: 'Convierte imágenes entre JPG, PNG, WebP gratis. Convertidor de formatos rápido y fácil. Sin pérdida de calidad. 100% gratuito.',
    keywords: [
        'convertir imagen',
        'convertidor de imagenes',
        'jpg a png',
        'png a jpg',
        'convertir jpg a png',
        'convertir png a jpg',
        'cambiar formato imagen',
        'convertir formato foto',
        'image converter',
        'convertir webp',
        'jpg to png',
        'png to jpg',
        'convertidor imagenes gratis',
        'toolero'
    ],
};

export default function ConvertidorImagenPage() {
    return (
        <>
            <ImageConverterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertidor de Formatos de Imagen Online</h2>
                    <p className="text-gray-600 mb-4">
                        Nuestra herramienta de conversión de imágenes te permite cambiar el formato de tus archivos visuales en segundos.
                        Transforma JPG a PNG para obtener transparencias, o PNG a JPG para reducir el tamaño, e incluso a WebP para la web moderna.
                        Todo el proceso se realiza localmente en tu navegador.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Conversión Rápida</h3>
                        <p className="text-gray-600">
                            Cambia de formato instantáneamente sin esperas de carga o descarga del servidor.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Sin Pérdida de Calidad</h3>
                        <p className="text-gray-600">
                            Algoritmos de conversión que mantienen la fidelidad visual de tus imágenes originales.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Múltiples Formatos</h3>
                        <p className="text-gray-600">
                            Soporte completo para los formatos más utilizados en la web: JPG, PNG y WebP.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Para qué sirve este convertidor?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">Optimización de imágenes para sitios web (WebP)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">Asegurar compatibilidad en diferentes dispositivos</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">Conversión de capturas de pantalla a formatos editables</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">Preparación de archivos para impresión o diseño</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Qué formatos soporta?</h3>
                            <p className="text-gray-600">
                                Actualmente soportamos conversiones de ida y vuelta entre JPG (JPEG), PNG y WebP.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Se pierde calidad al convertir?</h3>
                            <p className="text-gray-600">
                                En general no. Sin embargo, convertir de un formato sin pérdida (como PNG) a uno con compresión (como JPG) puede implicar una mínima diferencia, usualmente imperceptible.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Es gratis usar este convertidor?</h3>
                            <p className="text-gray-600">
                                Sí, es totalmente gratuito y puedes usarlo tantas veces como necesites sin límites.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
