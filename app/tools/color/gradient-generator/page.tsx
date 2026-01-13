import React from 'react';
import type { Metadata } from 'next';
import GradientGeneratorClient from './GradientGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Degradados CSS | Gradient Generator | Toolero',
    description: 'Crea degradados CSS lineales y radiales con vista previa. Copia el código CSS al instante.',
    keywords: 'css gradient, degradado css, gradient generator, linear gradient, radial gradient'
};

export default function GradientGeneratorPage() {
    return <GradientGeneratorClient />;
}
