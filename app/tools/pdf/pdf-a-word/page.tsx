
import { Metadata } from 'next';
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = {
    title: 'Convertir PDF a Word Gratis - Conversor PDF a DOC Online | Toolero',
    description: 'Convierte tus archivos PDF a Word (DOC) editable gratis online. Herramienta 100% gratuita, rápida y segura. Extrae texto y mantén el formato sin registro.',
    keywords: [
        'pdf a word',
        'convertir pdf a word',
        'pdf a word gratis',
        'convertir pdf a word gratis',
        'pdf a doc',
        'convertidor pdf a word',
        'pdf to word',
        'pdf a word editable',
        'pasar pdf a word',
        'transformar pdf a word',
        'cambiar pdf a word',
        'toolero'
    ],
};

export default function PdfToWordPage() {
    return (
        <>
            <PdfToWordClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertir PDF a Word Editable Online</h2>
                    <p className="text-gray-600 mb-4">
                        Transforma tus documentos PDF estáticos en archivos de Microsoft Word (.docx) totalmente editables.
                        Nuestra tecnología avanzada intenta preservar el diseño, las fuentes y el formato original para que puedas hacer cambios fácilmente.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Edición Fácil</h3>
                        <p className="text-gray-600">
                            Olvídate de reescribir todo el documento. Convierte y edita el texto directamente en Word.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Alta Precisión</h3>
                        <p className="text-gray-600">
                            Detecta párrafos, tablas y listas para mantener la estructura del documento lo mejor posible.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">100% Gratis</h3>
                        <p className="text-gray-600">
                            Sin costes ocultos, sin marcas de agua y sin necesidad de dejar tu email.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cuándo convertir PDF a Word?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Cuando necesitas corregir errores en un documento finalizado</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Para reutilizar contenido de informes antiguos</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Si necesitas actualizar un CV o carta de presentación guardada en PDF</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Nota Importante</h2>
                    <p className="text-gray-600">
                        La conversión funciona mejor con PDFs creados digitalmente. Si tu PDF es un documento escaneado (una imagen), la conversión podría no reconocer el texto a menos que se use OCR (Reconocimiento Óptico de Caracteres).
                    </p>
                </section>
            </article>
        </>
    );
}
