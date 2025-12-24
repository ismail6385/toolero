import type { Metadata } from 'next';
import SlatsClient from './SlatsClient';

export const metadata: Metadata = {
    title: 'Calculadora de Listones, Decks y Tarimas de Madera | Toolero',
    description: 'Calcula la cantidad de madera lineal necesaria para cubrir una superficie con listones. Ideal para decks, frisos y estructuras.',
    keywords: [
        'calcular madera deck',
        'metros lineales listones',
        'calculadora tarima madera',
        'cantidad tablas piso',
        'wood slats calculator',
        'revestimiento madera pared'
    ],
};

export default function SlatsPage() {
    return (
        <>
            <SlatsClient />

            <div className="mt-8">
                <article className="prose prose-lg max-w-none text-gray-600 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo calcular madera para un Deck o Revestimiento?</h2>
                    <p>
                        El cálculo de listones (slats) requiere considerar no solo el ancho de la madera, sino también la <strong>separación (gap)</strong> entre ellas.
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">La Fórmula del Módulo</h3>
                    <p>
                        Para saber cuántas filas de listones necesitas, divide el ancho total de la superficie entre el "Ancho del Módulo":
                        <br /><code>Filas = Ancho Total ÷ (Ancho Listón + Separación)</code>
                    </p>

                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Merma y Desperdicio</h3>
                    <p>
                        Siempre añade un 10-15% extra de material.
                        Si el largo de tu superficie (ej. 4m) es mayor que el largo de la madera comercial (ej. 3.2m), tendrás muchos empalmes y recortes, lo que aumenta el desperdicio.
                    </p>
                </article>
            </div>
        </>
    );
}
