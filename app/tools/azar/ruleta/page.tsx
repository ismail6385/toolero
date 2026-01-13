import { Metadata } from 'next';
import RouletteClient from './RouletteClient';

export const metadata: Metadata = {
    title: 'Ruleta de Decisiones Online - Toolero.es',
    description: 'Crea tu propia ruleta personalizada y gira para tomar decisiones aleatorias. Wheel of Fortune online.',
    keywords: ['ruleta decisiones', 'wheel of fortune', 'ruleta aleatoria', 'tomar decisiones', 'girar ruleta']
};

export default function RoulettePage() {
    return <RouletteClient />;
}
