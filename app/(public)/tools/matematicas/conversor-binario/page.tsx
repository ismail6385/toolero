
import { Metadata } from 'next';
import BinaryConverterClient from './BinaryConverterClient';

export const metadata: Metadata = {
    title: 'Conversor Binario, Decimal, Hexadecimal y Octal',
    description: 'Convierte números entre sistemas de numeración: binario (base 2), decimal (base 10), hexadecimal (base 16) y octal (base 8). Herramienta para programadores y estudiantes.',
    keywords: [
        'conversor binario',
        'decimal a binario',
        'hexadecimal a decimal',
        'binario a texto',
        'calculadora binaria',
        'sistema octal',
        'base converter',
        'programacion',
        'toolero'
    ],
};

export default function BinaryConverterPage() {
    return (
        <>
            <BinaryConverterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Conversor de Sistemas de Numeración</h2>
                    <p className="text-gray-600 mb-4">
                        Herramienta esencial para estudiantes de informática y desarrolladores.
                        Traduce valores numéricos entre las bases más comunes utilizadas en computación: binario, octal, decimal y hexadecimal.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Binario (Base 2)</h3>
                        <p className="text-gray-600">
                            El lenguaje de las máquinas. Ceros y unos (010101) que representan el estado encendido/apagado.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Hexadecimal (Base 16)</h3>
                        <p className="text-gray-600">
                            Muy usado en diseño web (colores #FF0000) y direcciones de memoria, usando dígitos del 0-9 y letras A-F.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Decimal (Base 10)</h3>
                        <p className="text-gray-600">
                            El sistema que usamos los humanos en el día a día para contar dinero y cosas.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tabla de equivalencias rápida</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="p-3 border">Decimal</th>
                                    <th className="p-3 border">Binario</th>
                                    <th className="p-3 border">Hexadecimal</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                <tr>
                                    <td className="p-3 border">0</td>
                                    <td className="p-3 border font-mono">0000</td>
                                    <td className="p-3 border font-mono">0</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border">1</td>
                                    <td className="p-3 border font-mono">0001</td>
                                    <td className="p-3 border font-mono">1</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border">10</td>
                                    <td className="p-3 border font-mono">1010</td>
                                    <td className="p-3 border font-mono">A</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border">15</td>
                                    <td className="p-3 border font-mono">1111</td>
                                    <td className="p-3 border font-mono">F</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border">255</td>
                                    <td className="p-3 border font-mono">11111111</td>
                                    <td className="p-3 border font-mono">FF</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>
        </>
    );
}
