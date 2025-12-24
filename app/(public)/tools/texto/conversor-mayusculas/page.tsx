
import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';

export const metadata: Metadata = {
    title: 'Convertir Mayúsculas a Minúsculas - Conversor de Texto Online',
    description: 'Convierte texto a mayúsculas, minúsculas o capitaliza online gratis. Conversor de mayúsculas y minúsculas rápido y fácil.',
    keywords: [
        'mayusculas a minusculas',
        'convertir mayusculas',
        'minusculas a mayusculas',
        'cambiar mayusculas',
        'conversor mayusculas',
        'convertir a mayusculas',
        'convertir a minusculas',
        'capitalizar texto',
        'uppercase lowercase',
        'case converter',
        'cambiar a mayusculas',
        'toolero'
    ],
};

export default function CaseConverterPage() {
    return (
        <>
            <CaseConverterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertir Texto entre Mayúsculas y Minúsculas</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Olvidaste desactivar el bloqueo de mayúsculas? ¿Necesitas capitalizar la primera letra de cada palabra en un título?
                        Nuestra herramienta te permite cambiar el formato de tu texto automáticamente con un solo clic.
                        Es ideal para corregir textos escritos accidentalmente en mayúsculas o para dar formato a listas de nombres y títulos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Múltiples Opciones</h3>
                        <p className="text-gray-600">
                            Elige entre MAYÚSCULAS, minúsculas, Tipo Título, Tipo Oración, Alternado y más.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Instantáneo</h3>
                        <p className="text-gray-600">
                            Pega tu texto y obtén el resultado inmediatamente. Copia o descarga con un clic.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Privado y Seguro</h3>
                        <p className="text-gray-600">
                            El texto se procesa en tu navegador. No guardamos ni enviamos tu contenido a ningún servidor.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Modos de conversión disponibles</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Mayúsculas:</strong> CONVIERTE TODO EL TEXTO A MAYÚSCULAS.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Minúsculas:</strong> convierte todo el texto a minúsculas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Tipo Título:</strong> Capitaliza La Primera Letra De Cada Palabra.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Tipo Oración:</strong> Capitaliza la primera letra de cada frase.</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Respeta los acentos y ñ?</h3>
                            <p className="text-gray-600">
                                Sí, nuestra herramienta soporta caracteres especiales del español y otros idiomas, convirtiéndolos correctamente (ej: á -> Á, ñ -> Ñ).
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Hay límite de caracteres?</h3>
                            <p className="text-gray-600">
                                No hay un límite estricto, puedes pegar textos muy largos. Sin embargo, para documentos extremadamente grandes, el navegador podría tardar un poco más en procesarlo.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Sirve para código de programación?</h3>
                            <p className="text-gray-600">
                                Sí, es muy útil para convertir constantes a mayúsculas o normalizar inputs de datos.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
