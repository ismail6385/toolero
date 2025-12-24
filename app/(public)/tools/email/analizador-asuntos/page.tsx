import { Metadata } from 'next';
import SubjectTesterClient from './SubjectTesterClient';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import RelatedToolsGrid from '@/components/RelatedToolsGrid';

export const metadata: Metadata = {
    title: 'Analizador de Asuntos de Email | Test de Spam y CTR',
    description: 'Evalúa gratis la efectividad de tus líneas de asunto. Detector de palabras spam, longitud óptima y previsualización móvil para email marketing.',
    keywords: [
        'analizador asunto email',
        'tester asunto correo',
        'email subject line grader',
        'palabras spam email',
        'longitud asunto email marketing',
        'mejorar open rate'
    ],
    openGraph: {
        title: 'Tester de Asuntos de Email | Toolero',
        description: '¿Tu correo acabará en Spam? Compruébalo antes de enviar.',
        type: 'website',
    }
};

export default function SubjectTesterPage() {
    const faqs = [
        {
            question: "¿Cuál es la longitud ideal para un asunto de email?",
            answer: "Generalmente entre 40 y 60 caracteres. Los iPhones cortan los asuntos alrededor de los 40 caracteres en vista vertical, y la mayoría de clientes de escritorio muestran hasta 60 antes de recortar."
        },
        {
            question: "¿Qué son las 'Spam Trigger Words'?",
            answer: "Son palabras que los filtros antispam asocian con correo no deseado. Ejemplos comunes son: 'Gratis', 'Dinero fácil', 'Promoción urgente', '100% garantizado', 'Click aquí'."
        },
        {
            question: "¿Ayudan los emojis en el asunto?",
            answer: "Sí, usarlos con moderación puede aumentar la tasa de apertura (Open Rate) al destacar visualmente en la bandeja de entrada. Sin embargo, no abuses de ellos o parecerá poco profesional."
        }
    ];

    return (
        <>
            <ToolJsonLd
                name="Analizador de Asuntos de Email"
                description="Herramienta de análisis para líneas de asunto de correo electrónico. Evalúa longitud, palabras clave y spam score."
                url="https://www.toolero.com/tools/email/analizador-asuntos"
                applicationCategory="BusinessApplication"
            />
            <FaqJsonLd faqs={faqs} />

            <SubjectTesterClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Optimiza tu tasa de apertura</h2>
                    <p className="text-gray-600 mb-4">
                        En el email marketing, la batalla se gana o se pierde en la bandeja de entrada. Si tu asunto no convence, el contenido de tu correo (por muy bueno que sea) nunca será leído.
                        Nuestra herramienta simula la visualización en dispositivos móviles y detecta errores comunes que reducen el impacto de tus campañas.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Consejos para Asuntos Irresistibles</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span>🎯 <strong>Sé Específico:</strong> Dile al lector exactamente qué ganará al abrir el correo.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>⏳ <strong>Urgencia Real:</strong> Usa la urgencia solo cuando sea real ("Oferta termina hoy") no falsa ("Última oportunidad" enviada cada día).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>👋 <strong>Personalización:</strong> Incluir el nombre del destinatario puede aumentar conversiones, pero asegúrate de que tienes los datos limpios.</span>
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

                <RelatedToolsGrid categorySlug="email" currentToolHref="/tools/email/analizador-asuntos" />
            </article>
        </>
    );
}
