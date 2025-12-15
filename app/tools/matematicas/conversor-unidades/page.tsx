import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
    title: 'Conversor de Unidades Online Gratis - Peso, Longitud, Temperatura | Toolero.es',
    description: 'Convierte unidades de medida fácilmente. Longitud (km, m, cm), Peso (kg, lb), Temperatura (C, F) y más.',
    keywords: ['conversor unidades', 'convertir medidas', 'kg a libras', 'metros a pies', 'centigrados a fahrenheit', 'toolero'],
};

export default function UnitConverterPage() {
    return <UnitConverterClient />;
}
