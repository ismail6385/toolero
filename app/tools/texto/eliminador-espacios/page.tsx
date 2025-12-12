import { Metadata } from 'next';
import SpaceRemoverClient from './SpaceRemoverClient';

export const metadata: Metadata = {
    title: 'Eliminador de Espacios Online Gratis - Limpiar Texto | Toolero.es',
    description: 'Herramienta gratuita para eliminar espacios extra, saltos de línea y tabulaciones de tu texto. Limpia y formatea texto online en segundos.',
    keywords: ['eliminar espacios', 'limpiar texto', 'borrar saltos de línea', 'quitar espacios extra', 'formateador de texto online', 'remover espacios en blanco'],
    openGraph: {
        title: 'Eliminador de Espacios Online Gratis - Toolero.es',
        description: 'Elimina espacios, saltos de línea y tabulaciones de tu texto instantáneamente.',
        type: 'website',
    }
};

export default function SpaceRemoverPage() {
    return <SpaceRemoverClient />;
}
