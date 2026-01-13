import { Metadata } from 'next';
import TextReverserClient from './TextReverserClient';

export const metadata: Metadata = {
    title: 'Inversor de Texto Online Gratis - Voltear Texto | Toolero.es',
    description: 'Herramienta gratuita para invertir texto, voltear palabras, crear texto al revés (flip text) y espejo. Ideal para redes sociales y efectos divertidos.',
    keywords: ['invertir texto', 'voltear texto', 'texto al revés', 'flip text', 'reverse text', 'texto espejo', 'inversor de palabras', 'toolero'],
    openGraph: {
        title: 'Inversor de Texto y Palabras Online - Toolero.es',
        description: 'Invierte, voltea y transforma tu texto al instante. Crea efectos únicos para tus mensajes.',
        type: 'website',
    }
};

export default function TextReverserPage() {
    return <TextReverserClient />;
}
