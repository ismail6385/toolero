
import { Metadata } from 'next';
import PaletteGeneratorClient from './PaletteGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de Paletas de Colores - Esquemas de Color',
    description: 'Crea paletas de colores armónicas para tus diseños. Genera esquemas monocromáticos, análogos, complementarios y triadas basados en teoría del color.',
    keywords: [
        'generador paletas color',
        'esquemas de color',
        'teoria del color',
        'combinar colores',
        'color palette generator',
        'colores complementarios',
        'diseño web colores',
        'ideas colores',
        'toolero'
    ],
};

export default function PaletteGeneratorPage() {
    return (
        <>
            <PaletteGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Paletas de Colores</h2>
                    <p className="text-gray-600 mb-4">
                        Elegir los colores adecuados es fundamental para transmitir la emoción correcta en tu diseño.
                        Nuestra herramienta utiliza algoritmos basados en la rueda de color tradicional para generar combinaciones matemáticamente perfectas y agradables a la vista.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Armonía Automática</h3>
                        <p className="text-gray-600">
                            Descubre colores que funcionan bien juntos: análogos, complementarios, divididos o triadas.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Exportación Fácil</h3>
                        <p className="text-gray-600">
                            Copia los códigos HEX, RGB o HSL con un solo clic para usarlos en CSS, Photoshop o Figma.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Inspiración Infinita</h3>
                        <p className="text-gray-600">
                            ¿Bloqueo creativo? Presiona el botón de aleatorio para descubrir nuevas combinaciones sorprendentes.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Reglas de armonía de color</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">●</span>
                            <span className="text-gray-600"><strong>Monocromática:</strong> Tonos y sombras de un mismo color base. Elegante y suave.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">●</span>
                            <span className="text-gray-600"><strong>Complementaria:</strong> Colores opuestos en la rueda. Alto contraste y vibrante.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">●</span>
                            <span className="text-gray-600"><strong>Análoga:</strong> Colores vecinos en la rueda. Natural y relajante.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">●</span>
                            <span className="text-gray-600"><strong>Triada:</strong> Tres colores equidistantes. Equilibrada y colorida.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
