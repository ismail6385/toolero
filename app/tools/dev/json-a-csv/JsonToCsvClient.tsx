'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

export default function JsonToCsvClient() {
    const convert = (input: string) => {
        try {
            const data = JSON.parse(input);
            const array = Array.isArray(data) ? data : [data];

            if (array.length === 0) return '';

            // Get all unique keys
            const keys = Array.from(new Set(array.flatMap(obj => Object.keys(obj))));

            // Header
            const header = keys.join(',');

            // Rows
            const rows = array.map(obj => {
                return keys.map(key => {
                    const val = obj[key];
                    if (val === null || val === undefined) return '';
                    const str = String(val);
                    // Simple escape for quotes and commas
                    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                        return `"${str.replace(/"/g, '""')}"`;
                    }
                    return str;
                }).join(',');
            });

            return [header, ...rows].join('\n');
        } catch (e) {
            return `Error: JSON inválido.\n\n${(e as Error).message}`;
        }
    };

    return (
        <GenericTextTool
            title="Convertidor JSON a CSV"
            description="Transforma tus datos JSON a formato CSV compatible con Excel y Hojas de Cálculo."
            icon={faFileCsv}
            onTransform={convert}
            inputLabel="JSON (Array de objetos)"
            outputLabel="CSV Resultado"
        />
    );
}
