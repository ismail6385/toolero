import { Metadata } from 'next';
import JwtDecoderClient from './JwtDecoderClient';

export const metadata: Metadata = {
    title: 'Decodificador JWT Online Segura - Toolero.es',
    description: 'Lee el contenido (payload) de tokens JWT sin enviarlos al servidor. Ilimitado y 100% privado.',
    keywords: ['jwt decoder', 'leer jwt', 'json web token', 'decodificar token', 'jwt debug']
};

export default function JwtDecoderPage() {
    return <JwtDecoderClient />;
}
