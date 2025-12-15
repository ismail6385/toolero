import { Metadata } from 'next';
import AgeCalculatorClient from './AgeCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Edad Exacta - Años Meses y Días | Toolero.es',
    description: 'Calcula tu edad exacta. Descubre cuántos años, meses, semanas, días, horas y segundos has vivido.',
    keywords: ['calculadora edad', 'calcular edad exacta', 'cuantos dias he vivido', 'age calculator', 'toolero'],
};

export default function AgeCalculatorPage() {
    return <AgeCalculatorClient />;
}
