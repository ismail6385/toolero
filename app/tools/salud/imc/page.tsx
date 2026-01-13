import { Metadata } from 'next';
import BMIClient from './BMIClient';

export const metadata: Metadata = {
    title: 'Calculadora IMC Online Gratis - Índice de Masa Corporal | Toolero.es',
    description: 'Calcula tu IMC (Índice de Masa Corporal) gratis. Descubre si estás en tu peso ideal según la OMS. Calculadora para hombres, mujeres y niños.',
    keywords: ['calculadora imc', 'indice de masa corporal', 'bmi calculator', 'peso ideal', 'salud online', 'toolero'],
};

export default function BMIPage() {
    return <BMIClient />;
}
