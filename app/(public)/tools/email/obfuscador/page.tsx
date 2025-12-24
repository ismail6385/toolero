import { Metadata } from 'next';
import EmailObfuscatorClient from './EmailObfuscatorClient';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import RelatedToolsGrid from '@/components/RelatedToolsGrid';

export const metadata: Metadata = {
    title: 'Obfuscador de Email | Proteger Correo de Spam Bots',
    description: 'Codifica tu dirección de email en entidades HTML para ocultarla de los robots de spam (scrapers) sin afectar a la experiencia del usuario.',
    keywords: [
        'obfuscador email',
        'proteger email web',
        'email spam protection tool',
        'codificar correo html',
        'ocultar email bots',
        'generador entidades html'
    ],
    openGraph: {
        title: 'Obfuscador de Email Anti-Spam | Toolero',
        description: 'Protege tu bandeja de entrada ocultando tu email en tu sitio web.',
        type: 'website',
    }
};

export default function EmailObfuscatorPage() {
    const faqs = [
        {
            question: "¿Cómo funciona la ofuscación de email?",
            answer: "Convierte cada carácter de tu dirección de correo electrónico a su código ASCII correspondiente (entidad HTML). Por ejemplo, la letra 'a' se convierte en '&#97;'. El navegador web sabe traducir esto para mostrarlo correctamente al usuario, pero muchos bots simples que leen el código fuente solo ven números sin sentido."
        },
        {
            question: "¿El usuario notará la diferencia?",
            answer: "No. Para el visitante humano de tu web, el email se ve y funciona exactamente igual que siempre. Puede hacer clic, copiarlo y leerlo sin problemas."
        },
        {
            question: "¿Es mejor Hexadecimal o Decimal?",
            answer: "Ambos funcionan igual de bien. Usar una mezcla de ambos o variar el método puede añadir una capa extra de complejidad para los bots, pero en la práctica cualquiera de los dos es efectivo contra scrapers básicos."
        }
    ];

    return (
        <>
            <ToolJsonLd
                name="Obfuscador de Email"
                description="Herramienta de seguridad para codificar direcciones de correo electrónico en entidades HTML y prevenir el spam."
                url="https://www.toolero.com/tools/email/obfuscador"
                applicationCategory="SecurityApplication"
            />
            <FaqJsonLd faqs={faqs} />

            <EmailObfuscatorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Detén el Spam desde la fuente</h2>
                    <p className="text-gray-600 mb-4">
                        Publicar tu dirección de correo electrónico en texto plano en tu sitio web es una invitación abierta para que los spammers la añadan a sus bases de datos.
                        Los robots rastrean internet las 24 horas buscando el patrón <code>nombre@dominio.com</code>.
                        Al usar nuestro ofuscador, rompes ese patrón en el código fuente, haciéndolo invisible para la mayoría de estos bots.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Alternativas de Protección</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li>
                            <strong>Formularios de Contacto:</strong> La opción más segura, ya que nunca expones tu email real.
                        </li>
                        <li>
                            <strong>Imagen:</strong> Poner tu email como una imagen. Seguro contra bots de texto, pero mala experiencia de usuario (no se puede copiar).
                        </li>
                        <li>
                            <strong>Ofuscación (Esta herramienta):</strong> El mejor balance entre seguridad y usabilidad. Mantiene el enlace <code>mailto:</code> funcional.
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

                <RelatedToolsGrid categorySlug="email" currentToolHref="/tools/email/obfuscador" />
            </article>
        </>
    );
}
