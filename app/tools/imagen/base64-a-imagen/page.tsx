import { Metadata } from 'next';
import Base64ToImageClient from './Base64ToImageClient';

export const metadata: Metadata = {
    title: 'Base64 a Imagen Online (Decodificador) - Toolero.es',
    description: 'Visualiza y descarga imágenes desde cadenas de texto Base64. Soporta PNG, JPG, GIF, WEBP y SVG.',
    keywords: ['base64 a imagen', 'decodificar base64', 'base64 decoder', 'base64 to image', 'visualizador base64']
};

export default function Base64ToImagePage() {
    return <Base64ToImageClient />;
}
