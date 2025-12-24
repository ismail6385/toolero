import { Metadata } from 'next';
import TextComparatorClient from './TextComparatorClient';

export const metadata: Metadata = {
    title: 'Comparador de Textos Online - Diff Tool Gratis | Toolero.es',
    description: 'Compara dos textos y encuentra las diferencias al instante. Herramienta Diff online gratuita para desarrolladores y escritores.',
    keywords: ['comparador de textos', 'diff online', 'comparar archivos', 'diferencias texto', 'text compare', 'toolero'],
    openGraph: {
        title: 'Comparador de Textos Online - Toolero.es',
        description: 'Encuentra diferencias entre dos textos fácilmente.',
        type: 'website',
    }
};

export default function CompareTextPage() {
    return <TextComparatorClient />;
}
