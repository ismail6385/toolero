
import { Metadata } from 'next';
import HexToRgbClient from './HexToRgbClient';

export const metadata: Metadata = {
    title: 'Convertidor HEX a RGB y RGB a HEX - Códigos de Color',
    description: 'Convierte códigos de color de formato Hexadecimal a RGB y viceversa. Herramienta esencial para diseñadores web y desarrolladores CSS.',
    keywords: [
        'hex a rgb',
        'rgb a hex',
        'convertidor colores',
        'codigo color',
        'transformar hex',
        'css color converter',
        'web design colors',
        'toolero'
    ],
};

export default function HexToRgbPage() {
    return (
        <>
            <HexToRgbClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Conversor de Formatos de Color</h2>
                    <p className="text-gray-600 mb-4">
                        En el diseño digital, a menudo necesitamos traducir los colores entre diferentes "idiomas".
                        Esta herramienta convierte instantáneamente valores Hexadecimales (comunes en HTML/CSS) a valores RGB (comunes en software de edición) y viceversa.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">HEX (#RRGGBB)</h3>
                        <p className="text-gray-600">
                            El estándar web. Compacto y fácil de copiar. #FF5733 representa un naranja vibrante.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">RGB (R, G, B)</h3>
                        <p className="text-gray-600">
                            Define la cantidad de luz Roja, Verde y Azul (0-255). rgb(255, 87, 51) es el mismo naranja.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Vista Previa</h3>
                        <p className="text-gray-600">
                            Mira el color resultante en tiempo real mientras escribes el código para asegurarte de que es el correcto.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Diferencias clave</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Hexadecimal:</strong> Base 16. Usa dígitos 0-9 y letras A-F. Ideal para código.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>RGB:</strong> Base 10. Más intuitivo para entender la mezcla de luz (Rojo + Verde = Amarillo).</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
