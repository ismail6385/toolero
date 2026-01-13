import { Metadata } from 'next';
import UrlParserClient from './UrlParserClient';

export const metadata: Metadata = {
    title: 'Parser de URL Online - Toolero.es',
    description: 'Analiza URLs y extrae sus parámetros query, protocolo, host y path. Herramienta de depuración para desarrolladores web.',
    keywords: ['url parser', 'analizar url', 'query params', 'url decoder', 'componentes url']
};

export default function UrlParserPage() {
    return <UrlParserClient />;
}
