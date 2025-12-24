import { Metadata } from 'next';
import StudyTimeClient from './StudyTimeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Tiempo de Estudio | Planificador de Exámenes',
    description: 'Calcula cuánto tiempo necesitas estudiar al día para aprobar tus exámenes. Planifica tu horario de estudio según la dificultad y temas restantes.',
    keywords: [
        'calculadora tiempo estudio',
        'planificador examenes',
        'study planner',
        'calendario estudio',
        'organizador tareas estudiante',
        'cuantas horas estudiar',
        'plan de estudio'
    ],
};

export default function StudyTimePage() {
    return (
        <>
            <StudyTimeClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Planifica tu éxito académico</h2>
                    <p className="text-gray-600 mb-4">
                        La falta de planificación es una de las principales causas de estrés en época de exámenes.
                        Nuestra calculadora te ayuda a visualizar exactamente cuánto esfuerzo diario necesitas para cubrir todo el temario sin agobios de última hora.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">¿Cómo funciona el cálculo?</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                            <span><strong>Temas y Dificultad:</strong> Asignamos un tiempo base por tema: 30 min (Fácil), 1 hora (Media), 1.5 horas (Difícil).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                            <span><strong>Días Hábiles:</strong> Calculamos los días exactos hasta tu fecha límite.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                            <span><strong>Distribución:</strong> Dividimos la carga total entre los días disponibles para darte una meta diaria realista.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
