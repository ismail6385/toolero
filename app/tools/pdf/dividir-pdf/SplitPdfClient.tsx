'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf,
    faUpload,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle,
    faFileArchive,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function SplitPdfClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [splitPages, setSplitPages] = useState<Blob[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setSuccess(false);
            setError(null);
            setSplitPages([]);

            // Get page count
            try {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                setPageCount(pdf.getPageCount());
            } catch (err) {
                console.error(err);
                setError('Error al leer el archivo PDF. Asegúrate de que sea un PDF válido.');
            }
        }
    };

    const splitPdf = async () => {
        if (!file) {
            setError('Por favor selecciona un archivo PDF.');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setSplitPages([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const totalPages = pdf.getPageCount();

            const pages: Blob[] = [];

            // Create individual PDFs for each page
            for (let i = 0; i < totalPages; i++) {
                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(pdf, [i]);
                newPdf.addPage(copiedPage);

                const pdfBytes = await newPdf.save();
                const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
                pages.push(blob);
            }

            setSplitPages(pages);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al dividir el PDF. Asegúrate de que sea un archivo válido.');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadPage = (pageBlob: Blob, pageNumber: number) => {
        const url = URL.createObjectURL(pageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pagina_${pageNumber + 1}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadAll = () => {
        splitPages.forEach((pageBlob, index) => {
            setTimeout(() => {
                downloadPage(pageBlob, index);
            }, index * 200); // Stagger downloads
        });
    };

    const reset = () => {
        setFile(null);
        setPageCount(0);
        setSplitPages([]);
        setSuccess(false);
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faFilePdf} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Dividir PDF Online</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Separa un archivo PDF en páginas individuales. Rápido, gratuito y sin subir tus archivos a ningún servidor.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                {!file && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 hover:bg-red-50/50 transition-all cursor-pointer relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="pointer-events-none">
                            <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-300 group-hover:text-red-500 mb-4 transition-colors" />
                            <h3 className="text-lg font-semibold text-text mb-1">Arrastra tu PDF aquí</h3>
                            <p className="text-sm text-text/60">o haz clic para seleccionar un archivo</p>
                        </div>
                    </div>
                )}

                {/* File Info */}
                {file && !success && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 flex-shrink-0 bg-red-100 text-red-500 rounded flex items-center justify-center">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-medium text-text truncate">{file.name}</p>
                                    <p className="text-xs text-text/40">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB • {pageCount} {pageCount === 1 ? 'página' : 'páginas'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={reset}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>📄 {pageCount} {pageCount === 1 ? 'página' : 'páginas'} detectadas</strong>
                                <br />
                                Se creará un archivo PDF separado para cada página.
                            </p>
                        </div>
                    </div>
                )}

                {/* Split Results */}
                {success && splitPages.length > 0 && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-text">
                                ✅ PDF dividido en {splitPages.length} {splitPages.length === 1 ? 'página' : 'páginas'}
                            </h3>
                            <button
                                onClick={reset}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Dividir otro PDF
                            </button>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
                                <div>
                                    <p className="text-sm font-semibold text-green-800">¡Proceso completado!</p>
                                    <p className="text-xs text-green-700">Descarga las páginas individualmente o todas a la vez.</p>
                                </div>
                            </div>
                            <button
                                onClick={downloadAll}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faFileArchive} />
                                Descargar Todas
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {splitPages.map((pageBlob, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-red-200 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 flex-shrink-0 bg-red-100 text-red-500 rounded flex items-center justify-center text-sm font-semibold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-text">Página {index + 1}</p>
                                            <p className="text-xs text-text/40">{(pageBlob.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => downloadPage(pageBlob, index)}
                                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                        Descargar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {file && !success && (
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            onClick={splitPdf}
                            disabled={!file || isProcessing}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                                ${file && !isProcessing
                                    ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-red-500/30'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {isProcessing ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    Dividiendo PDF...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faFilePdf} />
                                    Dividir PDF
                                </>
                            )}
                        </button>

                        {error && (
                            <div className="mt-4 text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-12 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center">
                <p className="text-sm text-text/70">
                    🔒 <strong>Privacidad Garantizada:</strong> El proceso de división se realiza localmente en tu navegador usando tecnología WebAssembly. Tus archivos nunca salen de tu dispositivo.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Por qué usar nuestra herramienta para dividir PDF gratis?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Gratis y Sin Límites</h3>
                                    <p className="text-sm text-text/70">Divide todos los PDF que necesites sin pagar ni registrarte. Sin marcas de agua ni restricciones de tamaño.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Totalmente Privado y Seguro</h3>
                                    <p className="text-sm text-text/70">Tus archivos se procesan localmente en tu navegador. Nunca se suben a ningún servidor externo, garantizando tu privacidad total.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Rápido y Fácil de Usar</h3>
                                    <p className="text-sm text-text/70">Divide tu PDF en segundos con solo arrastrar y soltar. Interfaz intuitiva y sin complicaciones.</p>
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
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo dividir un PDF en 3 pasos</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Selecciona tu archivo PDF</h3>
                                <p className="text-text/70">Haz clic en el área de carga o arrastra el archivo PDF que quieres dividir. La herramienta detectará automáticamente el número de páginas.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Divide el PDF</h3>
                                <p className="text-text/70">Haz clic en "Dividir PDF" y espera unos segundos. Cada página se convertirá en un archivo PDF individual.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Descarga las páginas</h3>
                                <p className="text-text/70">Descarga las páginas que necesites individualmente o todas a la vez con un solo clic.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Casos de uso para dividir PDF</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📄</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Extraer páginas específicas</h3>
                                    <p className="text-sm text-text/70">Separa solo las páginas que necesitas de un documento largo para compartir o imprimir.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📚</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Organizar documentos</h3>
                                    <p className="text-sm text-text/70">Divide documentos grandes en archivos más pequeños y manejables para mejor organización.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">✉️</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Compartir por email</h3>
                                    <p className="text-sm text-text/70">Envía páginas individuales por correo cuando el archivo completo es demasiado grande.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">🎓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Material educativo</h3>
                                    <p className="text-sm text-text/70">Separa capítulos o secciones de libros y apuntes para distribuir a estudiantes.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">💼</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Documentos empresariales</h3>
                                    <p className="text-sm text-text/70">Divide contratos, informes o presentaciones para revisión departamental.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">🖨️</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Impresión selectiva</h3>
                                    <p className="text-sm text-text/70">Imprime solo las páginas necesarias sin tener que configurar rangos complejos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Es realmente gratis dividir PDF con esta herramienta?</h3>
                            <p className="text-text/70">Sí, nuestra herramienta para dividir PDF es 100% gratuita. No hay costos ocultos, no necesitas registrarte y no hay límites en el número de archivos que puedes procesar.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Cuántas páginas puede tener el PDF?</h3>
                            <p className="text-text/70">No hay límite en el número de páginas. Puedes dividir PDFs de 2, 10, 100 o más páginas. Cada página se convertirá en un archivo PDF individual.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Mis archivos están seguros?</h3>
                            <p className="text-text/70">Absolutamente. Todos tus archivos se procesan localmente en tu navegador usando tecnología WebAssembly. Nunca se suben a nuestros servidores ni a ningún servidor externo, garantizando tu privacidad total.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Funciona en móviles y tablets?</h3>
                            <p className="text-text/70">Sí, puedes dividir PDF online desde cualquier dispositivo: ordenador, móvil Android, iPhone o iPad. Solo necesitas un navegador web moderno.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Se pierde calidad al dividir el PDF?</h3>
                            <p className="text-text/70">No, la calidad original de tus documentos se mantiene intacta. No hay compresión ni pérdida de datos al separar las páginas.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Necesito instalar algún programa?</h3>
                            <p className="text-text/70">No, esta es una herramienta online que funciona directamente en tu navegador. No necesitas descargar ni instalar ningún software como Adobe Acrobat.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo dividir PDF protegidos con contraseña?</h3>
                            <p className="text-text/70">Si el PDF está protegido con contraseña para abrirlo, primero deberás desbloquearlo. Si solo tiene restricciones de edición, generalmente podrás dividirlo sin problemas.</p>
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo elegir qué páginas extraer?</h3>
                            <p className="text-text/70">Actualmente, la herramienta divide el PDF en todas sus páginas individuales. Luego puedes descargar solo las páginas que necesites de la lista de resultados.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Dividir PDF Online: La Solución Más Completa y Segura</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-4">
                        <p>
                            Cuando necesitas <strong>dividir PDF gratis</strong>, nuestra herramienta es la opción perfecta. Ya sea que necesites <strong>separar PDF por páginas</strong> o extraer páginas específicas de un documento, nuestro <strong>divisor de PDF</strong> online te permite hacerlo de forma rápida, segura y completamente gratuita.
                        </p>
                        <p>
                            A diferencia de otras herramientas que requieren subir tus archivos a servidores externos, nuestra aplicación procesa todo localmente en tu navegador. Esto significa que cuando usas nuestra herramienta para <strong>separar PDF gratis</strong>, tus documentos nunca salen de tu dispositivo, garantizando la máxima privacidad y seguridad para información confidencial.
                        </p>
                        <p>
                            Ya sea que necesites <strong>dividir PDF online gratis</strong> para trabajo, estudios o uso personal, nuestra herramienta te ofrece una experiencia sin complicaciones. Sin límites de tamaño, sin marcas de agua, sin registro y sin costos ocultos. Simplemente selecciona tu archivo, divídelo en páginas individuales y descarga las que necesites en segundos.
                        </p>
                        <p>
                            Nuestra herramienta para <strong>dividir archivo PDF</strong> es compatible con todos los navegadores modernos y dispositivos, permitiéndote <strong>separar hojas PDF</strong> desde cualquier lugar y en cualquier momento. La interfaz intuitiva hace que el proceso sea tan simple que cualquiera puede usarla, sin necesidad de conocimientos técnicos ni software costoso como Adobe Acrobat Pro.
                        </p>
                        <p>
                            Además de dividir PDFs, también puedes usar nuestras otras herramientas gratuitas para <strong>unir PDF</strong>, <strong>convertir imágenes a PDF</strong> o <strong>proteger PDF con contraseña</strong>. Todas nuestras herramientas PDF funcionan 100% en tu navegador, garantizando tu privacidad y seguridad en todo momento.
                        </p>
                    </div>
                </section>

                {/* Tips Section */}
                <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-text mb-6">💡 Consejos para dividir PDFs eficientemente</h2>
                    <div className="space-y-4">
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Verifica el archivo antes de dividir</h3>
                            <p className="text-sm text-text/70">Asegúrate de que el PDF se abre correctamente y tiene el número de páginas esperado antes de procesarlo.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Organiza tus descargas</h3>
                            <p className="text-sm text-text/70">Crea una carpeta específica antes de descargar todas las páginas para mantener tus archivos organizados.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Renombra los archivos</h3>
                            <p className="text-sm text-text/70">Los archivos se descargan con nombres genéricos. Considera renombrarlos con nombres descriptivos para facilitar su identificación.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Combina con otras herramientas</h3>
                            <p className="text-sm text-text/70">Después de dividir, puedes usar nuestra herramienta "Unir PDF" para recombinar páginas específicas en un nuevo orden.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
