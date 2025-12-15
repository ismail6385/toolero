import React from 'react';
import type { Metadata } from 'next';
import PetAgeCalculatorClient from './PetAgeCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Edad de Mascotas | Años Perro/Gato | Toolero',
    description: 'Convierte la edad de tu perro o gato a años humanos. Calcula la edad real de tu mascota.',
    keywords: 'edad perro, edad gato, años humanos, calculadora mascotas, pet age calculator'
};

export default function PetAgeCalculatorPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-amber-100 text-amber-600 mb-4 text-3xl">
                    🐾
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Edad de Mascotas</h1>
                <p className="text-gray-600">Convierte la edad de tu perro o gato a años humanos.</p>
            </div>

            <PetAgeCalculatorClient />
        </div>
    );
}
