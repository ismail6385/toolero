
import React from 'react';
import type { Metadata } from 'next';
import TipByCountryClient from './TipByCountryClient';

export const metadata: Metadata = {
    title: 'Guía de Propinas por País - ¿Cuánto Dejar de Propina?',
    description: 'Descubre cuánto dejar de propina en diferentes países del mundo. Guía de etiqueta y costumbres locales para viajeros. Calculadora automática por país.',
    keywords: [
        'propina por pais',
        'guia propinas',
        'costumbre propina',
        'tip by country',
        'propina estados unidos',
        'propina japon',
        'propina europa',
        'etiqueta propinas',
        'viajes',
        'toolero'
    ]
};

export default function TipByCountryPage() {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4 text-3xl">
                        💰
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Propinas por País</h1>
                    <p className="text-gray-600">Conoce las costumbres de propinas en diferentes países.</p>
                </div>

                <TipByCountryClient />
            </div>

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Etiqueta de Propinas en el Mundo</h2>
                    <p className="text-gray-600 mb-4">
                        "¿Se deja propina aquí?" es la pregunta más común de todo viajero.
                        En Estados Unidos es casi obligatorio, en España es un gesto de cortesía y en Japón puede considerarse un insulto.
                        Nuestra guía interactiva te dice exactamente qué hacer en cada destino para que nunca quedes mal.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Base de Datos Global</h3>
                        <p className="text-gray-600">
                            Información actualizada sobre costumbres de propinas en América, Europa, Asia y Oceanía.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Evita Malentendidos</h3>
                        <p className="text-gray-600">
                            Saber cuándo NO dejar propina es tan importante como saber cuándo hacerlo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Calculadora Integrada</h3>
                        <p className="text-gray-600">
                            Simplemente elige el país y el monto de la cuenta, y te diremos el rango sugerido automáticamente.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Reglas generales por región</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Norteamérica (EE.UU/Canadá):</strong> La propina es el salario del camarero. Deja 15-25%.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Europa:</strong> El servicio suele estar incluido. Redondear o dejar un 5-10% por buen servicio es común.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Asia Oriental (Japón/China/Corea):</strong> Generalmente NO se deja propina. Un buen servicio es el estándar.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Latinoamérica:</strong> Suele esperarse un 10%, a veces incluido como "cargo por servicio" en la cuenta.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
