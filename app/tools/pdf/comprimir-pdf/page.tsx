
import { Metadata } from 'next';
import CompressPdfClient from './CompressPdfClient';

export const metadata: Metadata = {
    title: 'Comprimir PDF Gratis Online - Reducir Tamaño PDF | Toolero',
    description: 'Comprime y reduce el tamaño de archivos PDF gratis manteniendo la calidad. Herramienta online 100% gratuita, rápida y segura. Sin registro, sin límites y totalmente privado.',
    keywords: [
        'comprimir pdf',
        'comprimir pdf gratis',
        'reducir pdf',
        'reducir pdf gratis',
        'reducir tamaño pdf',
        'reducir tamaño pdf gratis',
        'comprimir pdf online',
        'comprimir pdf online gratis',
        'reducir peso pdf',
        'reducir peso pdf gratis',
        'optimizar pdf',
        'optimizar pdf gratis',
        'comprimir archivo pdf',
        'pdf compresor',
        'compresor pdf online',
        'reducir mb pdf',
        'comprimir pdf sin perder calidad',
        'toolero'
    ],
};

export default function CompressPdfPage() {
    return (
        <>
            <CompressPdfClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Comprimir PDF Online Sin Perder Calidad</h2>
                    <p className="text-gray-600 mb-4">
                        Reduce drásticamente el peso de tus archivos PDF para enviarlos por correo electrónico o subirlos a la web más rápido.
                        Nuestro compresor inteligente optimiza imágenes y recursos internos del documento para lograr el menor tamaño posible con la mejor calidad visual.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Compresión Inteligente</h3>
                        <p className="text-gray-600">
                            Equilibrio perfecto entre calidad y reducción de tamaño. Tus textos se verán nítidos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Ahorra Espacio</h3>
                        <p className="text-gray-600">
                            Libera espacio en tu disco duro o nube comprimiendo tus documentos escaneados pesados.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Compatible</h3>
                        <p className="text-gray-600">
                            El PDF resultante es totalmente estándar y compatible con cualquier lector de PDF en todos los dispositivos.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué comprimir PDFs?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Enviar como adjunto en correos con límite de tamaño (ej. Gmail 25MB)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Carga más rápida al publicar en sitios web</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Cumplir requisitos de subida en portales gubernamentales o educativos</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Cuánto se reducirá mi archivo?</h3>
                            <p className="text-gray-600">
                                Depende del contenido. Los PDFs con muchas imágenes de alta resolución pueden reducirse hasta un 80-90%. Los archivos que son solo texto tienen menos margen de mejora.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Es seguro?</h3>
                            <p className="text-gray-600">
                                Sí, tus archivos se procesan de forma segura y privada. No almacenamos tus documentos.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
