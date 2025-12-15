import { Metadata } from 'next';
import TimerClient from './TimerClient';

export const metadata: Metadata = {
    title: 'Temporizador Online Gratis - Cuenta Regresiva con Alarma | Toolero.es',
    description: 'Temporizador online (Timer) con alarma visual y sonora. Configura horas, minutos y segundos para estudiar, cocinar o trabajar.',
    keywords: ['temporizador online', 'timer', 'cuenta regresiva', 'alarma online', 'countdown', 'toolero'],
};

export default function TimerPage() {
    return <TimerClient />;
}
