import { Metadata } from 'next';
import CsvToJsonClient from './CsvToJsonClient';

export const metadata: Metadata = {
    title: 'Convertidor CSV a JSON Online - Toolero.es',
    description: 'Convierte tablas CSV a formato JSON. Ideal para migrar datos de Excel a aplicaciones web o bases de datos.',
    keywords: ['csv a json', 'convertir csv', 'csv to json', 'excel a json', 'csv converter']
};

export default function CsvToJsonPage() {
    return <CsvToJsonClient />;
}
