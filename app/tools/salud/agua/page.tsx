
import { Metadata } from 'next';
import WaterIntakeClient from './WaterIntakeClient';

export const metadata: Metadata = {
    title: 'Calculadora de Agua Diaria - ¿Cuánta agua debo beber?',
    description: 'Calcula la cantidad exacta de agua que debes beber al día según tu peso y nivel de actividad física. Mantente hidratado y saludable.',
    keywords: [
        'calculadora agua',
        'cuanta agua beber',
        'hidratacion diaria',
        'litros agua al dia',
        'water intake calculator',
        'beber agua salud',
        'calculo hidratacion',
        'toolero'
    ],
};

export default function WaterIntakePage() {
    return (
        <>
            <WaterIntakeClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Hidratación Diaria</h2>
                    <p className="text-gray-600 mb-4">
                        La regla de "8 vasos al día" es un mito. Tus necesidades de agua cambian según tu peso corporal y cuánto ejercicio haces.
                        Esta herramienta te dice tu objetivo diario personalizado para mantener tus niveles de energía y salud al máximo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Basado en Peso</h3>
                        <p className="text-gray-600">
                            Una persona de 50kg no necesita la misma agua que una de 100kg. Ajustamos el cálculo a tu cuerpo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Factor Ejercicio</h3>
                        <p className="text-gray-600">
                            Si entrenas, sudas. Calculamos el agua extra necesaria para reponer los líquidos perdidos en el gimnasio.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-cyan-600 mb-3">Beneficios</h3>
                        <p className="text-gray-600">
                            Una buena hidratación mejora la piel, la digestión, el rendimiento cognitivo y reduce dolores de cabeza.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Señales de deshidratación</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">!</span>
                            <span className="text-gray-600">Boca seca o pegajosa.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">!</span>
                            <span className="text-gray-600">Dolor de cabeza o mareos.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-500 font-bold">!</span>
                            <span className="text-gray-600">Orina de color amarillo oscuro.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
