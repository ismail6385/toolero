import { Metadata } from 'next';
import RandomNumberClient from './RandomNumberClient';

export const metadata: Metadata = {
    title: 'Generador de Números Aleatorios Online - Sorteos y Azar | Toolero.es',
    description: 'Genera números al azar entre un rango específico. Ideal para sorteos, juegos, lotería y decisiones aleatorias.',
    keywords: ['numeros aleatorios', 'generador de numeros', 'azar', 'sorteos online', 'random number generator', 'toolero'],
};

export default function RandomNumberPage() {
    return <RandomNumberClient />;
}
