import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Códigos QR Gratis - Crear QR Online',
    description: 'Crea códigos QR gratis para URLs, WiFi, texto, email y más. Personaliza colores y descarga en alta calidad. 100% gratuito y sin límites.',
    keywords: [
        'generador qr',
        'generador de codigos qr',
        'crear codigo qr',
        'crear qr',
        'generar qr',
        'generar codigo qr gratis',
        'qr code generator',
        'codigo qr gratis',
        'qr gratis',
        'generador qr wifi',
        'codigo qr wifi',
        'qr wifi gratis',
        'crear qr online',
        'generador qr online',
        'hacer codigo qr',
        'qr personalizado',
        'generar qr code',
        'qr generator free',
        'toolero'
    ],
};

export default function QrGeneratorPage() {
    return <QrGeneratorClient />;
}
