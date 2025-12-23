'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faFilter, faCheck, faSortAlphaDown, faSortAlphaUp, faMagic } from '@fortawesome/free-solid-svg-icons';

export default function RemoveDuplicatesClient() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState({
        ignoreCase: true,
        trim: true,
        sort: 'none' // none, asc, desc
    });

    const processText = (text: string, currentOptions = options) => {
        if (!text) {
            setOutput('');
            setStats({ original: 0, unique: 0, removed: 0 });
            return;
        }

        let lines = text.split('\n');
        const originalCount = lines.length;

        // 1. Trim whitespace
        if (currentOptions.trim) {
            lines = lines.map(line => line.trim());
        }

        // 2. Filter empty lines (optional, but usually desired)
        lines = lines.filter(line => line.length > 0);

        // 3. Remove duplicates
        const uniqueSet = new Set();
        const uniqueLines: string[] = [];

        lines.forEach(line => {
            const key = currentOptions.ignoreCase ? line.toLowerCase() : line;
            if (!uniqueSet.has(key)) {
                uniqueSet.add(key);
                uniqueLines.push(line);
            }
        });

        // 4. Sort
        if (currentOptions.sort === 'asc') {
            uniqueLines.sort((a, b) => a.localeCompare(b));
        } else if (currentOptions.sort === 'desc') {
            uniqueLines.sort((a, b) => b.localeCompare(a));
        }

        const result = uniqueLines.join('\n');
        setOutput(result);
        setStats({
            original: originalCount,
            unique: uniqueLines.length,
            removed: originalCount - uniqueLines.length
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setInput(val);
        processText(val);
    };

    const handleOptionChange = (key: keyof typeof options, value: any) => {
        const newOptions = { ...options, [key]: value };
        setOptions(newOptions);
        processText(input, newOptions);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setStats({ original: 0, unique: 0, removed: 0 });
    };

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <h1 className="text-3xl font-bold mb-2">Eliminar Líneas Duplicadas</h1>
                    <p className="text-blue-100 text-lg">
                        Limpia tus listas, elimina repetidos y ordena textos en segundos.
                    </p>
                </div>
            </div>

            {/* Options Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-medium">
                        <input
                            type="checkbox"
                            checked={options.ignoreCase}
                            onChange={(e) => handleOptionChange('ignoreCase', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        Ignorar Mayúsculas
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700 font-medium">
                        <input
                            type="checkbox"
                            checked={options.trim}
                            onChange={(e) => handleOptionChange('trim', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        Eliminar Espacios Extra
                    </label>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                    <button
                        onClick={() => handleOptionChange('sort', 'none')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${options.sort === 'none' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Original
                    </button>
                    <button
                        onClick={() => handleOptionChange('sort', 'asc')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${options.sort === 'asc' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <FontAwesomeIcon icon={faSortAlphaDown} /> A-Z
                    </button>
                    <button
                        onClick={() => handleOptionChange('sort', 'desc')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${options.sort === 'desc' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <FontAwesomeIcon icon={faSortAlphaUp} /> Z-A
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input Area */}
                <div className="flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="font-bold text-gray-700">Entrada</span>
                        <div className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-500">
                            Líneas: {stats.original}
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Pega tu lista aquí..."
                        className="flex-1 w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none resize-none bg-gray-50 font-mono text-sm"
                        spellCheck={false}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={clearAll}
                            className="text-red-500 text-sm hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} /> Borrar Todo
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex flex-col h-[500px]">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="font-bold text-gray-700 flex items-center gap-2">
                            Resultado <FontAwesomeIcon icon={faMagic} className="text-yellow-500" />
                        </span>
                        <div className="flex gap-2">
                            <div className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                Únicos: {stats.unique}
                            </div>
                            <div className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                                Eliminados: {stats.removed}
                            </div>
                        </div>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder="El resultado limpio aparecerá aquí..."
                        className="flex-1 w-full p-4 rounded-xl border border-blue-200 bg-white focus:ring-4 focus:ring-blue-50 outline-none resize-none font-mono text-sm text-gray-800 shadow-sm"
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all shadow-md active:scale-95 ${!output ? 'bg-gray-300 cursor-not-allowed' :
                                    copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? '¡Copiado!' : 'Copiar Resultado'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
