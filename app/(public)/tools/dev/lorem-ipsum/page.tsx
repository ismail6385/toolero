
import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
    title: 'Generador Lorem Ipsum - Texto de Relleno para Diseñadores',
    description: 'Genera texto Lorem Ipsum para maquetas, diseños y prototipos. Texto de relleno estándar (dummy text) en párrafos, palabras o listas.',
    keywords: [
        'lorem ipsum',
        'generador texto relleno',
        'dummy text',
        'texto simulado',
        'lipsum',
        'texto para diseño',
        'latin filler text',
        'placeholder text',
        'toolero'
    ],
};

export default function LoremIpsumPage() {
    return (
        <>
            <LoremIpsumClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Texto Lorem Ipsum</h2>
                    <p className="text-gray-600 mb-4">
                        Herramienta esencial para diseñadores gráficos, desarrolladores web y maquetadores.
                        Genera bloques de texto en "falso latín" que simulan la distribución natural de las letras en un idioma real,
                        permitiendo que el foco se mantenga en el diseño visual y no en el contenido legible.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Estándar de Industria</h3>
                        <p className="text-gray-600">
                            Usado desde el siglo XVI, Lorem Ipsum es el texto de relleno por excelencia en el mundo editorial y digital.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Flexible</h3>
                        <p className="text-gray-600">
                            Genera exactamente la cantidad de texto que necesitas: 5 párrafos, 10 frases o 50 palabras.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Variedad</h3>
                        <p className="text-gray-600">
                            Opciones para generar listas HTML, texto plano o bloques de código para testear tus estilos CSS con contenido real.
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
