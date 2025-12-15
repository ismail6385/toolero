import React from 'react';
import type { Metadata } from 'next';
import ScreenSizeClient from './ScreenSizeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Tamaño de Pantalla | Screen Size Calculator | Toolero',
    description: 'Calcula las dimensiones reales de una pantalla según las pulgadas y la relación de aspecto.',
    keywords: 'screen size, tamaño pantalla, pulgadas a cm, monitor size, display calculator'
};

export default function ScreenSizeCalculatorPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-purple-100 text-purple-600 mb-4 text-3xl">
                    🖥️
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Tamaño de Pantalla</h1>
                <p className="text-gray-600">Convierte pulgadas a dimensiones reales.</p>
            </div>

            <ScreenSizeClient />
        </div>
    );
}
