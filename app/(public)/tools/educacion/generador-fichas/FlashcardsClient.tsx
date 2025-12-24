'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPlay, faEdit, faRandom, faRedo, faDownload, faUpload, faArrowRight, faArrowLeft, faLightbulb } from '@fortawesome/free-solid-svg-icons';

interface Flashcard {
    id: string;
    front: string;
    back: string;
}

export default function FlashcardsClient() {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [mode, setMode] = useState<'edit' | 'study'>('edit');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Form inputs
    const [frontInput, setFrontInput] = useState('');
    const [backInput, setBackInput] = useState('');

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('toolero_flashcards');
        if (saved) {
            try {
                setCards(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load cards", e);
            }
        } else {
            // Load demo data
            setCards([
                { id: '1', front: '¿Cuál es la capital de Francia?', back: 'París' },
                { id: '2', front: 'Fórmula del agua', back: 'H2O' },
                { id: '3', front: 'Año de llegada del hombre a la luna', back: '1969' }
            ]);
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('toolero_flashcards', JSON.stringify(cards));
    }, [cards]);

    const addCard = () => {
        if (!frontInput.trim() || !backInput.trim()) return;
        const newCard: Flashcard = {
            id: Date.now().toString(),
            front: frontInput,
            back: backInput
        };
        setCards([...cards, newCard]);
        setFrontInput('');
        setBackInput('');
    };

    const deleteCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    const startStudy = () => {
        if (cards.length === 0) return;
        setMode('study');
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev + 1) % cards.length);
        }, 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
        }, 150);
    };

    const shuffleCards = () => {
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cards));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "mis_fichas.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Generador de Fichas de Estudio</h1>
                    <p className="text-indigo-100 text-lg">
                        Crea, edita y estudia con tarjetas mnemotécnicas (Flashcards) para memorizar mejor.
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center mb-8 gap-4">
                <button
                    onClick={() => setMode('edit')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'edit' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Editar Fichas
                </button>
                <button
                    onClick={startStudy}
                    disabled={cards.length === 0}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${mode === 'study' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <FontAwesomeIcon icon={faPlay} className="mr-2" /> Modo Estudio
                </button>
            </div>

            {mode === 'edit' ? (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                    {/* Add New Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Nueva Ficha
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Pregunta (Frente)</label>
                                <textarea
                                    value={frontInput}
                                    onChange={(e) => setFrontInput(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none resize-none h-24"
                                    placeholder="Escribe la pregunta o término..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Respuesta (Reverso)</label>
                                <textarea
                                    value={backInput}
                                    onChange={(e) => setBackInput(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none resize-none h-24"
                                    placeholder="Escribe la respuesta o definición..."
                                />
                            </div>
                            <button
                                onClick={addCard}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md active:scale-95"
                            >
                                Añadir Ficha
                            </button>
                        </div>
                    </div>

                    {/* Card List */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[500px]">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Mis Fichas ({cards.length})</h2>
                            <div className="flex gap-2">
                                <button onClick={exportData} className="text-gray-500 hover:text-indigo-600 p-2" title="Descargar JSON">
                                    <FontAwesomeIcon icon={faDownload} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {cards.length === 0 && (
                                <div className="text-center text-gray-400 py-10">
                                    No hay fichas todavía. ¡Añade algunas para empezar!
                                </div>
                            )}
                            {cards.map((card, i) => (
                                <div key={card.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 group hover:border-indigo-200 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                                        <button onClick={() => deleteCard(card.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <div className="font-medium text-gray-800 mb-1">{card.front}</div>
                                    <div className="text-sm text-gray-500 border-t border-gray-200 pt-1 mt-1">{card.back}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto animate-fade-in-up">
                    {/* Study Mode */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="text-gray-500 font-medium">
                            Ficha {currentCardIndex + 1} de {cards.length}
                        </div>
                        <button onClick={shuffleCards} className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors font-medium text-sm">
                            <FontAwesomeIcon icon={faRandom} /> Barajar
                        </button>
                    </div>

                    {/* The FLIP Card */}
                    <div
                        className="relative h-80 w-full mb-8 cursor-pointer perspective-1000 group"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center hover:border-indigo-300 transition-colors">
                                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-4">Pregunta</div>
                                <div className="text-2xl font-bold text-gray-800">{cards[currentCardIndex]?.front}</div>
                                <div className="absolute bottom-6 text-indigo-400 text-sm animate-pulse">
                                    <FontAwesomeIcon icon={faLightbulb} /> Haz clic para voltear
                                </div>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white">
                                <div className="text-xs text-indigo-200 uppercase font-bold tracking-wider mb-4">Respuesta</div>
                                <div className="text-2xl font-bold">{cards[currentCardIndex]?.back}</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); prevCard(); }}
                            className="w-14 h-14 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 shadow-sm transition-all flex items-center justify-center text-xl"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }}
                            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-8 py-3 rounded-xl font-bold transition-colors"
                        >
                            {isFlipped ? 'Ver Pregunta' : 'Ver Respuesta'}
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextCard(); }}
                            className="w-14 h-14 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 shadow-sm transition-all flex items-center justify-center text-xl"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </div>
    );
}
