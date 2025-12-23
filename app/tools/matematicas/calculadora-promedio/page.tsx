
import { Metadata } from 'next';
import AverageCalculatorClient from './AverageCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Promedio - Media Aritmética Online',
    description: 'Calcula el promedio (media aritmética) de una lista de números. Herramienta útil para calcular notas escolares, estadísticas y medias simples.',
    keywords: [
        'calculadora promedio',
        'calcular media',
        'media aritmetica',
        'promedio notas',
        'calcular average',
        'estadistica basica',
        'sumar y dividir',
        'mean calculator',
        'toolero'
    ],
};

export default function AverageCalculatorPage() {
    return (
        <>
            <AverageCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Promedio (Media)</h2>
                    <p className="text-gray-600 mb-4">
                        Obtén el valor representativo central de un conjunto de datos numéricos.
                        Ya sea para saber tu nota final del curso, la media de gastos mensuales o estadísticas deportivas, nuestra herramienta procesa listas de cualquier tamaño al instante.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Datos Ilimitados</h3>
                        <p className="text-gray-600">
                            Pega una lista de 10 o 1000 números separados por comas, espacios o saltos de línea.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Estadística Básica</h3>
                        <p className="text-gray-600">
                            Además de la media, calculamos la Suma Total, el valor Máximo, Mínimo y el Conteo de elementos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-sky-600 mb-3">Fácil Copiado</h3>
                        <p className="text-gray-600">
                            Copia los resultados con un clic para usarlos en Excel o tus informes.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Qué es la media aritmética?</h2>
                    <p className="text-gray-600 mb-4">
                        En matemáticas y estadística, la media aritmética es el valor obtenido al sumar todos los datos y dividir el resultado entre el número total de datos.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg inline-block border border-slate-200">
                        <code className="text-lg text-slate-700">Promedio = (x1 + x2 + ... + xn) / n</code>
                    </div>
                </section>
            </article>
        </>
    );
}
