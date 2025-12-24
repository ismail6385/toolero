
import { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
    title: 'Dividir PDF Gratis Online - Separar PDF por Páginas | Toolero',
    description: 'Divide y separa archivos PDF en páginas individuales gratis. Herramienta online 100% gratuita, rápida y segura. Sin registro, sin límites y totalmente privado.',
    keywords: [
        'dividir pdf',
        'dividir pdf gratis',
        'separar pdf',
        'separar pdf gratis',
        'split pdf',
        'split pdf gratis',
        'dividir pdf online',
        'dividir pdf online gratis',
        'separar pdf por páginas',
        'extraer páginas pdf',
        'extraer páginas pdf gratis',
        'dividir archivo pdf',
        'separar hojas pdf',
        'pdf dividir',
        'pdf separar',
        'dividir pdf en partes',
        'toolero'
    ],
};

export default function SplitPdfPage() {
    return (
        <>
            <SplitPdfClient />

            <article className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Dividir y Extraer Páginas de PDF</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Necesitas sacar solo una página de un documento PDF grande? ¿O quieres separar cada hoja en un archivo independiente?
                        Nuestra herramienta de Dividir PDF te permite seleccionar y extraer exactamente las páginas que necesitas de forma gratuita y segura.
                    </p>
                </section>

                <section className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Extracción Selectiva</h3>
                        <p className="text-gray-600">
                            Elige rangos específicos (ej. 1-5, 8, 10-12) o selecciona visualmente las páginas que quieres guardar.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Rápido y Fácil</h3>
                        <p className="text-gray-600">
                            El proceso se realiza en segundos. Cargas tu archivo, eliges las páginas y descargas el resultado.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-red-600 mb-3">Calidad Intacta</h3>
                        <p className="text-gray-600">
                            Las páginas extraídas mantienen la misma calidad, formato y contenido que en el documento original.
                        </p>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Usos comunes</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Extraer una factura específica de un reporte mensual</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Separar capítulos de un libro o tesis</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-500 font-bold">✓</span>
                            <span className="text-gray-600">Eliminar páginas en blanco o innecesarias de un escaneo</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Mis archivos están seguros?</h3>
                            <p className="text-gray-600">
                                Absolutamente. El procesamiento de PDF se realiza con altos estándares de seguridad y privacidad.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">¿Puedo dividir un PDF protegido?</h3>
                            <p className="text-gray-600">
                                Si el archivo tiene contraseña de apertura, deberás desbloquearlo antes o proporcionar la contraseña para poder procesarlo.
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
}
