
import { Metadata } from 'next';
import CarbonFootprintClient from './CarbonFootprintClient';

export const metadata: Metadata = {
    title: 'Calculadora Huella de Carbono Personal - Impacto Ambiental',
    description: 'Calcula tu huella de carbono anual. Descubre cuántas toneladas de CO2 emites según tu estilo de vida, transporte y consumo de energía.',
    keywords: [
        'huella de carbono',
        'calcular co2',
        'impacto ambiental',
        'carbon footprint',
        'emisiones co2',
        'cambio climatico',
        'ecologia',
        'sostenibilidad',
        'toolero'
    ],
};

export default function CarbonFootprintPage() {
    return (
        <>
            <CarbonFootprintClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Huella de Carbono</h2>
                    <p className="text-gray-600 mb-4">
                        Todo lo que hacemos, desde encender la luz hasta conducir al trabajo, genera gases de efecto invernadero.
                        Esta calculadora estima tus emisiones personales de CO2 anuales para que seas consciente de tu impacto en el planeta y encuentres formas de reducirlo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Transporte</h3>
                        <p className="text-gray-600">
                            Coche, autobús, avión... el transporte suele ser la mayor fuente de emisiones personales.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Hogar</h3>
                        <p className="text-gray-600">
                            Consumo de electricidad, gas natural y calefacción en tu vivienda.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Dieta</h3>
                        <p className="text-gray-600">
                            El consumo de carne roja tiene un impacto mucho mayor que una dieta vegetariana.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo reducir tu huella?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Usa transporte público, bicicleta o camina más.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Reduce el consumo de carne y lácteos.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Desconecta aparatos electrónicos que no uses (consumo fantasma).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-500 font-bold">✓</span>
                            <span className="text-gray-600">Planta árboles o apoya proyectos de reforestación.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
