import React from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: '¿Qué es Toolero.es?',
        answer: 'Toolero.es es una plataforma que ofrece más de 50 herramientas online gratuitas para mejorar tu productividad. Incluye herramientas de texto, imágenes, seguridad, SEO y diseño, todas 100% gratuitas y sin necesidad de registro.'
    },
    {
        question: '¿Son realmente gratuitas todas las herramientas?',
        answer: 'Sí, todas nuestras herramientas son completamente gratuitas. No hay costos ocultos, suscripciones ni límites de uso. Puedes utilizar cualquier herramienta tantas veces como necesites.'
    },
    {
        question: '¿Necesito registrarme para usar las herramientas?',
        answer: 'No, no es necesario registrarse. Todas nuestras herramientas funcionan directamente en tu navegador sin necesidad de crear una cuenta o proporcionar información personal.'
    },
    {
        question: '¿Las herramientas funcionan en dispositivos móviles?',
        answer: 'Sí, todas nuestras herramientas están optimizadas para funcionar perfectamente en dispositivos móviles, tablets y ordenadores de escritorio. El diseño es completamente responsive.'
    },
    {
        question: '¿Qué tipo de herramientas ofrecen?',
        answer: 'Ofrecemos herramientas en varias categorías: Texto y Contenido (contador de palabras, conversor de mayúsculas), Imágenes (redimensionar, optimizar), Seguridad (generador de contraseñas, hashes), Color y Diseño (paletas, conversores), y SEO (generadores de schema markup).'
    },
    {
        question: '¿Los datos que proceso son seguros?',
        answer: 'Absolutamente. Todas nuestras herramientas funcionan completamente en tu navegador (client-side). Tus datos nunca se envían a nuestros servidores, garantizando total privacidad y seguridad.'
    },
    {
        question: '¿Puedo usar estas herramientas para proyectos comerciales?',
        answer: 'Sí, puedes usar todas nuestras herramientas para proyectos personales y comerciales sin restricciones. No hay limitaciones de uso comercial.'
    },
    {
        question: '¿Cómo funciona el contador de palabras?',
        answer: 'Nuestro contador de palabras analiza tu texto en tiempo real y proporciona estadísticas detalladas: número de palabras, caracteres (con y sin espacios), frases, párrafos y tiempo estimado de lectura.'
    },
    {
        question: '¿Puedo redimensionar imágenes sin perder calidad?',
        answer: 'Sí, nuestra herramienta de redimensionamiento de imágenes utiliza algoritmos avanzados para mantener la mejor calidad posible. Puedes ajustar el tamaño y la compresión según tus necesidades.'
    },
    {
        question: '¿Qué es un generador de schema markup?',
        answer: 'Un generador de schema markup crea código estructurado (JSON-LD) que ayuda a los motores de búsqueda a entender mejor tu contenido. Esto puede mejorar tu SEO y generar rich snippets en los resultados de búsqueda.'
    },
    {
        question: '¿Las herramientas están disponibles en español?',
        answer: 'Sí, todas nuestras herramientas están completamente en español, incluyendo la interfaz, descripciones y documentación. Estamos enfocados en el mercado hispanohablante.'
    },
    {
        question: '¿Puedo sugerir nuevas herramientas?',
        answer: 'Por supuesto, valoramos las sugerencias de nuestra comunidad. Puedes contactarnos a través de nuestras redes sociales o formulario de contacto para proponer nuevas herramientas.'
    },
    {
        question: '¿Con qué frecuencia se añaden nuevas herramientas?',
        answer: 'Añadimos nuevas herramientas regularmente basándonos en las necesidades de nuestros usuarios y las tendencias del mercado. Suscríbete a nuestras actualizaciones para estar al tanto.'
    },
    {
        question: '¿Funcionan las herramientas sin conexión a internet?',
        answer: 'La mayoría de nuestras herramientas funcionan completamente en tu navegador, pero necesitas conexión inicial para cargar la página. Una vez cargada, muchas funcionan offline.'
    },
    {
        question: '¿Qué navegadores son compatibles?',
        answer: 'Nuestras herramientas son compatibles con todos los navegadores modernos: Chrome, Firefox, Safari, Edge y Opera. Recomendamos usar versiones actualizadas para mejor rendimiento.'
    },
    {
        question: '¿Hay límite de tamaño para procesar archivos?',
        answer: 'Los límites varían según la herramienta y las capacidades de tu navegador. Generalmente, puedes procesar archivos de hasta 10-20 MB sin problemas en la mayoría de dispositivos.'
    },
    {
        question: '¿Cómo genero una contraseña segura?',
        answer: 'Usa nuestro generador de contraseñas donde puedes personalizar la longitud, incluir mayúsculas, minúsculas, números y símbolos. La contraseña se genera de forma criptográficamente segura en tu navegador.'
    },
    {
        question: '¿Qué formatos de imagen son compatibles?',
        answer: 'Soportamos los formatos más comunes: JPG, PNG, WebP, GIF y SVG. Puedes convertir entre formatos y optimizar el tamaño sin perder calidad significativa.'
    },
    {
        question: '¿Puedo compartir los resultados de las herramientas?',
        answer: 'Sí, la mayoría de herramientas permiten copiar los resultados al portapapeles o descargarlos. Algunas también ofrecen opciones para compartir directamente en redes sociales.'
    },
    {
        question: '¿Ofrecen soporte técnico?',
        answer: 'Sí, ofrecemos soporte a través de nuestras redes sociales y formulario de contacto. Respondemos todas las consultas lo más rápido posible para ayudarte a aprovechar al máximo nuestras herramientas.'
    }
];

export default function FAQSection() {
    // FAQ Schema Markup
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return (
        <>
            {/* FAQ Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="w-full bg-surface py-20 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-text mb-4">
                            Preguntas Frecuentes
                        </h2>
                        <p className="text-xl text-text/60">
                            Encuentra respuestas a las preguntas más comunes sobre nuestras herramientas
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-background rounded-lg border border-gray-200 hover:border-primary transition-colors"
                            >
                                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-text hover:text-primary transition-colors">
                                    <span className="text-lg">{faq.question}</span>
                                    <svg
                                        className="w-5 h-5 text-primary transform group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 text-text/70 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
