'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileWord,
    faUpload,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle,
    faTrash,
    faFilePdf,
    faMagic
} from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';

export default function PdfToWordClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [convertedContent, setConvertedContent] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pdfJsLoaded, setPdfJsLoaded] = useState(false);

    // References to window.pdfjsLib
    const pdfJsLibRef = useRef<any>(null);

    useEffect(() => {
        // Fallback check in case onLoad doesn't fire or script matches
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

    const handlePdfJsLoad = () => {
        // @ts-ignore
        if (window.pdfjsLib) {
            // @ts-ignore
            pdfJsLibRef.current = window.pdfjsLib;
            // @ts-ignore
            pdfJsLibRef.current.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            setPdfJsLoaded(true);
        }
    };

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
            setConvertedContent(null);
            setPageCount(0);
        }
    };

    const convertToWord = async () => {
        if (!file || !pdfJsLoaded) return;

        setIsProcessing(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            // @ts-ignore
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPageCount(pdf.numPages);

            let docContent = '';

            // Iterate through every page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                // Basic structural reconstruction
                let lastY = -1;
                let pageText = '';

                textContent.items.forEach((item: any) => {
                    const str = item.str;
                    const transform = item.transform; // [scaleX, skewY, skewX, scaleY, x, y]
                    const y = transform[5]; // Y position

                    if (lastY !== -1 && Math.abs(y - lastY) > 10) {
                        // New line detection based on Y coordinate difference
                        pageText += '<br/><br/>';
                    } else if (lastY !== -1 && Math.abs(y - lastY) > 2) {
                        pageText += ' '; // Space for small differences
                    }

                    pageText += str;
                    lastY = y;
                });

                // Wrap in paragraph for Word
                docContent += `<p>${pageText}</p><br clear="all" style="page-break-before:always" />`;
            }

            // Create a full HTML document that Word can interpret
            const fullHtml = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset="utf-8">
                    <title>${file.name}</title>
                    <style>
                        body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; }
                        p { margin-bottom: 10pt; line-height: 1.15; }
                    </style>
                </head>
                <body>
                    ${docContent}
                </body>
                </html>
            `;

            setConvertedContent(fullHtml);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Error al convertir el PDF. Puede que el archivo esté corrupto o protegido.');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadWord = () => {
        if (!convertedContent || !file) return;

        const blob = new Blob([convertedContent], { type: 'application/msword;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.replace('.pdf', '') + '.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setFile(null);
        setSuccess(false);
        setConvertedContent(null);
        setError(null);
        setPageCount(0);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
                onLoad={handlePdfJsLoad}
                strategy="afterInteractive"
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                    <FontAwesomeIcon icon={faFileWord} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Convertir PDF a Word</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma tus documentos PDF a formato Word (.doc) editable. Rápido, preciso y 100% gratuito.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                {!file && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="pointer-events-none">
                            <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-300 group-hover:text-blue-500 mb-4 transition-colors" />
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
                                Cargando motor de conversión...
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
                                ¡Conversión Completada!
                            </h3>
                            <button onClick={reset} className="text-sm text-blue-500 hover:underline">
                                Convertir otro archivo
                            </button>
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                            <div className="mb-4">
                                <span className="inline-block p-3 bg-white rounded-full shadow-sm text-blue-600 mb-2">
                                    <FontAwesomeIcon icon={faFileWord} className="text-2xl" />
                                </span>
                                <p className="text-sm text-green-800">
                                    Tu documento <strong>{file?.name.replace('.pdf', '.doc')}</strong> está listo.
                                </p>
                            </div>
                            <button
                                onClick={downloadWord}
                                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar Word
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {file && !success && (
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            onClick={convertToWord}
                            disabled={!file || !pdfJsLoaded || isProcessing}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                                ${file && pdfJsLoaded && !isProcessing
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-blue-500/30'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            {isProcessing ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                    Convirtiendo...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faMagic} />
                                    Convertir a Word
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
                    🔒 <strong>Seguridad Garantizada:</strong> La conversión se realiza 100% en tu navegador. Tu archivo PDF nunca se sube a Internet, manteniendo tus datos totalmente privados.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Convierte PDF a Word Editable Gratis</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-blue-500 text-xl">✨</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Conversión Precisa</h3>
                                    <p className="text-sm text-text/70">Nuestro convertidor extrae el texto de tu PDF manteniendo los párrafos para que puedas editarlo fácilmente en Microsoft Word.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-blue-500 text-xl">🚀</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Rápido y Sin Esperas</h3>
                                    <p className="text-sm text-text/70">Convierte tus documentos en segundos. No necesitas registrarte ni esperar correos electrónicos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-blue-500 text-xl">🛡️</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Seguro y Privado</h3>
                                    <p className="text-sm text-text/70">Todo el proceso ocurre en tu dispositivo. Tus archivos nunca salen de tu ordenador, ideal para documentos confidenciales.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-blue-500 text-xl">💻</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Compatible Universalmente</h3>
                                    <p className="text-sm text-text/70">Funciona en Windows, Mac, Linux, Android y iPhone. Solo necesitas un navegador web moderno.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo convertir PDF a Word</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">1</span>
                            <p className="text-text font-medium">Sube tu archivo PDF arrastrándolo a la zona de carga.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">2</span>
                            <p className="text-text font-medium">Haz clic en el botón "Convertir a Word" y espera unos segundos.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold">3</span>
                            <p className="text-text font-medium">¡Listo! Descarga tu nuevo documento Word editable (.doc).</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Es editable el archivo Word resultante?</h3>
                            <p className="text-sm text-text/70">Sí, el archivo generado es un documento de Word (.doc) que puedes abrir y editar en Microsoft Word, Google Docs o LibreOffice. Podrás modificar el texto, cambiar fuentes y formatos libremente.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Se mantienen las imágenes del PDF?</h3>
                            <p className="text-sm text-text/70">Nuestra herramienta se enfoca principalmente en la extracción de texto para asegurar la editabilidad. Las imágenes complejas pueden no transferirse perfectamente en la versión actual rápida, pero el texto y los párrafos sí se conservan.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Tiene algún costo?</h3>
                            <p className="text-sm text-text/70">No, esta herramienta es totalmente gratuita. Puedes convertir tantos archivos como necesites sin pagar nada ni ver marcas de agua.</p>
                        </div>
                        <div className="pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Puedo convertir PDFs escaneados?</h3>
                            <p className="text-sm text-text/70">Si el PDF es una imagen escaneada (sin texto seleccionable), necesitarías una herramienta con OCR (Reconocimiento Óptico de Caracteres). Esta herramienta funciona mejor con PDFs que contienen texto digital real.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
