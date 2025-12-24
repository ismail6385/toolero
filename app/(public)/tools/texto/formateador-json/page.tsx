import { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador y Validador JSON Online - Pretty Print | Toolero.es',
    description: 'Herramienta online gratuita para formatear, validar y minificar código JSON. Visualiza tus datos JSON de forma clara y legible (Pretty Print).',
    keywords: ['formateador json', 'validator json', 'json formatter', 'pretty print json', 'minificar json', 'json viewer', 'toolero'],
    openGraph: {
        title: 'Formateador y Validador JSON Online - Toolero.es',
        description: 'Formatea, valida y minifica tus archivos JSON al instante.',
        type: 'website',
    }
};

export default function JsonFormatterPage() {
    return <JsonFormatterClient />;
}
