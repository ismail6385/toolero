import React from 'react';
import type { Metadata } from 'next';
import BioFontsClient from './BioFontsClient';

export const metadata: Metadata = {
    title: 'Fuentes Aesthetic para Instagram Bio | Generador de Letras Bonitas | Toolero',
    description: 'Convierte tu texto en fuentes aesthetic, cursivas y elegantes para Instagram, TikTok y otras redes sociales. Copia y pega fácilmente.',
    keywords: 'fuentes instagram, letras bonitas, aesthetic fonts, bio instagram, fuentes cursivas, letras aesthetic'
};

export default function BioFontsPage() {
    return <BioFontsClient />;
}
