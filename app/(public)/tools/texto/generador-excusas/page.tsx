import React from 'react';
import type { Metadata } from 'next';
import ExcuseGeneratorClient from './ExcuseGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Excusas Aleatorias | Random Excuse Generator | Toolero',
    description: 'Genera excusas creativas y divertidas para cualquier situación. ¡Solo por diversión!',
    keywords: 'excuse generator, generador excusas, excusas graciosas, random excuse, funny excuses'
};

export default function ExcuseGeneratorPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-yellow-100 text-yellow-600 mb-4 text-3xl">
                    😅
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Excusas</h1>
                <p className="text-gray-600">Excusas creativas para cualquier situación (¡solo por diversión!).</p>
            </div>

            <ExcuseGeneratorClient />
        </div>
    );
}
