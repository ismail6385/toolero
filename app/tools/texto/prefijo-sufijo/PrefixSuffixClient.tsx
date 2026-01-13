'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function PrefixSuffixClient() {
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');

    const apply = (input: string) => {
        return input
            .split('\n')
            .map(line => `${prefix}${line}${suffix}`)
            .join('\n');
    };

    const transformers = [
        { id: 'apply', label: 'Aplicar Cambios', action: apply }
    ];

    const options = (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-text/60 mb-1 block">Prefijo</label>
                <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="Texto al inicio..."
                />
            </div>
            <div>
                <label className="text-xs font-bold text-text/60 mb-1 block">Sufijo</label>
                <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    placeholder="Texto al final..."
                />
            </div>
        </div>
    );

    return (
        <GenericTextTool
            title="Añadir Prefijo y Sufijo"
            description="Agrega texto al principio (prefijo) y al final (sufijo) de cada línea de tu lista."
            icon={faPen}
            transformers={transformers}
            options={options}
            inputLabel="Lista Original"
            outputLabel="Lista Modificada"
        />
    );
}
