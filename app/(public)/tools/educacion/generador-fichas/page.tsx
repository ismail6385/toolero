import type { Metadata } from 'next';
import Link from 'next/link';
import FlashcardsClient from './FlashcardsClient';

export const metadata: Metadata = {
    title: 'Generador de Fichas de Estudio Online - Flashcards Gratis | Toolero',
    description: 'Crea, edita y estudia con fichas mnemotécnicas (Flashcards) online. La mejor herramienta gratuita para aplicar Active Recall y Spaced Repetition.',
    keywords: [
        'generador de fichas',
        'flashcards online',
        'crear tarjetas de estudio',
        'active recall',
        'tecnica pomodoro estudio',
        'fichas de repaso',
        'estudiar online'
    ],
};

const studentTools = [
    { name: 'Reloj Pomodoro', url: '/tools/fecha/pomodoro', icon: '⏱️', desc: 'Gestiona tu tiempo de estudio' },
    { name: 'Generador de Citas', url: '/tools/texto/generador-citas', icon: '📖', desc: 'Crea bibliografía APA/MLA' },
    { name: 'Calculadora Promedio', url: '/tools/matematicas/calculadora-promedio', icon: '🧮', desc: 'Calcula tus notas finales' },
    // Adding a general productive tool
    { name: 'Eliminar Duplicados', url: '/tools/texto/eliminar-duplicados', icon: '🧹', desc: 'Limpia listas de datos' },
];

export default function FlashcardsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    <FlashcardsClient />

                    <article className="prose prose-lg max-w-none text-gray-600 mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Por qué estudiar con Flashcards?</h2>
                        <p>
                            Las fichas de estudio son una de las herramientas más poderosas para el aprendizaje. Se basan en dos principios psicológicos fundamentales:
                        </p>
                        <ul className="text-gray-600 space-y-2">
                            <li><strong>Active Recall (Recuerdo Activo):</strong> Al intentar recordar la respuesta antes de voltear la carta, fortaleces las conexiones neuronales mucho más que simplemente releyendo apuntes.</li>
                            <li><strong>Metacognición:</strong> Al evaluar si sabías o no la respuesta, te haces consciente de tus propias lagunas de conocimiento.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cómo usar este generador</h2>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Crea tus fichas:</strong> Entra en el modo "Editar" y añade preguntas en el frente y respuestas en el reverso. Sé conciso.</li>
                            <li><strong>Guarda tu progreso:</strong> Las fichas se guardan automáticamente en tu navegador para que no pierdas nada si cierras la pestaña.</li>
                            <li><strong>Modo Estudio:</strong> Cambia al modo "Estudio" y ponte a prueba. Intenta decir la respuesta en voz alta antes de voltear la tarjeta.</li>
                            <li><strong>Baraja:</strong> Usa el botón "Barajar" para evitar memorizar el orden de las preguntas.</li>
                        </ol>

                        <div className="bg-indigo-50 p-6 rounded-xl mt-8 border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2">Consejo Pro 💡</h3>
                            <p className="text-indigo-800 text-sm">
                                Combina esta herramienta con nuestro <Link href="/tools/fecha/pomodoro" className="underline hover:text-indigo-600">Reloj Pomodoro</Link>.
                                Estudia tus fichas durante 25 minutos intensos y luego descansa 5 minutos.
                            </p>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                            Kit del Estudiante
                        </h3>
                        <div className="space-y-3">
                            {studentTools.map((tool) => (
                                <Link
                                    key={tool.name}
                                    href={tool.url}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100"
                                >
                                    <div className="text-2xl bg-indigo-50 w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                            {tool.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {tool.desc}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
