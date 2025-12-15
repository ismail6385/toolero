import React from 'react';
import type { Metadata } from 'next';
import PaletteGeneratorClient from './PaletteGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Paletas de Colores | Color Palette Generator | Toolero',
    description: 'Crea paletas de colores armónicas y profesionales. Genera esquemas complementarios, análogos y triádicos al instante.',
    keywords: 'generador paletas, color palette, esquemas color, colores complementarios, diseño colores'
};

export default function PaletteGeneratorPage() {
    return <PaletteGeneratorClient />;
}
