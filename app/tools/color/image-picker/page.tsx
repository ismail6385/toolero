
import { Metadata } from 'next';
import ImagePickerClient from './ImagePickerClient';

export const metadata: Metadata = {
    title: 'Selector de Color de Imagen - Extraer Colores de Fotos',
    description: 'Sube una imagen y extrae el código de color exacto (HEX, RGB, HSL) de cualquier píxel. Crea paletas de colores basadas en tus fotos.',
    keywords: [
        'extraer color imagen',
        'color picker from image',
        'selector color foto',
        'identificar color',
        'codigo hex imagen',
        'pipeta color online',
        'analizar colores foto',
        'toolero'
    ],
};

export default function ImagePickerPage() {
    return (
        <>
            <ImagePickerClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Selector de Color (Eyedropper) desde Imagen</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Te encanta el color de esa puesta de sol o el tono de azul en un logotipo?
                        Sube cualquier fotografía y utiliza nuestra lupa de precisión para seleccionar cualquier píxel y obtener su código de color exacto al instante.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Precisión de Píxel</h3>
                        <p className="text-gray-600">
                            Haz zoom y navega por la imagen para capturar el matiz exacto que necesitas.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Formatos Múltiples</h3>
                        <p className="text-gray-600">
                            Obtén el valor en HEX (#RRGGBB), RGB (255, 255, 255) y HSL para máxima compatibilidad.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-teal-600 mb-3">Paleta Automática</h3>
                        <p className="text-gray-600">
                            Además de seleccionar manualmente, analizamos la imagen para mostrarte los colores dominantes automáticamente.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo funciona?</h2>
                    <p className="text-gray-600 mb-4">
                        Utilizamos la API Canvas de HTML5 para leer los datos de la imagen directamente en tu navegador.
                        <strong>Tus fotos son privadas:</strong> el procesamiento se realiza localmente y nunca se suben a ningún servidor.
                    </p>
                </section>
            </article>
        </>
    );
}
