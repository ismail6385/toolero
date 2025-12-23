
import React from 'react';
import type { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador JSON Online - Validar y Emellecer JSON',
    description: 'Valida, formatea y embellece tu código JSON online. Herramienta gratuita para indentar, minificar y corregir errores de sintaxis en JSON.',
    keywords: [
        'json formatter',
        'formateador json',
        'validar json',
        'json validator',
        'beautify json',
        'json pretty print',
        'minificar json',
        'json viewer',
        'leer json',
        'toolero'
    ],
};

export default function JsonFormatterPage() {
    return (
        <>
            <JsonFormatterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Formateador y Validador JSON</h2>
                    <p className="text-gray-600 mb-4">
                        Trabajar con respuestas de API o archivos de configuración minificados puede ser un dolor de cabeza.
                        Nuestro Formateador JSON toma cualquier cadena JSON desordenada o compacta y la convierte en una estructura legible y perfectamente identada.
                        Además, valida la sintaxis para advertirte de errores comunes como comas faltantes o corchetes sin cerrar.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-yellow-600 mb-3">Pretty Print</h3>
                        <p className="text-gray-600">
                            Embellece tu JSON con indentación automática (2 o 4 espacios) para facilitar la lectura humana.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-yellow-600 mb-3">Minificar</h3>
                        <p className="text-gray-600">
                            Haz lo contrario: elimina todos los espacios innecesarios para reducir el tamaño del archivo para producción.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-yellow-600 mb-3">Validación de Errores</h3>
                        <p className="text-gray-600">
                            Si tu JSON es inválido, te diremos exactamente dónde está el error para que puedas corregirlo rápido.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Para qué sirve JSON?</h2>
                    <p className="text-gray-600 mb-4">
                        JSON (JavaScript Object Notation) es el formato estándar de facto para el intercambio de datos en la web.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-500 font-bold">✓</span>
                            <span className="text-gray-600">Comunicación entre servidor y cliente (APIs REST)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-500 font-bold">✓</span>
                            <span className="text-gray-600">Archivos de configuración (package.json, tsconfig.json)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-yellow-500 font-bold">✓</span>
                            <span className="text-gray-600">Almacenamiento de datos en bases de datos NoSQL (MongoDB)</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
