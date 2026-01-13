import { Metadata } from 'next';
import Rot13Client from './Rot13Client';

export const metadata: Metadata = {
    title: 'Cifrado ROT13 Online - Toolero.es',
    description: 'Herramienta para encriptar y desencriptar texto con ROT13. Oculta mensajes, spoilers o pistas fácilmente.',
    keywords: ['rot13', 'cifrado cesar', 'encriptar texto', 'rot13 online', 'ocultar spoilers']
};

export default function Rot13Page() {
    return <Rot13Client />;
}
