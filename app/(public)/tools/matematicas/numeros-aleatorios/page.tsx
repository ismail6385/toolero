
import { Metadata } from 'next';
import RandomNumberClient from './RandomNumberClient';

export const metadata: Metadata = {
    title: 'Generador de Números Aleatorios - RNG Online',
    description: 'Genera números aleatorios (Random Number Generator) dentro de un rango específico. Ideal para sorteos, juegos de azar, dados y decisiones al azar.',
    keywords: [
        'generador numeros aleatorios',
        'random number generator',
        'rng online',
        'numero al azar',
        'sorteo numeros',
        'dados virtuales',
        'generar loteria',
        'randomizer',
        'toolero'
    ],
};

export default function RandomNumberPage() {
    return (
        <>
            <RandomNumberClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Números al Azar (RNG)</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Necesitas elegir un ganador para un sorteo, decidir quién empieza en un juego de mesa o generar combinaciones para la lotería?
                        Esta herramienta utiliza algoritmos criptográficos para generar números verdaderamente impredecibles dentro del rango que tú elijas.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Rango Personalizable</h3>
                        <p className="text-gray-600">
                            Define el mínimo y el máximo (ej: del 1 al 10, o del 1000 al 9999).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Sin Repeticiones</h3>
                        <p className="text-gray-600">
                            Opción para generar múltiples números únicos en secuencia (ideal para bingo o lotería).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Imparcial</h3>
                        <p className="text-gray-600">
                            Elimina el sesgo humano. Deja que el azar decida de forma 100% neutral y justa.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos divertidos y prácticos</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Sorteos en Instagram:</strong> Elige un número de comentario ganador.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Juegos de Rol (D&D):</strong> Simula tiradas de dados (d6, d20, d100).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Seguridad:</strong> Genera PINs o códigos de desbloqueo temporales.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
