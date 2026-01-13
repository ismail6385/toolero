import { Metadata } from 'next';
import PrimeCheckerClient from './PrimeCheckerClient';

export const metadata: Metadata = {
    title: 'Verificador de Números Primos - Toolero.es',
    description: 'Descubre si un número es primo. Encuentra todos sus divisores y factores. Herramienta matemática online.',
    keywords: ['numeros primos', 'es primo', 'calculadora primos', 'factores numero', 'divisores']
};

export default function PrimeCheckerPage() {
    return <PrimeCheckerClient />;
}
