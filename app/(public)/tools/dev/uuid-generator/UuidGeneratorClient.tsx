'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faSync, faCopy, faCheckCircle, faListUl } from '@fortawesome/free-solid-svg-icons';

export default function UuidGeneratorClient() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [copied, setCopied] = useState(false);

    const generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generate = () => {
        const newUuids = [];
        for (let i = 0; i < quantity; i++) {
            newUuids.push(generateUuid());
        }
        setUuids(newUuids);
    };

    // Initial gen
    useState(() => {
        generate();
    });

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4 text-indigo-600">
                    <FontAwesomeIcon icon={faFingerprint} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de UUID v4</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea identificadores únicos universales masivamente. Perfecto para bases de datos y desarrollo.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8">

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                        <span className="text-sm font-bold text-text/60 pl-2">Cantidad:</span>
                        <input
                            type="number"
                            min="1"
                            max="1000"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-20 px-3 py-2 rounded-lg border border-gray-300 font-bold text-center outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={generate}
                            className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faSync} /> Generar
                        </button>
                        <button
                            onClick={copyAll}
                            className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl border transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-gray-200 text-text hover:bg-gray-50'}`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                            {copied ? 'Copiado' : 'Copiar Todo'}
                        </button>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 relative group overflow-hidden">
                    <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                        <pre className="text-indigo-300 font-mono text-lg leading-loose">
                            {uuids.map((id, i) => (
                                <div key={i} className="flex items-center gap-4 group/line hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                                    <span className="opacity-30 text-xs w-8 text-right select-none">{i + 1}.</span>
                                    <span className="flex-1">{id}</span>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(id) }}
                                        className="opacity-0 group-hover/line:opacity-100 text-white/50 hover:text-white transition-opacity"
                                        title="Copiar línea"
                                    >
                                        <FontAwesomeIcon icon={faCopy} />
                                    </button>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>
                <div className="text-center mt-4 text-sm text-text/40 font-medium">
                    <FontAwesomeIcon icon={faListUl} className="mr-2" />
                    Total generados: {uuids.length}
                </div>
            </div>
        </div>
    );
}
