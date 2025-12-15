import React from 'react';
import type { Metadata } from 'next';
import DomainGeneratorClient from './DomainGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Nombres de Dominio | Domain Name Generator | Toolero',
    description: 'Genera nombres de dominio creativos y disponibles para tu proyecto o negocio.',
    keywords: 'domain name generator, generador dominios, nombres web, domain ideas, business names'
};

export default function DomainGeneratorPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-3xl">
                    🌐
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Nombres de Dominio</h1>
                <p className="text-gray-600">Encuentra el nombre perfecto para tu sitio web.</p>
            </div>

            <DomainGeneratorClient />
        </div>
    );
}
