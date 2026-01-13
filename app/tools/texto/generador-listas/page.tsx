import React from 'react';
import type { Metadata } from 'next';
import TodoGeneratorClient from './TodoGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Listas de Tareas | To-Do List Generator | Toolero',
    description: 'Crea listas de tareas organizadas y exporta en diferentes formatos.',
    keywords: 'todo list, lista tareas, task generator, checklist, productivity'
};

export default function TodoGeneratorPage() {
    return (
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
    );
}
