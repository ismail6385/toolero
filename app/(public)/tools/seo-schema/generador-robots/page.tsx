import { Metadata } from 'next';
import RobotsGeneratorClient from './RobotsGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Robots.txt Online | SEO Tools | Toolero.es',
    description: 'Crea el archivo robots.txt perfecto para tu sitio web. Controla qué partes de tu web pueden rastrear Google y otros bots.',
    keywords: ['generador robots.txt', 'crear robots.txt', 'bloquear bots', 'seo tecnico', 'toolero'],
};

export default function RobotsGeneratorPage() {
    return <RobotsGeneratorClient />;
}
