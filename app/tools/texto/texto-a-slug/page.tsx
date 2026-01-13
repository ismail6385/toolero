import { Metadata } from 'next';
import SlugGeneratorClient from './SlugGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Slugs URL Friendly - Toolero.es',
    description: 'Convierte texto a URL (slug). Elimina acentos, espacios y caracteres especiales para crear enlaces limpios y optimizados para SEO.',
    keywords: ['slug generator', 'texto a url', 'url cleaner', 'seo slug', 'crear enlaces amigables']
};

export default function SlugGeneratorPage() {
    return <SlugGeneratorClient />;
}
