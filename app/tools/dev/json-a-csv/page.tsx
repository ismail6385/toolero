import { Metadata } from 'next';
import JsonToCsvClient from './JsonToCsvClient';

export const metadata: Metadata = {
    title: 'Convertidor JSON a CSV Online - Toolero.es',
    description: 'Convierte archivos JSON a CSV para abrir en Excel. Herramienta gratuita para desarrolladores y analistas de datos.',
    keywords: ['json a csv', 'convertir json', 'json to csv', 'formato excel', 'json converter']
};

export default function JsonToCsvPage() {
    return <JsonToCsvClient />;
}
