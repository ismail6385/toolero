
import { Metadata } from 'next';
import MemeGeneratorClient from './MemeGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Memes Gratis - Crear Memes Online Fácil',
    description: 'Crea memes divertidos gratis con nuestro generador online. Añade texto a imágenes, personaliza y descarga. Meme generator gratuito.',
    keywords: [
        'generador de memes',
        'crear memes',
        'hacer memes',
        'meme generator',
        'memes gratis',
        'crear memes online',
        'generador memes gratis',
        'hacer memes online',
        'meme maker',
        'crear meme con foto',
        'generador de memes español',
        'toolero'
    ],
};

export default function MemeGeneratorPage() {
    return (
        <>
            <MemeGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Memes Online Gratis</h2>
                    <p className="text-gray-600 mb-4">
                        ¡Da rienda suelta a tu creatividad y sentido del humor! Con nuestro generador de memes, puedes crear imágenes virales en cuestión de segundos.
                        Sube tus propias fotos o utiliza plantillas populares, añade texto personalizado y comparte tus creaciones con el mundo.
                        Es la herramienta definitiva para crear contenido divertido y compartible.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Fácil de Usar</h3>
                        <p className="text-gray-600">
                            Interfaz intuitiva de arrastrar y soltar. Añade texto arriba y abajo con un par de clics.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Personalizable</h3>
                        <p className="text-gray-600">
                            Ajusta el tamaño del texto, colores y posición para que tu meme quede perfecto.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Descarga Gratis</h3>
                        <p className="text-gray-600">
                            Guarda tus memes en alta calidad sin marcas de agua intrusivas y compártelos donde quieras.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Para qué crear memes?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Viralizar contenido en redes sociales (Twitter, Instagram, Facebook)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Marketing de contenidos y engagement con la audiencia</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Comunicación interna divertida en empresas (Slack, Teams)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Simplemente para hacer reír a tus amigos y familiares</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Es gratis el generador?</h3>
                            <p className="text-gray-600">
                                Sí, completamente gratis. Puedes crear tantos memes como quieras.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Puedo usar mis propias fotos?</h3>
                            <p className="text-gray-600">
                                ¡Por supuesto! Puedes subir cualquier imagen desde tu dispositivo para convertirla en un meme.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Cómo descargo mi meme?</h3>
                            <p className="text-gray-600">
                                Una vez que estés satisfecho con tu creación, simplemente haz clic en el botón de "Descargar Meme" y se guardará en tu dispositivo.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
