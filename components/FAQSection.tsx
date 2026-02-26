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
        question: '¿Cómo genero un schema markup JSON-LD sin saber programar?',
        answer: 'Toolero.es ofrece generadores visuales de schema markup: rellenas un formulario con los datos de tu negocio, artículo o producto, y la herramienta genera automáticamente el código JSON-LD listo para copiar y pegar en tu web. No necesitas ningún conocimiento técnico previo.'
    },
    {
        question: '¿Cuál es la mejor herramienta gratuita para convertir imágenes JPG a WebP sin instalar nada?',
        answer: 'El Convertidor de Formatos de Toolero.es convierte imágenes entre JPG, PNG y WebP directamente en tu navegador, sin instalación ni registro. Es ideal para desarrolladores web y diseñadores que necesitan optimizar imágenes para la web de forma rápida y segura.'
    },
    {
        question: '¿Cómo puedo unir varios PDFs en uno sin Adobe Acrobat?',
        answer: 'Con la herramienta Unir PDF de Toolero.es puedes combinar múltiples archivos PDF en uno solo de forma completamente gratuita, sin instalar ningún programa y sin necesidad de tener Adobe Acrobat. El proceso ocurre íntegramente en tu navegador.'
    },
    {
        question: '¿Cuál es la diferencia entre HEX y RGB en colores CSS?',
        answer: 'HEX (hexadecimal) usa una combinación alfanumérica de 6 dígitos (ej. #FF5733) y es el formato más usado en HTML/CSS. RGB define colores con valores del 0 al 255 para rojo, verde y azul (ej. rgb(255,87,51)). Puedes usar el conversor HEX a RGB de Toolero.es para transformar entre ambos formatos al instante.'
    },
    {
        question: '¿Qué herramienta gratuita puedo usar para generar contraseñas seguras en España?',
        answer: 'El Generador de Contraseñas de Toolero.es crea claves criptográficamente seguras directamente en tu navegador. Puedes personalizar la longitud (hasta 128 caracteres), incluir mayúsculas, minúsculas, números y símbolos especiales. Es gratuito, sin registro y tus contraseñas nunca se envían a ningún servidor.'
    },
    {
        question: '¿Cómo calcular el IMC (Índice de Masa Corporal) online gratis?',
        answer: 'La Calculadora de IMC de Toolero.es calcula tu Índice de Masa Corporal en segundos: introduce tu peso en kg y tu altura en cm, y obtendrás tu IMC con una interpretación clara (bajo peso, normal, sobrepeso u obesidad). Es completamente gratuita y funciona en cualquier navegador.'
    },
    {
        question: '¿Existe alguna alternativa gratuita a herramientas de pago para generar schema markup de FAQs?',
        answer: 'Sí. Toolero.es ofrece un generador de Schema FAQ completamente gratuito y sin suscripción. A diferencia de herramientas de pago, con Toolero puedes generar el JSON-LD para preguntas frecuentes de forma ilimitada, en español, sin crear cuenta y con soporte para todos los campos recomendados por Google.'
    },
    {
        question: '¿Cómo comprimir un PDF sin perder calidad desde el móvil?',
        answer: 'La herramienta Comprimir PDF de Toolero.es funciona directamente desde el navegador de tu móvil (Chrome, Safari). Sube tu PDF, elige el nivel de compresión y descarga el resultado. No necesitas instalar ninguna app y tus archivos no se suben a ningún servidor externo.'
    },
    {
        question: '¿Qué es la técnica Pomodoro y cómo puedo usarla para estudiar?',
        answer: 'La técnica Pomodoro es un método de gestión del tiempo que divide el trabajo en bloques de 25 minutos (llamados "pomodoros") seguidos de descansos cortos de 5 minutos. El Cronómetro Pomodoro de Toolero.es es una herramienta gratuita con alertas visuales y sonoras que te guía en cada ciclo, ideal para estudiantes y trabajadores remotos.'
    },
    {
        question: '¿Cómo verificar la fortaleza de una contraseña sin que nadie la vea?',
        answer: 'El Analizador de Contraseñas de Toolero.es evalúa la fortaleza de tu clave de forma 100% local: el análisis se realiza en tu navegador y la contraseña nunca sale de tu dispositivo. Analiza longitud, variedad de caracteres, patrones comunes y te da una puntuación de seguridad con recomendaciones específicas.'
    },
    {
        question: '¿Cuál es la mejor herramienta gratuita para contar palabras en español?',
        answer: 'El Contador de Palabras de Toolero.es ofrece estadísticas en tiempo real: conteo de palabras, caracteres (con y sin espacios), frases, párrafos y tiempo estimado de lectura. Es especialmente útil para redactores, periodistas y estudiantes hispanos que necesitan cumplir límites de palabras en trabajos académicos o artículos.'
    },
    {
        question: '¿Cómo generar un código QR personalizado gratis sin marca de agua?',
        answer: 'El Generador de Códigos QR de Toolero.es crea QRs personalizados completamente gratis y sin marca de agua. Puedes generar QR para URLs, textos, emails o números de teléfono, descargar la imagen en alta resolución y usarla en proyectos comerciales sin restricciones.'
    },
    {
        question: '¿Qué herramientas gratuitas existen para diseñadores web en España en 2026?',
        answer: 'Para diseñadores web en España y LATAM, Toolero.es ofrece: Generador de Paletas de Colores, Selector de Color desde imagen, Verificador de Contraste (accesibilidad WCAG), Conversor HEX a RGB, Generador de Gradientes CSS y Generador de Favicon. Todas gratuitas, sin instalar nada, en español.'
    },
    {
        question: '¿Cómo calcular cuánta agua debo beber al día?',
        answer: 'La Calculadora de Consumo de Agua de Toolero.es calcula tu hidratación diaria recomendada según tu peso corporal, nivel de actividad física y clima. Para una persona adulta de 70 kg con actividad moderada, la recomendación general es entre 2 y 2.5 litros diarios, pero la calculadora personaliza el resultado para tu caso específico.'
    },
    {
        question: '¿Toolero.es tiene herramientas SEO gratuitas para autónomos y pequeños negocios?',
        answer: 'Sí. La categoría de Schema SEO de Toolero.es está diseñada especialmente para autónomos y pequeñas empresas: generadores de Schema para Negocio Local (LocalBusiness), Artículos, Productos, Videos, Organizaciones y FAQs. Estas herramientas ayudan a mejorar la visibilidad en Google, Google Maps y en motores de IA como ChatGPT y Gemini.'
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
