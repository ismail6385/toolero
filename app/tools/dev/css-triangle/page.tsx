import { Metadata } from 'next';
import CssTriangleClient from './CssTriangleClient';

export const metadata: Metadata = {
    title: 'Generador Triángulos CSS Online - Toolero.es',
    description: 'Crea triángulos CSS puros sin imágenes usando bordes. Ajusta tamaño, color y dirección fácilmente.',
    keywords: ['css triangle generator', 'triangulo css', 'generador css', 'css shapes', 'formas css']
};

export default function CssTrianglePage() {
    return <CssTriangleClient />;
}
