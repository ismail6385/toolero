import React from 'react';
import type { Metadata } from 'next';
import ImagePickerClient from './ImagePickerClient';

export const metadata: Metadata = {
    title: 'Selector de Color de Imagen | Color Picker | Toolero',
    description: 'Extrae colores de cualquier imagen. Identifica paletas de colores y códigos HEX de tus imágenes favoritas.',
    keywords: 'color picker, extractor colores imagen, eyedropper, paleta imagen, color from image'
};

export default function ImagePickerPage() {
    return <ImagePickerClient />;
}
