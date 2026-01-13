import { Metadata } from 'next';
import PrefixSuffixClient from './PrefixSuffixClient';

export const metadata: Metadata = {
    title: 'Añadir Prefijo y Sufijo Online - Toolero.es',
    description: 'Agrega texto al inicio o al final de cada línea de una lista. Ideal para crear consultas SQL, listas de URLs o código.',
    keywords: ['añadir prefijo', 'añadir sufijo', 'editar lista', 'prefix suffix adder', 'manipular texto']
};

export default function PrefixSuffixPage() {
    return <PrefixSuffixClient />;
}
