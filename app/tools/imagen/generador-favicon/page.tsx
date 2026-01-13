import React from 'react';
import type { Metadata } from 'next';
import FaviconGeneratorClient from './FaviconGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Favicon Online | Convertir Imagen a Icono | Toolero',
    description: 'Convierte cualquier imagen (JPG, PNG, SVG) en un favicon perfecto para tu sitio web. Crea iconos de 16x16, 32x32 y más.',
    keywords: 'generador favicon, crear favicon, imagen a ico, favicon online, converter png a ico'
};

export default function FaviconGeneratorPage() {
    return <FaviconGeneratorClient />;
}
