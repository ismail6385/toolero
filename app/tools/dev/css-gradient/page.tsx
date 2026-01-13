import React from 'react';
import type { Metadata } from 'next';
import CssGradientClient from './CssGradientClient';

export const metadata: Metadata = {
    title: 'Generador de Gradientes CSS | Linear & Radial Gradients | Toolero',
    description: 'Crea degradados CSS perfectos con vista previa en tiempo real. Genera código CSS para gradientes lineales y radiales.',
    keywords: 'css gradient, generador gradientes, degradados css, linear gradient, radial gradient'
};

export default function CssGradientPage() {
    return <CssGradientClient />;
}
