'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faCopy, faDownload, faCheckCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function RobotsGeneratorClient() {
    const [defaultAccess, setDefaultAccess] = useState('Allow'); // Allow all or Disallow all
    const [crawlDelay, setCrawlDelay] = useState('');
    const [sitemap, setSitemap] = useState('');

    const [customRules, setCustomRules] = useState<{ bot: string, path: string, allow: boolean }[]>([]);

    const [robotTxt, setRobotTxt] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let content = `User-agent: *\n`;

        if (defaultAccess === 'Disallow') {
            content += `Disallow: /\n`;
        } else {
            // Usually empty means allow all, but explicitly:
            // content += `Allow: /\n`; // Google assumes allow if not disallowed
        }

        if (crawlDelay) {
            content += `Crawl-delay: ${crawlDelay}\n`;
        }

        if (customRules.length > 0) {
            content += `\n# Custom Rules\n`;
            customRules.forEach(rule => {
                content += `User-agent: ${rule.bot}\n`;
                content += `${rule.allow ? 'Allow' : 'Disallow'}: ${rule.path}\n`;
            });
        }

        if (sitemap) {
            content += `\nSitemap: ${sitemap}\n`;
        }

        setRobotTxt(content);
    }, [defaultAccess, crawlDelay, sitemap, customRules]);

    const addRule = () => {
        setCustomRules([...customRules, { bot: 'Googlebot', path: '/', allow: false }]);
    };

    const removeRule = (index: number) => {
        setCustomRules(customRules.filter((_, i) => i !== index));
    };

    const updateRule = (index: number, field: keyof typeof customRules[0], value: any) => {
        const newRules = [...customRules];
        newRules[index] = { ...newRules[index], [field]: value };
        setCustomRules(newRules);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(robotTxt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadFile = () => {
        const element = document.createElement("a");
        const file = new Blob([robotTxt], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "robots.txt";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-full mb-4 text-white">
                    <FontAwesomeIcon icon={faRobot} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador Robots.txt</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Controla el acceso de los robots de búsqueda a tu sitio web.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Controls */}
                <div className="space-y-8">
                    <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8">
                        <h3 className="text-lg font-bold text-text mb-6">Configuración General (*)</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-text mb-2">Acceso por Defecto</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="access"
                                        checked={defaultAccess === 'Allow'}
                                        onChange={() => setDefaultAccess('Allow')}
                                        className="w-5 h-5 text-indigo-600"
                                    />
                                    Permitir Todo (Recomendado)
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="access"
                                        checked={defaultAccess === 'Disallow'}
                                        onChange={() => setDefaultAccess('Disallow')}
                                        className="w-5 h-5 text-red-600"
                                    />
                                    Bloquear Todo
                                </label>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-text mb-2">Crawl Delay (Opcional)</label>
                            <input
                                type="number"
                                value={crawlDelay}
                                onChange={(e) => setCrawlDelay(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="Segundos (ej. 10)"
                            />
                            <p className="text-xs text-text/40 mt-1">Tiempo de espera entre peticiones (no soportado por Google).</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text mb-2">Sitemap XML URL</label>
                            <input
                                type="text"
                                value={sitemap}
                                onChange={(e) => setSitemap(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                                placeholder="https://miweb.com/sitemap.xml"
                            />
                        </div>
                    </div>

                    <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-text">Reglas Personalizadas</h3>
                            <button
                                onClick={addRule}
                                className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Añadir Regla
                            </button>
                        </div>

                        {customRules.length === 0 ? (
                            <div className="text-center text-text/40 italic py-4">No hay reglas personalizadas</div>
                        ) : (
                            <div className="space-y-4">
                                {customRules.map((rule, idx) => (
                                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
                                        <button
                                            onClick={() => removeRule(idx)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <label className="block text-xs font-bold text-text/50 uppercase mb-1">Bot</label>
                                                <select
                                                    value={rule.bot}
                                                    onChange={(e) => updateRule(idx, 'bot', e.target.value)}
                                                    className="w-full px-2 py-1.5 rounded-lg border border-gray-300 text-sm"
                                                >
                                                    <option value="Googlebot">Googlebot</option>
                                                    <option value="Googlebot-Image">Googlebot-Image</option>
                                                    <option value="Bingbot">Bingbot</option>
                                                    <option value="Slurp">Slurp (Yahoo)</option>
                                                    <option value="DuckDuckBot">DuckDuckBot</option>
                                                    <option value="Yandex">Yandex</option>
                                                    <option value="*">Todos (*)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-text/50 uppercase mb-1">Acción</label>
                                                <div className="flex bg-white rounded-lg border border-gray-300 p-1">
                                                    <button
                                                        onClick={() => updateRule(idx, 'allow', true)}
                                                        className={`flex-1 text-xs font-bold rounded py-1 ${rule.allow ? 'bg-green-100 text-green-700' : 'text-gray-400 hover:bg-gray-50'}`}
                                                    >
                                                        Allow
                                                    </button>
                                                    <button
                                                        onClick={() => updateRule(idx, 'allow', false)}
                                                        className={`flex-1 text-xs font-bold rounded py-1 ${!rule.allow ? 'bg-red-100 text-red-700' : 'text-gray-400 hover:bg-gray-50'}`}
                                                    >
                                                        Disallow
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-text/50 uppercase mb-1">Ruta</label>
                                            <input
                                                type="text"
                                                value={rule.path}
                                                onChange={(e) => updateRule(idx, 'path', e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg border border-gray-300 text-sm"
                                                placeholder="/admin/"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Output */}
                <div className="border border-gray-800 bg-gray-900 rounded-3xl p-8 shadow-2xl flex flex-col h-fit sticky top-8">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-green-400 text-sm">robots.txt</span>
                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                            <button
                                onClick={downloadFile}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-all flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} /> Descargar
                            </button>
                        </div>
                    </div>

                    <textarea
                        readOnly
                        value={robotTxt}
                        className="w-full h-[400px] bg-transparent text-gray-300 font-mono text-sm outline-none resize-none leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
}
