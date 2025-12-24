import { Metadata } from 'next';
import CitationGeneratorClient from './CitationGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Citas APA, MLA, Chicago | Bibliografía Online',
    description: 'Genera citas bibliográficas automáticamente para tus trabajos académicos. Compatible con formatos APA 7, MLA 9 y Chicago. Cita libros y páginas web fácilmente.',
    keywords: [
        'generador citas apa',
        'citar pagina web apa',
        'bibliografia automatica',
        'citation machine español',
        'referencias apa generador',
        'formato mla',
        'normas apa 7 edicion'
    ],
};

export default function CitationGeneratorPage() {
    return (
        <>
            <CitationGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Evita el plagio, cita correctamente</h2>
                    <p className="text-gray-600 mb-4">
                        Incluir las fuentes de información es obligatorio en cualquier trabajo académico serio.
                        Nuestra herramienta formatea automáticamente los datos de tus libros y webs consultadas siguiendo las normas de estilo más utilizadas.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Diferencias entre formatos</h3>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div>
                            <strong className="text-cyan-700 block text-base">APA (American Psychological Association)</strong>
                            Es el estándar en ciencias sociales, educación y psicología. Pone énfasis en el año de publicación (Autor, Año).
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                            <strong className="text-cyan-700 block text-base">MLA (Modern Language Association)</strong>
                            Muy usado en humanidades, literatura y arte. Pone énfasis en el autor y la página, dejando la fecha al final o menos prominente.
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                            <strong className="text-cyan-700 block text-base">Chicago</strong>
                            Común en historia y algunos negocios. Permite usar notas al pie (no soportadas aquí) o el sistema Autor-Fecha similar a APA.
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
