
import { Metadata } from 'next';
import GradientGeneratorClient from './GradientGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Gradientes CSS - Fondos Degradados',
    description: 'Crea hermosos degradados CSS (Gradients) lineales y radiales. Generador visual de fondos con código CSS3 listo para copiar y pegar.',
    keywords: [
        'generador gradientes css',
        'css gradient generator',
        'fondo degradado',
        'linear gradient',
        'radial gradient',
        'estilos css',
        'fondos web',
        'toolero'
    ],
};

export default function GradientGeneratorPage() {
    return (
        <>
            <GradientGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Degradados CSS3</h2>
                    <p className="text-gray-600 mb-4">
                        Los degradados añaden profundidad y modernidad a cualquier diseño web.
                        Ya no necesitas escribir código complejo a mano. Diseña visualmente tu transición de colores y obtén el código CSS compatible con todos los navegadores.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-fuchsia-600 mb-3">Control Total</h3>
                        <p className="text-gray-600">
                            Añade múltiples paradas de color, ajusta el ángulo (dirección) y la opacidad (transparencia).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-fuchsia-600 mb-3">Tipos de Gradiente</h3>
                        <p className="text-gray-600">
                            Soporta tanto degradados <strong>Lineales</strong> (rectos) como <strong>Radiales</strong> (circulares desde el centro).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-fuchsia-600 mb-3">Código Limpio</h3>
                        <p className="text-gray-600">
                            Generamos el CSS estándar: `background: linear-gradient(...)`, listo para usar en tu hoja de estilos.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tendencias en Diseño</h2>
                    <p className="text-gray-600 mb-4">
                        Los "Mesh Gradients" y los degradados suaves y pastel están muy de moda en interfaces modernas (UI) tipo Glassmorphism.
                        Prueba combinar colores análogos (vecinos en la rueda cromática) para un efecto más natural y sutil.
                    </p>
                </section>
            </article>
        </>
    );
}
