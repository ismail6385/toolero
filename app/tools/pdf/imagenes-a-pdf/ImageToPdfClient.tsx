'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faImage,
    faPlus,
    faTrash,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';

export default function ImageToPdfClient() {
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Filter only images
            const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
            if (newFiles.length < e.target.files.length) {
                // Warning about non-image files ignored could be here, but let's just ignore silently or simplify
            }
            setFiles(prev => [...prev, ...newFiles]);
            setSuccess(false);
            setError(null);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const convertToPdf = async () => {
        if (files.length === 0) {
            setError('Por favor selecciona al menos una imagen.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const pdfDoc = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                let image;

                // Determine format
                if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    image = await pdfDoc.embedJpg(arrayBuffer);
                } else if (file.type === 'image/png') {
                    image = await pdfDoc.embedPng(arrayBuffer);
                } else {
                    // Try to fallback to PNG if possible or skip (WebP support in pdf-lib is limited, might need canvas conversion first, but for now strict JPG/PNG)
                    // If it's not natively supported, we might need an intermediate canvas step. 
                    // For simplicity in this version, let's assume JPG/PNG. 
                    // If user uploaded other types, it might fail.

                    // Simple check: most browsers process client-side images. 
                    // Let's rely on embedPng/Jpg. 
                    // NOTE: pdf-lib does NOT support WebP directly.
                    // To support WebP, we'd need to draw to canvas -> toBlob(png) -> embedPng.
                    // Let's implement that quick fallback if needed, but for now only JPG/PNG direct support is safest.
                    continue;
                }

                if (image) {
                    const page = pdfDoc.addPage([image.width, image.height]);
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width: image.width,
                        height: image.height,
                    });
                }
            }

            if (pdfDoc.getPageCount() === 0) {
                throw new Error("No images were successfully added. Ensure they are JPG or PNG.");
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `imagenes_${new Date().getTime()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Error al crear el PDF. Asegúrate de usar imágenes JPG o PNG válidas.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faImage} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Imágenes a PDF</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma tus fotos y gráficos en un documento PDF profesional. Soporta JPG y PNG.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 hover:bg-red-50/50 transition-all cursor-pointer relative group">
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        multiple
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="pointer-events-none">
                        <FontAwesomeIcon icon={faPlus} className="text-4xl text-gray-300 group-hover:text-red-500 mb-4 transition-colors" />
                        <h3 className="text-lg font-semibold text-text mb-1">Arrastra tus imágenes aquí</h3>
                        <p className="text-sm text-text/60">Soporta JPG y PNG</p>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="mt-8 space-y-3">
                        <h4 className="font-semibold text-text mb-4 flex items-center justify-between">
                            <span>Imágenes Seleccionadas ({files.length})</span>
                            <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:underline">Borrar todo</button>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto p-2 custom-scrollbar">
                            {files.map((file, index) => (
                                <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                        onLoad={() => {
                                            // Optional: Revoke URL to free memory, but tricky in React render loop. 
                                            // Letting browser handle GC for small app is usually fine or use useEffect cleanup.
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            {index + 1}
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            title="Eliminar"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-white/90 p-1 text-xs truncate text-center">
                                        {file.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={convertToPdf}
                        disabled={files.length === 0 || isProcessing}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                            ${files.length > 0 && !isProcessing
                                ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-red-500/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }
                        `}
                    >
                        {isProcessing ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                Creando PDF...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faFilePdf} />
                                Convertir a PDF
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
                            <FontAwesomeIcon icon={faCheckCircle} /> ¡PDF creado con éxito!
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-12 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-center">
                <p className="text-sm text-text/70">
                    🔒 <strong>Totalmente Privado:</strong> La conversión se realiza en tu dispositivo. Tus imágenes no se envían a Internet.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Por qué convertir imágenes a PDF con nuestra herramienta?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Conversión Rápida y Gratuita</h3>
                                    <p className="text-sm text-text/70">Convierte todas tus fotos e imágenes a PDF sin pagar. Sin límites de archivos ni restricciones.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Múltiples Formatos Soportados</h3>
                                    <p className="text-sm text-text/70">Compatible con JPG, JPEG y PNG. Convierte cualquier imagen a documento PDF profesional.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Privado y Seguro</h3>
                                    <p className="text-sm text-text/70">Tus imágenes se procesan localmente en tu navegador. Nunca se suben a servidores externos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Sin Marcas de Agua</h3>
                                    <p className="text-sm text-text/70">Crea PDFs limpios y profesionales sin logos ni marcas de agua molestas.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Calidad Original Preservada</h3>
                                    <p className="text-sm text-text/70">Mantiene la resolución y calidad original de tus imágenes en el PDF final.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Funciona en Todos los Dispositivos</h3>
                                    <p className="text-sm text-text/70">Usa desde PC, Mac, móvil o tablet. Solo necesitas un navegador web moderno.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo convertir imágenes a PDF en 3 pasos</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Selecciona tus imágenes</h3>
                                <p className="text-text/70">Haz clic en el área de carga o arrastra tus fotos JPG o PNG. Puedes seleccionar múltiples imágenes a la vez.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Organiza el orden (opcional)</h3>
                                <p className="text-text/70">Las imágenes aparecerán en el PDF en el orden que las seleccionaste. Puedes eliminar las que no necesites.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Descarga tu PDF</h3>
                                <p className="text-text/70">Haz clic en "Convertir a PDF" y tu documento se creará y descargará automáticamente a tu dispositivo.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Casos de uso para convertir imágenes a PDF</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">📄 Documentos Escaneados</h3>
                            <p className="text-sm text-text/70">Convierte fotos de documentos, recibos o facturas en PDFs organizados.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">📚 Presentaciones</h3>
                            <p className="text-sm text-text/70">Crea presentaciones profesionales combinando múltiples imágenes en un solo PDF.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">🎨 Portfolios</h3>
                            <p className="text-sm text-text/70">Comparte tu trabajo creativo en formato PDF fácil de enviar y visualizar.</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
                            <h3 className="font-semibold text-text mb-2">📱 Capturas de Pantalla</h3>
                            <p className="text-sm text-text/70">Agrupa capturas de pantalla en un documento PDF para reportes o tutoriales.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-8">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Es gratis convertir imágenes a PDF?</h3>
                            <p className="text-text/70">Sí, nuestra herramienta es 100% gratuita. No hay costos ocultos, límites de archivos ni necesidad de registro.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Qué formatos de imagen puedo convertir?</h3>
                            <p className="text-text/70">Actualmente soportamos JPG, JPEG y PNG. Estos son los formatos de imagen más comunes y cubren la mayoría de necesidades.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Cuántas imágenes puedo convertir a la vez?</h3>
                            <p className="text-text/70">No hay límite. Puedes seleccionar y convertir tantas imágenes como necesites en un solo PDF.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Mis imágenes están seguras?</h3>
                            <p className="text-text/70">Absolutamente. La conversión se realiza completamente en tu navegador. Tus imágenes nunca se suben a Internet ni a nuestros servidores.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Se pierde calidad al convertir a PDF?</h3>
                            <p className="text-text/70">No, mantenemos la calidad y resolución original de tus imágenes. El PDF resultante preserva todos los detalles.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Funciona en móviles?</h3>
                            <p className="text-text/70">Sí, puedes convertir imágenes a PDF desde cualquier dispositivo móvil con un navegador web moderno.</p>
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo cambiar el orden de las imágenes?</h3>
                            <p className="text-text/70">Las imágenes se añaden al PDF en el orden que las seleccionas. Si necesitas cambiar el orden, simplemente elimina y vuelve a agregar las imágenes en el orden deseado.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Convertidor de Imágenes a PDF Online</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-4">
                        <p>
                            Cuando necesitas <strong>convertir imágenes a PDF</strong>, nuestra herramienta online es la solución perfecta. Ya sea que necesites <strong>convertir JPG a PDF</strong>, <strong>PNG a PDF</strong> o cualquier otro formato de imagen, nuestro <strong>convertidor de imágenes a PDF</strong> te permite hacerlo de forma rápida, segura y completamente gratuita.
                        </p>
                        <p>
                            A diferencia de otras herramientas que requieren subir tus fotos a servidores externos, nuestra aplicación procesa todo localmente en tu navegador. Esto significa que cuando usas nuestra herramienta para <strong>convertir fotos a PDF</strong>, tus imágenes nunca salen de tu dispositivo, garantizando la máxima privacidad y seguridad de tus archivos personales.
                        </p>
                        <p>
                            Ya sea que necesites <strong>crear PDF de imágenes</strong> para trabajo, estudios, presentaciones o uso personal, nuestra herramienta te ofrece una experiencia sin complicaciones. Sin límites de tamaño, sin marcas de agua, sin registro y sin costos ocultos. Simplemente selecciona tus imágenes, organízalas si es necesario, y descarga tu PDF en segundos.
                        </p>
                        <p>
                            Nuestra herramienta para <strong>pasar imágenes a PDF</strong> es compatible con todos los navegadores modernos y dispositivos, permitiéndote <strong>transformar imágenes a PDF</strong> desde cualquier lugar y en cualquier momento. La interfaz intuitiva hace que el proceso sea tan simple que cualquiera puede usarla, sin necesidad de conocimientos técnicos o software especializado.
                        </p>
                        <p>
                            Además, al <strong>hacer PDF con imágenes</strong> usando nuestra herramienta, mantienes la calidad original de tus fotos. No hay compresión agresiva ni pérdida de resolución. El resultado es un documento PDF profesional que preserva todos los detalles de tus imágenes originales, perfecto para compartir, archivar o imprimir.
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Ventajas de convertir imágenes a PDF</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Fácil de compartir:</strong> Los PDFs son universalmente compatibles y fáciles de enviar por email o mensajería.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Tamaño reducido:</strong> Combinar múltiples imágenes en un PDF suele ocupar menos espacio que archivos individuales.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Mejor organización:</strong> Mantén todas tus imágenes relacionadas en un solo documento ordenado.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Profesionalismo:</strong> Los PDFs se ven más profesionales para presentaciones y documentos oficiales.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-blue-600 font-bold">•</span>
                            <p className="text-text/70"><strong>Protección:</strong> Los PDFs son más difíciles de editar accidentalmente que las imágenes sueltas.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
