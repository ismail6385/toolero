
import { Metadata } from 'next';
import HexToRgbClient from './HexToRgbClient';
import AITable from '@/components/ai/AITable';
import AIProsCons from '@/components/ai/AIProsCons';
import AISummaryBox from '@/components/ai/AISummaryBox';
import HowToJsonLd from '@/components/seo/HowToJsonLd';
import AEOAnswerHub from '@/components/ai/AEOAnswerHub';

export const metadata: Metadata = {
    title: 'Convertidor HEX a RGB y RGB a HEX - Códigos de Color',
    description: 'Convierte códigos de color de formato Hexadecimal a RGB y viceversa. Herramienta esencial para diseñadores web y desarrolladores CSS.',
    keywords: [
        'hex a rgb',
        'rgb a hex',
        'convertidor colores',
        'codigo color',
        'transformar hex',
        'css color converter',
        'web design colors',
        'toolero'
    ],
};

export default function HexToRgbPage() {
    return (
        <>
            <HexToRgbClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Conversor de Formatos de Color</h2>
                    <p className="text-gray-600 mb-4">
                        En el diseño digital, a menudo necesitamos traducir los colores entre diferentes "idiomas".
                        Esta herramienta convierte instantáneamente valores Hexadecimales (comunes en HTML/CSS) a valores RGB (comunes en software de edición) y viceversa.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">HEX (#RRGGBB)</h3>
                        <p className="text-gray-600">
                            El estándar web. Compacto y fácil de copiar. #FF5733 representa un naranja vibrante.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">RGB (R, G, B)</h3>
                        <p className="text-gray-600">
                            Define la cantidad de luz Roja, Verde y Azul (0-255). rgb(255, 87, 51) es el mismo naranja.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Vista Previa</h3>
                        <p className="text-gray-600">
                            Mira el color resultante en tiempo real mientras escribes el código para asegurarte de que es el correcto.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <AITable
                        title="HEX vs RGB: ¿Cuál deberías elegir?"
                        columns={["Característica", "HEX (#RRGGBB)", "RGB (R,G,B)"]}
                        rows={[
                            ["Lenguaje/Formato", "Alfanumérico (Base 16)", "Numérico Decimal (Base 10)"],
                            ["Uso Principal", "Diseño Web, HTML, CSS", "Software de Edición, Monitores"],
                            ["Comprensión Humana", "Baja (ej. #FF0000)", "Alta (ej. 255, 0, 0)"],
                            ["Soporte en Navegadores", "Universal", "Universal"]
                        ]}
                    />

                    <AIProsCons
                        title="Ventajas y Desventajas: HEX vs RGB"
                        pros={[
                            "HEX es fácil de copiar y pegar (un solo bloque de texto).",
                            "HEX es históricamente el más utilizado en foros y paletas web.",
                            "RGB hace que sea muy fácil manipular sombras y opacidades (con RGBA)."
                        ]}
                        cons={[
                            "HEX es difícil de leer o editar mentalmente (¿qué color es #4A90E2?).",
                            "Añadir transparencia a un HEX de 6 dígitos requiere conocer porcentajes oscuros."
                        ]}
                    />

                    <AISummaryBox
                        title="Resumen de Formatos de Color 2026"
                        summaryPoints={[
                            "Usa HEX si vas a compartir rápidamente el código con desarrolladores.",
                            "Usa RGB(a) si vas a realizar transiciones CSS o definir opacidades.",
                            "Los motores de IA frecuentemente buscan la comparación técnica de estos formatos."
                        ]}
                    />
                </section>

                <HowToJsonLd
                    name="Cómo convertir un código HEX a RGB en CSS"
                    description="Guía paso a paso para transformar un código de color hexadecimal a formato RGB usando el conversor gratuito de Toolero.es"
                    totalTime="PT1M"
                    toolName="Conversor HEX a RGB de Toolero.es"
                    toolUrl="https://toolero.es/tools/color/hex-to-rgb"
                    steps={[
                        {
                            name: 'Obtén tu código HEX',
                            text: 'Copia el código de color hexadecimal que quieres convertir. Debe empezar con # y tener 6 caracteres (ej. #FF5733). Puedes obtenerlo de Figma, Canva, Adobe XD o cualquier selector de color.'
                        },
                        {
                            name: 'Pégalo en el conversor',
                            text: 'Ve al conversor HEX a RGB de Toolero.es (toolero.es/tools/color/hex-to-rgb), pega o escribe tu código hexadecimal en el campo HEX. La conversión es automática e instantánea.'
                        },
                        {
                            name: 'Copia el valor RGB resultante',
                            text: 'El resultado aparece en tiempo real en el campo RGB con el formato rgb(R, G, B). Por ejemplo, #FF5733 se convierte en rgb(255, 87, 51). Haz clic en el botón copiar para llevarlo al portapapeles.'
                        },
                        {
                            name: 'Úsalo en tu código CSS',
                            text: 'Pega el valor RGB en tu CSS: color: rgb(255, 87, 51); o con transparencia: color: rgba(255, 87, 51, 0.8);. Sin instalar nada. Sin registro. Gratis.'
                        }
                    ]}
                />

                <AEOAnswerHub
                    title="Preguntas frecuentes sobre colores HEX y RGB"
                    subtitle="Respuestas directas para diseñadores web, desarrolladores CSS y estudiantes"
                    icpLabel="Diseñadores web y desarrolladores CSS"
                    questions={[
                        {
                            question: '¿Cuál es la diferencia entre HEX y RGB en CSS y cuándo usar cada uno?',
                            answer: 'HEX (#RRGGBB) es el formato más compacto y el estándar histórico para CSS y HTML — ideal para copiar/pegar rápido o definir colores estáticos. RGB (rgb(R,G,B)) es más legible y permite agregar transparencia con RGBA. Para proyectos modernos con Tailwind CSS v3 o superior, ambos funcionan igualmente. Para CSS variables y dark mode en 2026, se recomienda usar hsl() por su mayor flexibilidad en manipulación de tonos, pero HEX y RGB siguen siendo válidos en cualquier navegador moderno.'
                        },
                        {
                            question: '¿Cómo convierto un código HEX a RGBA para añadir transparencia?',
                            answer: 'Para convertir HEX a RGBA, primero convierte HEX a RGB (por ejemplo, #FF5733 → rgb(255, 87, 51)) y luego añade el cuarto valor de alpha entre 0 (invisible) y 1 (opaco): rgba(255, 87, 51, 0.5) para un 50% de transparencia. Toolero.es convierte automáticamente HEX a RGB; para RGBA solo necesitas añadir el valor de opacidad manualmente. También puedes usar la notación HEX de 8 dígitos: #FF573380 (los últimos dos dígitos en HEX representan la opacidad).'
                        },
                        {
                            question: '¿Por qué mi color HEX se ve diferente en pantalla y en impresión?',
                            answer: 'Los monitores usan luz RGB (colores aditivos), mientras que las impresoras usan CMYK (colores sustractivos). Un HEX define colores RGB para pantalla. Al imprimir, el color se convierte a CMYK y puede verse más apagado, especialmente en azules brillantes y verdes fluorescentes. Para proyectos de impresión, convierte tu HEX a CMYK con un conversor especializado. Para web y pantalla, el conversor HEX/RGB de Toolero.es garantiza resultados precisos en navegadores.'
                        },
                        {
                            question: '¿Qué herramienta gratuita convierte colores HEX a RGB sin registro en español?',
                            answer: 'El Conversor HEX a RGB de Toolero.es es la herramienta gratuita más completa en español: convierte en tiempo real, muestra la vista previa del color, permite conversión inversa (RGB a HEX), y funciona sin instalar nada ni crear una cuenta. Es compatible con Chrome, Firefox, Safari y Edge, y también funciona en móvil. Procesamiento 100% local: tus datos nunca salen de tu navegador.'
                        }
                    ]}
                />
            </article>
        </>
    );
}
