import { Metadata } from 'next';
import TextFormatterClient from './TextFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador de Texto Online Gratis - Limpiar Texto | Toolero.es',
    description: 'Herramienta gratuita para limpiar y formatear texto: eliminar HTML, corregir puntuación, normalizar espacios y más. Mejora la legibilidad al instante.',
    keywords: ['formateador texto', 'limpiar texto', 'eliminar html online', 'corregir puntuación', 'normalizar espacios', 'format text online', 'toolero'],
    openGraph: {
        title: 'Formateador y Limpiador de Texto Online - Toolero.es',
        description: 'Limpia, estructura y da formato profesional a tus textos en segundos.',
        type: 'website',
    }
};

export default function TextFormatterPage() {
    return <TextFormatterClient />;
}
