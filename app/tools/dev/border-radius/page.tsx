import { Metadata } from 'next';
import BorderRadiusClient from './BorderRadiusClient';

export const metadata: Metadata = {
    title: 'Generador Border Radius CSS Online - Toolero.es',
    description: 'Crea bordes redondeados CSS fácilmente. Ajusta cada esquina individualmente y copia el código para tu sitio web.',
    keywords: ['border radius generator', 'bordes css', 'redondear bordes', 'css3 border radius', 'generador css']
};

export default function BorderRadiusPage() {
    return <BorderRadiusClient />;
}
