import { Metadata } from 'next';
import CssMinifierClient from './CssMinifierClient';

export const metadata: Metadata = {
    title: 'Minificador CSS Online Gratis | Toolero.es',
    description: 'Comprime tu código CSS eliminando espacios innecesarios, comentarios y saltos de línea para optimizar la velocidad de tu web.',
    keywords: ['minificador css', 'css minifier', 'comprimir css', 'optimizar css', 'toolero'],
};

export default function CssMinifierPage() {
    return <CssMinifierClient />;
}
