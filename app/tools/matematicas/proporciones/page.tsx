import { Metadata } from 'next';
import ProportionCalculatorClient from './ProportionCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Proporciones (Regla de Tres) - Toolero.es',
    description: 'Calcula dimensiones proporcionales para imágenes, video o recetas. Herramienta de regla de tres simple.',
    keywords: ['calculadora proporciones', 'regla de tres', 'escalar imagen', 'ratio calculator', 'aspect ratio']
};

export default function ProportionCalculatorPage() {
    return <ProportionCalculatorClient />;
}
