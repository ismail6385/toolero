'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faPlus,
    faTrash,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

export default function MergePdfClient() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
            setSuccess(false);
            setError(null);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            setError('Por favor selecciona al menos 2 archivos PDF para unir.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `unido_${new Date().getTime()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al procesar los archivos. Asegúrate de que sean PDFs válidos.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faFilePdf} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Unir PDF Online</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Combina múltiples documentos PDF en uno solo. Rápido, gratuito y sin subir tus archivos a ningún servidor.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 hover:bg-red-50/50 transition-all cursor-pointer relative group">
                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="pointer-events-none">
                        <FontAwesomeIcon icon={faPlus} className="text-4xl text-gray-300 group-hover:text-red-500 mb-4 transition-colors" />
                        <h3 className="text-lg font-semibold text-text mb-1">Arrastra tus PDFs aquí</h3>
                        <p className="text-sm text-text/60">o haz clic para seleccionar archivos</p>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-8 space-y-3">
                        <h4 className="font-semibold text-text mb-4 flex items-center justify-between">
                            <span>Archivos Seleccionados ({files.length})</span>
                            <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:underline">Borrar todo</button>
                        </h4>
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:border-red-200 transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 flex-shrink-0 bg-red-100 text-red-500 rounded flex items-center justify-center text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="truncate">
                                            <p className="text-sm font-medium text-text truncate">{file.name}</p>
                                            <p className="text-xs text-text/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={mergePdfs}
                        disabled={files.length < 2 || isProcessing}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                            ${files.length >= 2 && !isProcessing
                                ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-red-500/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        {isProcessing ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faDownload} />
                                Unir PDFs
                            </>
                        )}
                    </button>

                    {error && (
                        <div className="mt-4 text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 text-green-600 bg-green-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                            <FontAwesomeIcon icon={faCheckCircle} /> ¡PDFs unidos con éxito!
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center">
                <p className="text-sm text-text/70">
                    🔒 <strong>Privacidad Garantizada:</strong> El proceso de unión se realiza localmente en tu navegador usando tecnología WebAssembly. Tus archivos nunca salen de tu dispositivo.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Por qué usar nuestra herramienta para unir PDF gratis?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Gratis y Sin Límites</h3>
                                    <p className="text-sm text-text/70">Combina todos los PDF que necesites sin pagar ni registrarte. Sin marcas de agua ni restricciones.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Totalmente Privado y Seguro</h3>
                                    <p className="text-sm text-text/70">Tus archivos se procesan localmente en tu navegador. Nunca se suben a ningún servidor externo.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Rápido y Fácil de Usar</h3>
                                    <p className="text-sm text-text/70">Une tus PDFs en segundos con solo arrastrar y soltar. Interfaz intuitiva y sin complicaciones.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Compatible con Todos los Dispositivos</h3>
                                    <p className="text-sm text-text/70">Funciona en Windows, Mac, Linux, Android e iOS. Solo necesitas un navegador web moderno.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Sin Instalación</h3>
                                    <p className="text-sm text-text/70">No necesitas descargar ni instalar ningún software. Funciona directamente desde tu navegador.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Calidad Original</h3>
                                    <p className="text-sm text-text/70">Mantiene la calidad original de tus documentos PDF sin compresión ni pérdida de datos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo unir archivos PDF en 3 pasos</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Selecciona tus archivos PDF</h3>
                                <p className="text-text/70">Haz clic en el área de carga o arrastra los archivos PDF que quieres unir. Puedes seleccionar múltiples archivos a la vez.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Organiza el orden</h3>
                                <p className="text-text/70">Los archivos se combinarán en el orden que aparecen en la lista. Puedes eliminar archivos individuales si es necesario.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Descarga tu PDF unido</h3>
                                <p className="text-text/70">Haz clic en "Unir PDFs" y tu archivo combinado se descargará automáticamente a tu dispositivo.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Es realmente gratis unir PDF con esta herramienta?</h3>
                            <p className="text-text/70">Sí, nuestra herramienta para unir PDF es 100% gratuita. No hay costos ocultos, no necesitas registrarte y no hay límites en el número de archivos que puedes combinar.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Cuántos archivos PDF puedo unir a la vez?</h3>
                            <p className="text-text/70">No hay límite en el número de archivos PDF que puedes combinar. Puedes unir 2, 3, 10 o más documentos PDF en un solo archivo.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Mis archivos están seguros?</h3>
                            <p className="text-text/70">Absolutamente. Todos tus archivos se procesan localmente en tu navegador usando tecnología WebAssembly. Nunca se suben a nuestros servidores ni a ningún servidor externo, garantizando tu privacidad total.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Funciona en móviles y tablets?</h3>
                            <p className="text-text/70">Sí, puedes unir PDF online desde cualquier dispositivo: ordenador, móvil Android, iPhone o iPad. Solo necesitas un navegador web moderno.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Se pierde calidad al combinar PDF?</h3>
                            <p className="text-text/70">No, la calidad original de tus documentos se mantiene intacta. No hay compresión ni pérdida de datos al unir los archivos PDF.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Necesito instalar algún programa?</h3>
                            <p className="text-text/70">No, esta es una herramienta online que funciona directamente en tu navegador. No necesitas descargar ni instalar ningún software.</p>
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo unir PDF protegidos con contraseña?</h3>
                            <p className="text-text/70">Si el PDF está protegido con contraseña para abrirlo, primero deberás desbloquearlo. Si solo tiene restricciones de edición, generalmente podrás combinarlo sin problemas.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Unir PDF Online: La Solución Más Completa</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-4">
                        <p>
                            Cuando necesitas <strong>combinar PDF gratis</strong>, nuestra herramienta es la opción perfecta. Ya sea que necesites <strong>unir dos PDF</strong> o juntar múltiples documentos en uno solo, nuestro <strong>juntador de PDF</strong> online te permite hacerlo de forma rápida, segura y completamente gratuita.
                        </p>
                        <p>
                            A diferencia de otras herramientas que requieren subir tus archivos a servidores externos, nuestra aplicación procesa todo localmente en tu navegador. Esto significa que cuando usas nuestra herramienta para <strong>unificar PDF</strong>, tus documentos nunca salen de tu dispositivo, garantizando la máxima privacidad y seguridad.
                        </p>
                        <p>
                            Ya sea que necesites <strong>unir archivos PDF gratis</strong> para trabajo, estudios o uso personal, nuestra herramienta te ofrece una experiencia sin complicaciones. Sin límites de tamaño, sin marcas de agua, sin registro y sin costos ocultos. Simplemente selecciona tus archivos, organízalos en el orden deseado y descarga tu PDF combinado en segundos.
                        </p>
                        <p>
                            Nuestra herramienta para <strong>unir PDF online gratis</strong> es compatible con todos los navegadores modernos y dispositivos, permitiéndote <strong>juntar PDF online</strong> desde cualquier lugar y en cualquier momento. La interfaz intuitiva hace que el proceso sea tan simple que cualquiera puede usarla, sin necesidad de conocimientos técnicos.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
