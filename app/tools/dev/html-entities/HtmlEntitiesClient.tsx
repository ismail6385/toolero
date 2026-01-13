'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export default function HtmlEntitiesClient() {
    const encode = (str: string) => {
        return str.replace(/[\u00A0-\u9999<>&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        });
    };

    const decode = (str: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    };

    const transformers = [
        { id: 'encode', label: 'Codificar (Encode)', action: encode },
        { id: 'decode', label: 'Decodificar (Decode)', action: decode }
    ];

    return (
        <GenericTextTool
            title="Codificador HTML Entities"
            description="Convierte caracteres especiales a entidades HTML seguras y viceversa. Vital para escapar código en web."
            icon={faCode}
            transformers={transformers}
            inputLabel="Texto / Código"
            outputLabel="Resultado"
        />
    );
}
