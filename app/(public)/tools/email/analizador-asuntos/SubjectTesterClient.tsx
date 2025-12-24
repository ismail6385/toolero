'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faExclamationTriangle, faCheckCircle, faMagic, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

export default function SubjectTesterClient() {
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<any[]>([]);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');

    useEffect(() => {
        analyze();
    }, [subject]);

    const analyze = () => {
        if (!subject) {
            setScore(0);
            setFeedback([]);
            return;
        }

        let tempScore = 100;
        let tempFeedback = [];

        // 1. Length Check
        const length = subject.length;
        if (length === 0) {
            tempScore = 0;
        } else if (length < 20) {
            tempScore -= 10;
            tempFeedback.push({ type: 'warning', text: 'Demasiado corto. Añade más contexto.' });
        } else if (length > 60) {
            tempScore -= 20;
            tempFeedback.push({ type: 'warning', text: 'Demasiado largo. Se cortará en móviles (< 60 chars).' });
        } else {
            tempFeedback.push({ type: 'success', text: 'Longitud ideal (20-60 caracteres).' });
        }

        // 2. Spam Words
        const spamWords = ['gratis', 'dinero', 'urgente', 'gana', 'click', '100%', '$$$', 'promoción', 'oferta', 'descuento'];
        const foundSpam = spamWords.filter(w => subject.toLowerCase().includes(w));
        if (foundSpam.length > 0) {
            tempScore -= (foundSpam.length * 15);
            tempFeedback.push({ type: 'danger', text: `Cuidado con palabras spam: "${foundSpam.join(', ')}". Pueden activar filtros.` });
        }

        // 3. Caps Lock
        const upperCount = subject.replace(/[^A-Z]/g, "").length;
        if (length > 0 && (upperCount / length) > 0.5) {
            tempScore -= 20;
            tempFeedback.push({ type: 'danger', text: 'Evita usar demasiadas MAYÚSCULAS. Parece que gritas.' });
        }

        // 4. Emojis
        const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u;
        if (emojiRegex.test(subject)) {
            tempScore += 5; // Bonus
            tempFeedback.push({ type: 'success', text: 'Bien hecho. Los emojis aumentan el CTR.' });
        }

        // 5. Punctuation !!!
        if ((subject.match(/!/g) || []).length > 2) {
            tempScore -= 10;
            tempFeedback.push({ type: 'warning', text: 'Demasiados signos de exclamación (!!!).' });
        }

        // Clamp Score
        setScore(Math.max(0, Math.min(100, tempScore)));
        setFeedback(tempFeedback);
    };

    const getScoreColor = () => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Analizador de Asuntos de Email</h1>
                    <p className="text-purple-100 text-lg">
                        Optimiza tu tasa de apertura (Open Rate) antes de enviar.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faMagic} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input & Score */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative">
                        <label className="text-sm font-bold text-gray-700 block mb-2">Escribe tu línea de asunto:</label>
                        <input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 outline-none text-lg font-medium shadow-inner"
                            placeholder="Ej. ¡Nueva colección de verano disponible ahora! ☀️"
                        />
                        <div className="absolute top-6 right-6 text-xs text-gray-400">
                            {subject.length} caracteres
                        </div>
                    </div>

                    {subject && (
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Puntuación de Impacto</div>
                            <div className={`text-6xl font-black mb-2 ${getScoreColor()}`}>
                                {score}/100
                            </div>
                            <div className="flex flex-col gap-3 mt-8">
                                {feedback.map((item, i) => (
                                    <div key={i} className={`text-left p-3 rounded-lg text-sm font-medium flex items-start gap-3 ${item.type === 'success' ? 'bg-green-50 text-green-700' :
                                            item.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                                                'bg-red-50 text-red-700'
                                        }`}>
                                        <FontAwesomeIcon icon={
                                            item.type === 'success' ? faCheckCircle :
                                                faExclamationTriangle
                                        } className="mt-1" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Simulation */}
                <div className="space-y-6">
                    <div className="bg-gray-800 p-8 rounded-[3rem] border-8 border-gray-900 shadow-2xl max-w-sm mx-auto relative overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>

                        {/* Screen */}
                        <div className="bg-white h-[500px] w-full rounded-2xl overflow-hidden relative">
                            {/* Status Bar */}
                            <div className="bg-gray-100 h-6 w-full flex justify-between px-4 items-center text-[10px] font-bold text-gray-500">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <span>📶</span>
                                    <span>🔋</span>
                                </div>
                            </div>

                            {/* Email App Header */}
                            <div className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
                                <span className="text-blue-500 text-xs">Editar</span>
                                <span className="font-bold text-gray-800 text-sm">Bandeja de Entrada</span>
                                <span className="text-blue-500 text-xs">Buscar</span>
                            </div>

                            {/* Email Item (The Preview) */}
                            <div className="bg-blue-50 p-3 border-b border-gray-100 flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                                    TÚ
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-sm text-gray-900 truncate">Tu Nombre / Marca</h4>
                                        <span className="text-[10px] text-gray-400">Ahora</span>
                                    </div>
                                    <p className={`text-sm text-gray-800 leading-tight mb-1 ${subject.length > 50 ? 'line-clamp-2' : ''}`}>
                                        {subject || 'Aquí aparecerá tu asunto...'}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        Este es el pre-header o las primeras líneas del cuerpo de tu correo. Asegúrate de que complemente...
                                    </p>
                                </div>
                            </div>

                            {/* Generic Items */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-3 border-b border-gray-100 flex gap-3 opacity-40 grayscale">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
                                        <div className="h-2 bg-gray-200 rounded w-full mb-1"></div>
                                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-center text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                        Vista previa en iPhone (Corte ~40-60 caracteres)
                    </p>
                </div>
            </div>
        </div>
    );
}
