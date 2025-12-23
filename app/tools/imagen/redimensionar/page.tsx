
import type { Metadata } from 'next';
import ResizeImageClient from './ResizeImageClient';

export const metadata: Metadata = {
    title: 'Redimensionar Imagen Gratis - Cambiar Tamaño de Imagen Online',
    description: 'Redimensiona y cambia el tamaño de imágenes online gratis. Ajusta dimensiones en píxeles o porcentaje. JPG, PNG, WebP. 100% gratuito.',
    keywords: [
        'redimensionar imagen',
        'cambiar tamaño imagen',
        'resize image',
        'ajustar tamaño foto',
        'escalar imagen',
        'redimensionar foto',
        'cambiar dimensiones imagen',
        'reducir tamaño imagen',
        'ampliar imagen',
        'redimensionar imagen online',
        'cambiar tamaño foto online',
        'resize image online',
        'redimensionar gratis',
        'toolero'
    ],
};

export default function RedimensionarImagenPage() {
    return (
        <>
            <ResizeImageClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Redimensionar Imágenes Online Gratis</h2>
                    <p className="text-gray-600 mb-4">
                        Nuestra herramienta de redimensionar imágenes te permite ajustar el tamaño de tus fotos de manera rápida, sencilla y segura.
                        Ya sea que necesites reducir el tamaño para una web o ajustar las dimensiones para redes sociales, Toolero es la solución perfecta.
                        Todo el procesamiento se realiza en tu navegador, garantizando que tus imágenes nunca salgan de tu dispositivo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Rápido y Preciso</h3>
                        <p className="text-gray-600">
                            Ajusta el ancho y alto exacto en píxeles. Algoritmos optimizados para un procesamiento instantáneo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Mantiene la Calidad</h3>
                        <p className="text-gray-600">
                            Utilizamos técnicas de suavizado avanzadas para asegurar que tu imagen se vea nítida después de cambiar el tamaño.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Múltiples Formatos</h3>
                        <p className="text-gray-600">
                            Compatible con los formatos más populares: JPG, PNG y WebP. Descarga en el formato que prefieras.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Casos de Uso Comunes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Optimización para sitios web y blogs</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Ajuste para perfiles de redes sociales</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Preparación de imágenes para email marketing</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Reducción de tamaño para formularios online</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Se pierde calidad al redimensionar?</h3>
                            <p className="text-gray-600">
                                Al reducir una imagen, la calidad se mantiene muy bien. Al ampliarla significativamente, es normal que se produzca cierta pixelación, aunque nuestra herramienta intenta suavizarla lo máximo posible.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Es seguro usar esta herramienta?</h3>
                            <p className="text-gray-600">
                                Sí, 100% seguro. Tus imágenes nunca se suben a ningún servidor. Todo el proceso ocurre localmente en tu navegador.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Tiene algún costo?</h3>
                            <p className="text-gray-600">
                                No, la herramienta es completamente gratuita y no requiere registro.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
