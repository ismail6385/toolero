import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
    title: 'Convertir Imágenes a PDF Gratis - JPG/PNG a PDF | Toolero.es',
    description: 'Convierte tus imágenes JPG, PNG o WebP a un documento PDF en segundos. Sin límites, sin marcas de agua y 100% privado.',
    keywords: ['imagenes a pdf', 'jpg a pdf', 'png a pdf', 'convertir foto a pdf', 'crear pdf de imagenes', 'toolero'],
};

export default function ImageToPdfPage() {
    return <ImageToPdfClient />;
}
