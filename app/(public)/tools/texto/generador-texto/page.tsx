
import { Metadata } from 'next';
import TextGeneratorClient from './TextGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador Lorem Ipsum Gratis - Texto de Relleno Online',
    description: 'Genera texto Lorem Ipsum para diseño y maquetación. Generador de texto de relleno gratis. Párrafos, palabras o caracteres.',
    keywords: [
        'generador lorem ipsum',
        'lorem ipsum',
        'texto de relleno',
        'placeholder text',
        'lorem ipsum generator',
        'generar lorem ipsum',
        'texto dummy',
        'lorem ipsum español',
        'generador texto relleno',
        'lorem ipsum gratis',
        'dummy text',
        'toolero'
    ],
};

export default function TextGeneratorPage() {
    return (
        <>
            <TextGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Texto Lorem Ipsum</h2>
                    <p className="text-gray-600 mb-4">
                        Lorem Ipsum es el texto de relleno estándar utilizado en las industrias de imprenta y diseño gráfico.
                        Nuestra herramienta te permite generar rápidamente párrafos, frases o palabras para maquetar tus diseños
                        sin distraerse con el contenido legible. Ideal para diseñadores web, maquetadores y desarrolladores.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Totalmente Personalizable</h3>
                        <p className="text-gray-600">
                            Elige exactamente cuántos párrafos, oraciones o palabras necesitas. Empieza con "Lorem ipsum" o genera texto aleatorio.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Múltiples Formatos</h3>
                        <p className="text-gray-600">
                            Copia como texto plano o incluso como HTML con etiquetas `p` incluidas para ahorrar tiempo en tu código.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">100% Gratis</h3>
                        <p className="text-gray-600">
                            Genera todo el texto que necesites sin límites ni registros.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Por qué usamos Lorem Ipsum?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Enfoque en el diseño:</strong> Al ser texto ininteligible, el espectador se centra en la distribución visual.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Distribución natural:</strong> Tiene una distribución de letras más o menos normal, a diferencia de repetir "Texto aquí".</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Estándar de la industria:</strong> Es reconocido universalmente como placeholder temporal.</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Qué significa Lorem Ipsum?</h3>
                            <p className="text-gray-600">
                                Es un texto derivado de una obra de Cicerón del año 45 a.C., aunque las palabras han sido alteradas, añadidas y eliminadas para hacerlo un latín sin sentido.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Puedo usarlo en proyectos comerciales?</h3>
                            <p className="text-gray-600">
                                Sí, es texto de dominio público libre de derechos. Puedes usarlo en cualquier lugar.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
