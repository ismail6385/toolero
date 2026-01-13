'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export default function JwtDecoderClient() {
    const decodeJwt = (input: string) => {
        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error('El token debe tener 3 partes separadas por puntos (Header.Payload.Signature).');
            }

            const decodePart = (part: string) => {
                const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload);
            };

            const header = decodePart(parts[0]);
            const payload = decodePart(parts[1]);

            return JSON.stringify({
                HEADER: header,
                PAYLOAD: payload,
                SIGNATURE: parts[2]
            }, null, 2);

        } catch (e) {
            return `Error: Token JWT inválido. \n\n${(e as Error).message}`;
        }
    };

    return (
        <GenericTextTool
            title="Decodificador JWT"
            description="Decodifica y visualiza el contenido de tus JSON Web Tokens (JWT). Funciona 100% en tu navegador, tus claves no se envían a ningún servidor."
            icon={faKey}
            onTransform={decodeJwt}
            inputLabel="Paste JWT Token"
            outputLabel="Contenido Decodificado"
        />
    );
}
