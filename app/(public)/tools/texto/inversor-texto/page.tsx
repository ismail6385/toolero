
import { Metadata } from 'next';
import TextReverserClient from './TextReverserClient';

export const metadata: Metadata = {
    title: 'Invertir Texto Online - Voltear Letras y Palabras',
    description: 'Herramienta gratuita para invertir texto, voltear palabras o escribir al revés (efecto espejo). Crea textos divertidos para redes sociales.',
    keywords: [
        'invertir texto',
        'texto al reves',
        'voltear letras',
        'escribir al reves',
        'reverse text',
        'flip text',
        'texto espejo',
        'invertir palabras',
        'upside down text',
        'toolero'
    ],
};

export default function TextReverserPage() {
    return (
        <>
            <TextReverserClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Inversor de Texto Online</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Alguna vez has querido escribir al revés? Con nuestra herramienta puedes invertir el orden de las letras,
                        el orden de las palabras o incluso voltear el texto completamente "patas arriba" (Upside Down).
                        Es genial para crear nombres de usuario únicos, mensajes encriptados simples o posts llamativos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Invertir Todo</h3>
                        <p className="text-gray-600">
                            "Hola Mundo" se convierte en "odnuM aloH". Exactamente como si lo leyeras en un espejo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Invertir Palabras</h3>
                        <p className="text-gray-600">
                            Mantiene las letras en orden pero cambia el orden de las palabras. "Hola Mundo" -> "Mundo Hola".
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Texto Volteado</h3>
                        <p className="text-gray-600">
                            Utiliza caracteres especiales para simular que el texto está boca abajo. "Hola" -> "ɐloH".
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos divertidos</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Crear contraseñas curiosas (aunque recomendamos gestores de contraseñas)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Destacar en los comentarios de YouTube o Instagram</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-teal-500 font-bold">✓</span>
                            <span className="text-gray-600">Jugar a descifrar mensajes con amigos</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
