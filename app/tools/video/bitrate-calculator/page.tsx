import React from 'react';
import type { Metadata } from 'next';
import BitrateCalculatorClient from './BitrateCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Bitrate para Video y Streaming | Toolero',
    description: 'Calcula el bitrate óptimo para tus videos y streams. Estima el tamaño de archivo según duración, resolución y calidad.',
    keywords: 'bitrate calculator, calculadora bitrate, streaming bitrate, video encoding, obs settings'
};

export default function BitrateCalculatorPage() {
    return <BitrateCalculatorClient />;
}
