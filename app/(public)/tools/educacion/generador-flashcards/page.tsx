import { Metadata } from 'next';
import FlashcardsClient from './FlashcardsClient';

export const metadata: Metadata = {
    title: 'Generador de Flashcards y Tarjetas de Memoria | Estudiar Online',
    description: 'Crea, edita e imprime tus propias flashcards (tarjetas nemotécnicas) para estudiar. Herramienta gratuita para memorizar vocabulario, fórmulas y datos.',
    keywords: [
        'generador flashcards',
        'tarjetas memoria estudio',
        'crear tarjetas vocabulario',
        'flashcards maker online',
        'tecnica repaso espaciado',
        'imprimir tarjetas estudio'
    ],
};

export default function FlashcardsPage() {
    return (
        <>
            <FlashcardsClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Estudia más rápido con Tarjetas de Memoria</h2>
                    <p className="text-gray-600 mb-4">
                        Las flashcards son una de las herramientas de estudio más potentes porque utilizan el principio de "recuerdo activo".
                        Al intentar recordar la respuesta antes de voltear la tarjeta, refuerzas las conexiones neuronales más que simplemente leyendo.
                    </p>
                </section>

                <section className="bg-orange-50 p-8 rounded-2xl border border-orange-100 mb-12">
                    <h3 className="text-xl font-bold text-orange-900 mb-4">Tips para Flashcards Efectivas</h3>
                    <ul className="space-y-2 list-disc pl-5 text-orange-800">
                        <li><strong>Mantenzlas simples:</strong> Una idea por tarjeta. No escribas párrafos enteros.</li>
                        <li><strong>Usa imágenes mentales:</strong> Asocia la respuesta a una imagen divertida o extraña en tu cabeza.</li>
                        <li><strong>Mezcla los temas:</strong> No estudies siempre en el mismo orden para evitar la "memoria de serie".</li>
                        <li><strong>Imprímelas:</strong> Usa nuestra función de impresión para llevarlas contigo a cualquier parte (autobús, sala de espera, etc).</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
