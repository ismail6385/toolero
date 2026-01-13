import { Metadata } from 'next';
import HtmlColorsClient from './HtmlColorsClient';

export const metadata: Metadata = {
    title: 'Lista de Colores HTML y HEX - Toolero.es',
    description: 'Tabla de referencia rápida con todos los nombres de colores CSS estándar y sus códigos hexadecimales.',
    keywords: ['colores html', 'nombres colores css', 'lista colores hex', 'tabla colores web', 'referencia colores']
};

export default function HtmlColorsPage() {
    return <HtmlColorsClient />;
}
