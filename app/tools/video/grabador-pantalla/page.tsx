
import { Metadata } from 'next';
import ScreenRecorderClient from './ScreenRecorderClient';

export const metadata: Metadata = {
    title: 'Grabador de Pantalla Online Gratis - Grabar PC y Mac',
    description: 'Graba la pantalla de tu ordenador sin instalar programas. Grabador de pantalla con audio del sistema y micrófono online. Descarga tu video al instante.',
    keywords: [
        'grabador de pantalla',
        'grabar pantalla online',
        'screen recorder',
        'grabar escritorio',
        'capturadora de video',
        'grabar tutorial',
        'online screen capture',
        'screen cast',
        'toolero'
    ],
};

export default function ScreenRecorderPage() {
    return (
        <>
            <ScreenRecorderClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Grabar Pantalla Online Sin Programas</h2>
                    <p className="text-gray-600 mb-4">
                        Captura video de tu escritorio, una ventana específica o una pestaña del navegador directamente desde Chrome, Edge o Firefox.
                        Nuestra herramienta utiliza las APIs modernas del navegador para grabar tu pantalla con alta calidad sin necesidad de descargar software pesado ni extensiones.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Audio Incluido</h3>
                        <p className="text-gray-600">
                            Graba tu voz con el micrófono para hacer tutoriales explicados o captura el audio del sistema (lo que suena en tu PC).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Privacidad Total</h3>
                        <p className="text-gray-600">
                            La grabación se procesa localmente en tu memoria RAM. El video nunca se sube a nuestros servidores.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Descarga Directa</h3>
                        <p className="text-gray-600">
                            Al finalizar, el video se genera en formato WebM (ligero y alta calidad) listo para descargar y compartir.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos para el grabador de pantalla</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Grabar tutoriales de software o web.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Registrar un bug o error para enviar a soporte técnico.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600">Grabar videollamadas o webinars importantes.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
