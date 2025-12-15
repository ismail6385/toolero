import { Metadata } from 'next';
import LoanCalculatorClient from './LoanCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Préstamos e Hipotecas Online Gratis | Toolero.es',
    description: 'Calcula la cuota mensual de tu préstamo o hipoteca. Conoce los intereses totales y tabla de amortización simple.',
    keywords: ['calculadora prestamos', 'hipoteca', 'cuota mensual', 'intereses prestamo', 'simulador prestamo', 'toolero'],
};

export default function LoanCalculatorPage() {
    return <LoanCalculatorClient />;
}
