import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';

export const metadata: Metadata = {
    title: 'Conversor de Mayúsculas y Minúsculas Online - Toolero.es',
    description: 'Convierte texto a MAYÚSCULAS, minúsculas, Capitalizar Títulos, formato oración y más. Herramienta gratuita para cambiar letras online.',
    keywords: ['conversor mayúsculas', 'convertir a minúsculas', 'capitalizar texto', 'cambiar mayúsculas minúsculas', 'texto online', 'case converter', 'toolero'],
    openGraph: {
        title: 'Conversor de Mayúsculas y Minúsculas Online - Toolero.es',
        description: 'Transforma mayúsculas y minúsculas al instante. Varios formatos disponibles.',
        type: 'website',
    }
};

export default function CaseConverterPage() {
    return <CaseConverterClient />;
}
