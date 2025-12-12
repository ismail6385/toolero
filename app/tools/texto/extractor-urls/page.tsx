import { Metadata } from 'next';
import UrlExtractorClient from './ExtractorUrlsClient';

export const metadata: Metadata = {
    title: 'Extractor de URLs Online Gratis - Links Extractor | Toolero.es',
    description: 'Extrae todas las URLs, enlaces y dominios de cualquier texto. Filtra por http/https, elimina duplicados y exporta la lista limpia.',
    keywords: ['extractor urls', 'extraer links', 'sacar enlaces de texto', 'url extractor online', 'filtrar dominios', 'toolero'],
    openGraph: {
        title: 'Extractor de URLs y Enlaces Online - Toolero.es',
        description: 'Herramienta gratuita para extraer y limpiar listas de enlaces desde cualquier texto.',
        type: 'website',
    }
};

export default function UrlExtractorPage() {
    return <UrlExtractorClient />;
}
