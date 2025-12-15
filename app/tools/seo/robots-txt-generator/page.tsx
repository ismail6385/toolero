'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRobot,
    faPlus,
    faTrash,
    faCopy,
    faCheckCircle,
    faFileCode
} from '@fortawesome/free-solid-svg-icons';

interface Rule {
    userAgent: string;
    allows: string[];
    disallows: string[];
}

export default function RobotsTxtGenerator() {
    const [rules, setRules] = useState<Rule[]>([
        { userAgent: '*', allows: [], disallows: ['/admin/', '/private/'] }
    ]);
    const [sitemap, setSitemap] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Common Bots
    const commonBots = [
        '*',
        'Googlebot',
        'Googlebot-Image',
        'Bingbot',
        'Slurp',
        'DuckDuckBot',
        'Baiduspider',
        'Yandex',
        'Twitterbot',
        'facebot'
    ];

    useEffect(() => {
        let txt = '';
        rules.forEach((rule, index) => {
            if (index > 0) txt += '\n';
            txt += `User-agent: ${rule.userAgent}\n`;
            rule.disallows.forEach(path => {
                txt += `Disallow: ${path}\n`;
            });
            rule.allows.forEach(path => {
                txt += `Allow: ${path}\n`;
            });
        });

        if (sitemap) {
            txt += `\nSitemap: ${sitemap}\n`;
        }

        setOutput(txt);
    }, [rules, sitemap]);

    const addRuleGroup = () => {
        setRules([...rules, { userAgent: 'Googlebot', allows: [], disallows: [] }]);
    };

    const removeRuleGroup = (index: number) => {
        const newRules = [...rules];
        newRules.splice(index, 1);
        setRules(newRules);
    };

    const updateUserAgent = (index: number, val: string) => {
        const newRules = [...rules];
        newRules[index].userAgent = val;
        setRules(newRules);
    };

    const addPath = (ruleIndex: number, type: 'allows' | 'disallows') => {
        const newRules = [...rules];
        newRules[ruleIndex][type].push('/');
        setRules(newRules);
    };

    const updatePath = (ruleIndex: number, type: 'allows' | 'disallows', pathIndex: number, val: string) => {
        const newRules = [...rules];
        newRules[ruleIndex][type][pathIndex] = val;
        setRules(newRules);
    };

    const removePath = (ruleIndex: number, type: 'allows' | 'disallows', pathIndex: number) => {
        const newRules = [...rules];
        newRules[ruleIndex][type].splice(pathIndex, 1);
        setRules(newRules);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faRobot} className="mr-2" />
                    Crawling Control
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Generador Robots.txt</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea y edita tu archivo robots.txt para decirles a los motores de búsqueda qué partes de tu sitio deben rastrear e indexar.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Column */}
                <div className="space-y-6">
                    {rules.map((rule, index) => (
                        <div key={index} className="bg-surface rounded-2xl shadow border border-gray-100 p-6 animate-fadeIn">
                            <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                                <div>
                                    <label className="text-xs font-bold text-text/50 uppercase tracking-widest block mb-2">User Agent (Bot)</label>
                                    <div className="relative">
                                        <select
                                            value={rule.userAgent}
                                            onChange={(e) => updateUserAgent(index, e.target.value)}
                                            className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                                        >
                                            {commonBots.map(bot => (
                                                <option key={bot} value={bot}>{bot}</option>
                                            ))}
                                            <option value="custom">Otro...</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                    {/* Allow custom input if not in list, or just use input directly. For simplicity using select with common ones. */}
                                </div>
                                {rules.length > 1 && (
                                    <button
                                        onClick={() => removeRuleGroup(index)}
                                        className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </div>

                            {/* Disallow Rules */}
                            <div className="mb-4">
                                <label className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">Disallow (Bloquear)</label>
                                <div className="space-y-2">
                                    {rule.disallows.map((path, pIndex) => (
                                        <div key={`d-${pIndex}`} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={path}
                                                onChange={(e) => updatePath(index, 'disallows', pIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-mono text-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                                            />
                                            <button
                                                onClick={() => removePath(index, 'disallows', pIndex)}
                                                className="text-gray-300 hover:text-red-500 px-2"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addPath(index, 'disallows')}
                                        className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 mt-2 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Añadir Bloqueo
                                    </button>
                                </div>
                            </div>

                            {/* Allow Rules */}
                            <div>
                                <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-2">Allow (Permitir)</label>
                                <div className="space-y-2">
                                    {rule.allows.map((path, pIndex) => (
                                        <div key={`a-${pIndex}`} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={path}
                                                onChange={(e) => updatePath(index, 'allows', pIndex, e.target.value)}
                                                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-mono text-green-600 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none"
                                            />
                                            <button
                                                onClick={() => removePath(index, 'allows', pIndex)}
                                                className="text-gray-300 hover:text-red-500 px-2"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addPath(index, 'allows')}
                                        className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1 mt-2 px-2 py-1 rounded hover:bg-green-50 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Añadir Permiso
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addRuleGroup}
                        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-text/50 font-semibold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Añadir otro User Agent
                    </button>

                    <div className="bg-surface rounded-2xl shadow border border-gray-100 p-6">
                        <label className="text-xs font-bold text-text/50 uppercase tracking-widest block mb-2">Sitemap URL (Opcional)</label>
                        <input
                            type="text"
                            value={sitemap}
                            onChange={(e) => setSitemap(e.target.value)}
                            placeholder="https://www.tusitio.com/sitemap.xml"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>
                </div>

                {/* Output Column */}
                <div className="flex flex-col sticky top-8 h-fit">
                    <div className="bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
                        <div className="bg-[#2d2d2d] px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-gray-200 font-mono text-sm flex items-center gap-2">
                                <FontAwesomeIcon icon={faFileCode} className="text-primary" />
                                robots.txt
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-white hover:bg-white hover:text-primary'
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                        </div>
                        <div className="p-6">
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-[500px] bg-transparent text-gray-300 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-orange-50 text-orange-800 rounded-xl text-sm border border-orange-100">
                        <p className="font-semibold mb-1">¡Importante!</p>
                        <p>Sube el archivo <code>robots.txt</code> a la raíz de tu dominio (ej: <code>tusitio.com/robots.txt</code>).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
