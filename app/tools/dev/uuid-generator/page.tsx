import { Metadata } from 'next';
import UuidGeneratorClient from './UuidGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de UUID Online (v4) | Toolero.es',
    description: 'Genera UUIDs (Identificadores Únicos Universales) versión 4 al instante. Herramienta gratuita para desarrolladores.',
    keywords: ['generador uuid', 'uuid v4 generator', 'guid generator', 'identificador unico', 'toolero'],
};

export default function UuidGeneratorPage() {
    return <UuidGeneratorClient />;
}
