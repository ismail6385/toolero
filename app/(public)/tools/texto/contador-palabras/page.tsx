import { Metadata } from 'next';
import WordCounterClient from './WordCounterClient';

export const metadata: Metadata = {
    title: 'Contador de Palabras Gratis - Contar Palabras y Caracteres Online',
    description: 'Cuenta palabras, caracteres, párrafos y frases en tiempo real. Herramienta gratuita para escritores, estudiantes y profesionales. 100% gratis.',
    keywords: [
        'contador de palabras',
        'contar palabras',
        'contar caracteres',
        'contador de caracteres',
        'word counter',
        'character counter',
        'contar palabras online',
        'contador palabras gratis',
        'contar letras',
        'contador de letras',
        'contar palabras texto',
        'cuantas palabras tiene un texto',
        'contador de palabras y caracteres',
        'herramienta contar palabras',
        'toolero'
    ],
};

export default function WordCounterPage() {
    return <WordCounterClient />;
}
