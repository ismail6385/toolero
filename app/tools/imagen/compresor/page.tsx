
import type { Metadata } from 'next';
import ImageCompressorClient from './ImageCompressorClient';

export const metadata: Metadata = {
    title: 'Compresor de Imágenes Gratis - Reducir Peso de Imagen Online',
    description: 'Comprime y reduce el peso de imágenes JPG, PNG sin perder calidad. Optimiza imágenes para web gratis. Compresor online rápido.',
    keywords: [
        'comprimir imagen',
        'compresor de imagenes',
        'reducir peso imagen',
        'optimizar imagenes',
        'comprimir jpg',
        'comprimir png',
        'reducir tamaño imagen',
        'optimizar fotos',
        'compresor imagenes gratis',
        'image compressor',
        'compress image',
        'reducir kb imagen',
        'optimizar imagenes web',
        'toolero'
    ],
};

export default function CompresorImagenPage() {
    return (
        <>
            <ImageCompressorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Compresor de Imágenes Online Inteligente</h2>
                    <p className="text-gray-600 mb-4">
                        Reduce drásticamente el peso de tus archivos de imagen sin sacrificar la calidad visual.
                        Nuestra herramienta de compresión utiliza algoritmos avanzados para eliminar datos innecesarios de tus fotos,
                        haciendo que carguen más rápido en tu web y ocupen menos espacio en tu dispositivo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Compresión Inteligente</h3>
                        <p className="text-gray-600">
                            Equilibrio automático entre calidad y tamaño de archivo para obtener los mejores resultados posibles.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Sin Pérdida Visible</h3>
                        <p className="text-gray-600">
                            La diferencia visual es prácticamente imperceptible para el ojo humano, pero el ahorro en KB es enorme.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Privacidad Total</h3>
                        <p className="text-gray-600">
                            Tus fotos se comprimen directamente en tu navegador. No subimos tus archivos a la nube.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué comprimir imágenes?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Mejorar la velocidad de carga (SEO) de tu sitio web</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Ahorrar espacio de almacenamiento en disco o nube</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Enviar imágenes por correo electrónico más rápido</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Cumplir con requisitos de tamaño en portales de subida</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Cuánto peso puedo reducir?</h3>
                            <p className="text-gray-600">
                                Dependiendo de la imagen original, puedes reducir entre un 40% y un 80% del peso del archivo sin notar degradación visual significativa.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Pierdo calidad al comprimir?</h3>
                            <p className="text-gray-600">
                                Técnicamente hay una pérdida de información (compresión 'lossy'), pero está optimizada para eliminar datos que el ojo humano apenas percibe. El resultado visual es excelente.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Qué formatos puedo comprimir?</h3>
                            <p className="text-gray-600">
                                Soportamos principalmente JPG y PNG, ya que son los formatos donde la compresión es más efectiva para uso web.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
