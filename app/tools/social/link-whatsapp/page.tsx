import { Metadata } from 'next';
import LinkWhatsappClient from './LinkWhatsappClient';

export const metadata: Metadata = {
    title: 'Generador de Enlaces de WhatsApp con Mensaje | Toolero.es',
    description: 'Crea links directos de WhatsApp (wa.me) personalizados con tu número y un mensaje predefinido. Ideal para Instagram y ventas.',
    keywords: ['link whatsapp', 'generador enlace whatsapp', 'wa.me generator', 'whatsapp link', 'toolero'],
};

export default function LinkWhatsappPage() {
    return <LinkWhatsappClient />;
}
