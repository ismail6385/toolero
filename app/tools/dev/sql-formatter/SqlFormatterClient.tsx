'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

export default function SqlFormatterClient() {
    const formatSql = (sql: string) => {
        let indent = 0;
        const spaces = '  ';

        return sql
            .replace(/\s+/g, ' ') // Collapse spaces
            .replace(/'[^']*'|"[^"]*"/g, (m) => m.replace(/ /g, '%%SPACE%%')) // Protect strings
            .replace(/,/g, ',\n') // Break on commas
            .replace(/\s+(FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|UNION)\s+/gi, '\n$1\n') // Keywords on new lines
            .replace(/\(/g, '(\n') // Break on parens
            .replace(/\)/g, '\n)')
            .split('\n')
            .map(line => {
                line = line.trim();

                // Adjust indentation
                if (line.startsWith(')')) indent--;

                const padded = spaces.repeat(Math.max(0, indent)) + line;

                if (line.endsWith('(')) indent++;

                return padded;
            })
            .join('\n')
            .replace(/%%SPACE%%/g, ' '); // Restore string spaces
    };

    return (
        <GenericTextTool
            title="Formateador SQL"
            description="Embellece tus consultas SQL desordenadas. Formatea SELECT, INSERT, UPDATE y más para mejorar la legibilidad."
            icon={faDatabase}
            onTransform={formatSql}
            inputLabel="SQL Minificado / Desordenado"
            outputLabel="SQL Formateado"
        />
    );
}
