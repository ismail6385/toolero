import { Metadata } from 'next';
import CompoundInterestClient from './CompoundInterestClient';

export const metadata: Metadata = {
    title: 'Calculadora de Interés Compuesto Online | Toolero.es',
    description: 'Calcula el crecimiento de tu dinero con el interés compuesto. Proyecta tus inversiones a futuro con aportaciones mensuales.',
    keywords: ['calculadora interes compuesto', 'compound interest calculator', 'inversion', 'crecimiento dinero', 'finanzas personales', 'toolero'],
};

export default function CompoundInterestPage() {
    return <CompoundInterestClient />;
}
