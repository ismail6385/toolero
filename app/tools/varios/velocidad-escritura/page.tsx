import { Metadata } from 'next';
import TypingSpeedClient from './TypingSpeedClient';

export const metadata: Metadata = {
    title: 'Test de Velocidad de Escritura (WPM) - Toolero.es',
    description: 'Mide cuántas palabras por minuto escribes con nuestro test de mecanografía online gratis.',
    keywords: ['test velocidad escritura', 'wpm test', 'mecanografia test', 'typing speed', 'palabras por minuto']
};

export default function TypingSpeedPage() {
    return <TypingSpeedClient />;
}
