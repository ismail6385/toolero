import { Metadata } from 'next';
import SpellCheckerClient from './SpellCheckerClient';

export const metadata: Metadata = {
    title: 'Verificador de Ortografía y Gramática Online Gratis | Toolero.es',
    description: 'Comprueba la ortografía y gramática de tus textos gratis. Detecta errores comunes, repeticiones y problemas de estilo al instante.',
    keywords: ['corrector ortográfico', 'verificador gramática', 'spell checker online', 'corregir texto', 'revisar ortografía', 'toolero'],
    openGraph: {
        title: 'Verificador de Ortografía y Gramática Online - Toolero.es',
        description: 'Herramienta gratuita para revisar y perfeccionar tus textos.',
        type: 'website',
    }
};

export default function SpellCheckerPage() {
    return <SpellCheckerClient />;
}
