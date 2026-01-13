import { Metadata } from 'next';
import FibonacciClient from './FibonacciClient';

export const metadata: Metadata = {
    title: 'Generador Sucesión Fibonacci - Toolero.es',
    description: 'Genera la secuencia de Fibonacci hasta el número que desees. Útil para matemáticas y diseño.',
    keywords: ['fibonacci', 'secuencia fibonacci', 'proporcion aurea', 'sucesion matematica', 'numeros fibonacci']
};

export default function FibonacciPage() {
    return <FibonacciClient />;
}
