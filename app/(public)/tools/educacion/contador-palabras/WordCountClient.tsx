'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faClock, faMicrophone, faAlignLeft, faParagraph } from '@fortawesome/free-solid-svg-icons';

export default function WordCountClient() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpace: 0,
        paragraphs: 0,
        sentences: 0
    });
    const [time, setTime] = useState({
        silent: 0, // minutes
        speech: 0  // minutes
    });

    useEffect(() => {
        if (!text) {
            setStats({ words: 0, chars: 0, charsNoSpace: 0, paragraphs: 0, sentences: 0 });
            setTime({ silent: 0, speech: 0 });
            return;
        }

        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

        setStats({ words, chars, charsNoSpace, paragraphs, sentences });

        // Avg speeds
        // Silent reading: 250 wpm (adult average)
        // Speech (presentation): 130 wpm
        setTime({
            silent: words / 250,
            speech: words / 130
        });

    }, [text]);

    const formatTime = (minutes: number) => {
        if (minutes < 1) {
            const seconds = Math.round(minutes * 60);
            return `${seconds} seg`;
        }
        const m = Math.floor(minutes);
        const s = Math.round((minutes - m) * 60);
        return s > 0 ? `${m} min ${s} s` : `${m} min`;
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Contador de Palabras y Tiempo</h1>
                    <p className="text-gray-300 text-lg">
                        Estima cuánto tardarás en leer o presentar tu texto en clase.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faClock} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Input Area */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="relative">
                        <textarea
                            className="w-full h-[500px] p-6 rounded-3xl border-2 border-gray-200 focus:border-gray-800 focus:ring-4 focus:ring-gray-100 outline-none resize-none font-sans text-lg leading-relaxed text-gray-700 shadow-sm transition-all"
                            placeholder="Empieza a escribir o pega tu ensayo aquí..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button
                            onClick={() => setText('')}
                            className="absolute top-4 right-4 text-xs bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 px-3 py-1 rounded-full transition-colors"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Time Cards */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <FontAwesomeIcon icon={faClock} />
                            Tiempo de Lectura
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-1">Silenciosa (Estudio)</div>
                                <div className="text-3xl font-black text-blue-700">{formatTime(time.silent)}</div>
                            </div>
                            <div className="pt-4 border-t border-blue-200">
                                <div className="text-xs text-purple-500 uppercase font-bold tracking-wider mb-1">
                                    <FontAwesomeIcon icon={faMicrophone} className="mr-1" />
                                    Voz Alta (Discurso)
                                </div>
                                <div className="text-3xl font-black text-purple-700">{formatTime(time.speech)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Counts Grid */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Métricas</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-2xl font-bold text-gray-800">{stats.words}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Palabras</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-2xl font-bold text-gray-800">{stats.paragraphs}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Párrafos</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-2xl font-bold text-gray-800">{stats.chars}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Caracteres</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl text-center">
                                <div className="text-2xl font-bold text-gray-800">{stats.sentences}</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">Oraciones</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
