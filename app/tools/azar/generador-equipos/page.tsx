import { Metadata } from 'next';
import TeamGeneratorClient from './TeamGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Equipos Aleatorios - Toolero.es',
    description: 'Crea equipos y grupos equilibrados al azar desde una lista de nombres. Ideal para torneos, clases y dinámicas.',
    keywords: ['generador de equipos', 'sorteo grupos', 'team generator', 'dividir en grupos', 'equipos aleatorios']
};

export default function TeamGeneratorPage() {
    return <TeamGeneratorClient />;
}
