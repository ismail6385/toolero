import { Metadata } from 'next';
import ColorMixerClient from './ColorMixerClient';

export const metadata: Metadata = {
    title: 'Mezclador de Colores Online - Toolero.es',
    description: 'Mezcla dos colores (Hex) y genera una paleta de pasos intermedios. Herramienta para diseñadores gráficos y web.',
    keywords: ['mezclador colores', 'color mixer', 'blend colors', 'mezclar hex', 'gradiente pasos']
};

export default function ColorMixerPage() {
    return <ColorMixerClient />;
}
