import { Metadata } from 'next';
import SqlFormatterClient from './SqlFormatterClient';

export const metadata: Metadata = {
    title: 'Formateador SQL Online - Toolero.es',
    description: 'Embellece y ordena tus consultas SQL (Beautifier). Herramienta gratuita para bases de datos MySQL, PostgreSQL, SQL Server.',
    keywords: ['sql formatter', 'sql beautifier', 'ordenar sql', 'formato sql', 'pretty print sql']
};

export default function SqlFormatterPage() {
    return <SqlFormatterClient />;
}
