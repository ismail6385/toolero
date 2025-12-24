
import { Metadata } from 'next';
import OvulationCalculatorClient from './OvulationCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora de Ovulación y Días Fértiles - Quedar Embarazada',
    description: 'Calcula tus días fértiles y fecha de ovulación con precisión. Aumenta tus probabilidades de embarazo con nuestro calendario menstrual.',
    keywords: [
        'calculadora ovulacion',
        'dias fertiles',
        'calendario menstrual',
        'quedar embarazada',
        'calcular ovulacion',
        'ciclo menstrual',
        'ventana fertil',
        'ovulation calculator',
        'toolero'
    ],
};

export default function OvulationCalculatorPage() {
    return (
        <>
            <OvulationCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Ovulación y Fertilidad</h2>
                    <p className="text-gray-600 mb-4">
                        Si estás buscando tener un bebé, el timing lo es todo. Hay solo unos pocos días en cada ciclo menstrual donde es posible concebir.
                        Esta herramienta identifica tu "ventana fértil" y el día pico de ovulación para maximizar tus probabilidades de embarazo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Día de Ovulación</h3>
                        <p className="text-gray-600">
                            El momento exacto en que el ovario libera el óvulo, generalmente 14 días antes de la próxima menstruación.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Ventana Fértil</h3>
                        <p className="text-gray-600">
                            Los 5 días previos a la ovulación más el día de ovulación son los de mayor probabilidad.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-rose-600 mb-3">Próximo Periodo</h3>
                        <p className="text-gray-600">
                            También estimamos cuándo llegará tu próxima regla para que estés preparada.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Consejos para concebir</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-rose-500 font-bold">✓</span>
                            <span className="text-gray-600">Mantén relaciones sexuales durante la ventana fértil, especialmente 2 días antes de la ovulación.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-rose-500 font-bold">✓</span>
                            <span className="text-gray-600">Lleva un registro de tu temperatura basal para mayor precisión.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
