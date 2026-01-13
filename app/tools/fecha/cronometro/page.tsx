import { Metadata } from 'next';
import StopwatchClient from './StopwatchClient';

export const metadata: Metadata = {
    title: 'Cronómetro Online Gratis - Precisión con Vueltas | Toolero.es',
    description: 'Cronómetro online gratuito y preciso con función de vueltas (Laps). Ideal para deportes, estudio y medición de tiempo.',
    keywords: ['cronometro online', 'stopwatch', 'cronometro gratis', 'timekeeper', 'toolero'],
};

export default function StopwatchPage() {
    return <StopwatchClient />;
}
