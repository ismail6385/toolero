'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faPlus, faTrash, faPlay, faPencilAlt, faCheckCircle, faTimesCircle, faTrophy } from '@fortawesome/free-solid-svg-icons';

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    options: Option[];
    correctOptionId: string;
}

export default function QuizMakerClient() {
    const [mode, setMode] = useState<'edit' | 'play' | 'result'>('edit');
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            text: '¿Cuál es el planeta más grande del sistema solar?',
            options: [
                { id: 'o1', text: 'Tierra' },
                { id: 'o2', text: 'Júpiter' },
                { id: 'o3', text: 'Marte' }
            ],
            correctOptionId: 'o2'
        }
    ]);

    // Play State
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // CRUD Logic
    const addQuestion = () => {
        const qId = Math.random().toString();
        const o1 = Math.random().toString();
        const o2 = Math.random().toString();
        setQuestions([...questions, {
            id: qId,
            text: 'Nueva Pregunta',
            options: [
                { id: o1, text: 'Opción 1' },
                { id: o2, text: 'Opción 2' }
            ],
            correctOptionId: o1
        }]);
    };

    const updateQuestionText = (id: string, text: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
    };

    const addOption = (qId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                return {
                    ...q,
                    options: [...q.options, { id: Math.random().toString(), text: 'Nueva Opción' }]
                };
            }
            return q;
        }));
    };

    const removeOption = (qId: string, oId: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId && q.options.length > 2) { // Min 2 options
                return {
                    ...q,
                    options: q.options.filter(o => o.id !== oId)
                };
            }
            return q;
        }));
    };

    const updateOptionText = (qId: string, oId: string, text: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                return {
                    ...q,
                    options: q.options.map(o => o.id === oId ? { ...o, text } : o)
                };
            }
            return q;
        }));
    };

    const setCorrect = (qId: string, oId: string) => {
        setQuestions(questions.map(q => q.id === qId ? { ...q, correctOptionId: oId } : q));
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // Play Logic
    const startQuiz = () => {
        setScore(0);
        setCurrentQIndex(0);
        setSelectedOption(null);
        setShowFeedback(false);
        setMode('play');
    };

    const handleAnswer = (oId: string) => {
        if (showFeedback) return;
        setSelectedOption(oId);
        setShowFeedback(true);

        if (oId === questions[currentQIndex].correctOptionId) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQIndex < questions.length - 1) {
                setCurrentQIndex(currentQIndex + 1);
                setSelectedOption(null);
                setShowFeedback(false);
            } else {
                setMode('result');
            }
        }, 1500);
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Creador de Cuestionarios (Quiz)</h1>
                    <p className="text-pink-100 text-lg">
                        Diseña exámenes tipo test y practica tus conocimientos.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faClipboardCheck} className="text-9xl" />
                </div>
            </div>

            {mode === 'edit' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-4 z-20">
                        <h2 className="font-bold text-gray-700">Editor ({questions.length} preguntas)</h2>
                        <div className="flex gap-2">
                            <button onClick={addQuestion} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
                                <FontAwesomeIcon icon={faPlus} /> Añadir Pregunta
                            </button>
                            <button onClick={startQuiz} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                                <FontAwesomeIcon icon={faPlay} /> Jugar
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, i) => (
                            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative group">
                                <button
                                    onClick={() => removeQuestion(q.id)}
                                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                <div className="flex gap-4 mb-4">
                                    <span className="bg-pink-100 text-pink-600 font-bold w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">{i + 1}</span>
                                    <input
                                        value={q.text}
                                        onChange={(e) => updateQuestionText(q.id, e.target.value)}
                                        className="w-full text-lg font-bold text-gray-800 border-b-2 border-transparent hover:border-gray-200 focus:border-pink-500 outline-none bg-transparent"
                                        placeholder="Escribe la pregunta..."
                                    />
                                </div>

                                <div className="pl-12 space-y-3">
                                    {q.options.map((opt) => (
                                        <div key={opt.id} className="flex items-center gap-3">
                                            <button
                                                onClick={() => setCorrect(q.id, opt.id)}
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${q.correctOptionId === opt.id ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-transparent hover:border-gray-400'}`}
                                            >
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                                            </button>
                                            <input
                                                value={opt.text}
                                                onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)}
                                                className={`flex-1 p-2 rounded-lg border ${q.correctOptionId === opt.id ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                                            />
                                            <button onClick={() => removeOption(q.id, opt.id)} className="text-gray-300 hover:text-red-400">
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => addOption(q.id)} className="text-xs font-bold text-pink-500 hover:text-pink-700 ml-9">
                                        + Añadir Opción
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {mode === 'play' && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 min-h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Pregunta {currentQIndex + 1} / {questions.length}</span>
                            <button onClick={() => setMode('edit')} className="text-sm text-gray-400 hover:text-gray-600">Salir</button>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-8">{questions[currentQIndex].text}</h2>

                        <div className="space-y-4">
                            {questions[currentQIndex].options.map(opt => {
                                let statusClass = 'border-gray-200 hover:bg-gray-50';
                                if (showFeedback) {
                                    if (opt.id === questions[currentQIndex].correctOptionId) statusClass = 'border-green-500 bg-green-50 text-green-700';
                                    else if (opt.id === selectedOption) statusClass = 'border-red-500 bg-red-50 text-red-700';
                                    else statusClass = 'opacity-50 border-gray-200';
                                }

                                return (
                                    <button
                                        key={opt.id}
                                        disabled={showFeedback}
                                        onClick={() => handleAnswer(opt.id)}
                                        className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${statusClass}`}
                                    >
                                        {opt.text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {mode === 'result' && (
                <div className="max-w-xl mx-auto text-center animate-fade-in-up">
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
                        <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600 text-5xl">
                            <FontAwesomeIcon icon={faTrophy} />
                        </div>
                        <h2 className="text-4xl font-black text-gray-800 mb-2">
                            {Math.round((score / questions.length) * 100)}%
                        </h2>
                        <p className="text-gray-500 text-lg mb-8">
                            Has acertado {score} de {questions.length} preguntas
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button onClick={startQuiz} className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all">
                                <FontAwesomeIcon icon={faRotate} className="mr-2" />
                                Reintentar
                            </button>
                            <button onClick={() => setMode('edit')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold transition-all">
                                <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
