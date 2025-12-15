import { Metadata } from 'next';
import KeycodeInfoClient from './KeycodeInfoClient';

export const metadata: Metadata = {
    title: 'Detector de Códigos de Tecla (Keycode) | JavaScript | Toolero.es',
    description: 'Presiona cualquier tecla para obtener su código JavaScript: event.key, event.code, event.which y más. Herramienta esencial para desarrolladores.',
    keywords: ['keycode', 'javascript keycode', 'event.key', 'event.code', 'detector teclas', 'toolero'],
};

export default function KeycodeInfoPage() {
    return <KeycodeInfoClient />;
}
