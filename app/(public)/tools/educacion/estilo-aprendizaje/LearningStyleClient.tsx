'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEarListen, faHandSparkles, faLightbulb, faRedo } from '@fortawesome/free-solid-svg-icons';

type StyleType = 'visual' | 'auditory' | 'kinesthetic';

interface Question {
    text: string;
    options: {
        text: string;
        type: StyleType;
    }[];
}

const questions: Question[] = [
    {
        text: "Cuando aprendes a usar un nuevo aparato, prefieres:",
        options: [
            { text: "Ver fotos y diagramas en el manual.", type: 'visual' },
            { text: "Escuchar a alguien explicarte cómo funciona.", type: 'auditory' },
            { text: "Empezar a usarlo e ir probando.", type: 'kinesthetic' }
        ]
    },
    {
        text: "Cuando te pierdes en una ciudad, tú:",
        options: [
            { text: "Usas el GPS y miras el mapa.", type: 'visual' },
            { text: "Preguntas direcciones a alguien.", type: 'auditory' },
            { text: "Sigues caminando hasta encontrar una referencia conocida.", type: 'kinesthetic' }
        ]
    },
    {
        text: "¿Qué recuerdas con más facilidad de una persona?",
        options: [
            { text: "Su cara.", type: 'visual' },
            { text: "Su nombre.", type: 'auditory' },
            { text: "Lo que hicisteis juntos.", type: 'kinesthetic' }
        ]
    },
    {
        text: "En clase, te distraes menos si:",
        options: [
            { text: "Tomas apuntes con colores o dibujos.", type: 'visual' },
            { text: "El profesor hace cambios de voz y debates.", type: 'auditory' },
            { text: "Hay descansos y actividades prácticas.", type: 'kinesthetic' }
        ]
    },
    {
        text: "Al comprar un libro, ¿qué influye más?",
        options: [
            { text: "La portada se ve atractiva.", type: 'visual' },
            { text: "Alguien te ha hablado de él.", type: 'auditory' },
            { text: "Se siente bien al tacto y el papel huele bien.", type: 'kinesthetic' }
        ]
    },
    {
        text: "Para relajarte prefieres:",
        options: [
            { text: "Ver una película o leer.", type: 'visual' },
            { text: "Escuchar música o un podcast.", type: 'auditory' },
            { text: "Hacer ejercicio o salir a caminar.", type: 'kinesthetic' }
        ]
    }
];

const resultsInfo = {
    visual: {
        title: "Aprendiz Visual",
        icon: faEye,
        color: "text-blue-500",
        bg: "bg-blue-50",
        border: "border-blue-200",
        desc: "Procesas mejor la información a través de imágenes, gráficos y diagramas.",
        tips: [
            "Usa mapas mentales y esquemas.",
            "Subraya tus apuntes con diferentes colores.",
            "Mira videos explicativos y documentales."
        ]
    },
    auditory: {
        title: "Aprendiz Auditivo",
        icon: faEarListen,
        color: "text-purple-500",
        bg: "bg-purple-50",
        border: "border-purple-200",
        desc: "Aprendes mejor escuchando y hablando. La información entra por tus oídos.",
        tips: [
            "Graba las clases y vuelve a escucharlas.",
            "Explica los temas en voz alta a otros.",
            "Usa reglas mnemotécnicas con rimas o canciones."
        ]
    },
    kinesthetic: {
        title: "Aprendiz Kinestésico",
        icon: faHandSparkles,
        color: "text-green-500",
        bg: "bg-green-50",
        border: "border-green-200",
        desc: "Necesitas moverte y tocar. Aprendes haciendo y a través de la experiencia práctica.",
        tips: [
            "Haz descansos cortos frecuentes.",
            "Estudia de pie o paseando.",
            "Construye maquetas o realiza experimentos prácticos."
        ]
    }
};

export default function LearningStyleClient() {
    const [currentQ, setCurrentQ] = useState(0);
    const [scores, setScores] = useState({ visual: 0, auditory: 0, kinesthetic: 0 });
    const [finished, setFinished] = useState(false);

    const handleAnswer = (type: StyleType) => {
        const newScores = { ...scores, [type]: scores[type] + 1 };
        setScores(newScores);

        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setScores({ visual: 0, auditory: 0, kinesthetic: 0 });
        setFinished(false);
    };

    const getWinner = (): StyleType => {
        if (scores.visual >= scores.auditory && scores.visual >= scores.kinesthetic) return 'visual';
        if (scores.auditory >= scores.visual && scores.auditory >= scores.kinesthetic) return 'auditory';
        return 'kinesthetic';
    };

    const winner = finished ? getWinner() : 'visual';
    const winnerInfo = resultsInfo[winner];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Test de Estilo de Aprendizaje</h1>
                    <p className="text-yellow-100 text-lg">
                        Descubre tu superpoder: ¿Eres Visual, Auditivo o Kinestésico?
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faLightbulb} className="text-9xl" />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 min-h-[400px]">
                {!finished ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">
                            <span>Pregunta {currentQ + 1} de {questions.length}</span>
                            <span>{Math.round(((currentQ) / questions.length) * 100)}% Completado</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
                            <div className="bg-yellow-400 h-full rounded-full transition-all duration-300" style={{ width: `${((currentQ) / questions.length) * 100}%` }}></div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-snug">
                            {questions[currentQ].text}
                        </h2>

                        <div className="space-y-4">
                            {questions[currentQ].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.type)}
                                    className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 transition-all font-medium text-gray-700 active:scale-95"
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                        <div className={`${winnerInfo.bg} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}>
                            <FontAwesomeIcon icon={winnerInfo.icon} className={`text-5xl ${winnerInfo.color}`} />
                        </div>

                        <h2 className="text-4xl font-black text-gray-800 mb-2">
                            ¡Eres {winnerInfo.title}!
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {winnerInfo.desc}
                        </p>

                        {/* Breakdown */}
                        <div className="flex justify-center gap-4 mb-10">
                            {[
                                { k: 'visual', l: 'Visual' },
                                { k: 'auditory', l: 'Auditivo' },
                                { k: 'kinesthetic', l: 'Kinestésico' }
                            ].map((s) => (
                                <div key={s.k} className="text-center px-4">
                                    <div className="text-xs text-gray-400 uppercase font-bold mb-1">{s.l}</div>
                                    <div className="font-mono font-bold text-2xl text-gray-700">
                                        {Math.round((scores[s.k as StyleType] / questions.length) * 100)}%
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tips Card */}
                        <div className={`text-left p-8 rounded-2xl border-2 ${winnerInfo.border} ${winnerInfo.bg} mb-8`}>
                            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${winnerInfo.color}`}>
                                <FontAwesomeIcon icon={faLightbulb} />
                                Estrategias Recomendadas para ti:
                            </h3>
                            <ul className="space-y-3">
                                {winnerInfo.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${winnerInfo.color.replace('text', 'bg')}`}></span>
                                        <span className="text-gray-700 font-medium">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={resetQuiz}
                            className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            <FontAwesomeIcon icon={faRedo} />
                            Repetir Test
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
