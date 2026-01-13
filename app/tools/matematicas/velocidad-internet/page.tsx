import React from 'react';
import type { Metadata } from 'next';
import InternetSpeedClient from './InternetSpeedClient';

export const metadata: Metadata = {
    title: 'Calculadora de Velocidad de Internet | Speed Test Calculator | Toolero',
    description: 'Calcula tiempos de descarga y carga según tu velocidad de internet. Convierte Mbps a MB/s.',
    keywords: 'speed calculator, velocidad internet, mbps to mb, download time, upload time'
};

export default function InternetSpeedPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-cyan-100 text-cyan-600 mb-4 text-3xl">
                    📡
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Calculadora de Velocidad de Internet</h1>
                <p className="text-gray-600">Calcula tiempos de descarga según tu velocidad.</p>
            </div>

            <InternetSpeedClient />
        </div>
    );
}
