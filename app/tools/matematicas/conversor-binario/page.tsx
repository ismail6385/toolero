import { Metadata } from 'next';
import BinaryConverterClient from './BinaryConverterClient';

export const metadata: Metadata = {
    title: 'Conversor de Binario a Texto y Decimal Online | Toolero.es',
    description: 'Traduce texto a código binario y viceversa (010101). También convierte entre binario, decimal y hexadecimal.',
    keywords: ['conversor binario', 'binario a texto', 'texto a binario', 'traductor binario', 'decimal a binario', 'toolero'],
};

export default function BinaryConverterPage() {
    return <BinaryConverterClient />;
}
