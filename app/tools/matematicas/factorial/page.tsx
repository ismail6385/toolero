import { Metadata } from 'next';
import FactorialClient from './FactorialClient';

export const metadata: Metadata = {
    title: 'Calculadora Factorial Online (n!) - Toolero.es',
    description: 'Calcula el factorial de cualquier número entero. Soluciones rápidas para matemáticas y estadística.',
    keywords: ['calculadora factorial', 'factorial', 'n factorial', 'matematicas', 'permutaciones']
};

export default function FactorialPage() {
    return <FactorialClient />;
}
