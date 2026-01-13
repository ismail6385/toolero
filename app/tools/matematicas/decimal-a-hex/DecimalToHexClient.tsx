'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function DecimalToHexClient() {
    const convert = (input: string) => {
        const decimal = parseInt(input);

        if (isNaN(decimal)) {
            return 'Error: Ingresa un número decimal válido.';
        }

        return decimal.toString(16).toUpperCase();
    };

    return (
        <GenericTextTool
            title="Conversor Decimal a Hexadecimal"
            description="Convierte números decimales (base 10) a formato hexadecimal (base 16). Esencial para programación y colores."
            icon={faExchangeAlt}
            onTransform={convert}
            inputLabel="Valor Decimal (Ej: 255)"
            outputLabel="Valor Hexadecimal"
        />
    );
}
