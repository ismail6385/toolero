
import { Metadata } from 'next';
import RgbToHexClient from './RgbToHexClient';

export const metadata: Metadata = {
    title: 'Convertidor RGB a HEX - Transformar Colores Online',
    description: 'Convierte valores RGB (Rojo, Verde, Azul) a código Hexadecimal (#). Herramienta rápida para obtener el código de color para web.',
    keywords: [
        'rgb a hex',
        'convertir rgb hexadecimal',
        'color converter',
        'transformar color',
        'codigo colores html',
        'red green blue',
        'toolero'
    ],
};

export default function RgbToHexPage() {
    return (
        <>
            <RgbToHexClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertidor de RGB a Hexadecimal</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tienes los valores RGB de un color (quizás desde Photoshop o Paint) y necesitas usarlo en tu página web?
                        Esta herramienta convierte los tres canales de color (0-255) en una cadena hexadecimal limpia lista para tu CSS.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Input Intuitivo</h3>
                        <p className="text-gray-600">
                            Ingresa los valores R, G y B por separado o pega una cadena tipo "rgb(100, 200, 50)".
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Validación</h3>
                        <p className="text-gray-600">
                            Te avisamos si algún valor está fuera del rango permitido (0-255) para evitar errores.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Contraste</h3>
                        <p className="text-gray-600">
                            Te mostramos automáticamente el color de texto (blanco o negro) que mejor contrasta con tu color de fondo.
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
