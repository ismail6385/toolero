import { Metadata } from 'next';
import ColorShadesClient from './ColorShadesClient';

export const metadata: Metadata = {
    title: 'Generador Tints & Shades Online - Toolero.es',
    description: 'Genera variantes de tonos claros (tintes) y oscuros (sombras) de cualquier color hexadecimal. Ideal para diseñar UI.',
    keywords: ['tints and shades', 'generador de sombras', 'variantes de color', 'color mixer', 'paleta monocromatica']
};

export default function ColorShadesPage() {
    return <ColorShadesClient />;
}
