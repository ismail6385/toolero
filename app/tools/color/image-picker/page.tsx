'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faEyeDropper, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ImagePicker() {
    const [image, setImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [dominantColors, setDominantColors] = useState<string[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(event.target?.result as string);
                    extractDominantColors(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const extractDominantColors = (img: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const colorCount: { [key: string]: number } = {};

        // Sample pixels
        for (let i = 0; i < pixels.length; i += 16) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            colorCount[hex] = (colorCount[hex] || 0) + 1;
        }

        const sorted = Object.entries(colorCount).sort((a, b) => b[1] - a[1]);
        setDominantColors(sorted.slice(0, 5).map(([color]) => color));
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current || !image) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(x, y, 1, 1);
        const [r, g, b] = imageData.data;
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        setSelectedColor(hex);
    };

    const handleCopy = (color: string) => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setImage(null);
        setSelectedColor(null);
        setDominantColors([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faEyeDropper} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Selector de Color de Imagen</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Sube una imagen y extrae los colores dominantes o selecciona un color específico haciendo clic.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-text">Subir Imagen</label>
                        {image && (
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 text-sm text-text/60 hover:text-text transition-colors"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                Limpiar
                            </button>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                    />
                    <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition-colors"
                    >
                        <FontAwesomeIcon icon={faUpload} className="text-primary" />
                        <span className="text-text font-semibold">Haz clic para subir una imagen</span>
                    </label>
                </div>

                {image && (
                    <>
                        <div className="mb-6">
                            <p className="text-sm text-text/60 mb-2">Haz clic en la imagen para seleccionar un color:</p>
                            <div className="relative inline-block">
                                <img
                                    src={image}
                                    alt="Uploaded"
                                    className="max-w-full h-auto rounded-xl border border-gray-200 cursor-crosshair"
                                    onLoad={(e) => {
                                        const img = e.currentTarget;
                                        if (canvasRef.current) {
                                            const canvas = canvasRef.current;
                                            canvas.width = img.width;
                                            canvas.height = img.height;
                                            const ctx = canvas.getContext('2d');
                                            if (ctx) {
                                                ctx.drawImage(img, 0, 0);
                                            }
                                        }
                                    }}
                                />
                                <canvas
                                    ref={canvasRef}
                                    onClick={handleCanvasClick}
                                    className="absolute top-0 left-0 cursor-crosshair opacity-0"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        </div>

                        {selectedColor && (
                            <div className="bg-background rounded-xl p-4 border border-gray-200 mb-6">
                                <h3 className="font-semibold text-text mb-3">Color Seleccionado:</h3>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-20 h-20 rounded-xl border border-gray-200 shadow-md"
                                        style={{ backgroundColor: selectedColor }}
                                    />
                                    <div className="flex-1">
                                        <p className="font-mono text-lg text-text mb-2">{selectedColor}</p>
                                        <button
                                            onClick={() => handleCopy(selectedColor)}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors text-sm"
                                        >
                                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                            {copied ? 'Copiado!' : 'Copiar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {dominantColors.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-text mb-3">Colores Dominantes:</h3>
                                <div className="grid grid-cols-5 gap-4">
                                    {dominantColors.map((color, index) => (
                                        <div key={index} className="text-center">
                                            <div
                                                className="h-20 rounded-xl border border-gray-200 mb-2 cursor-pointer hover:scale-105 transition-transform shadow-md"
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleCopy(color)}
                                            />
                                            <p className="text-xs font-mono text-text/70 mb-1">{color}</p>
                                            <button
                                                onClick={() => handleCopy(color)}
                                                className="text-xs text-primary hover:text-secondary transition-colors"
                                            >
                                                Copiar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

