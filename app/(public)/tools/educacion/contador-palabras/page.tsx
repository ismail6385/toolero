import { Metadata } from 'next';
import WordCountClient from './WordCountClient';

export const metadata: Metadata = {
    title: 'Contador de Palabras y Tiempo de Lectura | Herramienta Edu',
    description: 'Cuenta palabras, caracteres y párrafos. Calcula el tiempo estimado de lectura silenciosa y en voz alta para discursos y presentaciones.',
    keywords: [
        'contador palabras',
        'tiempo de lectura',
        'cuanto tardo en leer',
        'word counter',
        'caracteres sin espacios',
        'calculadora tiempo discurso',
        'herramienta estudiantes'
    ],
};

export default function WordCountPage() {
    return (
        <>
            <WordCountClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calcula la duración de tu presentación</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tienes que presentar un trabajo y tienes un límite de tiempo? Esta herramienta no solo cuenta las palabras, sino que estima con precisión cuánto tardarás en leerlo.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Lectura Silenciosa (250 ppm)</h3>
                        <p className="text-sm text-gray-500">
                            La velocidad promedio de un adulto leyendo para sí mismo. Útil para estimar cuánto tiempo le tomará a un profesor leer tu ensayo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Lectura en Voz Alta (130 ppm)</h3>
                        <p className="text-sm text-gray-500">
                            Velocidad estándar para discursos y presentaciones. Si hablas muy rápido, podrías llegar a 150 ppm, pero 130 es ideal para que la audiencia te entienda.
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
