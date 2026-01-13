'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';

export default function FibonacciClient() {
    const generateFibonacci = (limitStr: string) => {
        const n = parseInt(limitStr);
        if (isNaN(n) || n < 1) return 'Ingresa un número mayor a 0.';
        if (n > 1000) return 'El límite máximo es 1000 números para evitar colgar el navegador.';

        const sequence = [0, 1];

        if (n === 1) return '0';
        if (n === 2) return '0, 1';

        for (let i = 2; i < n; i++) {
            // Use BigInt for large numbers
            const next = BigInt(sequence[i - 1]) + BigInt(sequence[i - 2]);
            // Store as string/number safely ? Actually, let's keep array of strings for BigInt support
            // But for this simple logic, let's switch entirely to BigInt
        }

        // Re-do with BigInt from start
        const fib = [BigInt(0), BigInt(1)];
        for (let i = 2; i < n; i++) {
            fib.push(fib[i - 1] + fib[i - 2]);
        }

        return fib.join(', ');
    };

    return (
        <GenericTextTool
            title="Generador Secuencia Fibonacci"
            description="Muestra los primeros N números de la famosa secuencia de Fibonacci (0, 1, 1, 2...)."
            icon={faSortNumericDown}
            onTransform={generateFibonacci}
            inputLabel="Cantidad de números a mostrar (N)"
            outputLabel="Secuencia Resultante"
            initialValue="10"
        />
    );
}
