'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes, faCopy, faCheck, faLink, faUnlink } from '@fortawesome/free-solid-svg-icons';

export default function BorderRadiusClient() {
    const [tl, setTl] = useState(20);
    const [tr, setTr] = useState(20);
    const [br, setBr] = useState(20);
    const [bl, setBl] = useState(20);
    const [locked, setLocked] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleAllChange = (val: number) => {
        setTl(val);
        setTr(val);
        setBr(val);
        setBl(val);
    };

    const radiusValue = `${tl}px ${tr}px ${br}px ${bl}px`;
    const code = `border-radius: ${radiusValue};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faShapes} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador Border Radius</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Ajusta cada esquina independientemente y genera código CSS al instante.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Controls */}
                <div className="lg:col-span-5 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Configuración</h3>
                        <button
                            onClick={() => setLocked(!locked)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-colors ${locked ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-text/60'
                                }`}
                        >
                            <FontAwesomeIcon icon={locked ? faLink : faUnlink} />
                            {locked ? 'Vinculados' : 'Separados'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        {locked ? (
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-semibold">Todas las esquinas</label>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tl}px</span>
                                </div>
                                <input
                                    type="range" min="0" max="200"
                                    value={tl} onChange={(e) => handleAllChange(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-semibold">Superior Izquierda</label>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tl}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200"
                                        value={tl} onChange={(e) => setTl(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-semibold">Superior Derecha</label>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tr}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200"
                                        value={tr} onChange={(e) => setTr(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-semibold">Inferior Derecha</label>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{br}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200"
                                        value={br} onChange={(e) => setBr(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-semibold">Inferior Izquierda</label>
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{bl}px</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="200"
                                        value={bl} onChange={(e) => setBl(Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-12 min-h-[400px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <div
                            className="w-64 h-64 bg-gradient-to-br from-primary to-purple-600 shadow-xl flex items-center justify-center text-white font-bold text-2xl"
                            style={{
                                borderTopLeftRadius: `${tl}px`,
                                borderTopRightRadius: `${tr}px`,
                                borderBottomRightRadius: `${br}px`,
                                borderBottomLeftRadius: `${bl}px`,
                            }}
                        >
                            Preview
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 left-0 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg border-r border-b border-primary/20">
                            CSS Code
                        </div>
                        <code className="block bg-surface border border-gray-200 rounded-xl p-6 pt-10 text-sm font-mono text-text">
                            -webkit-border-radius: {radiusValue};<br />
                            -moz-border-radius: {radiusValue};<br />
                            border-radius: {radiusValue};
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-secondary'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
