'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faFont } from '@fortawesome/free-solid-svg-icons';

// Simple 3x5 font map
const FONT: Record<string, string[]> = {
    'A': [' ### ', '#   #', '#####', '#   #', '#   #'],
    'B': ['#### ', '#   #', '#### ', '#   #', '#### '],
    'C': [' ####', '#    ', '#    ', '#    ', ' ####'],
    'D': ['#### ', '#   #', '#   #', '#   #', '#### '],
    'E': ['#####', '#    ', '#### ', '#    ', '#####'],
    'F': ['#####', '#    ', '#### ', '#    ', '#    '],
    'G': [' ####', '#    ', '#  ##', '#   #', ' ####'],
    'H': ['#   #', '#   #', '#####', '#   #', '#   #'],
    'I': ['#####', '  #  ', '  #  ', '  #  ', '#####'],
    'J': ['#####', '   # ', '   # ', '#  # ', ' ##  '],
    'K': ['#   #', '#  # ', '###  ', '#  # ', '#   #'],
    'L': ['#    ', '#    ', '#    ', '#    ', '#####'],
    'M': ['#   #', '## ##', '# # #', '#   #', '#   #'],
    'N': ['#   #', '##  #', '# # #', '#  ##', '#   #'],
    'O': [' ### ', '#   #', '#   #', '#   #', ' ### '],
    'P': ['#### ', '#   #', '#### ', '#    ', '#    '],
    'Q': [' ### ', '#   #', '#   #', '#  # ', ' ## #'],
    'R': ['#### ', '#   #', '#### ', '#  # ', '#   #'],
    'S': [' ####', '#    ', ' ### ', '    #', '#### '],
    'T': ['#####', '  #  ', '  #  ', '  #  ', '  #  '],
    'U': ['#   #', '#   #', '#   #', '#   #', ' ### '],
    'V': ['#   #', '#   #', '#   #', ' # # ', '  #  '],
    'W': ['#   #', '#   #', '# # #', '## ##', '#   #'],
    'X': ['#   #', ' # # ', '  #  ', ' # # ', '#   #'],
    'Y': ['#   #', ' # # ', '  #  ', '  #  ', '  #  '],
    'Z': ['#####', '   # ', '  #  ', ' #   ', '#####'],
    ' ': ['     ', '     ', '     ', '     ', '     ']
};

export default function AsciiArtClient() {
    const toAscii = (input: string) => {
        const lines = ['', '', '', '', ''];
        const text = input.toUpperCase();

        for (const char of text) {
            const letter = FONT[char] || FONT[' '];
            for (let i = 0; i < 5; i++) {
                lines[i] += (letter[i] || '     ') + '  ';
            }
        }

        return lines.join('\n');
    };

    return (
        <GenericTextTool
            title="Generador Arte ASCII"
            description="Convierte tu texto en arte ASCII gigante (Bloque Simple). Soporta letras A-Z."
            icon={faFont}
            onTransform={toAscii}
            inputLabel="Texto Corto (Recomendado < 10 caracteres)"
            outputLabel="Resultado ASCII"
        />
    );
}
