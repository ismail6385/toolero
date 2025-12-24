import React from 'react';
import type { Metadata } from 'next';
import BarcodeGeneratorClient from './BarcodeGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Códigos de Barras | Barcode Generator | Toolero',
    description: 'Genera códigos de barras EAN-13, UPC, Code128 y más. Descarga en PNG o SVG.',
    keywords: 'barcode generator, codigo barras, ean13, upc, code128, barcode creator'
};

export default function BarcodeGeneratorPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-gray-100 text-gray-600 mb-4 text-3xl">
                    📊
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Códigos de Barras</h1>
                <p className="text-gray-600">Crea códigos de barras para productos y documentos.</p>
            </div>

            <BarcodeGeneratorClient />
        </div>
    );
}
