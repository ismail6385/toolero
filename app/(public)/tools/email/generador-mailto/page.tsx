import { Metadata } from 'next';
import MailtoGeneratorClient from './MailtoGeneratorClient';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import RelatedToolsGrid from '@/components/RelatedToolsGrid';

export const metadata: Metadata = {
    title: 'Generador de Enlaces Mailto | Botón de Email HTML',
    description: 'Crea enlaces de correo electrónico (mailto) personalizados con Asunto, Cuerpo, CC y BCC predefinidos. Genera el código HTML para tu sitio web.',
    keywords: [
        'generador mailto',
        'mailto link creator',
        'enlace email html con asunto',
        'codigo html enviar correo',
        'boton contactar web',
        'mailto cc bcc generator'
    ],
    openGraph: {
        title: 'Generador de Enlaces Mailto | Toolero',
        description: 'Crea enlaces de contacto inteligentes para tu web en segundos.',
        type: 'website',
    }
};

export default function MailtoGeneratorPage() {
    const faqs = [
        {
            question: "¿Qué es un enlace mailto?",
            answer: "Es un tipo especial de hipervínculo (URI scheme) que le dice al navegador web que abra el cliente de correo electrónico predeterminado del usuario para enviar un mensaje a la dirección especificada."
        },
        {
            question: "¿Puedo añadir espacios y saltos de línea en el cuerpo?",
            answer: "Sí. Nuestra herramienta codifica automáticamente los espacios y caracteres especiales (URL Encoding) para asegurar que el mensaje aparezca correctamente formateado en el correo."
        },
        {
            question: "¿Funciona en todos los navegadores?",
            answer: "Sí, es un estándar web soportado por Chrome, Firefox, Safari, Edge y navegadores móviles. Sin embargo, requiere que el usuario tenga una app de correo configurada."
        }
    ];

    return (
        <>
            <ToolJsonLd
                name="Generador Link Mailto"
                description="Herramienta para crear enlaces HTML mailto con parámetros avanzados como subject, body, cc y bcc."
                url="https://www.toolero.com/tools/email/generador-mailto"
                applicationCategory="DeveloperApplication"
            />
            <FaqJsonLd faqs={faqs} />

            <MailtoGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Mejora la experiencia de contacto</h2>
                    <p className="text-gray-600 mb-4">
                        Facilitar el contacto es clave para la conversión. Un simple enlace de "Contáctanos" a menudo deja al usuario con un correo vacío y sin saber qué escribir.
                        Usando nuestro generador, puedes guiar al usuario pre-rellenando el asunto (ej: "Presupuesto web") e incluso el cuerpo del mensaje.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Casos de Uso Comunes</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li>
                            <strong>Soporte Técnico:</strong> Pre-rellena el asunto con "Incidencia Técnica" para filtrar tickets automáticamente.
                        </li>
                        <li>
                            <strong>Solicitud de Empleo:</strong> Incluye un enlace que ponga "Candidatura - Designer" en el asunto para que RRHH lo clasifique.
                        </li>
                        <li>
                            <strong>Feedback:</strong> Facilita que los usuarios reporten errores con un cuerpo de mensaje predefinido.
                        </li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                                <p className="text-gray-600 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <RelatedToolsGrid categorySlug="email" currentToolHref="/tools/email/generador-mailto" />
            </article>
        </>
    );
}
