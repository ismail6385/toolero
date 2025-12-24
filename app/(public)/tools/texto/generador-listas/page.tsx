
import React from 'react';
import type { Metadata } from 'next';
import TodoGeneratorClient from './TodoGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Listas de Tareas - Checklist Online Gratis',
    description: 'Crea listas de tareas (To-Do List) organizadas online. Genera checklists para viajes, compras o proyectos y exporta en texto o PDF.',
    keywords: [
        'generador de listas',
        'lista de tareas',
        'checklist online',
        'crear to do list',
        'organizador de tareas',
        'lista de verificación',
        'generador checklist',
        'task list maker',
        'toolero'
    ]
};

export default function TodoGeneratorPage() {
    return (
        <>
            <div className="max-w-3xl mx-auto p-6">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4 text-3xl">
                        ✅
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Listas de Tareas</h1>
                    <p className="text-gray-600">Organiza tus tareas de forma simple y efectiva.</p>
                </div>

                <TodoGeneratorClient />
            </div>

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Organiza tu día con nuestras Listas de Tareas</h2>
                    <p className="text-gray-600 mb-4">
                        Tener tus pendientes organizados es el primer paso para aumentar tu productividad.
                        Nuestro generador de listas de tareas (To-Do List) te permite crear, gestionar y descargar tus checklists de manera rápida y gratuita.
                        Ya sea para planificar tu día, organizar un viaje o hacer la lista de la compra.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Simple y Rápido</h3>
                        <p className="text-gray-600">
                            Añade tareas pulsando Enter. Marca como completado con un clic. Sin complicaciones.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Exportable</h3>
                        <p className="text-gray-600">
                            Copia tu lista al portapapeles con formato para pegarla en WhatsApp, Slack o Notas.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Sin registro</h3>
                        <p className="text-gray-600">
                            No necesitas crear una cuenta. Tus listas se generan en tu navegador al instante.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ideas para usar tus listas</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Lista de equipaje antes de viajar</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Planificación diaria de trabajo (Daily Planner)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Lista de la compra semanal</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600">Pasos para un procedimiento o tutorial</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
