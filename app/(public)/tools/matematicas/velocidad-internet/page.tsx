
import { Metadata } from 'next';
import InternetSpeedClient from './InternetSpeedClient';

export const metadata: Metadata = {
    title: 'Test de Velocidad de Internet (Simulado) - Comprobar Conexión',
    description: 'Simula una prueba de velocidad de internet. Comprueba cuánto tarda en descargar un archivo de prueba. Herramienta básica de estimación de ancho de banda.',
    keywords: [
        'test velocidad internet',
        'speedtest',
        'velocidad descarga',
        'ancho de banda',
        'medidor internet',
        'prueba velocidad',
        'internet speed test',
        'toolero'
    ],
};

export default function InternetSpeedPage() {
    return (
        <>
            <InternetSpeedClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Medidor de Velocidad de Descarga</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tu internet va lento? Esta herramienta realiza una descarga de prueba de un archivo pequeño directamente en tu navegador para estimar tu velocidad de bajada actual.
                        Es una forma rápida y ligera de verificar si tu conexión está funcionando correctamente sin cargar páginas pesadas.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Descarga (Mbps)</h3>
                        <p className="text-gray-600">
                            Medimos la velocidad a la que recibes datos desde internet. Es lo más importante para ver Netflix o navegar.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Rápido y Ligero</h3>
                        <p className="text-gray-600">
                            Sin Flash ni Java. Funciona en cualquier dispositivo móvil o PC moderno.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Referencia</h3>
                        <p className="text-gray-600">
                            Úsalo como una estimación rápida. Para pruebas técnicas precisas, contacta a tu proveedor.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué velocidad necesito?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>5-10 Mbps:</strong> Navegación web básica y email.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>25 Mbps:</strong> Streaming en HD (1080p).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>100+ Mbps:</strong> Streaming 4K, juegos online y múltiples dispositivos.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
