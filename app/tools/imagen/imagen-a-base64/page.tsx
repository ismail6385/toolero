import { Metadata } from 'next';
import ImageToBase64Client from './ImageToBase64Client';

export const metadata: Metadata = {
    title: 'Convertir Imagen a Base64 Online - Toolero.es',
    description: 'Transforma imágenes PNG, JPG, GIF a cadenas Base64. Ideal para incrustar imágenes en HTML/CSS, emails o JSON.',
    keywords: ['imagen a base64', 'convertidor base64', 'jpg a base64', 'png a base64', 'image to base64']
};

export default function ImageToBase64Page() {
    return <ImageToBase64Client />;
}
