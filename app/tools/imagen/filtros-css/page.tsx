import { Metadata } from 'next';
import CssFiltersClient from './CssFiltersClient';

export const metadata: Metadata = {
    title: 'Editor de Fotos y Filtros CSS Online - Toolero.es',
    description: 'Aplica filtros profesionales a tus fotos gratis. Brillo, contraste, blanco y negro, sepia y más.',
    keywords: ['filtros fotos online', 'editor fotos css', 'efectos imagenes', 'filtros instagram online', 'editar brillo contraste']
};

export default function CssFiltersPage() {
    return <CssFiltersClient />;
}
