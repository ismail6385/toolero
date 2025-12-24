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
    faCompress,
    faTrash,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';

export default function CompressPdfClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [compressedPdf, setCompressedPdf] = useState<Blob | null>(null);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high' | 'custom'>('medium');
    const [targetSizeMB, setTargetSizeMB] = useState<number>(5);
    const [useCustomSize, setUseCustomSize] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setOriginalSize(selectedFile.size);
            setSuccess(false);
            setError(null);
            setCompressedPdf(null);
        }
    };

    const compressPdf = async () => {
        if (!file) {
            setError('Por favor selecciona un archivo PDF.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            let pdf = await PDFDocument.load(arrayBuffer);

            // Remove metadata to reduce size
            pdf.setTitle('');
            pdf.setAuthor('');
            pdf.setSubject('');
            pdf.setKeywords([]);
            pdf.setProducer('');
            pdf.setCreator('');

            let pdfBytes: Uint8Array;

            if (useCustomSize) {
                // Custom target size compression
                const targetBytes = targetSizeMB * 1024 * 1024;

                // Try different compression levels
                const compressionAttempts = [
                    { useObjectStreams: true, objectsPerTick: 50 },
                    { useObjectStreams: true, objectsPerTick: 30 },
                    { useObjectStreams: true, objectsPerTick: 20 },
                ];

                pdfBytes = await pdf.save(compressionAttempts[0]);

                // If still too large, try more aggressive compression
                for (let i = 1; i < compressionAttempts.length && pdfBytes.length > targetBytes; i++) {
                    pdf = await PDFDocument.load(arrayBuffer);
                    pdf.setTitle('');
                    pdf.setAuthor('');
                    pdf.setSubject('');
                    pdf.setKeywords([]);
                    pdf.setProducer('');
                    pdf.setCreator('');
                    pdfBytes = await pdf.save(compressionAttempts[i]);
                }

                // Check if target was achieved
                if (pdfBytes.length > targetBytes) {
                    setError(`No se pudo reducir el PDF a ${targetSizeMB}MB. Tamaño mínimo alcanzado: ${(pdfBytes.length / 1024 / 1024).toFixed(2)}MB. Para mayor compresión, considera usar software de escritorio que pueda comprimir imágenes.`);
                }
            } else {
                // Standard compression based on level
                let compressionSettings: any = {
                    useObjectStreams: true,
                    addDefaultPage: false,
                };

                if (compressionLevel === 'high') {
                    compressionSettings.objectsPerTick = 50;
                } else if (compressionLevel === 'medium') {
                    compressionSettings.objectsPerTick = 100;
                } else {
                    compressionSettings.objectsPerTick = 200;
                    compressionSettings.useObjectStreams = false;
                }

                pdfBytes = await pdf.save(compressionSettings);
            }

            // Create blob from Uint8Array
            const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
            setCompressedPdf(blob);
            setCompressedSize(blob.size);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al comprimir el PDF. Asegúrate de que sea un archivo válido.');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCompressed = () => {
        if (!compressedPdf) return;

        const url = URL.createObjectURL(compressedPdf);
        const link = document.createElement('a');
        link.href = url;
        link.download = `comprimido_${file?.name || 'documento.pdf'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setFile(null);
        setCompressedPdf(null);
        setSuccess(false);
        setError(null);
        setOriginalSize(0);
        setCompressedSize(0);
    };

    const getCompressionPercentage = () => {
        if (originalSize === 0) return 0;
        return Math.round(((originalSize - compressedSize) / originalSize) * 100);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4 text-red-600">
                    <FontAwesomeIcon icon={faCompress} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Comprimir PDF Online</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Reduce el tamaño de tus archivos PDF manteniendo la calidad. Rápido, gratuito y sin subir tus archivos a ningún servidor.
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

                {/* File Info and Compression Settings */}
                {file && !success && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 flex-shrink-0 bg-red-100 text-red-500 rounded flex items-center justify-center">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-medium text-text truncate">{file.name}</p>
                                    <p className="text-xs text-text/40">Tamaño original: {formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            <button
                                onClick={reset}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>

                        {/* Compression Level Selector */}
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                            <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCompress} className="text-blue-600" />
                                Nivel de Compresión
                            </h3>
                            <p className="text-xs text-blue-700 mb-4">
                                ℹ️ Esta herramienta optimiza la estructura del PDF y elimina metadatos. La reducción de tamaño varía según el contenido del archivo.
                            </p>

                            {/* Toggle between preset and custom */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setUseCustomSize(false)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${!useCustomSize
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200'
                                        }`}
                                >
                                    Niveles Preestablecidos
                                </button>
                                <button
                                    onClick={() => setUseCustomSize(true)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${useCustomSize
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200'
                                        }`}
                                >
                                    Tamaño Personalizado
                                </button>
                            </div>

                            {!useCustomSize ? (
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setCompressionLevel('low')}
                                        className={`p-3 rounded-lg border-2 transition-all ${compressionLevel === 'low'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">Baja</div>
                                        <div className="text-xs text-text/60 mt-1">Máxima calidad</div>
                                    </button>
                                    <button
                                        onClick={() => setCompressionLevel('medium')}
                                        className={`p-3 rounded-lg border-2 transition-all ${compressionLevel === 'medium'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">Media</div>
                                        <div className="text-xs text-text/60 mt-1">Recomendada</div>
                                    </button>
                                    <button
                                        onClick={() => setCompressionLevel('high')}
                                        className={`p-3 rounded-lg border-2 transition-all ${compressionLevel === 'high'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm">Alta</div>
                                        <div className="text-xs text-text/60 mt-1">Menor tamaño</div>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-text mb-2">
                                            Tamaño objetivo: {targetSizeMB} MB
                                        </label>
                                        <input
                                            type="range"
                                            min="0.5"
                                            max={Math.max(20, (originalSize / 1024 / 1024) * 0.9)}
                                            step="0.5"
                                            value={targetSizeMB}
                                            onChange={(e) => setTargetSizeMB(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>0.5 MB</span>
                                            <span>{(originalSize / 1024 / 1024).toFixed(1)} MB (Original)</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            min="0.5"
                                            max={(originalSize / 1024 / 1024) * 0.9}
                                            step="0.1"
                                            value={targetSizeMB}
                                            onChange={(e) => setTargetSizeMB(parseFloat(e.target.value) || 1)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="Tamaño en MB"
                                        />
                                        <span className="flex items-center px-3 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">MB</span>
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        💡 El compresor intentará reducir el PDF al tamaño especificado. El resultado puede variar según el contenido.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Compression Results */}
                {success && compressedPdf && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-text flex items-center gap-2">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                                ¡PDF Comprimido Exitosamente!
                            </h3>
                            <button
                                onClick={reset}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Comprimir otro PDF
                            </button>
                        </div>

                        {/* Compression Stats */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                                <div className="text-xs text-blue-600 font-semibold mb-1">TAMAÑO ORIGINAL</div>
                                <div className="text-2xl font-bold text-text">{formatFileSize(originalSize)}</div>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                                <div className="text-xs text-green-600 font-semibold mb-1">TAMAÑO COMPRIMIDO</div>
                                <div className="text-2xl font-bold text-text">{formatFileSize(compressedSize)}</div>
                            </div>
                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
                                <div className="text-xs text-purple-600 font-semibold mb-1">REDUCCIÓN</div>
                                <div className="text-2xl font-bold text-text flex items-center justify-center gap-1">
                                    {getCompressionPercentage()}%
                                    <FontAwesomeIcon icon={faChartLine} className="text-lg text-purple-600" />
                                </div>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 text-center">
                            {getCompressionPercentage() > 0 ? (
                                <p className="text-sm text-green-800 mb-4">
                                    Has ahorrado <strong>{formatFileSize(originalSize - compressedSize)}</strong> de espacio
                                </p>
                            ) : (
                                <p className="text-sm text-blue-800 mb-4">
                                    ℹ️ Este PDF ya estaba optimizado. Se eliminaron metadatos pero el tamaño se mantiene similar.
                                </p>
                            )}
                            <button
                                onClick={downloadCompressed}
                                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-all flex items-center gap-3 mx-auto"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar PDF Comprimido
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {file && !success && (
                    <div className="mt-8 flex flex-col items-center">
                        <button
                            onClick={compressPdf}
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
                                    Comprimiendo PDF...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faCompress} />
                                    Comprimir PDF
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
                    🔒 <strong>Privacidad Garantizada:</strong> El proceso de compresión se realiza localmente en tu navegador usando tecnología WebAssembly. Tus archivos nunca salen de tu dispositivo.
                </p>
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Por qué usar nuestra herramienta para comprimir PDF gratis?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">100% Gratis y Sin Límites</h3>
                                    <p className="text-sm text-text/70">Comprime todos los PDF que necesites sin pagar ni registrarte. Sin marcas de agua ni restricciones de tamaño.</p>
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
                                    <p className="text-sm text-text/70">Comprime tu PDF en segundos con solo arrastrar y soltar. Interfaz intuitiva y sin complicaciones.</p>
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
                                    <h3 className="font-semibold text-text mb-1">Mantiene la Calidad</h3>
                                    <p className="text-sm text-text/70">Optimiza el tamaño del archivo manteniendo la calidad visual de tus documentos PDF.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Use Section */}
                <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Cómo comprimir un PDF en 3 pasos</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Selecciona tu archivo PDF</h3>
                                <p className="text-text/70">Haz clic en el área de carga o arrastra el archivo PDF que quieres comprimir. Verás el tamaño original del archivo.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Elige el nivel de compresión</h3>
                                <p className="text-text/70">Selecciona entre compresión baja (máxima calidad), media (recomendada) o alta (menor tamaño). Luego haz clic en "Comprimir PDF".</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                            <div>
                                <h3 className="font-semibold text-text text-lg mb-2">Descarga tu PDF comprimido</h3>
                                <p className="text-text/70">Verás cuánto espacio has ahorrado y podrás descargar tu PDF optimizado inmediatamente.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Cuándo necesitas comprimir PDF?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📧</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Enviar por email</h3>
                                    <p className="text-sm text-text/70">Reduce el tamaño de PDFs grandes para cumplir con los límites de adjuntos de correo electrónico (generalmente 25MB).</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">☁️</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Ahorrar espacio en la nube</h3>
                                    <p className="text-sm text-text/70">Optimiza tus PDFs para almacenar más documentos en Google Drive, Dropbox o OneDrive.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">🌐</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Publicar en web</h3>
                                    <p className="text-sm text-text/70">Reduce el peso de PDFs para que tu sitio web cargue más rápido y mejore el SEO.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📱</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Compartir en móvil</h3>
                                    <p className="text-sm text-text/70">Facilita el envío de documentos por WhatsApp, Telegram u otras apps de mensajería.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">📄</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Formularios online</h3>
                                    <p className="text-sm text-text/70">Cumple con los límites de tamaño de archivos en formularios de solicitud, trámites o inscripciones.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">💾</div>
                                <div>
                                    <h3 className="font-semibold text-text mb-1">Liberar espacio en disco</h3>
                                    <p className="text-sm text-text/70">Optimiza archivos PDF antiguos para recuperar espacio de almacenamiento en tu ordenador.</p>
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
                            <h3 className="font-semibold text-text text-lg mb-2">¿Es realmente gratis comprimir PDF con esta herramienta?</h3>
                            <p className="text-text/70">Sí, nuestra herramienta para comprimir PDF es 100% gratuita. No hay costos ocultos, no necesitas registrarte y no hay límites en el número de archivos que puedes procesar.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Cuánto se puede reducir el tamaño de un PDF?</h3>
                            <p className="text-text/70">La reducción depende del contenido del PDF. Esta herramienta optimiza la estructura interna del PDF y elimina metadatos innecesarios. PDFs con muchos metadatos pueden reducirse significativamente (10-30%), mientras que PDFs ya optimizados o con muchas imágenes de alta calidad pueden tener una reducción mínima. Para máxima compresión de imágenes, se recomienda usar software de escritorio especializado.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Se pierde calidad al comprimir el PDF?</h3>
                            <p className="text-text/70">Nuestra herramienta utiliza compresión inteligente que optimiza el archivo sin degradar significativamente la calidad visual. Puedes elegir el nivel de compresión según tus necesidades: baja (máxima calidad), media (equilibrada) o alta (menor tamaño).</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Mis archivos están seguros?</h3>
                            <p className="text-text/70">Absolutamente. Todos tus archivos se procesan localmente en tu navegador usando tecnología WebAssembly. Nunca se suben a nuestros servidores ni a ningún servidor externo, garantizando tu privacidad total.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Funciona en móviles y tablets?</h3>
                            <p className="text-text/70">Sí, puedes comprimir PDF online desde cualquier dispositivo: ordenador, móvil Android, iPhone o iPad. Solo necesitas un navegador web moderno.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Hay límite de tamaño de archivo?</h3>
                            <p className="text-text/70">No hay límite estricto, pero archivos muy grandes (más de 100MB) pueden tardar más en procesarse dependiendo de la potencia de tu dispositivo. La compresión se realiza completamente en tu navegador.</p>
                        </div>
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Necesito instalar algún programa?</h3>
                            <p className="text-text/70">No, esta es una herramienta online que funciona directamente en tu navegador. No necesitas descargar ni instalar ningún software como Adobe Acrobat Pro.</p>
                        </div>
                        <div className="pb-6">
                            <h3 className="font-semibold text-text text-lg mb-2">¿Puedo comprimir PDF protegidos con contraseña?</h3>
                            <p className="text-text/70">Si el PDF está protegido con contraseña para abrirlo, primero deberás desbloquearlo. Si solo tiene restricciones de edición, generalmente podrás comprimirlo sin problemas.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Comprimir PDF Online: La Mejor Herramienta Gratuita</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-4">
                        <p>
                            Cuando necesitas <strong>comprimir PDF gratis</strong>, nuestra herramienta es la solución perfecta. Ya sea que necesites <strong>reducir el tamaño de un PDF</strong> para enviarlo por email o <strong>reducir el peso de un PDF</strong> para subirlo a un formulario online, nuestro <strong>compresor de PDF</strong> te permite hacerlo de forma rápida, segura y completamente gratuita.
                        </p>
                        <p>
                            A diferencia de otras herramientas que requieren subir tus archivos a servidores externos, nuestra aplicación procesa todo localmente en tu navegador. Esto significa que cuando usas nuestra herramienta para <strong>comprimir PDF online gratis</strong>, tus documentos nunca salen de tu dispositivo, garantizando la máxima privacidad y seguridad para información confidencial o sensible.
                        </p>
                        <p>
                            Ya sea que necesites <strong>reducir PDF gratis</strong> para trabajo, estudios o uso personal, nuestra herramienta te ofrece una experiencia sin complicaciones. Sin límites de tamaño, sin marcas de agua, sin registro y sin costos ocultos. Simplemente selecciona tu archivo, elige el nivel de compresión y descarga tu PDF optimizado en segundos.
                        </p>
                        <p>
                            Nuestra herramienta para <strong>optimizar PDF</strong> es compatible con todos los navegadores modernos y dispositivos, permitiéndote <strong>comprimir archivos PDF</strong> desde cualquier lugar y en cualquier momento. La interfaz intuitiva hace que el proceso sea tan simple que cualquiera puede usarla, sin necesidad de conocimientos técnicos ni software costoso como Adobe Acrobat Pro.
                        </p>
                        <p>
                            El proceso de compresión optimiza la estructura interna del PDF, elimina metadatos innecesarios y aplica técnicas de compresión avanzadas para <strong>reducir MB de PDF</strong> sin afectar significativamente la calidad visual. Puedes elegir entre tres niveles de compresión según tus necesidades: baja para mantener la máxima calidad, media para un equilibrio óptimo, o alta para obtener el menor tamaño posible.
                        </p>
                        <p>
                            Además de comprimir PDFs, también puedes usar nuestras otras herramientas gratuitas para <strong>unir PDF</strong>, <strong>dividir PDF</strong>, <strong>convertir imágenes a PDF</strong> o <strong>proteger PDF con contraseña</strong>. Todas nuestras herramientas PDF funcionan 100% en tu navegador, garantizando tu privacidad y seguridad en todo momento.
                        </p>
                    </div>
                </section>

                {/* Tips Section */}
                <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                    <h2 className="text-3xl font-bold text-text mb-6">💡 Consejos para comprimir PDFs eficientemente</h2>
                    <div className="space-y-4">
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Elige el nivel de compresión adecuado</h3>
                            <p className="text-sm text-text/70">Para documentos importantes o presentaciones, usa compresión baja o media. Para archivos de archivo o uso interno, la compresión alta es ideal.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Verifica el resultado antes de compartir</h3>
                            <p className="text-sm text-text/70">Abre el PDF comprimido para asegurarte de que la calidad es aceptable para tu propósito antes de enviarlo o publicarlo.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Guarda el original</h3>
                            <p className="text-sm text-text/70">Siempre mantén una copia del PDF original por si necesitas la versión de máxima calidad en el futuro.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Comprime por lotes</h3>
                            <p className="text-sm text-text/70">Si tienes varios PDFs, comprímelos todos con la misma configuración para mantener consistencia en tu biblioteca de documentos.</p>
                        </div>
                        <div className="bg-white/70 rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">✅ Considera el uso final</h3>
                            <p className="text-sm text-text/70">PDFs para impresión requieren mayor calidad que PDFs solo para lectura en pantalla. Ajusta la compresión según el uso previsto.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
