import React from 'react';
import type { Metadata } from 'next';
import PassphraseGeneratorClient from './PassphraseGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Contraseñas Seguras Memorables | Toolero',
    description: 'Genera contraseñas seguras y fáciles de recordar usando palabras aleatorias. Método Diceware.',
    keywords: 'password generator, contraseña memorable, diceware, passphrase, secure password'
};

export default function PassphraseGeneratorPage() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4 text-3xl">
                    🔐
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Frases de Contraseña</h1>
                <p className="text-gray-600">Contraseñas seguras y fáciles de recordar.</p>
            </div>

            <PassphraseGeneratorClient />
        </div>
    );
}
