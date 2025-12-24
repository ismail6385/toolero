'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpellCheck,
    faCheck,
    faExclamationTriangle,
    faCopy,
    faTrash,
    faSearch,
    faLightbulb,
    faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';

export default function SpellCheckerClient() {
    const [text, setText] = useState('');
    const [issues, setIssues] = useState<any[]>([]);
    const [analyzed, setAnalyzed] = useState(false);
    const [copied, setCopied] = useState(false);

    const analyzeText = () => {
        const newIssues = [];

        // 1. Check for doubled words (e.g., "la la")
        const doubledWordsRegex = /\b(\w+)\s+\1\b/gi;
        let match;
        while ((match = doubledWordsRegex.exec(text)) !== null) {
            newIssues.push({
                type: 'warning',
                msg: `Palabra repetida detectada: "${match[1]}"`,
                index: match.index,
                fixable: false // Complex to fix automatically without context, strict replacement might be unsafe
            });
        }

        // 2. Check for capitalization start of sentence
        const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
        // This is a naive check; regex for strict sentence start is easier
        // Look for dot space lowercase
        const capRegex = /[.!?]\s+([a-z])/g;
        while ((match = capRegex.exec(text)) !== null) {
            newIssues.push({
                type: 'error',
                msg: `Posible falta de mayúscula: "...${match[0]}"`,
                index: match.index,
                fixable: true,
                fixType: 'capitalize'
            });
        }

        // Check finding start of text lowercase
        if (text.length > 0 && /^[a-z]/.test(text)) {
            newIssues.push({
                type: 'error',
                msg: 'El texto comienza con minúscula.',
                index: 0,
                fixable: true,
                fixType: 'capitalizeStart'
            });
        }

        // 3. Extra spaces
        const spaceRegex = /[ ]{2,}/g;
        while ((match = spaceRegex.exec(text)) !== null) {
            newIssues.push({
                type: 'warning',
                msg: 'Exceso de espacios en blanco detectado.',
                index: match.index,
                fixable: true,
                fixType: 'spaces'
            });
        }

        setIssues(newIssues);
        setAnalyzed(true);
    };

    const fixIssue = (type: string) => {
        let newText = text;

        if (type === 'capitalize') {
            newText = newText.replace(/([.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
        }
        if (type === 'capitalizeStart') {
            newText = newText.charAt(0).toUpperCase() + newText.slice(1);
        }
        if (type === 'spaces') {
            newText = newText.replace(/[ ]{2,}/g, ' ');
        }

        setText(newText);
        // Re-analyze after fix to update issues list
        setTimeout(() => {
            // We can't easily call analyzeText here with the 'newText' due to closure closure, 
            // but strictly speaking we should just update state and let user re-click or use useEffect.
            // For simplicity, we'll force analyzed=false so they scan again.
            setAnalyzed(false);
        }, 100);
    };

    const copyToClipboard = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faSpellCheck} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Verificador de Ortografía y Gramática</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Analiza tu texto en busca de errores comunes, repeticiones y problemas de estilo.
                    Funciona 100% en tu navegador.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[600px] relative">
                        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                            <label className="text-sm font-semibold text-text/80">Editor de Texto</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setText(''); setAnalyzed(false); setIssues([]); }}
                                    className="text-xs text-text/40 hover:text-red-500 flex items-center gap-1 transition-colors px-2 py-1"
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Limpiar
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className={`
                                        flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold transition-all
                                        ${copied
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white text-text/60 border border-gray-200 hover:border-primary hover:text-primary'
                                        }
                                    `}
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => { setText(e.target.value); if (analyzed) setAnalyzed(false); }}
                            className="flex-1 w-full p-6 border-0 resize-none focus:ring-0 text-lg leading-relaxed placeholder:text-text/20 font-sans"
                            placeholder="Escribe aquí... El navegador resaltará errores ortográficos básicos (subrayado rojo). Usa el botón 'Analizar' para cheques de estilo extra."
                            spellCheck={true}
                            lang="es"
                        />

                        {/* Action Bar */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                            <div className="text-sm text-text/50">
                                {text.length} caracteres | {text.trim() ? text.trim().split(/\s+/).length : 0} palabras
                            </div>
                            <button
                                onClick={analyzeText}
                                disabled={!text}
                                className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                                Analizar Texto
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analysis Sidebar */}
                <div className="space-y-6">
                    <div className="bg-surface rounded-2xl shadow-md border border-gray-200 p-6 h-full min-h-[400px]">
                        <h3 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faClipboardCheck} className="text-primary" />
                            Reporte de Análisis
                        </h3>

                        {!analyzed ? (
                            <div className="text-center py-12 text-text/40">
                                <FontAwesomeIcon icon={faSearch} className="text-4xl mb-4 opacity-20" />
                                <p>Haz clic en "Analizar Texto" para buscar problemas de estilo y gramática.</p>
                            </div>
                        ) : issues.length === 0 ? (
                            <div className="text-center py-12 text-green-500 animate-fade-in">
                                <FontAwesomeIcon icon={faCheck} className="text-5xl mb-4" />
                                <p className="font-bold text-lg">¡Todo se ve bien!</p>
                                <p className="text-sm text-text/60 mt-2">No encontramos errores de estilo comunes.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExclamationTriangle} />
                                    Se encontraron {issues.length} problema{issues.length !== 1 && 's'}
                                </div>

                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                    {issues.map((issue, idx) => (
                                        <div key={idx} className="p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1 text-sm ${issue.type === 'error' ? 'text-red-500' : 'text-amber-500'}`}>
                                                    <FontAwesomeIcon icon={issue.type === 'error' ? faExclamationTriangle : faLightbulb} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-text/80 font-medium">{issue.msg}</p>
                                                    {issue.fixable && (
                                                        <button
                                                            onClick={() => fixIssue(issue.fixType)}
                                                            className="mt-2 text-xs font-bold text-primary hover:text-secondary hover:underline transition-all"
                                                        >
                                                            Corregir automáticamente
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
