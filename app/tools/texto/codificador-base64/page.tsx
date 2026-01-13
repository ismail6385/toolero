import { Metadata } from 'next';
import Base64Client from './Base64Client';

export const metadata: Metadata = {
    title: 'Codificador Base64 Online - Decodificar Base64 Gratis | Toolero.es',
    description: 'Herramienta gratuita para codificar y decodificar texto en Base64 online. Soporta UTF-8, caracteres especiales y emojis. Rápido, seguro y privado.',
    keywords: ['codificador base64', 'decodificar base64', 'base64 encode', 'base64 decode', 'convertidor base64', 'base64 utf8', 'toolero'],
    openGraph: {
        title: 'Codificador y Decodificador Base64 Online - Toolero.es',
        description: 'Convierte texto a Base64 y viceversa al instante. Soporte completo para UTF-8.',
        type: 'website',
    }
};

export default function Base64Page() {
    return <Base64Client />;
}
