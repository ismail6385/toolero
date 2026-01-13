import { Metadata } from 'next';
import WaterIntakeClient from './WaterIntakeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Agua Diaria - Hidratación | Toolero.es',
    description: 'Calcula cuánta agua debes beber al día según tu peso y actividad física para mantenerte hidratado y saludable.',
    keywords: ['calculadora agua', 'cuanta agua beber', 'hidratacion diaria', 'litros de agua al dia', 'salud', 'toolero'],
};

export default function WaterPage() {
    return <WaterIntakeClient />;
}
