'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faCompress, faDownload, faSync } from '@fortawesome/free-solid-svg-icons';

export default function ImageCompressor() {
    const [image, setImage] = useState<string | null>(null);
    const [quality, setQuality] = useState(80); // 0 to 100
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [compressedImage, setCompressedImage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const originalImgRef = useRef<HTMLImageElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalSize(file.size);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    originalImgRef.current = img;
                    processCompression(img, quality);
                };
                img.src = event.target?.result as string;
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const processCompression = (img: HTMLImageElement, q: number) => {
        if (!canvasRef.current) return;
        setProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
            // Fill white background for JPEGs
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            // To blob to get size
            canvas.toBlob((blob) => {
                if (blob) {
                    setCompressedSize(blob.size);
                    const newUrl = URL.createObjectURL(blob);
                    setCompressedImage(newUrl);
                    setProcessing(false);
                }
            }, 'image/jpeg', q / 100);
        }
    };

    const handleQualityChange = (val: number) => {
        setQuality(val);
        if (originalImgRef.current) {
            processCompression(originalImgRef.current, val);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faCompress} className="mr-2" />
                    Compresor
                </div>
                <h1 className="text-3xl font-semibold text-text mb-2">Compresor de Imágenes</h1>
                <p className="text-text/60">Reduce el peso de tus imágenes para web. Rápido y sin subir archivos.</p>
            </div>

            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden text-center p-12 cursor-pointer hover:border-green-500 transition-all group"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="mx-auto h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">Sube imagen a comprimir</h3>
                    <p className="text-sm text-text/60">Optimización inteligente</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Comparison Visual */}
                    <div className="bg-surface rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
                        <div className="relative flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center mb-4 min-h-[250px]">
                            {compressedImage && (
                                <img src={compressedImage} className="max-w-full max-h-[300px] object-contain" alt="Compressed" />
                            )}
                            {processing && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-sm font-semibold text-text/50">
                                    Procesando...
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs font-bold text-text/40 uppercase">Antes</p>
                                <p className="text-lg font-mono font-medium">{(originalSize / 1024).toFixed(1)} KB</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-green-600 uppercase">Ahora (Estimado)</p>
                                <p className="text-2xl font-mono font-bold text-green-600">{(compressedSize / 1024).toFixed(1)} KB</p>
                                <p className="text-xs text-text/40">-{Math.round((1 - compressedSize / originalSize) * 100)}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-surface rounded-xl shadow-lg border border-gray-100 p-8 h-fit">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-text">Nivel de Calidad</h2>
                            <button
                                onClick={() => { setImage(null); setCompressedImage(null); }}
                                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faSync} /> Nueva
                            </button>
                        </div>

                        <div className="mb-8">
                            <input
                                type="range"
                                min="10"
                                max="100"
                                value={quality}
                                onChange={(e) => handleQualityChange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                            <div className="flex justify-between text-xs font-bold text-text/40 mt-2 uppercase">
                                <span>Máxima Compresión</span>
                                <span>{quality}%</span>
                                <span>Mejor Calidad</span>
                            </div>
                        </div>

                        <a
                            href={compressedImage || '#'}
                            download="compressed-image.jpg"
                            className={`block w-full text-center py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-md ${processing ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <FontAwesomeIcon icon={faDownload} className="mr-2" />
                            Descargar Imagen
                        </a>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
