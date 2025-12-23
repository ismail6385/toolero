
import { Metadata } from 'next';
import EmailSignatureClient from './EmailSignatureClient';

export const metadata: Metadata = {
    title: 'Generador de Firmas HTML para Correo Gratis - Gmail, Outlook',
    description: 'Crea tu firma de correo electrónico profesional con HTML gratis. Plantilla personalizable con foto, logo y redes sociales para Gmail, Outlook y Apple Mail.',
    keywords: [
        'generador firma email',
        'firma html correo',
        'firma gmail',
        'firma outlook',
        'email signature generator',
        'crear firma correo',
        'plantilla firma email',
        'firma profesional',
        'toolero'
    ],
};

export default function SignatureGeneratorPage() {
    return (
        <>
            <EmailSignatureClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Crea tu Firma de Correo Profesional</h2>
                    <p className="text-gray-600 mb-4">
                        Tu firma de correo es tu tarjeta de visita digital. Un diseño profesional aumenta la confianza de tus clientes y mejora tu imagen de marca.
                        Nuestra herramienta genera el código HTML necesario para que tu firma se vea perfecta en Gmail, Outlook, Apple Mail y Yahoo.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Diseño Responsive</h3>
                        <p className="text-gray-600">
                            Optimizada para verse bien tanto en ordenadores como en móviles.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Copia y Pega</h3>
                        <p className="text-gray-600">
                            No necesitas saber programar. Simplemente diseña visualmente y copia el resultado a tu cliente de correo.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Redes Sociales</h3>
                        <p className="text-gray-600">
                            Incluye iconos con enlaces a tu LinkedIn, Twitter/X y sitio web para ganar seguidores y tráfico.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Instrucciones de instalación</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Gmail:</strong> Ve a Configuración &gt; General &gt; Firma. Pega el diseño allí.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Outlook:</strong> Archivo &gt; Opciones &gt; Correo &gt; Firmas.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span className="text-gray-600"><strong>Apple Mail:</strong> Preferencias &gt; Firmas. (Desactiva "Usar siempre mi tipo de letra").</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
