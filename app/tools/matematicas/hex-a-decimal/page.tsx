import { Metadata } from 'next';
import HexToDecimalClient from './HexToDecimalClient';

export const metadata: Metadata = {
    title: 'De Hexadecimal a Decimal - Toolero.es',
    description: 'Convierte números hexadecimales a sistema decimal. Herramienta útil para programadores y electrónicos.',
    keywords: ['hex a decimal', 'hexadecimal to decimal', 'convertidor hex', 'base 16 a base 10', 'calculadora hex']
};

export default function HexToDecimalPage() {
    return <HexToDecimalClient />;
}
