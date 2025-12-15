import { Metadata } from 'next';
import VatCalculatorClient from './VatCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de IVA Online Gratis | Toolero.es',
    description: 'Calcula el IVA (Impuesto al Valor Agregado) de cualquier cantidad. Añade o quita el IVA fácilmente.',
    keywords: ['calculadora iva', 'calcular iva', 'precio sin iva', 'precio con iva', 'impuestos', 'vat calculator', 'toolero'],
};

export default function VatCalculatorPage() {
    return <VatCalculatorClient />;
}
