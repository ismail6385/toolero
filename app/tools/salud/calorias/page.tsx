import { Metadata } from 'next';
import CaloriesClient from './CaloriesClient';

export const metadata: Metadata = {
    title: 'Calculadora de Calorías Diarias (TMB) - Gasto Energético | Toolero.es',
    description: 'Calcula tu Tasa Metabólica Basal (TMB/BMR) y las calorías diarias necesarias para mantener, perder o ganar peso.',
    keywords: ['calculadora calorias', 'tmb calculator', 'bmr calculator', 'gasto energetico', 'calorias diarias', 'perder peso', 'toolero'],
};

export default function CaloriesPage() {
    return <CaloriesClient />;
}
