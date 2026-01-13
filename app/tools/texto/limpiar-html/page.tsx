import { Metadata } from 'next';
import HtmlCleanerClient from './HtmlCleanerClient';

export const metadata: Metadata = {
    title: 'Limpiador de HTML a Texto Plano - Toolero.es',
    description: 'Elimina etiquetas HTML de cualquier texto. Extrae el contenido legible de códigos web de forma rápida y sencilla.',
    keywords: ['limpiar html', 'html a texto', 'strip tags', 'extractor de texto', 'quitar etiquetas html']
};

export default function HtmlCleanerPage() {
    return <HtmlCleanerClient />;
}
