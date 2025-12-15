import { Metadata } from 'next';
import ScreenRecorderClient from './ScreenRecorderClient';

export const metadata: Metadata = {
    title: 'Grabador de Pantalla Online Gratis - Sin Instalar Nada | Toolero.es',
    description: 'Graba la pantalla de tu PC, Mac o Móvil sin instalar programas. Graba video y audio del sistema o micrófono. Descarga al instante.',
    keywords: ['grabador de pantalla', 'grabar pantalla online', 'screen recorder', 'grabar escritorio', 'video capture', 'toolero'],
};

export default function ScreenRecorderPage() {
    return <ScreenRecorderClient />;
}
