import { Metadata } from 'next';
import BoxShadowClient from './BoxShadowClient';

export const metadata: Metadata = {
    title: 'Generador Box Shadow CSS Online - Toolero.es',
    description: 'Crea sombras CSS personalizadas con vista previa en tiempo real. Genera código box-shadow compatible con todos los navegadores.',
    keywords: ['box shadow generator', 'generador sombras css', 'css shadow', 'sombra div css', 'css3 generator']
};

export default function BoxShadowPage() {
    return <BoxShadowClient />;
}
