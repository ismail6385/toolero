import React from 'react';
import type { Metadata } from 'next';
import PomodoroClient from './PomodoroClient';

export const metadata: Metadata = {
    title: 'Cronómetro Pomodoro Online | Técnica Pomodoro | Toolero',
    description: 'Maximiza tu productividad con nuestro temporizador Pomodoro online. Intervalos de trabajo de 25 minutos y descansos de 5 minutos.',
    keywords: 'pomodoro, tecnica pomodoro, temporizador estudio, timer productividad, cronometro trabajo'
};

export default function PomodoroPage() {
    return <PomodoroClient />;
}
