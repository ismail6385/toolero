
import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
    title: 'Conversor de Unidades Universal - Medidas, Peso, Distancia',
    description: 'Convierte unidades de medida fácilmente: longitud, peso, volumen, temperatura, área y más. Conversor universal online rápido y preciso.',
    keywords: [
        'conversor unidades',
        'convertir medidas',
        'unit converter',
        'pasar km a millas',
        'kilos a libras',
        'grados celsius a fahrenheit',
        'calculadora conversion',
        'sistema metrico imperial',
        'toolero'
    ],
};

export default function UnitConverterPage() {
    return (
        <>
            <UnitConverterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Conversor de Unidades y Medidas</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Necesitas pasar de kilómetros a millas, de grados Celsius a Fahrenheit o de kilogramos a libras?
                        Nuestra herramienta todo-en-uno facilita la conversión entre el Sistema Métrico (SI) y el Sistema Imperial de forma instantánea.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Longitud y Distancia</h3>
                        <p className="text-gray-600">
                            Metros, pies, pulgadas, yardas, millas, kilómetros, centímetros...
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Masa y Peso</h3>
                        <p className="text-gray-600">
                            Convierte recetas de cocina o envíos: Gramos, Onzas (oz), Libras (lb), Kilogramos, Toneladas.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Temperatura</h3>
                        <p className="text-gray-600">
                            Entiende el clima en cualquier lugar: Celsius (°C), Fahrenheit (°F) y Kelvin (K).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Conversiones populares</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 font-bold">⇄</span>
                            <span className="text-gray-600"><strong>1 Pulgada</strong> = 2.54 cm</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 font-bold">⇄</span>
                            <span className="text-gray-600"><strong>1 Kilo</strong> = 2.20462 Libras</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 font-bold">⇄</span>
                            <span className="text-gray-600"><strong>1 Milla</strong> = 1.60934 Kilómetros</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-orange-500 font-bold">⇄</span>
                            <span className="text-gray-600"><strong>0°C</strong> = 32°F (Punto de congelación del agua)</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
