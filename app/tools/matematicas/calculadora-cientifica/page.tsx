import { Metadata } from 'next';
import ScientificCalculatorClient from './ScientificCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora Científica Online - Toolero.es',
    description: 'Calculadora completa con funciones trigonométricas, raices y potencias. Interfaz sencilla y potente.',
    keywords: ['calculadora cientifica', 'calculadora online', 'trigonometria', 'seno coseno tangente', 'calculadora gratis']
};

export default function ScientificCalculatorPage() {
    return <ScientificCalculatorClient />;
}
