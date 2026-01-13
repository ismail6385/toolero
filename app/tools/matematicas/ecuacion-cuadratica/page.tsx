import { Metadata } from 'next';
import QuadraticSolverClient from './QuadraticSolverClient';

export const metadata: Metadata = {
    title: 'Solucionador Ecuaciones Cuadráticas - Toolero.es',
    description: 'Resuelve ecuaciones de segundo grado (cuadráticas) al instante. Encuentra las raíces x1 y x2 con la fórmula general.',
    keywords: ['ecuacion cuadratica', 'segundo grado', 'formula general', 'algebra', 'calculadora ecuaciones']
};

export default function QuadraticSolverPage() {
    return <QuadraticSolverClient />;
}
