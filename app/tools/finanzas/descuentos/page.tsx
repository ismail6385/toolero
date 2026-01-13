import { Metadata } from 'next';
import DiscountCalculatorClient from './DiscountCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Descuentos y Rebajas Online | Toolero.es',
    description: 'Calcula el precio final de productos con descuento. Conoce cuánto ahorras en rebajas. Fácil y rápido.',
    keywords: ['calculadora descuentos', 'calcular rebaja', 'porcentaje descuento', 'precio final', 'ahorro', 'toolero'],
};

export default function DiscountCalculatorPage() {
    return <DiscountCalculatorClient />;
}
