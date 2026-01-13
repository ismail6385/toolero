import { Metadata } from 'next';
import VirtualKeyboardClient from './VirtualKeyboardClient';

export const metadata: Metadata = {
    title: 'Teclado Virtual Seguro Online - Toolero.es',
    description: 'Escribe contraseñas y datos sensibles sin usar tu teclado físico. Protección anti-keyloggers gratuita.',
    keywords: ['teclado virtual', 'virtual keyboard', 'teclado en pantalla', 'anti keylogger', 'escribir seguro']
};

export default function VirtualKeyboardPage() {
    return <VirtualKeyboardClient />;
}
