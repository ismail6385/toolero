import { Metadata } from 'next';
import YouTubeThumbnailClient from './YouTubeThumbnailClient';

export const metadata: Metadata = {
    title: 'Descargar Miniaturas de YouTube - Thumbnails HD | Toolero.es',
    description: 'Descarga gratis la imagen miniatura de cualquier video de YouTube en máxima calidad (HD, 4K).',
    keywords: ['descargar miniatura youtube', 'youtube thumbnail downloader', 'miniatura hd', 'instalar miniatura', 'toolero'],
};

export default function YouTubeThumbnailPage() {
    return <YouTubeThumbnailClient />;
}
