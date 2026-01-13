import { Metadata } from 'next';
import AsciiArtClient from './AsciiArtClient';

export const metadata: Metadata = {
    title: 'Generador de Arte ASCII - Toolero.es',
    description: 'Crea banners de texto gigante en formato ASCII. Convierte letras a dibujos formados por caracteres. Divertido y retro.',
    keywords: ['arte ascii', 'ascii generator', 'texto gigante', 'banner text', 'letras ascii']
};

export default function AsciiArtPage() {
    return <AsciiArtClient />;
}
