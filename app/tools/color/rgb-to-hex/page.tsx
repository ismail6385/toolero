import React from 'react';
import type { Metadata } from 'next';
import RgbToHexClient from './RgbToHexClient';

export const metadata: Metadata = {
    title: 'Conversor RGB a HEX | Convertir Colores RGB | Toolero',
    description: 'Convierte valores RGB a código hexadecimal. Herramienta esencial para diseñadores y desarrolladores web.',
    keywords: 'rgb to hex, convertir rgb, rgb hexadecimal, color converter, rgb hex'
};

export default function RgbToHexPage() {
    return <RgbToHexClient />;
}
