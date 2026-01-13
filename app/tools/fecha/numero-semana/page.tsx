import { Metadata } from 'next';
import WeekNumberClient from './WeekNumberClient';

export const metadata: Metadata = {
    title: '¿En qué Semana estamos? Número de Semana Actual - Toolero.es',
    description: 'Consulta el número de la semana actual del año (ISO 8601). Calendario de semanas online.',
    keywords: ['numero de semana', 'semana actual', 'en que semana estamos', 'calendario semanas', 'week number']
};

export default function WeekNumberPage() {
    return <WeekNumberClient />;
}
