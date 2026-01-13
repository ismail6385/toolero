import { Metadata } from 'next';
import MemeGeneratorClient from './MemeGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Memes Online Gratis | Sin Marca de Agua | Toolero.es',
    description: 'Crea memes divertidos fácilmente. Sube tu imagen o usa plantillas, añade texto arriba y abajo, y descarga tu meme gratis.',
    keywords: ['generador memes', 'meme maker', 'crear memes online', 'memes sin marca de agua', 'meme generator', 'toolero'],
};

export default function MemeGeneratorPage() {
    return <MemeGeneratorClient />;
}
