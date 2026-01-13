import { Metadata } from 'next';
import MorseCodeClient from './MorseCodeClient';

export const metadata: Metadata = {
    title: 'Traductor Código Morse Online - Toolero.es',
    description: 'Traduce texto a código morse y morse a texto. Herramienta educativa y de diversión. Soporta letras y números.',
    keywords: ['codigo morse', 'traductor morse', 'morse code translator', 'texto a morse', 'aprender morse']
};

export default function MorseCodePage() {
    return <MorseCodeClient />;
}
