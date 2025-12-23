
import { Metadata } from 'next';
import ChmodCalculatorClient from './ChmodCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora Chmod Online - Permisos Linux (777, 755)',
    description: 'Genera códigos de permisos chmod octales y simbólicos para archivos Linux/Unix. Interfaz visual para calcular permisos de lectura, escritura y ejecución.',
    keywords: [
        'calculadora chmod',
        'chmod generator',
        'permisos linux',
        'linux permissions',
        'chmod 777',
        'chmod 755',
        'permisos archivos unix',
        'permisos rwx',
        'chmod calculator',
        'toolero'
    ],
};

export default function ChmodCalculatorPage() {
    return (
        <>
            <ChmodCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Permisos CHMOD</h2>
                    <p className="text-gray-600 mb-4">
                        Configurar permisos en servidores Linux puede ser confuso si no recuerdas los valores octales de memoria.
                        Nuestra calculadora visual te permite marcar casillas de Lectura (Read), Escritura (Write) y Ejecución (Execute)
                        para el Propietario, Grupo y Público, y te da el código exacto (ej. 755, 644) al instante.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Código Octal</h3>
                        <p className="text-gray-600">
                            Obtén el valor numérico clásico (ej. 777, 755, 600) usado en comandos como `chmod 755 archivo.php`.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Modo Simbólico</h3>
                        <p className="text-gray-600">
                            Muestra la representación de caracteres (ej. `-rwxr-xr-x`) que ves al listar archivos con `ls -l`.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Visual e Intuitivo</h3>
                        <p className="text-gray-600">
                            Entiende qué estás permitiendo exactamente sin tener que sumar números mentalmente.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Permisos comunes en Linux</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>755:</strong> Propietario todo, otros solo lectura/ejecución. Estándar para directorios web.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>644:</strong> Propietario lee/escribe, otros solo lectura. Estándar para archivos (imágenes, html).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>777:</strong> Permiso total para todos. ⚠️ Peligroso, evitar en producción.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>400:</strong> Solo lectura para el propietario. Usado en claves privadas SSH.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
