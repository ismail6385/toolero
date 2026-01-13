import { Metadata } from 'next';
import DuplicateRemoverClient from './DuplicateRemoverClient';

export const metadata: Metadata = {
    title: 'Eliminar Líneas Duplicadas Online - Toolero.es',
    description: 'Herramienta gratuita para eliminar líneas repetidas de una lista de texto. Limpia duplicados al instante y ordena tus datos.',
    keywords: ['eliminar duplicados', 'quitar lineas repetidas', 'limpiar lista', 'remove duplicate lines', 'deduplicate text']
};

export default function DuplicateRemoverPage() {
    return <DuplicateRemoverClient />;
}
