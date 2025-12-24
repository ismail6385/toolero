
import { Metadata } from 'next';
import SpaceRemoverClient from './SpaceRemoverClient';

export const metadata: Metadata = {
    title: 'Limpiar Texto Online - Eliminar Espacios y Saltos de Línea',
    description: 'Herramienta gratuita para limpiar texto desordenado. Elimina espacios dobles, saltos de línea innecesarios y tabulaciones automáticamente.',
    keywords: [
        'limpiar texto',
        'eliminar espacios',
        'quitar espacios extra',
        'borrar saltos de linea',
        'remover espacios',
        'normalizar texto',
        'clean text',
        'text cleaner',
        'toolero'
    ],
};

export default function SpaceRemoverPage() {
    return (
        <>
            <SpaceRemoverClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Limpiador de Texto y Espacios</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Has copiado texto de un PDF o de una web y ha quedado con un formato extraño lleno de espacios y saltos de línea?
                        Nuestra herramienta limpia y normaliza tu texto al instante. Elimina espacios dobles, quita sangrías innecesarias y deja tu texto listo para usar.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Eliminar Espacios Extra</h3>
                        <p className="text-gray-600">
                            Convierte múltiples espacios consecutivos en uno solo. Elimina espacios al principio (Trim) y al final de cada línea.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Quitar Saltos de Línea</h3>
                        <p className="text-gray-600">
                            Transforma una lista vertical en una línea horizontal o elimina líneas vacías entre párrafos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Formato Limpio</h3>
                        <p className="text-gray-600">
                            Ideal para preparar texto antes de pegarlo en un documento, email o CMS, asegurando que se vea profesional.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cuándo usar esta herramienta?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-sky-500 font-bold">✓</span>
                            <span className="text-gray-600">Al copiar texto de PDFs que suelen añadir saltos de línea al final de cada frase</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-sky-500 font-bold">✓</span>
                            <span className="text-gray-600">Para limpiar código o datos copiados de tablas de Excel</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-sky-500 font-bold">✓</span>
                            <span className="text-gray-600">Minimizar texto (eliminar todo el espacio innecesario)</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
