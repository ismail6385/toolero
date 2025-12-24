
import { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';
import HelpfulGuides from '@/components/HelpfulGuides';

export const metadata: Metadata = {
    title: 'Unir PDF Gratis Online - Combinar y Juntar Archivos PDF',
    description: 'Une, combina y junta múltiples archivos PDF en uno solo gratis. Herramienta online 100% gratuita, rápida y segura. Sin registro ni límites.',
    keywords: [
        'unir pdf',
        'unir pdf gratis',
        'combinar pdf',
        'combinar pdf gratis',
        'juntar pdf',
        'juntar pdf gratis',
        'unificar pdf',
        'unificar pdf gratis',
        'merge pdf',
        'unir archivos pdf gratis',
        'unir pdf online',
        'unir pdf online gratis',
        'pdf unir',
        'unir dos pdf',
        'unir 2 pdf',
        'unir pdfs',
        'unir pdfs online',
        'juntador de pdf',
        'toolero'
    ],
};

export default function MergePdfPage() {
    return (
        <>
            <MergePdfClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Unir Archivos PDF Online Gratis</h2>
                    <p className="text-gray-600 mb-4">
                        Combina múltiples documentos PDF en un solo archivo de manera rápida y sencilla.
                        Ya sea que necesites juntar informes, facturas o capítulos de un libro electrónico, nuestra herramienta 'Merge PDF' te permite reorganizar y fusionar tus archivos sin instalar software.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Ordena tus PDFs</h3>
                        <p className="text-gray-600">
                            Arrastra y suelta tus archivos para cambiar el orden en que aparecerán en el documento final.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Proceso Seguro</h3>
                        <p className="text-gray-600">
                            Tus documentos se procesan con tecnología moderna que garantiza la privacidad de tus datos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Sin Límites</h3>
                        <p className="text-gray-600">
                            Une tantos archivos como necesites. No hay restricciones en la cantidad de documentos.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo unir PDFs?</h2>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                        <li>Sube tus archivos PDF haciendo clic en el botón de selección o arrastrándolos.</li>
                        <li>Ordena los archivos arrastrándolos a la posición deseada.</li>
                        <li>Haz clic en "Unir PDF" para descargar tu nuevo documento unificado.</li>
                    </ol>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Es gratis unir PDFs?</h3>
                            <p className="text-gray-600">
                                Sí, nuestra herramienta es 100% gratuita y no requiere registro ni tarjeta de crédito.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Puedo unir PDFs de diferentes tamaños?</h3>
                            <p className="text-gray-600">
                                Sí, puedes mezclar documentos con orientación vertical, horizontal y diferentes tamaños de página.
                            </p>
                        </div>
                    </div>
                </section>
            </article>

            {/* Smart Internal Linking: Shows blogs that mention this tool */}
            <HelpfulGuides toolSlug="unir-pdf" />
        </>
    );
}
