import { Metadata } from 'next';
import DecimalToHexClient from './DecimalToHexClient';

export const metadata: Metadata = {
    title: 'De Decimal a Hexadecimal - Toolero.es',
    description: 'Convierte números enteros a sistema hexadecimal. Rápido y preciso para desarrollo web y sistemas.',
    keywords: ['decimal a hex', 'decimal to hexadecimal', 'convertidor decimal', 'base 10 a base 16', 'int to hex']
};

export default function DecimalToHexPage() {
    return <DecimalToHexClient />;
}
