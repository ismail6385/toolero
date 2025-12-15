import React from 'react';
import type { Metadata } from 'next';
import ContrastCheckerClient from './ContrastCheckerClient';

export const metadata: Metadata = {
    title: 'Verificador de Contraste de Color | WCAG Accessibility | Toolero',
    description: 'Verifica el contraste entre colores según las pautas WCAG. Asegura la accesibilidad de tu diseño web.',
    keywords: 'contrast checker, verificador contraste, wcag, accesibilidad web, color contrast, a11y'
};

export default function ContrastCheckerPage() {
    return <ContrastCheckerClient />;
}
