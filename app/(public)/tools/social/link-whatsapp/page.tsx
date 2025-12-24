
import { Metadata } from 'next';
import LinkWhatsappClient from './LinkWhatsappClient';

export const metadata: Metadata = {
    title: 'Generador de Links de WhatsApp - Crea Enlaces Directos wa.me',
    description: 'Crea enlaces de WhatsApp personalizados con tu número y un mensaje predefinido. Generador de links wa.me gratis para Instagram, bio y ventas.',
    keywords: [
        'link whatsapp',
        'generador enlace whatsapp',
        'wa.me generator',
        'whatsapp link',
        'crear link whatsapp',
        'api whatsapp',
        'enlace directo whatsapp',
        'wialink',
        'toolero'
    ],
};

export default function LinkWhatsappPage() {
    return (
        <>
            <LinkWhatsappClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Enlaces para WhatsApp</h2>
                    <p className="text-gray-600 mb-4">
                        Facilita que tus clientes te contacten con un solo clic.
                        Nuestra herramienta genera un enlace corto (`https://wa.me/...`) que abre automáticamente un chat contigo en WhatsApp,
                        incluso con un mensaje escrito listo para enviar.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Mensaje Personalizado</h3>
                        <p className="text-gray-600">
                            Predefine el texto que te enviarán, ej: "Hola, quiero más información sobre el producto...".
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Ideal para Redes</h3>
                        <p className="text-gray-600">
                            Pega el enlace en tu biografía de Instagram, TikTok, Facebook o en botones de tu sitio web.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-green-600 mb-3">Código QR</h3>
                        <p className="text-gray-600">
                            Generamos también un código QR escaneable para que lo imprimas en tarjetas o flyers.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Cómo funciona el link de WhatsApp?</h2>
                    <p className="text-gray-600 mb-4">
                        La API de WhatsApp permite utilizar el formato `https://wa.me/número?text=mensaje`.
                        Nuestra herramienta se encarga de formatear correctamente tu número (eliminando espacios y guiones y añadiendo el código de país)
                        y de codificar los caracteres especiales del mensaje (URL encoding) para que funcione en todos los dispositivos.
                    </p>
                </section>
            </article>
        </>
    );
}
