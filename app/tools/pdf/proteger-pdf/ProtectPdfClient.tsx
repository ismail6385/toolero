'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faFilePdf, faDownload, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { PDFDocument } from 'pdf-lib';

export default function ProtectPdfClient() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [protectedPdfUrl, setProtectedPdfUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type === 'application/pdf') {
                setFile(e.target.files[0]);
                setProtectedPdfUrl(null);
            } else {
                alert('Por favor selecciona un archivo PDF válido.');
            }
        }
    };

    const protectPdf = async () => {
        if (!file || !password) return;

        setIsProcessing(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // Encrypt
            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password, // Same for simplicity, usually owner has full rights
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                },
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setProtectedPdfUrl(url);
        } catch (error) {
            console.error(error);
            alert('Error al proteger el PDF. Puede que el archivo esté dañado o ya tenga contraseña.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Proteger PDF</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Encripta tus documentos PDF con contraseña. 100% Client-side.
                </p>
            </div>

            <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12 mb-8 text-center">

                {!file ? (
                    <div className="border-4 border-dashed border-gray-200 rounded-3xl p-12 hover:bg-gray-50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faFilePdf} className="text-4xl text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-text">Selecciona tu archivo PDF</h3>
                            <p className="text-text/50">o arrastra y suelta aquí</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                            <FontAwesomeIcon icon={faFilePdf} className="text-3xl text-red-500" />
                        </div>
                        <div className="text-lg font-bold text-text">{file.name}</div>
                        <button
                            onClick={() => { setFile(null); setProtectedPdfUrl(null); }}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Cambiar archivo
                        </button>
                    </div>
                )}

                {file && !protectedPdfUrl && (
                    <div className="mt-8 max-w-md mx-auto">
                        <label className="block text-sm font-bold text-text mb-2 text-left">Contraseña de Protección</label>
                        <div className="relative mb-6">
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 outline-none"
                                placeholder="Ingresa una contraseña segura"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>

                        <button
                            onClick={protectPdf}
                            disabled={!password || isProcessing}
                            className={`w-full py-4 bg-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 ${(!password || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isProcessing ? (
                                <span>Procesando...</span>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faShieldAlt} /> Proteger PDF
                                </>
                            )}
                        </button>
                    </div>
                )}

                {protectedPdfUrl && (
                    <div className="mt-8 animate-fade-in-up">
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-200 mb-6 flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <h3 className="text-lg font-bold text-green-800">¡PDF Protegido con éxito!</h3>
                        </div>

                        <a
                            href={protectedPdfUrl}
                            download={`protected_${file?.name}`}
                            className="inline-flex py-4 px-8 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-xl hover:bg-black hover:scale-105 transition-all items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faDownload} /> Descargar PDF Protegido
                        </a>
                    </div>
                )}

            </div>
        </div>
    );
}
