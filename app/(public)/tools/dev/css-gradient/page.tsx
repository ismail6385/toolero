
import React from 'react';
import type { Metadata } from 'next';
import CssGradientClient from './CssGradientClient';

export const metadata: Metadata = {
    title: 'Generador de Gradientes CSS Online - Toolero.es',
    description: 'Crea degradados CSS perfectos visualmente. Generador de gradientes lineales y radiales con código CSS listo para copiar y pegar.',
    keywords: [
        'css gradient generator',
        'generador de gradientes',
        'degradados css',
        'fondo degradado css',
        'linear-gradient generator',
        'radial-gradient generator',
        'crear degradados online',
        'estilos css',
        'toolero'
    ]
};

export default function CssGradientPage() {
    return (
        <>
            <CssGradientClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Degradados CSS Visual</h2>
                    <p className="text-gray-600 mb-4">
                        Diseñar gradientes CSS escribiendo código a mano es tedioso y propenso a errores.
                        Nuestra herramienta visual te permite crear, ajustar y previsualizar degradados lineales y radiales en tiempo real.
                        Obtén el código CSS3 compatible con todos los navegadores modernos listo para copiar.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Control Total</h3>
                        <p className="text-gray-600">
                            Añade múltiples paradas de color, ajusta el ángulo, la posición y la opacidad visualmente.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Lineal y Radial</h3>
                        <p className="text-gray-600">
                            Soporta los dos tipos principales de gradientes web para fondos más dinámicos y modernos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Código Limpio</h3>
                        <p className="text-gray-600">
                            Generamos el código CSS exacto que necesitas, incluyendo prefijos de navegador si fuera necesario para máxima compatibilidad.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tendencias en Diseño Web</h2>
                    <p className="text-gray-600 mb-4">
                        Los degradados han vuelto con fuerza al diseño web moderno. Se utilizan en:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Fondos de secciones Hero para dar profundidad.</li>
                        <li>Botones con estados de hover sutiles.</li>
                        <li>Texto con degradado (background-clip: text) para titulares impactantes.</li>
                        <li>Superposiciones sobre imágenes para mejorar la legibilidad del texto.</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
