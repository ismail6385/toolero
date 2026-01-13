import { Metadata } from 'next';
import DiceRollerClient from './DiceRollerClient';

export const metadata: Metadata = {
    title: 'Dado Virtual Online (1-6) - Toolero.es',
    description: 'Lanza dados online gratis. Generador aleatorio de números del 1 al 6 para juegos de mesa y rol.',
    keywords: ['lanzar dados', 'dado virtual', 'dice roller', 'generador dados', 'dados online']
};

export default function DiceRollerPage() {
    return <DiceRollerClient />;
}
