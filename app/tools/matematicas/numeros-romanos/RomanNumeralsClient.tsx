'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

export default function RomanNumeralsClient() {
    const romanToInt = (s: string) => {
        const roman: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let num = 0;
        s = s.toUpperCase();
        for (let i = 0; i < s.length; i++) {
            if (roman[s[i]] < roman[s[i + 1]]) {
                num -= roman[s[i]];
            } else {
                num += roman[s[i]];
            }
        }
        return num.toString();
    };

    const intToRoman = (numStr: string) => {
        let num = parseInt(numStr);
        if (isNaN(num) || num < 1 || num > 3999) return 'Ingresa un número entre 1 y 3999';

        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let ans = "";
        for (let i = 0; i < val.length; i++) {
            while (num >= val[i]) {
                num -= val[i];
                ans += rom[i];
            }
        }
        return ans;
    };

    const transformers = [
        { id: 'to_roman', label: 'Decimal a Romano', action: intToRoman },
        { id: 'to_decimal', label: 'Romano a Decimal', action: romanToInt }
    ];

    return (
        <GenericTextTool
            title="Conversor Números Romanos"
            description="Convierte números decimales a romanos y viceversa. Historia en un clic."
            icon={faLandmark}
            transformers={transformers}
            inputLabel="Número (Ej: 2024 o MMXXIV)"
            outputLabel="Resultado"
        />
    );
}
