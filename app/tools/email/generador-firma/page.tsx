import { Metadata } from 'next';
import EmailSignatureClient from './EmailSignatureClient';

export const metadata: Metadata = {
    title: 'Generador de Firmas de Email Gratis - Plantillas Profesionales | Toolero.es',
    description: 'Crea firmas de correo electrónico profesionales y personalizadas para Gmail, Outlook, Apple Mail y Yahoo. Plantillas gratis, sin marcas de agua.',
    keywords: ['firma de email', 'email signature generator', 'plantillas firma correo', 'firma gmail gratis', 'firma outlook', 'toolero'],
    openGraph: {
        title: 'Generador de Firmas de Email Gratis - Toolero.es',
        description: 'Diseña tu firma de correo profesional en segundos.',
        type: 'website',
    }
};

export default function EmailSignaturePage() {
    return <EmailSignatureClient />;
}
