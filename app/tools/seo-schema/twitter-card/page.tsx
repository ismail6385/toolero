import { Metadata } from 'next';
import TwitterCardClient from './TwitterCardClient';

export const metadata: Metadata = {
    title: 'Generador Twitter Cards Validator - Toolero.es',
    description: 'Crea y previsualiza Twitter Cards para tus enlaces. Summary, Summary Large Image y App cards soportadas.',
    keywords: ['twitter card generator', 'twitter validator', 'seo twitter', 'social share preview', 'twitter tags']
};

export default function TwitterCardPage() {
    return <TwitterCardClient />;
}
