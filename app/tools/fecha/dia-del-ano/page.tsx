import { Metadata } from 'next';
import DayOfYearClient from './DayOfYearClient';

export const metadata: Metadata = {
    title: 'Día del Año Actual (1-365) - Toolero.es',
    description: 'Calcula qué número de día es hoy dentro del año. Consulta el progreso anual.',
    keywords: ['dia del año', 'numero de dia', 'que dia es hoy', 'calendario anual', 'day of year']
};

export default function DayOfYearPage() {
    return <DayOfYearClient />;
}
