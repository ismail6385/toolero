'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

export default function GcdLcmClient() {
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);
    };

    const calculate = (input: string) => {
        // Expect input like "12, 18"
        const numbers = input.split(/[\s,]+/).map(n => parseInt(n)).filter(n => !isNaN(n));

        if (numbers.length < 2) return 'Introduce al menos dos números separados por comas.';

        const resultGCD = numbers.reduce((acc, curr) => gcd(acc, curr));
        const resultLCM = numbers.reduce((acc, curr) => lcm(acc, curr));

        return `Números: ${numbers.join(', ')}\n\nMáximo Común Divisor (MCD): ${resultGCD}\nMínimo Común Múltiplo (MCM): ${resultLCM}`;
    };

    return (
        <GenericTextTool
            title="Calculadora MCD y MCM"
            description="Calcula el Máximo Común Divisor y Mínimo Común Múltiplo de dos o más números."
            icon={faProjectDiagram}
            onTransform={calculate}
            inputLabel="Números (separados por coma o espacio)"
            outputLabel="Resultado"
            initialValue="12, 18, 24"
        />
    );
}
