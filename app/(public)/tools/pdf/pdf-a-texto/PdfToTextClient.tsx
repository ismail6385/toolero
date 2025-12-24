'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileAlt,
    faUpload,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle,
    faTrash,
    faFilePdf,
    faCopy,
    faMagic
} from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';
import toast, { Toaster } from 'react-hot-toast';

export default function PdfToTextClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [pdfJsLoaded, setPdfJsLoaded] = useState(false);

    const pdfJsLibRef = useRef<any>(null);

    // Initial check for libraries
    useEffect(() => {
        const checkPdfJs = setInterval(() => {
            // @ts-ignore
            if (window.pdfjsLib) {
                // @ts-ignore
                pdfJsLibRef.current = window.pdfjsLib;
                // @ts-ignore
                pdfJsLibRef.current.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                setPdfJsLoaded(true);
                clearInterval(checkPdfJs);
            }
        }, 500);

        return () => clearInterval(checkPdfJs);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type !== 'application/pdf') {
                setError('Por favor sube un archivo PDF válido.');
                return;
            }
            setFile(selectedFile);
            setSuccess(false);
            setError(null);
            setExtractedText('');
        }
    };

    const convertToText = async () => {
        if (!file || !pdfJsLoaded) return;

        setIsProcessing(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            // @ts-ignore
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';

            // Iterate through every page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                // Add page separator if it's not the first page
                if (i > 1) {
                    fullText += '\n\n--- Página ' + i + ' ---\n\n';
                }

                // Process items
                let lastY = -1;
                textContent.items.forEach((item: any) => {
                    const str = item.str;
                    const transform = item.transform;
                    const y = transform[5];

                    if (lastY !== -1 && Math.abs(y - lastY) > 10) {
                        fullText += '\n';
                    } else if (lastY !== -1 && Math.abs(y - lastY) > 2) {
                        fullText += ' ';
                    }

                    fullText += str;
                    lastY = y;
                });
            }

            if (!fullText.trim()) {
                throw new Error('No se pudo extraer texto. El PDF podría ser una imagen escaneada.');
            }

            setExtractedText(fullText);
            setSuccess(true);
            toast.success('¡Texto extraído correctamente!');
        } catch (err) {
            console.error(err);
            setError('Error al extraer texto. El PDF podría estar protegido o ser una imagen escaneada (requiere OCR).');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadText = () => {
        if (!extractedText || !file) return;

        const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.replace('.pdf', '') + '.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText);
        toast.success('¡Texto copiado al portapapeles!');
    };

    const reset = () => {
        setFile(null);
        setSuccess(false);
        setExtractedText('');
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Toaster position="bottom-center" />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
                strategy="afterInteractive"
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4 text-gray-600">
                    <FontAwesomeIcon icon={faFileAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Convertir PDF a Texto</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Extrae todo el contenido de texto de archivos PDF. Ideal para copiar, editar o analizar contenido.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                {!file && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-500 hover:bg-gray-50/50 transition-all cursor-pointer relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="pointer-events-none">
                            <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-300 group-hover:text-gray-500 mb-4 transition-colors" />
                            <h3 className="text-lg font-semibold text-text mb-1">Arrastra tu PDF aquí</h3>
                            <p className="text-sm text-text/60">o haz clic para seleccionar (Máx 50MB)</p>
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
                                    <p className="text-xs text-text/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button onClick={reset} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>

                        {!pdfJsLoaded && (
                            <div className="text-center text-sm text-text/60">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                Preparando motor de extracción...
                            </div>
                        )}
                    </div>
                )}

                {/* Success State */}
                {success && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-text flex items-center gap-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                                ¡Texto Extraído!
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-blue-50 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faCopy} /> Copiar
                                </button>
                                <button onClick={reset} className="text-sm text-blue-500 hover:underline px-2">
                                    Otro archivo
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-text/80 h-64 overflow-y-auto whitespace-pre-wrap">
                            {extractedText}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={downloadText}
                                className="px-8 py-3 bg-gray-800 text-white rounded-xl font-bold shadow-lg hover:bg-gray-900 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar .txt
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {file && !success && (
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            onClick={convertToText}
                            disabled={!file || !pdfJsLoaded || isProcessing}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                                ${file && pdfJsLoaded && !isProcessing
                                    ? 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105 hover:shadow-gray-500/30'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {isProcessing ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    Extrayendo Texto...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faMagic} />
                                    Extraer Texto
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
                    🔒 <strong>Seguridad Garantizada:</strong> La extracción de texto es 100% local en tu navegador. Tu archivo PDF nunca se sube a Internet.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Extraer Texto de PDF Gratis</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-gray-600 text-xl">📝</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Texto Plano Limpio</h3>
                                    <p className="text-sm text-text/70">Obtén el contenido de tu PDF en formato de texto plano (.txt) sin formato, ideal para reutilizar, editar o analizar datos.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-gray-600 text-xl">📋</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Copiar y Pegar</h3>
                                    <p className="text-sm text-text/70">Vista previa instantánea que te permite copiar todo el texto o secciones específicas al portapapeles con un solo clic.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-gray-600 text-xl">🚫</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Sin Registro</h3>
                                    <p className="text-sm text-text/70">Usa la herramienta tantas veces como quieras sin crear cuenta ni facilitar tu correo electrónico.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-gray-600 text-xl">💻</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Funciona en Todo</h3>
                                    <p className="text-sm text-text/70">Compatible con Windows, Mac, Linux, iOS y Android directamente desde tu navegador.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo convertir PDF a Texto</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full font-bold">1</span>
                            <p className="text-text font-medium">Sube el archivo PDF del que quieres extraer el texto.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full font-bold">2</span>
                            <p className="text-text font-medium">Haz clic en "Extraer Texto". El proceso tomará solo unos segundos.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full font-bold">3</span>
                            <p className="text-text font-medium">Copia el texto al portapapeles o descarga el archivo .txt completo.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Funciona con PDFs escaneados?</h3>
                            <p className="text-sm text-text/70">No, esta herramienta extrae texto digital. Si tu PDF es una imagen o escaneo, necesitarás un convertidor con OCR (Reconocimiento Óptico de Caracteres).</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Se mantiene el formato?</h3>
                            <p className="text-sm text-text/70">No, el objetivo es extraer el texto plano. Se eliminarán estilos, imágenes y diseños complejos para darte solo el contenido legible.</p>
                        </div>
                        <div className="pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Es seguro?</h3>
                            <p className="text-sm text-text/70">Sí, totalmente. El archivo se procesa en tu propio ordenador y nunca se envía a nuestros servidores.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
