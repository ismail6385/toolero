import { Metadata } from 'next';
import QuizMakerClient from './QuizMakerClient';

export const metadata: Metadata = {
    title: 'Creador de Cuestionarios y Quiz Online | Educación',
    description: 'Crea tus propios exámenes tipo test, compártelos o úsalos para estudiar. Herramienta gratuita para profesores y estudiantes.',
    keywords: [
        'creador quiz online',
        'hacer examenes tipo test',
        'cuestionarios educativos',
        'quiz maker free',
        'test con autoevaluacion',
        'herramientas para profesores'
    ],
};

export default function QuizMakerPage() {
    return (
        <>
            <QuizMakerClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Evalúa tu conocimiento</h2>
                    <p className="text-gray-600 mb-4">
                        Crear tus propios exámenes es una de las mejores formas de estudiar. Al tener que pensar en las "respuestas trampa" (distractores), obligas a tu cerebro a entender profundamente el tema.
                    </p>
                </section>

                <section className="bg-pink-50 p-8 rounded-2xl border border-pink-100 mb-12">
                    <h3 className="text-xl font-bold text-pink-900 mb-4">Usos Comunes</h3>
                    <ul className="space-y-2 list-disc pl-5 text-pink-800">
                        <li>Simulacros de examen para oposiciones o universidad.</li>
                        <li>Repaso de vocabulario en idiomas.</li>
                        <li>Trivia para jugar con amigos o en clase.</li>
                        <li>Autoevaluación rápida antes de un examen real.</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
