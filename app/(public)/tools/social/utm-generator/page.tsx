import { Metadata } from 'next';
import UtmGeneratorClient from './UtmGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de UTM Online para Marketing | Campaign Builder | Toolero.es',
    description: 'Crea URLs con parámetros UTM para rastrear tus campañas de marketing en Google Analytics. Fácil y sin errores.',
    keywords: ['generador utm', 'utm builder', 'google analytics url builder', 'marketing tracking', 'campaign url', 'toolero'],
};

export default function UtmGeneratorPage() {
    return <UtmGeneratorClient />;
}
