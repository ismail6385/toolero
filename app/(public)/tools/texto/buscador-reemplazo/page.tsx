import { Metadata } from 'next';
import FindReplaceClient from './FindReplaceClient';

export const metadata: Metadata = {
    title: 'Buscador y Reemplazo de Texto Online - Regex | Toolero.es',
    description: 'Herramienta online gratuita para buscar y reemplazar texto. Soporta expresiones regulares (Regex), coincidencia de mayúsculas y reemplazo masivo.',
    keywords: ['buscar y reemplazar', 'find and replace online', 'regex tester', 'reemplazar texto', 'editor de texto masivo', 'toolero'],
    openGraph: {
        title: 'Buscador y Reemplazo de Texto Online - Toolero.es',
        description: 'Edita tus textos masivamente con búsqueda y reemplazo avanzado.',
        type: 'website',
    }
};

export default function FindReplacePage() {
    return <FindReplaceClient />;
}
