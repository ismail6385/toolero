import { Metadata } from 'next';
import PregnancyCalculatorClient from './PregnancyCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Embarazo y Semanas | FPP | Toolero.es',
    description: 'Calcula tu Fecha Probable de Parto (FPP), semanas de gestación y trimestres. Calendario de embarazo online gratis.',
    keywords: ['calculadora embarazo', 'fecha parto', 'semanas embarazo', 'fpp', 'gestacion', 'toolero'],
};

export default function PregnancyCalculatorPage() {
    return <PregnancyCalculatorClient />;
}
