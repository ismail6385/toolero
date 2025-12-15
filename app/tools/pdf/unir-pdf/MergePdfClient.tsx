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
        </div>
    );
}
