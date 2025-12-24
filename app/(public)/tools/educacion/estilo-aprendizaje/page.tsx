import { Metadata } from 'next';
import LearningStyleClient from './LearningStyleClient';

export const metadata: Metadata = {
    title: 'Test de Estilo de Aprendizaje (VARK) | Visual, Auditivo, Kinestésico',
    description: 'Descubre cuál es tu estilo de aprendizaje dominante con este test rápido. Mejora tus técnicas de estudio sabiendo si eres visual, auditivo o kinestésico.',
    keywords: [
        'test estilo aprendizaje',
        'VARK test',
        'visual auditivo kinestesico',
        'como aprendo mejor',
        'tecnicas estudio personalizadas',
        'tipo de estudiante quiz'
    ],
};

export default function LearningStylePage() {
    return (
        <>
            <LearningStyleClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Por qué es importante conocer tu estilo de aprendizaje?</h2>
                    <p className="text-gray-600 mb-4">
                        Cada cerebro procesa la información de manera diferente. El modelo VARK (Visual, Aural, Read/Write, Kinesthetic) identifica estas preferencias.
                        Saber si aprendes mejor viendo diagramas, escuchando explicaciones o manipulando objetos puede ahorrarte horas de estudio frustrante.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Los 3 Estilos Principales</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <h4 className="font-bold text-blue-700 mb-2">👁️ Visual</h4>
                            <p className="text-sm text-gray-600">Prefieren la información gráfica: mapas, tablas, diagramas y colores. Tienen buena memoria espacial.</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl">
                            <h4 className="font-bold text-purple-700 mb-2">👂 Auditivo</h4>
                            <p className="text-sm text-gray-600">Aprenden mejor escuchando. Prefieren las clases magistrales, debates y estudiar en voz alta.</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl">
                            <h4 className="font-bold text-green-700 mb-2">✋ Kinestésico</h4>
                            <p className="text-sm text-gray-600">Aprenden haciendo. Necesitan movimiento y práctica real. Se aburren si están mucho tiempo quietos.</p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
