import React from 'react';
import type { Metadata } from 'next';
import TipByCountryClient from './TipByCountryClient';

export const metadata: Metadata = {
    title: 'Calculadora de Propinas por País | Tip Calculator by Country | Toolero',
    description: 'Calcula la propina adecuada según el país y las costumbres locales.',
    keywords: 'tip calculator, propina por pais, tipping guide, gratuity calculator, restaurant tip'
};

export default function TipByCountryPage() {
    return (
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
    );
}
