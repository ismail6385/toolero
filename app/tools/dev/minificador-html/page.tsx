import { Metadata } from 'next';
import HtmlMinifierClient from './HtmlMinifierClient';

export const metadata: Metadata = {
    title: 'Minificador HTML Online Gratis | Toolero.es',
    description: 'Reduce el tamaño de tus archivos HTML eliminando espacios, comentarios y saltos de línea innecesarios.',
    keywords: ['minificador html', 'html minifier', 'comprimir html', 'optimizar html', 'toolero'],
};

export default function HtmlMinifierPage() {
    return <HtmlMinifierClient />;
}
