import { Metadata } from 'next';
import DateDiffClient from './DateDiffClient';

export const metadata: Metadata = {
    title: 'Calcular Días entre Fechas - Diferencia de Fechas | Toolero.es',
    description: 'Calcula el número exacto de días, semanas, meses y años entre dos fechas. Herramienta útil para planificar eventos y plazos.',
    keywords: ['diferencia fechas', 'dias entre fechas', 'calcular dias', 'date calculator', 'toolero'],
};

export default function DateDiffPage() {
    return <DateDiffClient />;
}
