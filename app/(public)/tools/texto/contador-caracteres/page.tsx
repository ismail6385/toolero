import { Metadata } from 'next';
import CharacterCounterClient from './CharacterCounterClient';

export const metadata: Metadata = {
    title: 'Contador de Caracteres Online Gratis - Contador de Palabras | Toolero.es',
    description: 'Contador de caracteres y palabras online gratuito. Verifica la longitud de tu texto para Twitter, Facebook, Instagram y SEO. Calcula tiempo de lectura y más.',
    keywords: ['contador de caracteres', 'contador de palabras', 'contador caracteres online', 'caracteres twitter', 'longitud texto', 'analizador de texto', 'contador letras', 'toolero'],
    openGraph: {
        title: 'Contador de Caracteres y Palabras Online - Toolero.es',
        description: 'Herramienta gratuita para contar caracteres, palabras y párrafos en tiempo real.',
        type: 'website',
    }
};

export default function CharacterCounterPage() {
    return <CharacterCounterClient />;
}
