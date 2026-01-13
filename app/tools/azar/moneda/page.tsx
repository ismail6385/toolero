import { Metadata } from 'next';
import CoinFlipClient from './CoinFlipClient';

export const metadata: Metadata = {
    title: 'Lanzar Moneda Virtual (Cara o Cruz) - Toolero.es',
    description: 'Simulador de lanzamiento de moneda (Flip a Coin). Decide tu suerte con un Cara o Cruz aleatorio.',
    keywords: ['lanzar moneda', 'cara o cruz', 'flip a coin', 'moneda virtual', 'sorteo moneda']
};

export default function CoinFlipPage() {
    return <CoinFlipClient />;
}
