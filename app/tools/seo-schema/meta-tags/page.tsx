import { Metadata } from 'next';
import MetaTagsClient from './MetaTagsClient';

export const metadata: Metadata = {
    title: 'Generador de Meta Tags SEO - Toolero.es',
    description: 'Crea etiquetas meta HTML para mejorar el SEO de tu sitio web. Título, descripción, keywords y robots.',
    keywords: ['meta tags generator', 'generador meta tags', 'seo tags', 'meta description generator', 'html head']
};

export default function MetaTagsPage() {
    return <MetaTagsClient />;
}
