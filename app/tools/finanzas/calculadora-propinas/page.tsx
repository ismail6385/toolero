import { Metadata } from 'next';
import TipCalculatorClient from './TipCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Propinas Online | Dividir la Cuenta | Toolero.es',
    description: 'Calcula la propina justa y divide la cuenta entre amigos fácilmente. Ideal para restaurantes, viajes y grupos.',
    keywords: ['calculadora propinas', 'dividir cuenta', 'calcular tip', 'tip calculator', 'propinas restaurante', 'toolero'],
};

export default function TipCalculatorPage() {
    return <TipCalculatorClient />;
}
