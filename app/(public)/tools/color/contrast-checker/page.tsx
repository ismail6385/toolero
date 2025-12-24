
import { Metadata } from 'next';
import ContrastCheckerClient from './ContrastCheckerClient';

export const metadata: Metadata = {
    title: 'Verificador de Contraste de Color - Accesibilidad WCAG',
    description: 'Comprueba si el contraste entre el texto y el fondo cumple con los estándares de accesibilidad WCAG (AA y AAA). Mejora la legibilidad de tu diseño web.',
    keywords: [
        'contrast checker',
        'verificador contraste',
        'wcag accesibilidad',
        'contraste colores',
        'ratio de contraste',
        'color contrast',
        'a11y tools',
        'diseño inclusivo',
        'toolero'
    ],
};

export default function ContrastCheckerPage() {
    return (
        <>
            <ContrastCheckerClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Verificador de Contraste de Colores (WCAG)</h2>
                    <p className="text-gray-600 mb-4">
                        Asegurarse de que el texto sea legible sobre el fondo no es solo una cuestión estética, es vital para la accesibilidad web.
                        Esta herramienta calcula el ratio de contraste entre dos colores y te indica si cumple con las pautas WCAG 2.1 para usuarios con baja visión.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Ratio de Contraste</h3>
                        <p className="text-gray-600">
                            Calculamos la diferencia de luminancia relativa, desde 1:1 (invisible) hasta 21:1 (negro sobre blanco).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Niveles AA y AAA</h3>
                        <p className="text-gray-600">
                            Verifica instantáneamente si tu combinación pasa los estándares mínimos (AA) o los más estrictos (AAA) para texto normal y grande.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Vista Previa</h3>
                        <p className="text-gray-600">
                            Visualiza cómo se ve tu texto en tiempo real con diferentes tamaños y grosores de fuente.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué exigen las normas WCAG?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm font-bold">Nivel AA (Mínimo)</span>
                            <span className="text-gray-600">Ratio 4.5:1 para texto normal y 3:1 para texto grande.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-sm font-bold">Nivel AAA (Óptimo)</span>
                            <span className="text-gray-600">Ratio 7:1 para texto normal y 4.5:1 para texto grande.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
