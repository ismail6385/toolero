import { Metadata } from 'next';
import UnixTimestampClient from './UnixTimestampClient';

export const metadata: Metadata = {
    title: 'Conversor Timestamp Unix y Hora Actual - Toolero.es',
    description: 'Obtén el Unix Timestamp actual (Epoch Time). Convierte de fecha a timestamp y viceversa online.',
    keywords: ['unix timestamp', 'epoch time', 'timestamp actual', 'fecha a timestamp', 'conversor tiempo']
};

export default function UnixTimestampPage() {
    return <UnixTimestampClient />;
}
