import React from 'react';
import type { Metadata } from 'next';
import AverageCalculatorClient from './AverageCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Promedio (Media, Mediana, Moda) | Estadísticas | Toolero',
    description: 'Calcula fácilmente el promedio (media), mediana, moda, mínimo y máximo de una lista de números. Herramienta de estadística descriptiva online.',
    keywords: 'calculadora promedio, media aritmetica, mediana, moda, estadistica online, promedio notas'
};

export default function AverageCalculatorPage() {
    return <AverageCalculatorClient />;
}
