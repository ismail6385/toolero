import { Metadata } from 'next';
import SignatureGeneratorClient from './SignatureGeneratorClient';
import ToolJsonLd from '@/components/seo/ToolJsonLd';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import RelatedToolsGrid from '@/components/RelatedToolsGrid';

export const metadata: Metadata = {
    title: 'Generador de Firmas de Email Gratis | Plantillas HTML Profesionales',
    description: 'Crea tu firma de correo electrónico profesional con foto, logo y redes sociales en segundos. Compatible con Gmail, Outlook, Apple Mail y Yahoo. Sin marcas de agua.',
    keywords: [
        'generador firma email',
        'email signature maker free',
        'firma correo html',
        'plantilla firma outlook',
        'firma gmail con foto',
        'crear firma corporativa',
        'firma email gratis'
    ],
    openGraph: {
        title: 'Generador de Firmas de Email Gratis | Toolero',
        description: 'Diseña firmas profesionales para tus correos electrónicos. Fácil, rápido y gratis.',
        type: 'website',
    }
};

export default function SignatureGeneratorPage() {
    const faqs = [
        {
            question: "¿Es gratuito este generador de firmas?",
            answer: "Sí, es 100% gratuito. No añadimos marcas de agua ni enlaces promocionales obligatorios a tu firma."
        },
        {
            question: "¿Funciona en Gmail y Outlook?",
            answer: "Absolutamente. Generamos código HTML estándar y estilos en línea que son compatibles con la mayoría de clientes de correo, incluyendo Gmail, Outlook, Apple Mail, Thunderbird y Yahoo."
        },
        {
            question: "¿Puedo añadir mi logo o foto?",
            answer: "Sí, puedes pegar la URL de tu imagen (logo o foto de perfil). Recomendamos que la imagen esté alojada en un servidor público, Google Drive (con enlace público) o Dropbox."
        },
        {
            question: "¿Mis datos son privados?",
            answer: "Sí. Todo el proceso ocurre en tu navegador. Tus datos personales no se envían a ningún servidor ni se almacenan en nuestra base de datos."
        }
    ];

    return (
        <>
            <ToolJsonLd
                name="Generador de Firmas de Email"
                description="Herramienta gratuita para crear firmas de correo electrónico HTML profesionales con foto y redes sociales."
                url="https://www.toolero.com/tools/email/generador-firma"
                applicationCategory="BusinessApplication"
            />
            <FaqJsonLd faqs={faqs} />

            <SignatureGeneratorClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu carta de presentación en cada envío</h2>
                    <p className="text-gray-600 mb-4">
                        Una firma de correo electrónico profesional es esencial en el mundo de los negocios. Aumenta la confianza de tus destinatarios,
                        refuerza tu marca personal o corporativa y facilita que te contacten por otros medios.
                        Nuestra herramienta genera código HTML limpio y optimizado, evitando que tus correos caigan en la carpeta de spam por código "sucio".
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Guía de Instalación Rápida</h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-blue-600 mb-2">Gmail</h4>
                            <ol className="text-sm text-gray-600 list-decimal pl-5 space-y-2">
                                <li>Crea tu firma aquí y pulsa "Copiar Firma".</li>
                                <li>Abre Gmail en tu navegador.</li>
                                <li>Ve a <strong>Configuración (⚙️)</strong> {'>'} Ver todos los ajustes.</li>
                                <li>Baja hasta la sección "Firma".</li>
                                <li>Pulsa "Crear nueva", dale un nombre y pega (Ctrl+V) en el cuadro de la derecha.</li>
                                <li><strong>Importante:</strong> Selecciona tu nueva firma en "Valores predeterminados de firma".</li>
                                <li>Baja al final y pulsa "Guardar cambios".</li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-600 mb-2">Outlook (PC/Web)</h4>
                            <ol className="text-sm text-gray-600 list-decimal pl-5 space-y-2">
                                <li>Genera y copia la firma con nuestra herramienta.</li>
                                <li>En Outlook, ve a <strong>Archivo</strong> {'>'} Opciones {'>'} Correo {'>'} Firmas.</li>
                                <li>O en Web: Configuración {'>'} Correo {'>'} Redactar y responder.</li>
                                <li>Crea una nueva firma y pega el contenido en el editor.</li>
                                <li>Si ves un icono de pegado pequeño, selecciona "Mantener formato de origen".</li>
                                <li>Guarda y listo.</li>
                            </ol>
                        </div>
                    </div>
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

                <RelatedToolsGrid categorySlug="email" currentToolHref="/tools/email/generador-firma" />
            </article>
        </>
    );
}
