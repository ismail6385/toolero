
import { Metadata } from 'next';
import KeycodeInfoClient from './KeycodeInfoClient';

export const metadata: Metadata = {
    title: 'Detector de KeyCodes JavaScript - Event.key y Event.code',
    description: 'Presiona cualquier tecla para obtener su código JavaScript: event.key, event.code, event.which y más. Herramienta esencial para desarrolladores web.',
    keywords: [
        'keycode',
        'javascript keycode',
        'event.key',
        'event.code',
        'detector teclas',
        'keyboard events',
        'codigo de tecla',
        'keycode checker',
        'toolero'
    ],
};

export default function KeycodeInfoPage() {
    return (
        <>
            <KeycodeInfoClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Información de Teclas (KeyCodes) para JavaScript</h2>
                    <p className="text-gray-600 mb-4">
                        Desarrollar aplicaciones web que responden al teclado puede ser complicado.
                        Los navegadores y sistemas operativos manejan los eventos de teclado de formas ligeramente diferentes.
                        Esta herramienta te muestra exactamente qué valores (`event.key`, `event.code`, `event.which`) envía tu navegador cuando presionas cualquier tecla.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Event.key</h3>
                        <p className="text-gray-600">
                            El valor moderno recomendado. Representa el carácter generado por la tecla (teniendo en cuenta el idioma del teclado).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Event.code</h3>
                        <p className="text-gray-600">
                            Representa la tecla física en el teclado. Útil para juegos (WASD) ya que es independiente del layout del idioma.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Deprecados</h3>
                        <p className="text-gray-600">
                            También mostramos `keyCode` y `which` (aún usados en código legacy) para asegurar compatibilidad.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Para qué sirve esto?</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Crear atajos de teclado para tu aplicación web (`Ctrl + S`, `Esc`, etc).</li>
                        <li>Programar controles para juegos en el navegador.</li>
                        <li>Depurar problemas de input en formularios complejos.</li>
                        <li>Entender la diferencia entre teclas físicas y caracteres lógicos en diferentes layouts (QWERTY vs AZERTY).</li>
                    </ul>
                </section>
            </article>
        </>
    );
}
