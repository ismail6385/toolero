import { Metadata } from 'next';
import OpenGraphClient from './OpenGraphClient';

export const metadata: Metadata = {
    title: 'Generador Open Graph Facebook LinkedIn - Toolero.es',
    description: 'Genera etiquetas Open Graph (og:title, og:image) para optimizar cómo se comparten tus enlaces en redes sociales.',
    keywords: ['open graph generator', 'facebook tags', 'linkedin tags', 'og tags', 'social media preview']
};

export default function OpenGraphPage() {
    return <OpenGraphClient />;
}
