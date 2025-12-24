
import { Metadata } from 'next';
import NumberToWordsClient from './NumberToWordsClient';

export const metadata: Metadata = {
    title: 'Convertir Números a Letras Online - Escritura de Cantidades',
    description: 'Convierte números a letras y texto gratis. Escribe cifras en letras automáticamente para cheques, facturas, contratos y documentos legales.',
    keywords: [
        'numeros a letras',
        'convertir numero a texto',
        'escribir cantidades en letras',
        'cifras a letras',
        'numero a palabras',
        'escribir cheque',
        'convertidor de numeros',
        'number to words spanish',
        'toolero'
    ],
};

export default function NumberToWordsPage() {
    return (
        <>
            <NumberToWordsClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Convertidor de Números a Letras</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tienes dudas sobre cómo se escribe una cifra grande en un cheque o contrato?
                        Nuestra herramienta convierte automáticamente cualquier número (entero o decimal) a su representación en texto escrito.
                        Es fundamental para redacción de documentos legales, financieros y contables.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Escritura Correcta</h3>
                        <p className="text-gray-600">
                            Sigue las reglas gramaticales del español para escribir cantidades, evitando faltas de ortografía comunes en números complejos.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Soporte Decimales</h3>
                        <p className="text-gray-600">
                            Perfecto para importes monetarios. Convierte "150.50" en "Ciento cincuenta con 50/100" (o formato texto completo).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-emerald-600 mb-3">Grandes Cifras</h3>
                        <p className="text-gray-600">
                            Soporta números hasta rangos de billones y trillones sin errores.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos frecuentes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600">Rellenar cheques bancarios sin errores</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600">Redactar facturas y recibos formales</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600">Escritura de cifras en contratos legales y notariales</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="text-gray-600">Tareas escolares y aprendizaje de numeración</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
