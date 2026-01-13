import { Metadata } from 'next';
import RandomListClient from './RandomListClient';

export const metadata: Metadata = {
    title: 'Generador de Listas Aleatorias (Shuffle) - Toolero.es',
    description: 'Baraja y ordena aleatoriamente listas de nombres, equipos o números. Randomizador de listas online.',
    keywords: ['randomizar lista', 'shuffle list', 'barajar nombres', 'orden aleatorio', 'sorteo lista']
};

export default function RandomListPage() {
    return <RandomListClient />;
}
