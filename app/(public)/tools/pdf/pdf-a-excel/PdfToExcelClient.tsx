'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileExcel,
    faUpload,
    faDownload,
    faSpinner,
    faCheckCircle,
    faExclamationCircle,
    faTrash,
    faFilePdf,
    faTable,
    faMagic
} from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';

export default function PdfToExcelClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [excelBlob, setExcelBlob] = useState<Blob | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [libsLoaded, setLibsLoaded] = useState({ pdf: false, xlsx: false });

    const pdfJsLibRef = useRef<any>(null);

    // Initial check for libraries
    useEffect(() => {
        const checkLibs = setInterval(() => {
            const pdfLoaded = !!(window as any).pdfjsLib;
            const xlsxLoaded = !!(window as any).XLSX;

            if (pdfLoaded && !pdfJsLibRef.current) {
                // @ts-ignore
                pdfJsLibRef.current = window.pdfjsLib;
                // @ts-ignore
                pdfJsLibRef.current.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            }

            setLibsLoaded({ pdf: pdfLoaded, xlsx: xlsxLoaded });

            if (pdfLoaded && xlsxLoaded) {
                clearInterval(checkLibs);
            }
        }, 500);

        return () => clearInterval(checkLibs);
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
            setExcelBlob(null);
            setPageCount(0);
        }
    };

    const convertToExcel = async () => {
        if (!file || !libsLoaded.pdf || !libsLoaded.xlsx) return;

        setIsProcessing(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            // @ts-ignore
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPageCount(pdf.numPages);

            const wb = (window as any).XLSX.utils.book_new();

            // Iterate through every page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                // Group items by Y coordinate (rows)
                const rows: { [key: number]: any[] } = {};

                textContent.items.forEach((item: any) => {
                    // Use Math.floor to group slightly misaligned items into the same row
                    // In PDF, Y coordinates start from bottom, so we invert to sort easily
                    const y = Math.floor(10000 - item.transform[5]);

                    if (!rows[y]) rows[y] = [];
                    rows[y].push({
                        str: item.str,
                        x: item.transform[4] // X position
                    });
                });

                // Convert grouped rows to array of arrays
                const rowKeys = Object.keys(rows).sort((a, b) => Number(a) - Number(b));
                const sheetData = rowKeys.map(key => {
                    const rowItems = rows[Number(key)];
                    // Sort items in row by X position
                    rowItems.sort((a: any, b: any) => a.x - b.x);
                    return rowItems.map((item: any) => item.str);
                });

                // Create worksheet
                const ws = (window as any).XLSX.utils.aoa_to_sheet(sheetData);
                (window as any).XLSX.utils.book_append_sheet(wb, ws, `Página ${i}`);
            }

            // Generate Excel file
            const wbout = (window as any).XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            setExcelBlob(blob);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Error al convertir el PDF a Excel. Intenta con otro archivo.');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadExcel = () => {
        if (!excelBlob || !file) return;

        const url = URL.createObjectURL(excelBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.replace('.pdf', '') + '.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setFile(null);
        setSuccess(false);
        setExcelBlob(null);
        setError(null);
        setPageCount(0);
    };

    const areLibsReady = libsLoaded.pdf && libsLoaded.xlsx;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
                strategy="afterInteractive"
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4 text-green-600">
                    <FontAwesomeIcon icon={faFileExcel} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Convertir PDF a Excel</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma tablas y datos de PDF a hojas de cálculo Excel (.xlsx) editables. Rápido, preciso y sin registro.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                {/* Upload Area */}
                {!file && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition-all cursor-pointer relative group">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="pointer-events-none">
                            <FontAwesomeIcon icon={faUpload} className="text-4xl text-gray-300 group-hover:text-green-500 mb-4 transition-colors" />
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

                        {!areLibsReady && (
                            <div className="text-center text-sm text-text/60">
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                Preparando motor de conversión...
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
                                <span className="inline-block p-3 bg-white rounded-full shadow-sm text-green-600 mb-2">
                                    <FontAwesomeIcon icon={faFileExcel} className="text-2xl" />
                                </span>
                                <p className="text-sm text-green-800">
                                    Tu hoja de cálculo <strong>{file?.name.replace('.pdf', '.xlsx')}</strong> está lista.
                                </p>
                            </div>
                            <button
                                onClick={downloadExcel}
                                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar Excel
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {file && !success && (
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            onClick={convertToExcel}
                            disabled={!file || !areLibsReady || isProcessing}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center gap-3 transition-all
                                ${file && areLibsReady && !isProcessing
                                    ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 hover:shadow-green-500/30'
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
                                    Convertir a Excel
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
                    🔒 <strong>Seguridad Garantizada:</strong> La conversión a Excel se realiza 100% en tu navegador. Tus datos financieros o tablas nunca se suben a ningún servidor.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Convierte Tablas PDF a Excel Gratis</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-green-500 text-xl">📊</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Detección Inteligente de Tablas</h3>
                                    <p className="text-sm text-text/70">Nuestro algoritmo detecta la estructura de filas y columnas en tu PDF para recrear las tablas fielmente en Excel.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-green-500 text-xl">⚡</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Conversión Rápida</h3>
                                    <p className="text-sm text-text/70">Procesa documentos con múltiples páginas en segundos. Cada página del PDF se convierte en una hoja separada de Excel o se consolida.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-green-500 text-xl">🔒</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Privacidad Total</h3>
                                    <p className="text-sm text-text/70">Procesamiento local seguro. Ideal para extractos bancarios, facturas y reportes financieros confidenciales.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-green-500 text-xl">📱</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Sin Instalaciones</h3>
                                    <p className="text-sm text-text/70">No necesitas instalar Office ni software pesado. Funciona directamente en tu navegador web.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo pasar de PDF a Excel</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-bold">1</span>
                            <p className="text-text font-medium">Sube tu archivo PDF con tablas o datos.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-bold">2</span>
                            <p className="text-text font-medium">Haz clic en "Convertir a Excel" y nuestro motor inteligente procesará los datos.</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/60 p-4 rounded-xl">
                            <span className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full font-bold">3</span>
                            <p className="text-text font-medium">Descarga tu archivo .xlsx listo para editar en Microsoft Excel o Google Sheets.</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Cómo se manejan las múltiples páginas?</h3>
                            <p className="text-sm text-text/70">Nuestra herramienta crea una nueva hoja en el archivo Excel para cada página de tu documento PDF, manteniendo tus datos organizados tal como aparecen en el original.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Funciona con extractos bancarios?</h3>
                            <p className="text-sm text-text/70">Sí, es excelente para tablas estructuradas como extractos bancarios. Al ser un proceso local, tus datos financieros permanecen seguros en tu dispositivo.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Qué pasa con el formato?</h3>
                            <p className="text-sm text-text/70">La herramienta intenta preservar la alineación de filas y columnas. Los colores y estilos complejos pueden simplificarse para asegurar que los datos sean limpiamente editables en Excel.</p>
                        </div>
                        <div className="pb-4">
                            <h3 className="font-semibold text-text mb-2">¿Es gratuito?</h3>
                            <p className="text-sm text-text/70">Sí, la conversión de PDF a Excel es 100% gratuita y sin límites de uso.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
