import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
    title: 'Conversor de Unidades (Longitud, Peso, Volumen, Temperatura) | Toolero',
    description: 'Convierte fácilmente entre sistema métrico e imperial. Calculadora gratuita para pasar de grados Celsius a Fahrenheit, Millas a Kilómetros, Libras a Kilos y mucho más.',
    keywords: [
        'conversor unidades',
        'convertir grados c a f',
        'pasar de libras a kilos',
        'calculadora cambio unidades',
        'sistema metrico imperial',
        'convertir pies a metros'
    ],
};

export default function UnitConverterPage() {
    return (
        <>
            <UnitConverterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Todas las medidas en un solo lugar</h2>
                    <p className="text-gray-600 mb-4">
                        Ya sea para problemas de física, recetas de cocina o viajes, a menudo necesitamos "traducir" las magnitudes.
                        Nuestro conversor maneja las unidades más comunes sin complicaciones.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-2">Sistema Métrico vs Imperial</h3>
                        <p className="text-sm text-gray-500">
                            El <strong>Sistema Internacional (SI)</strong> usa metros y kilogramos y es el estándar científico mundial.
                            El <strong>Sistema Imperial</strong> (usado en EE.UU.) utiliza pies, libras y galones.
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
