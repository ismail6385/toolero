'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faSuperscript } from '@fortawesome/free-solid-svg-icons';

export default function FactorialClient() {
    const factorial = (input: string) => {
        const n = parseInt(input);
        if (isNaN(n) || n < 0) return 'Por favor ingresa un número entero no negativo.';
        if (n > 170) return 'El resultado es demasiado grande (Infinity). Intenta con n <= 170.';

        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result.toString();
    };

    return (
        <GenericTextTool
            title="Calculadora Factorial"
            description="Calcula el factorial de un número (n!). Útil para problemas de probabilidad y combinatoria."
            icon={faSuperscript}
            onTransform={factorial}
            inputLabel="Número (n)"
            outputLabel="Resultado (n!)"
            initialValue="5"
        />
    );
}
