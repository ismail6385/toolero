import React from 'react';
import type { Metadata } from 'next';
import BusinessDaysClient from './BusinessDaysClient';

export const metadata: Metadata = {
    title: 'Calculadora de Días Hábiles | Business Days Calculator | Toolero',
    description: 'Calcula días hábiles entre dos fechas excluyendo fines de semana y festivos.',
    keywords: 'business days, dias habiles, working days, calculadora laboral, workday calculator'
};

export default function BusinessDaysPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-teal-100 text-teal-600 mb-4 text-3xl">
                    📅
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Días Hábiles</h1>
                <p className="text-gray-600">Calcula días laborables entre dos fechas.</p>
            </div>

            <BusinessDaysClient />
        </div>
    );
}
