import { Metadata } from 'next';
import TextFormatterClient from './TextFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador de Texto Gratis - Limpiar y Formatear Texto Online',
    description: 'Formatea y limpia texto online gratis. Elimina HTML, corrige puntuación, normaliza espacios, capitaliza y más. Herramienta 100% gratuita.',
    keywords: [
        'formateador de texto',
        'formatear texto',
        'limpiar texto',
        'limpiar texto online',
        'eliminar html',
        'eliminar html de texto',
        'corregir puntuacion',
        'normalizar espacios',
        'capitalizar texto',
        'formato de texto',
        'text formatter',
        'clean text online',
        'formatear texto online',
        'herramienta formatear texto',
        'limpiar formato texto',
        'quitar formato texto',
        'formateo de texto',
        'toolero'
    ],
    openGraph: {
        title: 'Formateador y Limpiador de Texto Online - Toolero.es',
        description: 'Limpia, estructura y da formato profesional a tus textos en segundos.',
        type: 'website',
    }
};

export default function TextFormatterPage() {
    return <TextFormatterClient />;
}
