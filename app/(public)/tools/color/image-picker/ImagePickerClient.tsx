'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { faEyeDropper, faImage, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ImagePickerClient() {
    const [image, setImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [palette, setPalette] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImage(event.target.result as string);
                    setPalette([]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const img = imageRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        const pixelData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
        const hex = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
        setSelectedColor(hex);

        if (!palette.includes(hex)) {
            setPalette(prev => [...prev, hex].slice(-8));
        }
    };

    const copyColor = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-10">
                <div className="inline-block p-4 rounded-full bg-purple-100 text-purple-600 mb-4 text-3xl">
                    <FontAwesomeIcon icon={faEyeDropper} />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Selector de Color</h1>
                <p className="text-gray-600">Extrae colores de cualquier imagen haciendo clic en ella.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload & Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        {!image ? (
                            <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FontAwesomeIcon icon={faImage} className="text-6xl text-gray-400 mb-4" />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra una imagen</p>
                                    <p className="text-xs text-gray-500">PNG, JPG (Max. 10MB)</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        ) : (
                            <div className="relative">
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Upload"
                                    onClick={handleImageClick}
                                    className="w-full rounded-lg cursor-crosshair"
                                />
                                <button
                                    onClick={() => { setImage(null); setPalette([]); }}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                                >
                                    Cambiar imagen
                                </button>
                            </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>

                {/* Color Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Color Seleccionado</h3>
                        <div
                            className="w-full h-32 rounded-lg border border-gray-200 mb-4"
                            style={{ backgroundColor: selectedColor }}
                        />
                        <div className="text-center mb-4">
                            <div className="font-mono text-2xl text-gray-800 uppercase">{selectedColor}</div>
                        </div>
                        <button
                            onClick={() => copyColor(selectedColor)}
                            className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                }`}
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
                            {copied ? 'Copiado!' : 'Copiar Color'}
                        </button>
                    </div>

                    {palette.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Paleta Extraída</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {palette.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => copyColor(color)}
                                        className="aspect-square rounded-lg border border-gray-200 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
