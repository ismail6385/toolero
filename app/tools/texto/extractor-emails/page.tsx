import { Metadata } from 'next';
import EmailExtractorClient from './EmailExtractorClient';

export const metadata: Metadata = {
    title: 'Extractor de Emails Online Gratis - Email Scraper | Toolero.es',
    description: 'Extrae direcciones de correo electrónico de cualquier texto o lista. Limpia duplicados, ordena alfabéticamente y exporta tu lista de emails gratis.',
    keywords: ['extractor emails', 'extraer correos', 'sacar emails de texto', 'email extractor online', 'email scraper', 'toolero'],
    openGraph: {
        title: 'Extractor de Emails Online - Toolero.es',
        description: 'Herramienta gratuita para extraer y limpiar listas de correos electrónicos.',
        type: 'website',
    }
};

export default function EmailExtractorPage() {
    return <EmailExtractorClient />;
}
