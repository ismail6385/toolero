import { Metadata } from 'next';
import BrowserInfoClient from './BrowserInfoClient';

export const metadata: Metadata = {
    title: 'Información de mi Navegador y Sistema - Toolero.es',
    description: '¿Cuál es mi User Agent? Visualiza tu resolución de pantalla, sistema operativo y versión del navegador.',
    keywords: ['info navegador', 'mi user agent', 'resolucion pantalla', 'browser info', 'what is my browser']
};

export default function BrowserInfoPage() {
    return <BrowserInfoClient />;
}
