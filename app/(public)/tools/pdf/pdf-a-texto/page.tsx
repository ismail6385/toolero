
import { Metadata } from 'next';
import PdfToTextClient from './PdfToTextClient';

export const metadata: Metadata = {
    title: 'Convertir PDF a Texto Gratis - Extraer Texto de PDF Online | Toolero',
    description: 'Extrae texto de archivos PDF gratis online. Convierte PDF a archivo de texto plano (.txt). Copia y pega el contenido de cualquier PDF fácilmente.',
    keywords: [
        'pdf a texto',
        'convertir pdf a texto',
        'extraer texto pdf',
        'pdf a txt',
        'pdf to text',
        'copiar texto pdf',
        'convertidor pdf a txt',
        'sacar texto de pdf',
        'leer texto pdf',
        'toolero'
    ],
};

export default function PdfToTextPage() {
    return (
        <>
            <PdfToTextClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Extraer Texto Plano de PDF</h2>
                    <p className="text-gray-600 mb-4">
                        A veces solo necesitas el contenido, no el diseño. Nuestra herramienta extrae todo el texto legible de tu archivo PDF y te lo entrega en un formato limpio (.txt) o listo para copiar al portapapeles.
                        Ideal para analizar datos, alimentar bases de datos o simplemente leer sin distracciones.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Solo Texto</h3>
                        <p className="text-gray-600">
                            Elimina imágenes, gráficos y formato complejo. Obtén la información pura y dura.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Copia Rápida</h3>
                        <p className="text-gray-600">
                            Previsualiza el texto extraído y cópialo con un solo clic para usarlo donde quieras.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Ligero</h3>
                        <p className="text-gray-600">
                            El archivo de texto resultante ocupará una fracción mínima del espacio del PDF original.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Aplicaciones prácticas</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Procesamiento de datos y minería de texto</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Lectura accesible para lectores de pantalla</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Recuperar contenido de archivos corruptos donde falla el diseño pero el texto persiste</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
