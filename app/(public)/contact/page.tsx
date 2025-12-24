import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto - Toolero',
    description: 'Ponte en contacto con el equipo de Toolero para sugerencias, reportar errores o colaboraciones.',
};

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 prose prose-slate">
            <h1>Contacto</h1>
            <p>
                ¿Tienes alguna sugerencia para una nueva herramienta? ¿Encontraste un error? Nos encantaría escucharte.
            </p>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 not-prose mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Correo Electrónico</h3>
                <p className="text-gray-600 mb-4">La forma más rápida de contactarnos.</p>
                <a href="mailto:soporte@toolero.com" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    soporte@toolero.com
                </a>
            </div>

            <h2>Soporte Técnico</h2>
            <p>
                Si tienes problemas con alguna herramienta específica, por favor incluye la siguiente información en tu mensaje:
            </p>
            <ul>
                <li>Nombre de la herramienta</li>
                <li>Navegador y Dispositivo que usas</li>
                <li>Descripción del error</li>
            </ul>
        </div>
    );
}
