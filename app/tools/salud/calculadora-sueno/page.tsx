import React from 'react';
import type { Metadata } from 'next';
import SleepCalculatorClient from './SleepCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Sueño | Ciclos de Sueño REM | Toolero',
    description: 'Calcula la mejor hora para ir a dormir o despertar basándote en los ciclos de sueño de 90 minutos para despertar descansado y con energía.',
    keywords: 'calculadora de sueño, ciclos de sueño, hora dormir, despertar descansado, rem, fases del sueño'
};

export default function SleepCalculatorPage() {
    return <SleepCalculatorClient />;
}
