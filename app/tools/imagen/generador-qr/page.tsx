import { Metadata } from 'next';
import QrGeneratorClient from './QrGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Códigos QR Online Gratis | Toolero.es',
    description: 'Crea códigos QR personalizados para URLs, textos, WiFi, emails y más. Descarga tu QR en alta calidad.',
    keywords: ['generador qr', 'crear qr', 'codigo qr gratis', 'qr code generator', 'qr wifi', 'toolero'],
};

export default function QrGeneratorPage() {
    return <QrGeneratorClient />;
}
