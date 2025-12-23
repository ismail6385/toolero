
import { Metadata } from 'next';
import Base64Client from './Base64Client';

export const metadata: Metadata = {
    title: 'Codificador Base64 - Codificar y Decodificar Online',
    description: 'Herramienta gratuita para codificar texto a Base64 y decodificar Base64 a texto plano. Conversor online rápido y seguro para desarrolladores.',
    keywords: [
        'codificar base64',
        'decodificar base64',
        'base64 encode',
        'base64 decode',
        'texto a base64',
        'convertir a base64',
        'base64 string',
        'utf8 base64',
        'toolero'
    ],
};

export default function Base64Page() {
    return (
        <>
            <Base64Client />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Codificador y Decodificador Base64</h2>
                    <p className="text-gray-600 mb-4">
                        Base64 es uno de los métodos más utilizados para transmitir datos binarios a través de redes que solo soportan texto.
                        Nuestra herramienta te permite convertir fácilmente texto normal a su representación en Base64 (Encode) y viceversa (Decode).
                        Es indispensable para desarrolladores web, programación y transmisión de datos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Bidireccional</h3>
                        <p className="text-gray-600">
                            Cambia entre modo Codificar y Decodificar con un solo clic. Resultados instantáneos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Soporte UTF-8</h3>
                        <p className="text-gray-600">
                            Maneja correctamente caracteres especiales, acentos y emojis sin romper la codificación.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Seguro</h3>
                        <p className="text-gray-600">
                            Tus datos sensibles nunca salen de tu navegador. Todo se procesa localmente con JavaScript.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué es Base64?</h2>
                    <p className="text-gray-600 mb-4">
                        Base64 es un sistema de numeración posicional que usa 64 caracteres imprimibles (A-Z, a-z, 0-9, +, /) para representar datos binarios.
                    </p>
                    <h3 className="font-bold text-gray-800 mt-4 mb-2">Usos comunes:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Incrustar imágenes pequeñas directamente en HTML o CSS (Data URLs).</li>
                        <li>Codificar credenciales básicas para autenticación HTTP.</li>
                        <li>Enviar datos binarios a través de JSON o XML (APIs).</li>
                        <li>Ofuscar información simple (nota: no es encriptación segura).</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
