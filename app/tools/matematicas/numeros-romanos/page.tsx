import { Metadata } from 'next';
import RomanNumeralsClient from './RomanNumeralsClient';

export const metadata: Metadata = {
    title: 'Conversor Números Romanos Online - Toolero.es',
    description: 'Traduce números decimales a romanos (2024 -> MMXXIV) y viceversa. Herramienta educativa gratuita.',
    keywords: ['numeros romanos', 'convertidor romano', 'romano a decimal', 'cifras romanas', 'roman numerals']
};

export default function RomanNumeralsPage() {
    return <RomanNumeralsClient />;
}
