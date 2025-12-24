import { Metadata } from 'next';
import MetaAnalyzerClient from './MetaAnalyzerClient';

export const metadata: Metadata = {
    title: 'Analizador de Meta Tags Online (SEO) | Toolero.es',
    description: 'Analiza el SEO On-Page de cualquier URL. Verifica Title, Description, Robots, Viewport, Open Graph y Twitter Cards al instante.',
    keywords: ['analizador meta tags', 'seo analyzer', 'check meta tags', 'open graph checker', 'seo on page', 'toolero'],
};

export default function MetaAnalyzerPage() {
    return <MetaAnalyzerClient />;
}
