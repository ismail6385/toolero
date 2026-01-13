'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function PrimeCheckerClient() {
    const isPrime = (num: number) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    };

    const getFactors = (num: number) => {
        const factors = [];
        for (let i = 1; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                factors.push(i);
                if (num / i !== i) factors.push(num / i);
            }
        }
        return factors.sort((a, b) => a - b);
    };

    const check = (input: string) => {
        const n = parseInt(input);
        if (isNaN(n)) return 'Por favor ingresa un número válido.';

        const prime = isPrime(n);
        const factors = getFactors(n);

        return `Número: ${n}\n\n¿Es Primo?: ${prime ? 'SÍ ✅' : 'NO ❌'}\n\nFactores (Divisores): ${factors.join(', ')}\nTotal divisores: ${factors.length}`;
    };

    return (
        <GenericTextTool
            title="Verificador de Números Primos"
            description="Comprueba si un número es primo y visualiza todos sus divisores. Rápido y sencillo."
            icon={faCheckCircle}
            onTransform={check}
            inputLabel="Número a verificar"
            outputLabel="Análisis"
            initialValue="97"
        />
    );
}
