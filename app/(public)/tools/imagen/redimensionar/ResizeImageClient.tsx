'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faImage, faDownload, faSync } from '@fortawesome/free-solid-svg-icons';

export default function ResizeImage() {
    const [image, setImage] = useState<string | null>(null);
    const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 });
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [maintainRatio, setMaintainRatio] = useState(true);
    const [filesize, setFilesize] = useState(0); // in KB

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFilesize(file.size / 1024);
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalDimensions({ w: img.width, h: img.height });
                    setWidth(img.width);
                    setHeight(img.height);
                    setImage(event.target?.result as string);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleWidthChange = (val: number) => {
        setWidth(val);
        if (maintainRatio && originalDimensions.w > 0) {
            const ratio = originalDimensions.h / originalDimensions.w;
            setHeight(Math.round(val * ratio));
        }
    };

    const handleHeightChange = (val: number) => {
        setHeight(val);
        if (maintainRatio && originalDimensions.h > 0) {
            const ratio = originalDimensions.w / originalDimensions.h;
            setWidth(Math.round(val * ratio));
        }
    };

    const downloadImage = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            // High quality smoothing
            if (ctx) {
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                const link = document.createElement('a');
                link.download = `resized-${width}x${height}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        };
        img.src = image;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Imagen
                </div>
                <h1 className="text-3xl font-semibold text-text mb-2">Redimensionar Imagen</h1>
                <p className="text-text/60">Cambia el tamaño pixel por pixel. Procesamiento local y privado.</p>
            </div>

            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden text-center p-12 cursor-pointer hover:border-purple-500 transition-all group"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="mx-auto h-20 w-20 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">Sube tu imagen aquí</h3>
                    <p className="text-sm text-text/60">JPG, PNG, WEBP aceptados</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Preview Area */}
                    <div className="bg-surface rounded-xl shadow p-4 border border-gray-100 flex items-center justify-center bg-gray-50/50 min-h-[300px]">
                        <img src={image} alt="Preview" className="max-w-full max-h-[400px] object-contain shadow-sm rounded-lg" />
                    </div>

                    {/* Controls */}
                    <div className="bg-surface rounded-xl shadow-lg border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-text">Configuración</h2>
                            <button
                                onClick={() => setImage(null)}
                                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faSync} /> Reiniciar
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-4">
                                <div className="text-xs font-bold text-purple-700 uppercase mb-1">Original</div>
                                <div className="text-sm text-purple-900 font-mono">
                                    {originalDimensions.w} x {originalDimensions.h} px
                                    <span className="opacity-50 mx-2">|</span>
                                    {filesize.toFixed(1)} KB
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-text/50 uppercase block mb-2">Ancho (px)</label>
                                    <input
                                        type="number"
                                        value={width}
                                        onChange={(e) => handleWidthChange(Number(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs font-bold text-text/50 uppercase block mb-2">Alto (px)</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => handleHeightChange(Number(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={maintainRatio}
                                    onChange={(e) => setMaintainRatio(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-text">Mantener relación de aspecto</span>
                            </label>

                            <button
                                onClick={downloadImage}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                            >
                                <FontAwesomeIcon icon={faDownload} /> Descargar Imagen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invisible Canvas for Processing */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
