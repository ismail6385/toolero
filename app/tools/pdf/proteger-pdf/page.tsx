import { Metadata } from 'next';
import ProtectPdfClient from './ProtectPdfClient';

export const metadata: Metadata = {
    title: 'Proteger PDF con Contraseña Online | Encriptar PDF | Toolero.es',
    description: 'Añade una contraseña segura a tus archivos PDF. Encripta tus documentos confidenciales gratis y sin subir archivos.',
    keywords: ['proteger pdf', 'encriptar pdf', 'contraseña pdf', 'pdf password', 'seguridad pdf', 'toolero'],
};

export default function ProtectPdfPage() {
    return <ProtectPdfClient />;
}
