import { Metadata } from 'next';
import RoiCalculatorClient from './RoiCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora ROI Online (Retorno de Inversión) | Toolero.es',
    description: 'Calcula el Retorno sobre la Inversión (ROI) de tus campañas de marketing o proyectos. Fórmula simple y precisa.',
    keywords: ['calculadora roi', 'retorno inversion', 'roi marketing', 'formula roi', 'calcular rentabilidad', 'toolero'],
};

export default function RoiCalculatorPage() {
    return <RoiCalculatorClient />;
}
