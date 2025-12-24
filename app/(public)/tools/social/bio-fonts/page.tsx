
import { Metadata } from 'next';
import BioFontsClient from './BioFontsClient';

export const metadata: Metadata = {
    title: 'Fuentes y Letras Aesthetic para Instagram Bio y TikTok',
    description: 'Generador de letras bonitas y fuentes aesthetic para copiar y pegar. Personaliza tu biografía de Instagram, Twitter y TikTok con estilos únicos de texto.',
    keywords: [
        'fuentes instagram',
        'letras bonitas',
        'aesthetic fonts',
        'bio instagram',
        'fuentes cursivas',
        'letras aesthetic',
        'cambiar letra instagram',
        'tipografias instagram',
        'conversor letras',
        'letras unicode',
        'toolero'
    ],
};

export default function BioFontsPage() {
    return (
        <>
            <BioFontsClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Generador de Fuentes para Instagram y Redes</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Quieres destacar en Instagram, TikTok o Twitter? Nuestra herramienta transforma tu texto normal en decenas de estilos de letras diferentes y originales:
                        cursivas, negritas, góticas, con burbujas, emojis y más. Simplemente escribe, elige tu favorita y copia.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Estilos Únicos</h3>
                        <p className="text-gray-600">
                            Accede a más de 50 tipografías Unicode que funcionan en casi todas las plataformas sociales.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Copy & Paste</h3>
                        <p className="text-gray-600">
                            Sin instalar apps ni teclados. Todo funciona online desde tu navegador móvil o PC.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-pink-600 mb-3">Unicode Mágico</h3>
                        <p className="text-gray-600">
                            Lo que ves no son "fuentes" reales, sino símbolos matemáticos y alfanuméricos especiales que imitan letras.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">¿Dónde usar estas letras?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">En tu <strong>Biografía de Instagram</strong> para darle personalidad.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">En <strong>Nombres de Usuario</strong> o Nicknames (Twitter, juegos).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">En <strong>Comentarios</strong> para llamar la atención.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-pink-500 font-bold">✓</span>
                            <span className="text-gray-600">En <strong>Mensajes de WhatsApp</strong> para sorprender a amigos.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
