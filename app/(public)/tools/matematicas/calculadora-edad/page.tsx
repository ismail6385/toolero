
import { Metadata } from 'next';
import AgeCalculatorClient from './AgeCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Edad Exacta - Años, Meses y Días',
    description: 'Calcula tu edad exacta en años, meses, semanas, días, e incluso horas y minutos. Descubre cuántos días faltan para tu próximo cumpleaños.',
    keywords: [
        'calculadora edad',
        'calcular edad exacta',
        'cuantos años tengo',
        'dias vividos',
        'fecha de nacimiento',
        'chronological age',
        'proximo cumpleaños',
        'toolero'
    ],
};

export default function AgeCalculatorPage() {
    return (
        <>
            <AgeCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Edad Cronológica</h2>
                    <p className="text-gray-600 mb-4">
                        A veces necesitamos saber nuestra edad con precisión milimétrica, o calcular la edad exacta de una persona para trámites legales, escolares o médicos.
                        Simplemente ingresa la fecha de nacimiento y obtén el desglose completo del tiempo transcurrido hasta hoy.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Precisión Total</h3>
                        <p className="text-gray-600">
                            No solo te decimos los años. Te mostramos meses, semanas, días, horas y segundos vividos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Próximo Cumpleaños</h3>
                        <p className="text-gray-600">
                            Descubre cuántos días y horas faltan exactamente para tu próxima celebración y qué día de la semana caerá.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Curiosidades</h3>
                        <p className="text-gray-600">
                            ¿Sabías que has vivido más de 1 billón de segundos? Descubre datos curiosos sobre tu tiempo en la Tierra.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos comunes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Verificar elegibilidad para trámites (18 años, jubilación).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Calcular edad de bebés en meses/semanas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600">Efemérides y aniversarios de pareja o empresa.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
