'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faPrint, faPlus, faTrash, faRotate, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from 'react-to-print';

interface Flashcard {
    id: string;
    front: string;
    back: string;
}

export default function FlashcardsClient() {
    const [cards, setCards] = useState<Flashcard[]>([
        { id: '1', front: 'Capital de Francia', back: 'París' },
        { id: '2', front: 'Fórmula del Agua', back: 'H2O' },
        { id: '3', front: 'Revolución Francesa', back: '1789' }
    ]);
    const [mode, setMode] = useState<'edit' | 'study'>('edit');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Print Logic
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // CRUD
    const addCard = () => {
        setCards([...cards, { id: Math.random().toString(), front: '', back: '' }]);
    };

    const removeCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    const updateCard = (id: string, field: keyof Flashcard, value: string) => {
        setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    // Study Logic
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

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden print:hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Generador de Flashcards</h1>
                    <p className="text-amber-100 text-lg">
                        Crea, estudia e imprime tus tarjetas de memoria.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faStickyNote} className="text-9xl" />
                </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex justify-center mb-8 print:hidden">
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setMode('edit')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'edit' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                        Editar / Imprimir
                    </button>
                    <button
                        onClick={() => setMode('study')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${mode === 'study' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                    >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Estudiar Online
                    </button>
                </div>
            </div>

            {mode === 'edit' ? (
                <div className="space-y-8">
                    {/* Editor & Actions */}
                    <div className="flex justify-between items-center print:hidden">
                        <button onClick={addCard} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                            <FontAwesomeIcon icon={faPlus} /> Añadir Tarjeta
                        </button>
                        <button onClick={handlePrint} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                            <FontAwesomeIcon icon={faPrint} /> Imprimir PDF
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 print:hidden">
                        {cards.map((card, i) => (
                            <div key={card.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                                <div className="absolute top-2 left-2 text-xs font-bold text-gray-300">#{i + 1}</div>
                                <button onClick={() => removeCard(card.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                <div className="space-y-3 mt-4">
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Anverso (Pregunta)</label>
                                        <textarea
                                            value={card.front}
                                            onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                                            className="w-full bg-orange-50/50 border border-gray-200 rounded-lg p-2 text-sm font-medium focus:border-orange-400 outline-none resize-none h-16"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold uppercase mb-1 block">Reverso (Respuesta)</label>
                                        <textarea
                                            value={card.back}
                                            onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm font-medium focus:border-orange-400 outline-none resize-none h-16"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Printable Area (Hidden normally, shown on print) */}
                    <div className="hidden print:block">
                        <div ref={componentRef} className="p-8">
                            <h2 className="text-center font-bold text-2xl mb-8">Mis Flashcards - Toolero</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {cards.map((card, i) => (
                                    <div key={card.id} className="border-2 border-dashed border-gray-300 p-4 rounded-xl break-inside-avoid">
                                        <div className="border-b border-gray-200 pb-2 mb-2 font-bold text-lg min-h-[50px] flex items-center justify-center text-center">
                                            {card.front}
                                        </div>
                                        <div className="pt-2 text-gray-600 min-h-[50px] flex items-center justify-center text-center">
                                            {card.back}
                                        </div>
                                        <div className="text-[10px] text-gray-400 text-center mt-2 uppercase tracking-wide">Doblar aquí</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-xl mx-auto">
                    {/* Study Mode */}
                    <div className="perspective-1000 w-full h-[400px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                        <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

                            {/* Front */}
                            <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center p-8 text-center">
                                <div>
                                    <div className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">Pregunta</div>
                                    <h2 className="text-3xl font-bold text-gray-800">{cards[currentCardIndex]?.front}</h2>
                                </div>
                                <div className="absolute bottom-4 text-xs text-gray-400">Click para voltear</div>
                            </div>

                            {/* Back */}
                            <div className="absolute w-full h-full backface-hidden bg-orange-50 rounded-3xl shadow-2xl border border-orange-100 flex items-center justify-center p-8 text-center rotate-y-180">
                                <div>
                                    <div className="text-sm text-orange-400 font-bold uppercase tracking-widest mb-4">Respuesta</div>
                                    <h2 className="text-3xl font-bold text-orange-800">{cards[currentCardIndex]?.back}</h2>
                                </div>
                                <div className="absolute bottom-4 text-xs text-orange-400">Click para volver</div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-8">
                        <button onClick={prevCard} className="p-3 rounded-full bg-white shadow hover:bg-gray-50 text-gray-600">
                            ← Anterior
                        </button>
                        <span className="font-bold text-gray-400">
                            {currentCardIndex + 1} / {cards.length}
                        </span>
                        <button onClick={nextCard} className="p-3 rounded-full bg-white shadow hover:bg-gray-50 text-gray-600">
                            Siguiente →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
