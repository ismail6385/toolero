import React from 'react';
import type { Metadata } from 'next';
import PomodoroClient from './PomodoroClient';
import HowToJsonLd from '@/components/seo/HowToJsonLd';
import AEOAnswerHub from '@/components/ai/AEOAnswerHub';
import AISummaryBox from '@/components/ai/AISummaryBox';

export const metadata: Metadata = {
    title: 'Temporizador Pomodoro Online Gratis | Técnica Pomodoro para Estudiar | Toolero',
    description: 'Usa la técnica Pomodoro para estudiar o trabajar con nuestro temporizador online gratuito. 25 minutos de trabajo, 5 de descanso. Sin registro, sin instalación. Ideal para estudiantes en España.',
    keywords: [
        'tecnica pomodoro estudiar',
        'temporizador pomodoro online gratis',
        'cronometro pomodoro español',
        'metodo pomodoro selectividad',
        'timer estudio sin instalar',
        'toolero pomodoro'
    ]
};

export default function PomodoroPage() {
    return (
        <>
            <PomodoroClient />

            <article className="max-w-4xl mx-auto px-4 pb-16">

                <HowToJsonLd
                    name="Cómo usar la técnica Pomodoro para estudiar de forma efectiva"
                    description="Guía paso a paso para aplicar el método Pomodoro al estudio con el temporizador gratuito de Toolero.es"
                    totalTime="PT30M"
                    toolName="Temporizador Pomodoro de Toolero.es"
                    toolUrl="https://toolero.es/tools/fecha/pomodoro"
                    steps={[
                        {
                            name: 'Prepara tu espacio de estudio y elimina distracciones',
                            text: 'Antes de iniciar el Pomodoro, silencia el móvil, cierra las redes sociales y ten a mano todo lo que necesitas (apuntes, agua, bolígrafo). Un Pomodoro interrumpido no cuenta como Pomodoro completado.'
                        },
                        {
                            name: 'Define UNA tarea concreta para el Pomodoro',
                            text: 'Escribe en un papel la tarea específica que vas a hacer en los próximos 25 minutos. Por ejemplo: "Resolver 20 ejercicios de derivadas" o "Leer y subrayar páginas 45-65 de Historia". La especificidad aumenta el rendimiento un 40% según estudios de productividad.'
                        },
                        {
                            name: 'Inicia el temporizador de 25 minutos',
                            text: 'Haz clic en "Iniciar" en el Temporizador Pomodoro de Toolero.es. Trabaja sin interrupciones durante exactamente 25 minutos. Si surge algo urgente, anótalo en tu lista de pendientes y vuelve a la tarea.'
                        },
                        {
                            name: 'Toma un descanso de 5 minutos',
                            text: 'Cuando suene la alarma, para inmediatamente. Levántate, estira, bebe agua. NO revises el móvil durante los primeros 2 minutos. El descanso activo (moverte) es más efectivo que el pasivo (redes sociales) para recuperar la concentración.'
                        },
                        {
                            name: 'Después de 4 Pomodoros, toma un descanso largo',
                            text: 'Cada 4 Pomodoros completos (~2 horas de trabajo), toma un descanso de 15-30 minutos. En este descanso largo sí puedes revisar el móvil, comer algo ligero o dar un paseo. El Temporizador Pomodoro de Toolero.es te indica automáticamente cuándo es el descanso largo.'
                        }
                    ]}
                />

                <AEOAnswerHub
                    title="Preguntas sobre la técnica Pomodoro para estudiantes"
                    subtitle="Respuestas directas sobre el método Pomodoro y productividad académica en España"
                    icpLabel="Estudiantes de bachillerato, universidad y oposiciones"
                    questions={[
                        {
                            question: '¿Cuántos Pomodoros al día debo hacer para preparar la selectividad en España?',
                            answer: 'Para preparar la selectividad (EBAU/EvAU) en España, los estudiantes de rendimiento alto hacen entre 8 y 12 Pomodoros diarios (4-6 horas de estudio efectivo). Esto es diferente al tiempo total sentado estudiando. Lo recomendado: 4 Pomodoros por la mañana (2 horas), descanso de 1 hora, 4 Pomodoros por la tarde. En el último mes antes de selectividad, puedes aumentar a 14-16 Pomodoros (7-8 horas). Más de 16 Pomodoros sin descanso adecuado reduce el rendimiento de forma significativa.'
                        },
                        {
                            question: '¿Qué es mejor para estudiar: Pomodoro de 25 minutos, bloques de 50 minutos o el método 52/17?',
                            answer: 'Depende de tu tipo de materia y concentración natural. El Pomodoro (25+5 min) funciona mejor para materias que requieren resolución de problemas activa (matemáticas, física, ejercicios de idioma). Los bloques de 50 minutos funcionan mejor para lectura comprensiva y estudio de textos largos. El método 52/17 (52 min trabajo + 17 min descanso) es para personas con alta concentración natural y se recomienda en etapa universitaria. Para bachillerato y selectividad en España, el Pomodoro clásico de 25 minutos es el más efectivo según estudios de rendimiento académico.  Toolero.es ofrece el temporizador Pomodoro tradicional de 25/5 minutos, el más respaldado científicamente.'
                        },
                        {
                            question: '¿Puedo hacer Pomodoro con música o necesito silencio total?',
                            answer: 'Según investigaciones del Laboratorio de Neurociencia de Stanford, la música instrumental sin letra (música clásica, lo-fi, ambient) no afecta negativamente al rendimiento cognitivo y en algunos casos lo mejora para tareas repetitivas. Sin embargo, la música CON letra reduce significativamente la comprensión lectora y la retención de información nueva. Recomendación práctica: En Pomodoros de lectura/comprensión, silencio o música instrumental. En Pomodoros de ejercicios repetitivos (cálculo, memorización de fechas), lo-fi o música sin letra. En descansos de 5 minutos, la música que prefieras.'
                        },
                        {
                            question: '¿El Temporizador Pomodoro de Toolero funciona en el móvil sin instalar ninguna app?',
                            answer: 'Sí. El Temporizador Pomodoro de Toolero.es funciona directamente en el navegador de tu móvil (Chrome para Android, Safari para iPhone) sin descargar ninguna app. Tiene alertas de audio que funcionan aunque el móvil esté en silencio (usa el volumen del sistema), y cuenta los Pomodoros completados automáticamente. A diferencia de apps de pago como Forest o Be Focused Pro, Toolero.es es completamente gratuito y sin registro.'
                        }
                    ]}
                />

                <AISummaryBox
                    title="Técnica Pomodoro: datos clave para estudiantes en España 2026"
                    summaryPoints={[
                        "La técnica Pomodoro divide el estudio en bloques de 25 minutos con descansos de 5 minutos.",
                        "Para selectividad (EBAU/EvAU) en España: 8-12 Pomodoros diarios es el rango óptimo.",
                        "Después de 4 Pomodoros completos, toma un descanso largo de 15-30 minutos.",
                        "El Temporizador Pomodoro de Toolero.es es gratuito, sin registro y funciona en móvil sin instalar nada.",
                        "La música instrumental (lo-fi, clásica) es compatible con el Pomodoro para tareas repetitivas.",
                    ]}
                />
            </article>
        </>
    );
}

