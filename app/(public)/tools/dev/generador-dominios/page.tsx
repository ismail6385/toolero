
import React from 'react';
import type { Metadata } from 'next';
import DomainGeneratorClient from './DomainGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Nombres de Dominio - Ideas Creativas para Web',
    description: 'Genera nombres de dominio creativos y disponibles para tu proyecto o negocio. Encuentra el nombre perfecto (.com, .es, .net) para tu startup.',
    keywords: [
        'generador dominios',
        'domain name generator',
        'nombres para web',
        'ideas nombre empresa',
        'buscador dominios',
        'disponibilidad dominios',
        'crear nombre marca',
        'startup names',
        'toolero'
    ]
};

export default function DomainGeneratorPage() {
    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-3xl">
                        🌐
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Nombres de Dominio</h1>
                    <p className="text-gray-600">Encuentra el nombre perfecto para tu sitio web.</p>
                </div>

                <DomainGeneratorClient />
            </div>

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Encuentra el nombre perfecto para tu proyecto</h2>
                    <p className="text-gray-600 mb-4">
                        Elegir el nombre correcto es el primer paso para el éxito en internet.
                        Nuestro generador de dominios combina tus palabras clave con prefijos, sufijos y términos populares para sugerirte cientos de ideas creativas, pegadizas y disponibles.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Creatividad Ilimitada</h3>
                        <p className="text-gray-600">
                            Mezclamos palabras, añadimos verbos de acción y usamos trucos de naming para darte opciones que no se te habrían ocurrido.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Verificación Rápida</h3>
                        <p className="text-gray-600">
                            Comprueba al instante si el dominio .com está libre (nota: la disponibilidad puede variar en tiempo real).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Gratis</h3>
                        <p className="text-gray-600">
                            Usa la herramienta tantas veces como quieras para hacer brainstorming para todos tus proyectos.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Consejos para elegir un dominio</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Corto y simple:</strong> Fácil de escribir y deletrear.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Memorable:</strong> Que se quede en la mente de tus usuarios.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Evita guiones y números:</strong> Suelen causar confusión al compartirlos de voz a voz.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Usa palabras clave:</strong> Ayuda a que la gente (y Google) sepan de qué trata tu sitio.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
