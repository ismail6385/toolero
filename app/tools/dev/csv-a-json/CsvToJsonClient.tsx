'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';

export default function CsvToJsonClient() {
    const convert = (input: string) => {
        try {
            const lines = input.trim().split(/\r?\n/);
            if (lines.length < 2) return '[]';

            // Simple header parsing
            const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

            const result = [];

            // Iterate rows
            for (let i = 1; i < lines.length; i++) {
                const currentLine = lines[i];
                if (!currentLine.trim()) continue;

                // Simple regex to handle comma splitting, acknowledging quotes (simplified)
                // This regex splits by comma but ignores commas inside quotes
                const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
                const values = currentLine.split(regex).map(val => {
                    return val.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
                });

                const obj: Record<string, any> = {};

                headers.forEach((header, index) => {
                    const val = values[index];
                    // Try to convert numbers/booleans
                    if (val === 'true') obj[header] = true;
                    else if (val === 'false') obj[header] = false;
                    else if (val === 'null') obj[header] = null;
                    else if (!isNaN(Number(val)) && val !== '') obj[header] = Number(val);
                    else obj[header] = val;
                });

                result.push(obj);
            }

            return JSON.stringify(result, null, 2);
        } catch (e) {
            return `Error: No se pudo procesar el CSV.\n\n${(e as Error).message}`;
        }
    };

    return (
        <GenericTextTool
            title="Convertidor CSV a JSON"
            description="Convierte datos de Excel (CSV) a objetos JSON estructurados para usar en tu código."
            icon={faFileCode}
            onTransform={convert}
            inputLabel="CSV (Separado por comas)"
            outputLabel="JSON Resultado"
        />
    );
}
