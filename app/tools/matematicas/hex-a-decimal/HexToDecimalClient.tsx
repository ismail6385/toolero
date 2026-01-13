'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function HexToDecimalClient() {
    const convert = (input: string) => {
        // Remove '0x' or '#' prefix if present
        const hex = input.trim().replace(/^0x|^#/, '');

        // Validate hex characters
        if (!/^[0-9A-Fa-f]+$/.test(hex)) {
            return 'Error: Formato hexadecimal inválido. Usa caracteres 0-9 y A-F.';
        }

        const decimal = parseInt(hex, 16);
        return decimal.toString();
    };

    return (
        <GenericTextTool
            title="Conversor Hexadecimal a Decimal"
            description="Convierte códigos hexadecimales (base 16) a números decimales (base 10). Acepta prefijos 0x o #."
            icon={faExchangeAlt}
            onTransform={convert}
            inputLabel="Valor Hexadecimal (Ej: FF, 1A, 0x10)"
            outputLabel="Valor Decimal"
        />
    );
}
