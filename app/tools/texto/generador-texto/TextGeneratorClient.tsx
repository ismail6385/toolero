'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRandom,
    faParagraph,
    faCopy,
    faCheck,
    faSync,
    faSlidersH,
    faKey,
    faListOl,
    faFont,
    faQuoteRight
} from '@fortawesome/free-solid-svg-icons';

export default function TextGeneratorClient() {
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<'lorem' | 'random' | 'repetition'>('lorem');

    // Lorem Ipsum State
    const [loremCount, setLoremCount] = useState(3);
    const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [startWithLorem, setStartWithLorem] = useState(true);

    // Random String State
    const [randomLength, setRandomLength] = useState(16);
    const [randomCount, setRandomCount] = useState(1);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);

    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const loremWords = loremText.replace(/[.,]/g, '').toLowerCase().split(' ');

    const generateLorem = () => {
        let result = '';
        if (loremType === 'paragraphs') {
            const paragraphs = [];
            for (let i = 0; i < loremCount; i++) {
                // Simple shuffling for variety
                let p = loremText;
                if (i > 0) {
                    // scramble slightly for "fake" variety in this simple version
                    const words = loremText.split(' ');
                    const shuffled = words.sort(() => 0.5 - Math.random()).join(' ');
                    p = shuffled.charAt(0).toUpperCase() + shuffled.slice(1);
                    if (!p.endsWith('.')) p += '.';
                }
                paragraphs.push(p);
            }
            result = paragraphs.join('\n\n');
        } else if (loremType === 'sentences') {
            const sentences = [];
            const baseSentences = loremText.split('. ');
            for (let i = 0; i < loremCount; i++) {
                // pick random sentence
                let s = baseSentences[Math.floor(Math.random() * baseSentences.length)];
                if (!s.endsWith('.')) s += '.';
                sentences.push(s);
            }
            result = sentences.join(' ');
        } else {
            // Words
            const words = [];
            for (let i = 0; i < loremCount; i++) {
                words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            }
            result = words.join(' ');
            result = result.charAt(0).toUpperCase() + result.slice(1);
        }

        if (startWithLorem && loremType === 'paragraphs' && !result.startsWith('Lorem ipsum')) {
            // Force start if requested and not already there (though shuffling might break it, so we prepend usually)
            // simplified logic here
            result = "Lorem ipsum dolor sit amet. " + result;
        } else if (startWithLorem && loremType === 'paragraphs') {
            // Ensure first para starts with it
            // Already does in base text usually
        }

        setGeneratedText(result);
    };

    const generateRandom = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = lowercase;
        if (includeUppercase) chars += uppercase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        const generateString = () => {
            let str = '';
            for (let i = 0; i < randomLength; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return str;
        };

        const list = [];
        for (let i = 0; i < randomCount; i++) {
            list.push(generateString());
        }

        setGeneratedText(list.join('\n'));
    };

    const handleGenerate = () => {
        if (mode === 'lorem') generateLorem();
        if (mode === 'random') generateRandom();
    };

    const copyToClipboard = () => {
        if (!generatedText) return;
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faRandom} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Texto Aleatorio</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea texto de relleno (Lorem Ipsum) o cadenas aleatorias seguras para tus proyectos de desarrollo y diseño.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Configuration Sidebar */}
                <div className="space-y-6">
                    {/* Mode Selector */}
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-2 flex">
                        <button
                            onClick={() => setMode('lorem')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${mode === 'lorem' ? 'bg-primary text-white shadow-md' : 'text-text/60 hover:bg-gray-50'
                                }`}
                        >
                            Lorem Ipsum
                        </button>
                        <button
                            onClick={() => setMode('random')}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${mode === 'random' ? 'bg-primary text-white shadow-md' : 'text-text/60 hover:bg-gray-50'
                                }`}
                        >
                            Random String
                        </button>
                    </div>

                    {/* Options Panel */}
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faSlidersH} className="text-primary" />
                            Configuración
                        </h3>

                        {mode === 'lorem' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text/80 mb-2">Tipo de Generación</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'paragraphs', icon: faParagraph, label: 'Párrafos' },
                                            { id: 'sentences', icon: faQuoteRight, label: 'Frases' },
                                            { id: 'words', icon: faFont, label: 'Palabras' },
                                        ].map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => setLoremType(t.id as any)}
                                                className={`p-2 rounded-lg text-xs font-semibold border transition-all flex flex-col items-center gap-1 ${loremType === t.id
                                                        ? 'bg-primary/5 border-primary text-primary'
                                                        : 'bg-white border-gray-200 text-text/60 hover:border-primary/50'
                                                    }`}
                                            >
                                                <FontAwesomeIcon icon={t.icon} />
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text/80 mb-2">
                                        Cantidad: <span className="text-primary font-bold">{loremCount}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={loremCount}
                                        onChange={(e) => setLoremCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="startWithLorem"
                                        checked={startWithLorem}
                                        onChange={(e) => setStartWithLorem(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="startWithLorem" className="text-sm text-text/80">
                                        Empezar con "Lorem ipsum..."
                                    </label>
                                </div>
                            </div>
                        )}

                        {mode === 'random' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text/80 mb-2">
                                        Longitud: <span className="text-primary font-bold">{randomLength}</span> caracteres
                                    </label>
                                    <input
                                        type="range"
                                        min="4"
                                        max="128"
                                        value={randomLength}
                                        onChange={(e) => setRandomLength(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-text/80 mb-2">
                                        Cantidad de Cadenas: <span className="text-primary font-bold">{randomCount}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={randomCount}
                                        onChange={(e) => setRandomCount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div className="space-y-2 pt-2">
                                    <Toggle label="Mayúsculas (A-Z)" checked={includeUppercase} onChange={setIncludeUppercase} />
                                    <Toggle label="Números (0-9)" checked={includeNumbers} onChange={setIncludeNumbers} />
                                    <Toggle label="Símbolos (@#$)" checked={includeSymbols} onChange={setIncludeSymbols} />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faSync} />
                            Generar Texto
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-semibold text-text/80 flex items-center gap-2">
                            <FontAwesomeIcon icon={faListOl} className="text-primary" />
                            Resultado Generado
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!generatedText}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm
                                ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-text border border-gray-200 hover:border-primary hover:text-primary'
                                }
                            `}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar al Portapapeles'}
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-[600px] overflow-hidden group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            value={generatedText}
                            readOnly
                            className="w-full h-full p-8 resize-none border-0 focus:ring-0 text-base leading-relaxed text-text font-mono"
                            placeholder="Tu texto generado aparecerá aquí..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-text/70 group-hover:text-text transition-colors">{label}</span>
            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-primary' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        </label>
    );
}
