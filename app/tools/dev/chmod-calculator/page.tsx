import { Metadata } from 'next';
import ChmodCalculatorClient from './ChmodCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora Chmod Online - Permisos Linux | Toolero.es',
    description: 'Genera códigos de permisos chmod para archivos y directorios en Linux/Unix. Interfaz visual fácil de usar (777, 755, etc).',
    keywords: ['calculadora chmod', 'chmod generator', 'permisos linux', 'linux permissions', 'chmod 777', 'toolero'],
};

export default function ChmodCalculatorPage() {
    return <ChmodCalculatorClient />;
}
