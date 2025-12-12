import { Metadata } from 'next';
import CitationGeneratorClient from './CitationGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Citas APA, MLA, Harvard Online Gratis | Toolero.es',
    description: 'Crea citas y referencias bibliográficas en formato APA, MLA, Chicago y Harvard automáticamente. Ideal para estudiantes y académicos.',
    keywords: ['generador citas apa', 'citar web apa', 'referencias bibliograficas', 'citation generator', 'mla generator', 'harvard referencing', 'toolero'],
    openGraph: {
        title: 'Generador de Citas APA y MLA Online - Toolero.es',
        description: 'Genera referencias bibliográficas perfectas en segundos.',
        type: 'website',
    }
};

export default function CitationGeneratorPage() {
    return <CitationGeneratorClient />;
}
