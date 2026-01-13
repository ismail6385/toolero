import { Metadata } from 'next';
import RuleOfThreeClient from './RuleOfThreeClient';

export const metadata: Metadata = {
    title: 'Calculadora Regla de Tres Online Gratis - Proporcionalidad | Toolero.es',
    description: 'Resuelve problemas de proporcionalidad directa e inversa con la calculadora de Regla de Tres online gratuita.',
    keywords: ['regla de tres', 'calculadora regla de tres', 'proporcionalidad', 'matemáticas online', 'toolero'],
};

export default function RuleOfThreePage() {
    return <RuleOfThreeClient />;
}
