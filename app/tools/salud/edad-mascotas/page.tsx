
import { Metadata } from 'next';
import PetAgeCalculatorClient from './PetAgeCalculatorClient';

export const metadata: Metadata = {
    title: 'Calculadora Edad Humana de Mascotas - Perros y Gatos',
    description: 'Calcula la edad humana de tu perro o gato. Descubre cuántos años "humanos" tiene tu mascota según su tamaño y raza.',
    keywords: [
        'edad perro humanos',
        'edad gato humanos',
        'calculadora edad mascotas',
        'años perro a humano',
        'años gato a humano',
        'pet age calculator',
        'equivalencia edad animales',
        'toolero'
    ],
};

export default function PetAgeCalculatorPage() {
    return (
        <>
            <PetAgeCalculatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Calculadora de Edad de Mascotas</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Sabías que la regla de "1 año de perro = 7 de humano" no es del todo cierta?
                        Los perros pequeños envejecen más lento que los grandes, y los gatos tienen su propio ritmo.
                        Esta calculadora utiliza fórmulas veterinarias modernas para darte la edad humana equivalente más precisa.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-amber-600 mb-3">Perros</h3>
                        <p className="text-gray-600">
                            Distinguimos entre razas Pequeñas, Medianas, Grandes y Gigantes para un cálculo exacto.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-amber-600 mb-3">Gatos</h3>
                        <p className="text-gray-600">
                            Calculamos la madurez de tu felino desde cachorro hasta senior.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-amber-600 mb-3">Etapas de Vida</h3>
                        <p className="text-gray-600">
                            Entiende si tu mascota es un adolescente rebelde, un adulto pleno o un anciano que requiere cuidados.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Curiosidades del envejecimiento animal</h2>
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                        <p className="text-amber-800 italic">
                            "El primer año de vida de un perro o gato equivale aproximadamente a los primeros 15 años de un humano, ya que es cuando alcanzan su madurez sexual y gran parte de su crecimiento."
                        </p>
                    </div>
                </section>
            </article>
        </>
    );
}
