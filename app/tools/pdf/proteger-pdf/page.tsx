
import { Metadata } from 'next';
import ProtectPdfClient from './ProtectPdfClient';

export const metadata: Metadata = {
    title: 'Proteger PDF con Contraseña Gratis - Encriptar PDF Online',
    description: 'Protege tus PDF con contraseña gratis. Encripta y añade seguridad a tus documentos PDF online. 100% privado, sin subir archivos al servidor.',
    keywords: [
        'proteger pdf',
        'proteger pdf con contraseña',
        'proteger pdf gratis',
        'encriptar pdf',
        'encriptar pdf con contraseña',
        'poner contraseña a pdf',
        'añadir contraseña pdf',
        'contraseña pdf',
        'pdf con contraseña',
        'seguridad pdf',
        'proteger documento pdf',
        'como proteger un pdf',
        'como poner contraseña a un pdf',
        'bloquear pdf con contraseña',
        'password protect pdf',
        'encrypt pdf',
        'pdf password protection',
        'proteger pdf online',
        'encriptar pdf gratis',
        'toolero'
    ],
};

export default function ProtectPdfPage() {
    return (
        <>
            <ProtectPdfClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Proteger y Encriptar PDF Online</h2>
                    <p className="text-gray-600 mb-4">
                        Añade una capa extra de seguridad a tus documentos confidenciales.
                        Nuestra herramienta te permite establecer una contraseña robusta para abrir tus archivos PDF.
                        El archivo se encripta para que solo las personas que conozcan la clave puedan ver su contenido.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Encriptación Fuerte</h3>
                        <p className="text-gray-600">
                            Utilizamos estándares de cifrado modernos para asegurar que la protección sea difícil de romper.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Privacidad Garantizada</h3>
                        <p className="text-gray-600">
                            La encriptación ocurre en tu dispositivo. Tu archivo original y tu contraseña nunca viajan a través de internet.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Fácil de Usar</h3>
                        <p className="text-gray-600">
                            Sube el archivo, escribe tu contraseña y descarga la versión protegida al instante.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Consejos de seguridad</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Usa contraseñas largas que combinen letras, números y símbolos.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">No uses información personal obvia (fechas, nombres) como contraseña.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Recuerda tu contraseña; si la olvidas, puede ser imposible recuperar el archivo.</span>
                        </li>
                    </ul>
                </section>
            </article>
        </>
    );
}
