import { Metadata } from 'next';
import OvulationCalculatorClient from './OvulationCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Ovulación y Días Fértiles | Calendario Fertilidad | Toolero.es',
    description: 'Calcula tus días más fértiles y la fecha de tu próxima ovulación para aumentar las probabilidades de embarazo.',
    keywords: ['calculadora ovulacion', 'dias fertiles', 'calendario fertilidad', 'quedar embarazada', 'toolero'],
};

export default function OvulationCalculatorPage() {
    return <OvulationCalculatorClient />;
}
