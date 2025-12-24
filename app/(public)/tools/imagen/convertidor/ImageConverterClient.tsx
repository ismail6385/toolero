'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faExchangeAlt, faDownload, faSync, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ImageConverter() {
    const [image, setImage] = useState<string | null>(null);
    const [format, setFormat] = useState('png'); // png, jpeg, webp
    const [originalSpec, setOriginalSpec] = useState({ name: '', size: 0, type: '' });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalSpec({ name: file.name, size: file.size, type: file.type });
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertAndDownload = () => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                // Determine background fill (JPEG doesn't support transparency)
                if (format === 'jpeg') {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                ctx.drawImage(img, 0, 0);

                const mimeType = `image/${format}`;
                const dataUrl = canvas.toDataURL(mimeType, 0.9); // 90% quality default

                const link = document.createElement('a');
                const newName = originalSpec.name.split('.')[0] + `-converted.${format}`;
                link.download = newName;
                link.href = dataUrl;
                link.click();
            }
        };
        img.src = image;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    Conversor
                </div>
                <h1 className="text-3xl font-semibold text-text mb-2">Convertidor de Imagen</h1>
                <p className="text-text/60">Convierte entre formatos PNG, JPG y WEBP instantáneamente.</p>
            </div>

            {!image ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-surface rounded-xl shadow-md border border-gray-200 overflow-hidden text-center p-12 cursor-pointer hover:border-pink-500 transition-all group"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="mx-auto h-20 w-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">Sube tu imagen</h3>
                    <p className="text-sm text-text/60">Cualquier formato de imagen</p>
                </div>
            ) : (
                <div className="bg-surface rounded-xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <img src={image} className="w-16 h-16 object-cover rounded-lg shadow-sm bg-gray-50" alt="Thumb" />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-text truncate">{originalSpec.name}</h3>
                            <p className="text-xs text-text/50">{(originalSpec.size / 1024).toFixed(1)} KB • {originalSpec.type}</p>
                        </div>
                        <button
                            onClick={() => setImage(null)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FontAwesomeIcon icon={faSync} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Formato de Destino</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['png', 'jpeg', 'webp'].map(fmt => (
                                    <button
                                        key={fmt}
                                        onClick={() => setFormat(fmt)}
                                        className={`py-3 rounded-xl border font-bold uppercase text-sm transition-all ${format === fmt
                                                ? 'bg-pink-600 border-pink-600 text-white shadow-md'
                                                : 'border-gray-200 text-text/60 hover:border-pink-300'
                                            }`}
                                    >
                                        {fmt === 'jpeg' ? 'JPG' : fmt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={convertAndDownload}
                            className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faDownload} /> Convertir y Descargar
                        </button>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
