import { Metadata } from 'next';
import MarkdownPreviewClient from './MarkdownPreviewClient';

export const metadata: Metadata = {
    title: 'Editor Markdown Online con Vista Previa | Toolero.es',
    description: 'Escribe y visualiza Markdown en tiempo real. Convierte Markdown a HTML instantáneamente. Gratis y sin registro.',
    keywords: ['markdown editor', 'markdown preview', 'md to html', 'visor markdown', 'toolero'],
};

export default function MarkdownPreviewPage() {
    return <MarkdownPreviewClient />;
}
