import { Metadata } from 'next';
import TextRepeaterClient from './TextRepeaterClient';

export const metadata: Metadata = {
    title: 'Duplicador de Texto Online - Repetir Palabras Gratis | Toolero.es',
    description: 'Repite texto, palabras o frases tantas veces como quieras. Herramienta gratuita para multiplicar texto con separadores personalizados.',
    keywords: ['duplicador de texto', 'repetir palabras', 'generador de spam', 'multiplicador de texto', 'text repeater', 'toolero'],
    openGraph: {
        title: 'Duplicador de Texto Online - Toolero.es',
        description: 'Repite cualquier texto miles de veces al instante.',
        type: 'website',
    }
};

export default function TextRepeaterPage() {
    return <TextRepeaterClient />;
}
