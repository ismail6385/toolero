import { Metadata } from 'next';
import ReactionTestClient from './ReactionTestClient';

export const metadata: Metadata = {
    title: 'Test de Tiempos de Reacción (Reflejos) - Toolero.es',
    description: 'Comprueba tus reflejos en milisegundos. Test de reacción online simple y rápido.',
    keywords: ['test reaccion', 'test reflejos', 'reaction time test', 'milisegundos', 'velocidad reaccion']
};

export default function ReactionTestPage() {
    return <ReactionTestClient />;
}
