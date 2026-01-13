import React from 'react';
import type { Metadata } from 'next';
import AspectRatioClient from './AspectRatioClient';

export const metadata: Metadata = {
    title: 'Calculadora de Aspect Ratio | Relación de Aspecto para Video | Toolero',
    description: 'Calcula dimensiones perfectas manteniendo la relación de aspecto. Ideal para editores de video, diseñadores y creadores de contenido.',
    keywords: 'aspect ratio, relacion aspecto, calculadora dimensiones, 16:9, 4:3, video resolution'
};

export default function AspectRatioPage() {
    return <AspectRatioClient />;
}
