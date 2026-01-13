'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

export default function Rot13Client() {
    const rot13 = (input: string) => {
        return input.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode(
                (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
            );
        });
    };

    return (
        <GenericTextTool
            title="Cifrado ROT13"
            description="Encripta o desencripta texto usando el algoritmo ROT13 (Rotar 13 posiciones). Simple y efectivo para ocultar spoilers."
            icon={faUserSecret}
            onTransform={rot13}
            inputLabel="Texto Normal / Cifrado"
            outputLabel="Resultado"
        />
    );
}
