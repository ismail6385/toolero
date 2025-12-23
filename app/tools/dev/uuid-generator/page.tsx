
import { Metadata } from 'next';
import UuidGeneratorClient from './UuidGeneratorClient';

export const metadata: Metadata = {
    title: 'Generador de UUID Online (v4) - Crear Identificadores Únicos',
    description: 'Genera UUIDs (Identificadores Únicos Universales) versión 4 al instante. Herramienta gratuita para desarrolladores y bases de datos.',
    keywords: [
        'generador uuid',
        'uuid v4 generator',
        'guid generator',
        'identificador unico',
        'crear uuid online',
        'random uuid',
        'uuid maker',
        'identificador universal',
        'toolero'
    ],
};

export default function UuidGeneratorPage() {
    return (
        <>
            <UuidGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de UUID v4 Online</h2>
                    <p className="text-gray-600 mb-4">
                        Un UUID (Universally Unique Identifier) es un estándar de identificación utilizado en el desarrollo de software.
                        Nuestra herramienta genera UUIDs de versión 4 (aleatorios) válidos y listos para usar como claves primarias en bases de datos, tokens de sesión o nombres de archivos únicos.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Estándar RFC 4122</h3>
                        <p className="text-gray-600">
                            Generamos identificadores cumplen estrictamente con el formato estándar de 128 bits (36 caracteres).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Generación Masiva</h3>
                        <p className="text-gray-600">
                            ¿Necesitas 100 IDs? Puedes generar múltiples UUIDs a la vez y copiarlos todos juntos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-purple-600 mb-3">Colisiones Imposibles</h3>
                        <p className="text-gray-600">
                            La probabilidad de generar dos UUID v4 iguales es tan infinitesimalmente baja que se consideran únicos en la práctica.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cuándo usar UUIDs?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Base de datos distribuidas:</strong> Permite generar IDs en el cliente sin consultar al servidor central.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Seguridad:</strong> A diferencia de los IDs autoincrementales (1, 2, 3...), los UUIDs no revelan cuántos registros tienes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Merge de datos:</strong> Facilita fusionar bases de datos sin conflictos de claves primarias.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
