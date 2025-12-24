
import { Metadata } from 'next';
import CaloriesClient from './CaloriesClient';

export const metadata: Metadata = {
    title: 'Calculadora de Calorías Diarias - TMB y Harris-Benedict',
    description: 'Calcula cuántas calorías necesitas al día para mantener peso, adelgazar o ganar masa muscular. Basado en la fórmula Harris-Benedict.',
    keywords: [
        'calculadora calorias',
        'calorias diarias',
        'tasa metabolica basal',
        'tmb calculator',
        'perder peso',
        'dieta calorias',
        'macronutrientes',
        'harris benedict',
        'toolero'
    ],
};

export default function CaloriesPage() {
    return (
        <>
            <CaloriesClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Requerimiento Calórico</h2>
                    <p className="text-gray-600 mb-4">
                        Saber cuántas calorías quema tu cuerpo es el primer paso para cualquier objetivo físico.
                        Ya sea que quieras perder grasa para el verano o ganar músculo en el gimnasio, esta herramienta estima tu gasto energético total (TDEE).
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Metabolismo Basal</h3>
                        <p className="text-gray-600">
                            Calculamos las calorías que tu cuerpo quema solo por existir (respirar, latir, pensar).
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Nivel de Actividad</h3>
                        <p className="text-gray-600">
                            Ajustamos el resultado según tu estilo de vida: desde sedentario hasta atleta de alto rendimiento.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-orange-600 mb-3">Tus Objetivos</h3>
                        <p className="text-gray-600">
                            Te damos 3 cifras mágicas: calorías para mantenimiento, para déficit (bajar peso) y para superávit (subir peso).
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo funciona?</h2>
                    <p className="text-gray-600 mb-4">
                        Usamos la ecuación de <strong>Harris-Benedict</strong>, el estándar de oro en nutrición clínica.
                        Toma en cuenta tu sexo, peso, altura y edad para ofrecerte una estimación personalizada y precisa.
                    </p>
                </section>
            </article>
        </>
    );
}
