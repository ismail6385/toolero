'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';

const MORSE_CODE: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_CODE).reduce((acc, [char, code]) => {
    acc[code] = char;
    return acc;
}, {} as Record<string, string>);

export default function MorseCodeClient() {
    const toMorse = (input: string) => {
        return input
            .toUpperCase()
            .split('')
            .map(char => MORSE_CODE[char] || char)
            .join(' ');
    };

    const fromMorse = (input: string) => {
        return input
            .split('/')
            .map(word => word
                .trim()
                .split(' ')
                .map(code => REVERSE_MORSE[code] || code)
                .join('')
            )
            .join(' ');
    };

    const transformers = [
        { id: 'enc', label: 'Texto a Morse', action: toMorse },
        { id: 'dec', label: 'Morse a Texto', action: fromMorse }
    ];

    return (
        <GenericTextTool
            title="Traductor Código Morse"
            description="Traduce texto a Código Morse y viceversa. Utiliza '/' para separar palabras."
            icon={faBroadcastTower}
            transformers={transformers}
            inputLabel="Entrada"
            outputLabel="Traducción"
        />
    );
}
