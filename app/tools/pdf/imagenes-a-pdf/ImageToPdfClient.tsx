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
        </div>
    );
}
