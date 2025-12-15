import { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

export const metadata: Metadata = {
    title: 'Unir PDF Online Gratis - Combinar Archivos PDF | Toolero.es',
    description: 'Une múltiples archivos PDF en un solo documento de forma rápida y segura. Herramienta 100% gratuita y privada, sin subir archivos al servidor.',
    keywords: ['unir pdf', 'combinar pdf', 'merge pdf', 'juntar pdf', 'pdf merger online', 'toolero'],
};

export default function MergePdfPage() {
    return <MergePdfClient />;
}
