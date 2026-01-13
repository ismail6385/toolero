'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faList } from '@fortawesome/free-solid-svg-icons';

export default function RandomListClient() {
    const shuffle = (input: string) => {
        const lines = input.split('\n').filter(line => line.trim() !== '');

        // Fisher-Yates shuffle
        for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
        }

        return lines.join('\n');
    };

    return (
        <GenericTextTool
            title="Generador de Listas Aleatorias"
            description="Baraja (shuffle) una lista de nombres, números o elementos al azar."
            icon={faList}
            onTransform={shuffle}
            inputLabel="Elementos (uno por línea)"
            outputLabel="Lista Barajada"
            initialValue="Pedro\nMaría\nJuan\nAna\nLuis\nSofía"
        />
    );
}
