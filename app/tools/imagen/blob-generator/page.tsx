import { Metadata } from 'next';
import BlobGeneratorClient from './BlobGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Blobs SVG Gratis - Toolero.es',
    description: 'Crea formas SVG orgánicas y aleatorias (Blobs) para tus diseños web. Descarga gratis y sin registro.',
    keywords: ['blob generator', 'generador svg', 'formas organicas', 'svg shapes', 'fondos web']
};

export default function BlobGeneratorPage() {
    return <BlobGeneratorClient />;
}
