import React from 'react';
import type { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';

export const metadata: Metadata = {
    title: 'Generador de Lorem Ipsum | Texto de Relleno | Toolero',
    description: 'Genera texto Lorem Ipsum para tus diseños y maquetas. Párrafos, palabras o caracteres de relleno al instante.',
    keywords: 'lorem ipsum, texto relleno, placeholder text, dummy text, generador texto'
};

export default function LoremIpsumPage() {
    return <LoremIpsumClient />;
}
