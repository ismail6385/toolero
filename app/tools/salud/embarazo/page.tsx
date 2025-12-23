
import { Metadata } from 'next';
import PregnancyCalculatorClient from './PregnancyCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Embarazo y Fecha de Parto (FPP)',
    description: 'Calcula tu fecha probable de parto (FPP), semanas de embarazo y trimestres. Sigue tu gestación semana a semana con nuestra calculadora online.',
    keywords: [
        'calculadora embarazo',
        'fecha parto',
        'semanas embarazo',
        'calendario embarazo',
        'fpp calculator',
        'gestacion',
        'trimestres embarazo',
        'cuanto falta para parir',
        'toolero'
    ],
};

export default function PregnancyCalculatorPage() {
    return (
        <>
            <PregnancyCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Fecha Probable de Parto</h2>
                    <p className="text-gray-600 mb-4">
                        ¡Felicidades por tu embarazo! Esta herramienta te ayuda a estimar la fecha en la que nacerá tu bebé
                        basada en el primer día de tu última menstruación (FUM), siguiendo la regla de Naegele estándar utilizada por los médicos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Tu Semanas</h3>
                        <p className="text-gray-600">
                            Te decimos exactamente en qué semana y día de gestación te encuentras (ej: 12 semanas + 3 días).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Trimestre</h3>
                        <p className="text-gray-600">
                            Descubre si estás en el primer, segundo o tercer trimestre y qué esperar.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Cuenta Regresiva</h3>
                        <p className="text-gray-600">
                            Mira cuántos días faltan para conocer a tu bebé.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Etapas clave del embarazo</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-sm font-bold">Semana 1-12</span>
                            <span className="text-gray-600">Primer Trimestre: Formación de órganos vitales.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-sm font-bold">Semana 13-26</span>
                            <span className="text-gray-600">Segundo Trimestre: El bebé crece y empiezas a sentir movimientos.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-sm font-bold">Semana 27-40</span>
                            <span className="text-gray-600">Tercer Trimestre: Maduración final y preparación para el parto.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
