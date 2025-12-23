
import { Metadata } from 'next';
import ScreenSizeClient from './ScreenSizeClient';

export const metadata: Metadata = {
    title: '¿Cuál es mi Resolución de Pantalla? - Tamaño Monitor',
    description: 'Descubre la resolución exacta de tu pantalla, monitor o dispositivo móvil en píxeles. Herramienta para diseñadores y desarrolladores web.',
    keywords: [
        'resolucion pantalla',
        'tamaño monitor',
        'mi resolucion',
        'screen resolution',
        'pixeles pantalla',
        'viewport size',
        'detector resolucion',
        'toolero'
    ],
};

export default function ScreenSizePage() {
    return (
        <>
            <ScreenSizeClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Detector de Resolución de Pantalla</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Alguna vez te has preguntado "¿De qué tamaño es mi pantalla?" o necesitas saber si tu monitor es Full HD o 4K?
                        Esta herramienta detecta automáticamente las dimensiones en píxeles de tu dispositivo actual y el tamaño de la ventana del navegador.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Resolución Física</h3>
                        <p className="text-gray-600">
                            El tamaño total de tu monitor (ej: 1920x1080).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Viewport</h3>
                        <p className="text-gray-600">
                            El área visible útil dentro de tu navegador (sin contar barras de herramientas). Vital para diseño web responsive.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Densidad de Píxeles</h3>
                        <p className="text-gray-600">
                            Detectamos si usas una pantalla Retina o de alta densidad (DPR).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Resoluciones estándar más comunes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>HD (720p):</strong> 1280 x 720 px</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Full HD (1080p):</strong> 1920 x 1080 px (Estándar actual)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>2K / QHD:</strong> 2560 x 1440 px</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>4K UHD:</strong> 3840 x 2160 px</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
