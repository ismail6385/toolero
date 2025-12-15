import React from 'react';
import type { Metadata } from 'next';
import EmailSignatureClient from './EmailSignatureClient';

export const metadata: Metadata = {
    title: 'Generador de Firmas de Email HTML | Email Signature Generator | Toolero',
    description: 'Crea firmas de email profesionales en HTML. Personaliza y copia el código al instante.',
    keywords: 'email signature, firma email html, email signature generator, professional signature'
};

export default function EmailSignatureGeneratorPage() {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-blue-100 text-blue-600 mb-4 text-3xl">
                    ✉️
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Firmas de Email</h1>
                <p className="text-gray-600">Crea firmas profesionales para tu correo electrónico.</p>
            </div>

            <EmailSignatureClient />
        </div>
    );
}
