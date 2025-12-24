import { Metadata } from 'next';
import RoiCalculatorClient from './RoiCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora ROI - Retorno de Inversión Online',
    description: 'Calcula el ROI (Return on Investment) de tus campañas de marketing o proyectos. Mide la rentabilidad y eficacia de tus inversiones.',
    keywords: [
        'calculadora roi',
        'calcular roi',
        'retorno de inversion',
        'return on investment',
        'rentabilidad campaña',
        'formula roi',
        'roi marketing',
        'analisis financiero',
        'toolero'
    ],
};

export default function RoiCalculatorPage() {
    return (
        <>
            <RoiCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de ROI (Retorno de Inversión)</h2>
                    <p className="text-gray-600 mb-4">
                        El ROI es la métrica fundamental para saber si estás ganando o perdiendo dinero con una inversión.
                        Ya sea una campaña de anuncios en Facebook, la compra de maquinaria o una inversión inmobiliaria, esta calculadora te dirá el porcentaje de rentabilidad exacto.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Métrica Clave</h3>
                        <p className="text-gray-600">
                            Un ROI positivo significa ganancias. Un ROI del 100% significa que has duplicado tu inversión.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Fórmula Simple</h3>
                        <p className="text-gray-600">
                            ROI = ((Ganancia - Inversión) / Inversión) x 100. Nosotros hacemos la matemática por ti.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Toma Decisiones</h3>
                        <p className="text-gray-600">
                            Compara diferentes proyectos y decide dónde poner tu dinero basándote en datos reales.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo interpretar el ROI?</h2>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-slate-700"><strong>ROI Positivo (&gt;0%):</strong> La inversión es rentable. Has recuperado lo invertido y ganado más.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                <span className="text-slate-700"><strong>ROI Neutro (0%):</strong> Ni ganas ni pierdes (Break-even).</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-slate-700"><strong>ROI Negativo (&lt;0%):</strong> Estás perdiendo dinero. La inversión cuesta más de lo que genera.</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
        </>
    );
}
