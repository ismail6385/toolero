import React from 'react';
import type { Metadata } from 'next';
import HexToRgbClient from './HexToRgbClient';

export const metadata: Metadata = {
    title: 'Conversor HEX a RGB | Convertir Colores | Toolero',
    description: 'Convierte códigos de color hexadecimales a RGB y viceversa. Herramienta rápida para diseñadores y desarrolladores.',
    keywords: 'hex to rgb, convertir colores, hexadecimal a rgb, color converter, hex rgb'
};

export default function HexToRgbPage() {
    return <HexToRgbClient />;
}
