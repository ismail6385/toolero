import { Metadata } from 'next';
import HtmlEntitiesClient from './HtmlEntitiesClient';

export const metadata: Metadata = {
    title: 'HTML Encode / Decode Online - Toolero.es',
    description: 'Codifica caracteres especiales a entidades HTML (&amp;) y decodifícalos. Herramienta de escape para desarrolladores web.',
    keywords: ['html entities', 'html encode', 'html decode', 'escapar html', 'caracteres especiales html']
};

export default function HtmlEntitiesPage() {
    return <HtmlEntitiesClient />;
}
