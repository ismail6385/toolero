
import { Metadata } from 'next';
import SleepCalculatorClient from './SleepCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Sueño - Ciclos de Sueño y Hora de Despertar',
    description: 'Calcula a qué hora dormir o despertar para completar tus ciclos de sueño REM. Despierta descansado y con energía.',
    keywords: [
        'calculadora sueño',
        'ciclos de sueño',
        'a que hora dormir',
        'hora de despertar',
        'sleep calculator',
        'fases del sueño',
        'despertar sin sueño',
        'higiene del sueño',
        'toolero'
    ],
};

export default function SleepCalculatorPage() {
    return (
        <>
            <SleepCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Ciclos de Sueño</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Te has despertado cansado a pesar de dormir 8 horas? Probablemente interrumpiste un ciclo de sueño profundo.
                        Nuestro cerebro duerme en ciclos de 90 minutos. Esta herramienta te dice los momentos óptimos para irte a la cama o poner la alarma.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Si despiertas ahora...</h3>
                        <p className="text-gray-600">
                            Te decimos a qué hora deberías dormir si quieres levantarte a una hora específica mañana.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Si duermes ahora...</h3>
                        <p className="text-gray-600">
                            Te indicamos las mejores horas para despertar si te acuestas en este momento.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Regla de los 90min</h3>
                        <p className="text-gray-600">
                            Basado en la ciencia del ritmo circadiano y las fases REM/No-REM.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Consejos para dormir mejor</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Evita pantallas (luz azul) 1 hora antes de dormir.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Mantén tu habitación oscura y fresca (18-21°C).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Intenta acostarte y levantarte a la misma hora siempre.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
