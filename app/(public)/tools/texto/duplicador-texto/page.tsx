
import { Metadata } from 'next';
import TextRepeaterClient from './TextRepeaterClient';

export const metadata: Metadata = {
    title: 'Duplicador de Texto - Repetir Texto Online Gratis',
    description: 'Repite texto tantas veces como quieras de forma instantánea. Herramienta para duplicar frases, palabras o emojis para WhatsApp, Instagram y más.',
    keywords: [
        'duplicador de texto',
        'repetir texto',
        'text repeater',
        'multiplicar texto',
        'repetidor de palabras',
        'duplicar mensajes',
        'spam de texto',
        'generador de repeticiones',
        'toolero'
    ],
};

export default function TextRepeaterPage() {
    return (
        <>
            <TextRepeaterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Repetidor de Texto Online</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Necesitas escribir la misma frase 100 veces? ¿O quizás 1000? Con nuestra herramienta de duplicar texto puedes multiplicar cualquier palabra, frase o emoji al instante.
                        Es perfecto para enviar mensajes divertidos a amigos, crear patrones de texto o realizar pruebas de estrés en formularios.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Repeticiones Ilimitadas</h3>
                        <p className="text-gray-600">
                            Establece el número exacto de veces que quieres que se repita tu texto. Desde 1 hasta 10,000 o más.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Separadores Personalizados</h3>
                        <p className="text-gray-600">
                            Elige si quieres separar el texto con espacios, saltos de línea (enter), comas o cualquier otro carácter.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Compatible con Redes Sociales</h3>
                        <p className="text-gray-600">
                            Copia y pega directamente en WhatsApp, Instagram, Telegram o Discord.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ideas para usar el repetidor</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Enviar un "Te quiero" infinito a tu pareja</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Crear bordes o separadores largos para biografías</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Bombardear (con cariño) el chat de grupo con emojis</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Generar texto de relleno para pruebas de software</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Puedo repetir emojis?</h3>
                            <p className="text-gray-600">
                                ¡Sí! Funciona perfectamente con emojis y caracteres especiales.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Se bloqueará mi navegador si repito mucho?</h3>
                            <p className="text-gray-600">
                                Si intentas generar millones de repeticiones de un texto largo, tu navegador podría ralentizarse momentáneamente. Recomendamos cantidades razonables (ej. hasta 10,000 repeticiones) para asegurar un rendimiento fluido.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
