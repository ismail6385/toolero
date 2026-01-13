'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function UnixTimestampClient() {
    const [current, setCurrent] = useState(Math.floor(Date.now() / 1000));
    const [inputTs, setInputTs] = useState('');
    const [resultDate, setResultDate] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [resultTs, setResultTs] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const convertTsToDate = (val: string) => {
        setInputTs(val);
        const ts = parseInt(val);
        if (!isNaN(ts)) {
            // Check if it's seconds or milliseconds (usually < 10000000000 is seconds)
            // But let's assume seconds as per Unix standard, but handle ms if it's huge
            const date = new Date(ts * (ts > 100000000000 ? 1 : 1000));
            setResultDate(date.toLocaleString());
        } else {
            setResultDate('Fecha inválida');
        }
    };

    const convertDateToTs = (val: string) => {
        setInputDate(val);
        const date = new Date(val);
        if (date.toString() !== 'Invalid Date') {
            setResultTs(Math.floor(date.getTime() / 1000).toString());
        } else {
            setResultTs('Fecha inválida');
        }
    };

    const copyCurrent = () => {
        navigator.clipboard.writeText(current.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faClock} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Conversor Timestamp Unix</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Obtén el tiempo Unix actual y convierte entre fechas legibles y timestamps (segundos desde 1970).
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div className="lg:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Timestamp Actual</div>
                    <div className="text-6xl md:text-8xl font-mono font-bold tracking-tighter mb-8 tabular-nums">
                        {current}
                    </div>
                    <button
                        onClick={copyCurrent}
                        className={`bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 backdrop-blur-sm ${copied ? 'text-green-400' : ''}`}
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                        {copied ? 'Copiado' : 'Copiar al portapapeles'}
                    </button>
                </div>

                {/* TS to Date */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Timestamp <span className="text-gray-400">→</span> Fecha
                    </h3>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-500 mb-2">Timestamp (segundos)</label>
                        <input
                            type="number"
                            placeholder={current.toString()}
                            value={inputTs}
                            onChange={(e) => convertTsToDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                        />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-1">Resultado</div>
                        <div className="text-lg font-bold text-primary break-words">
                            {resultDate || '...'}
                        </div>
                    </div>
                </div>

                {/* Date to TS */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Fecha <span className="text-gray-400">→</span> Timestamp
                    </h3>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-500 mb-2">Selecciona Fecha y Hora</label>
                        <input
                            type="datetime-local"
                            value={inputDate}
                            onChange={(e) => convertDateToTs(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                        />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-1">Resultado (Timestamp)</div>
                        <div className="text-lg font-bold text-primary break-all font-mono">
                            {resultTs || '...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
