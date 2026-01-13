'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function DuplicateRemoverClient() {
    const removeDuplicates = (input: string) => {
        const lines = input.split('\n');
        const uniqueLines = Array.from(new Set(lines));
        return uniqueLines.join('\n');
    };

    return (
        <GenericTextTool
            title="Eliminar Líneas Duplicadas"
            description="Limpia tus listas eliminando todos los elementos repetidos de forma instantánea."
            icon={faList}
            onTransform={removeDuplicates}
            inputLabel="Lista con duplicados"
            outputLabel="Lista limpia"
        />
    );
}
