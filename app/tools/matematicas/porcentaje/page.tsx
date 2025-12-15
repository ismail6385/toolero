import { Metadata } from 'next';
import PercentageClient from './PercentageClient';

export const metadata: Metadata = {
    title: 'Calculadora de Porcentajes Online Gratis - Descuentos y Aumentos | Toolero.es',
    description: 'Calcula porcentajes fácilmente. Encuentra el porcentaje de un número, descuentos, aumentos, y diferencias porcentuales.',
    keywords: ['calculadora porcentaje', 'calcular descuento', 'calcular aumento', 'diferencia porcentual', 'percentage calculator', 'toolero'],
};

export default function PercentagePage() {
    return <PercentageClient />;
}
