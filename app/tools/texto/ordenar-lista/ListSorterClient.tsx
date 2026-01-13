'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';

export default function ListSorterClient() {
    const sortAZ = (t: string) => t.split('\n').sort((a, b) => a.localeCompare(b)).join('\n');
    const sortZA = (t: string) => t.split('\n').sort((a, b) => b.localeCompare(a)).join('\n');
    const sort09 = (t: string) => t.split('\n').sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n');
    const sort90 = (t: string) => t.split('\n').sort((a, b) => parseFloat(b) - parseFloat(a)).join('\n');
    const reverse = (t: string) => t.split('\n').reverse().join('\n');
    const shuffle = (t: string) => {
        const arr = t.split('\n');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('\n');
    };
    const lengthSort = (t: string) => t.split('\n').sort((a, b) => a.length - b.length).join('\n');

    const transformers = [
        { id: 'az', label: 'A - Z', action: sortAZ },
        { id: 'za', label: 'Z - A', action: sortZA },
        { id: '09', label: '0 - 9', action: sort09 },
        { id: '90', label: '9 - 0', action: sort90 },
        { id: 'len', label: 'Longitud', action: lengthSort },
        { id: 'rev', label: 'Invertir', action: reverse },
        { id: 'rnd', label: 'Aleatorio', action: shuffle },
    ];

    return (
        <GenericTextTool
            title="Ordenar Lista Alfabéticamente"
            description="Organiza tus listas de texto. Ordena por abecedario, números, longitud o de forma aleatoria."
            icon={faSortAlphaDown}
            transformers={transformers}
            inputLabel="Lista Desordenada"
            outputLabel="Lista Ordenada"
        />
    );
}
