'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

export default function KeycodeInfoClient() {
    const [eventInfo, setEventInfo] = useState<KeyboardEvent | null>(null);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            setEventInfo(e);

            setHistory(prev => [{
                key: e.key,
                code: e.code,
                which: e.which,
                time: new Date().toLocaleTimeString()
            }, ...prev].slice(0, 10));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const InfoCard = ({ label, value, main = false }: { label: string, value: string | number, main?: boolean }) => (
        <div className={`bg-surface border border-gray-100 shadow-lg rounded-2xl flex flex-col items-center justify-center text-center p-6 ${main ? 'bg-indigo-50 border-indigo-200' : ''}`}>
            <span className="text-xs font-bold text-text/40 uppercase mb-2">{label}</span>
            <span className={`font-mono font-bold text-text ${main ? 'text-6xl text-indigo-600' : 'text-3xl'}`}>
                {value}
            </span>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-[80vh] flex flex-col items-center justify-center">

            {!eventInfo ? (
                <div className="text-center animate-pulse">
                    <div className="inline-flex items-center justify-center p-8 bg-gray-50 rounded-full mb-8 text-gray-300 border-4 border-gray-100">
                        <FontAwesomeIcon icon={faKeyboard} className="text-6xl" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">Presiona una tecla</h1>
                    <p className="text-xl text-text/60">
                        Para obtener su código JavaScript, valor y más.
                    </p>
                </div>
            ) : (
                <div className="w-full animate-fade-in-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <InfoCard label="event.which" value={eventInfo.which} main />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <InfoCard label="event.key" value={eventInfo.key === ' ' ? '(Space)' : eventInfo.key} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <InfoCard label="event.code" value={eventInfo.code} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <InfoCard label="event.location" value={eventInfo.location} />
                        </div>
                    </div>

                    <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 font-bold text-text/60 text-sm uppercase">
                            Detalles del Evento
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {[
                                        { k: 'description', v: eventInfo.key === ' ' ? 'Space Key' : `Key ${eventInfo.key}` }, // Simple desc
                                        { k: 'event.which', v: eventInfo.which },
                                        { k: 'event.code', v: eventInfo.code },
                                        { k: 'event.key', v: eventInfo.key },
                                        { k: 'event.charCode', v: (eventInfo as any).charCode || 0 }, // Deprecated but useful ref
                                        { k: 'event.keyCode', v: eventInfo.keyCode },
                                        { k: 'event.location', v: eventInfo.location },
                                        { k: 'event.shiftKey', v: eventInfo.shiftKey ? 'true' : 'false' },
                                        { k: 'event.altKey', v: eventInfo.altKey ? 'true' : 'false' },
                                        { k: 'event.ctrlKey', v: eventInfo.ctrlKey ? 'true' : 'false' },
                                        { k: 'event.metaKey', v: eventInfo.metaKey ? 'true' : 'false' },
                                        { k: 'event.repeat', v: eventInfo.repeat ? 'true' : 'false' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 font-mono text-sm text-text/60 w-1/3">{row.k}</td>
                                            <td className="py-3 px-4 font-mono text-sm font-bold text-indigo-600">{row.v}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {history.length > 0 && (
                        <div className="mt-8 text-center text-xs text-text/30">
                            Últimas teclas: {history.map(h => `[${h.key === ' ' ? 'Space' : h.key}] `)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
