'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { faIcons, faCloudUploadAlt, faDownload, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FaviconGeneratorClient() {
    const [image, setImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fileName, setFileName] = useState('favicon');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImage(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
            setFileName(file.name.split('.')[0] || 'favicon');
        }
    };

    const downloadFavicon = (size: number) => {
        if (!image || !canvasRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            // Draw resized
            ctx.drawImage(img, 0, 0, size, size);

            // Convert to Blob
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${fileName}-${size}x${size}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            }, 'image/png');
        };
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-purple-100 text-purple-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faIcons} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Generador de Favicon</h1>
                <p className="text-gray-600">Convierte tu logo o imagen en iconos para tu sitio web en segundos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Upload Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                    {!image ? (
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-purple-400 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-3" />
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra tu imagen</p>
                                <p className="text-xs text-gray-500">PNG, JPG o SVG (Max. 5MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    ) : (
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-48 h-48 mb-4 bg-gray-100 rounded-lg p-2 border border-gray-200">
                                <img src={image} alt="Preview" className="w-full h-full object-contain" />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow-md"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 truncate w-full text-center">{fileName}</p>
                            <label className="cursor-pointer text-purple-600 text-sm font-medium hover:underline">
                                Cambiar imagen
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    )}
                </div>

                {/* Preview & Download Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                        <FontAwesomeIcon icon={faImage} className="mr-2 text-purple-500" />
                        Vista Previa y Descarga
                    </h3>

                    {image ? (
                        <div className="space-y-6">
                            {[16, 32, 192, 512].map((size) => (
                                <div key={size} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white border border-gray-200 rounded flex items-center justify-center">
                                            <img src={image} style={{ width: size > 48 ? 48 : size, height: size > 48 ? 48 : size }} className="object-contain" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{size}x{size}</div>
                                            <div className="text-xs text-gray-500">PNG</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => downloadFavicon(size)}
                                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                        Descargar
                                    </button>
                                </div>
                            ))}

                            <div className="text-xs text-gray-400 text-center mt-4">
                                Nota: Los archivos .ico modernos pueden ser simplemente PNGs renombrados o servidos como image/png.
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                            <FontAwesomeIcon icon={faIcons} className="text-6xl mb-4" />
                            <p>Sube una imagen para ver las vistas previas</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
