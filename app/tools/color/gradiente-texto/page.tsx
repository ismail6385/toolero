import { Metadata } from 'next';
import TextGradientClient from './TextGradientClient';

export const metadata: Metadata = {
    title: 'Generador Gradientes de Texto CSS - Toolero.es',
    description: 'Crea texto con degradado (gradient text) para tu web. Copia el código CSS (background-clip: text) fácilmente.',
    keywords: ['gradiente texto', 'text gradient css', 'letras degradadas', 'generador css', 'estilo texto web']
};

export default function TextGradientPage() {
    return <TextGradientClient />;
}
