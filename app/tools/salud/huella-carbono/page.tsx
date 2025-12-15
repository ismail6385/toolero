import React from 'react';
import type { Metadata } from 'next';
import CarbonFootprintClient from './CarbonFootprintClient';

export const metadata: Metadata = {
    title: 'Calculadora de Huella de Carbono | CO2 Calculator | Toolero',
    description: 'Calcula tu huella de carbono personal. Mide el impacto ambiental de tu estilo de vida.',
    keywords: 'huella carbono, co2 calculator, carbon footprint, impacto ambiental, sostenibilidad'
};

export default function CarbonFootprintPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4 text-3xl">
                    🌍
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Huella de Carbono</h1>
                <p className="text-gray-600">Mide tu impacto ambiental anual.</p>
            </div>

            <CarbonFootprintClient />
        </div>
    );
}
