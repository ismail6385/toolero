'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faCloudUploadAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function CssFiltersClient() {
    const [image, setImage] = useState<string | null>(null);
    const [filter, setFilter] = useState({
        brightness: 100,
        contrast: 100,
        saturate: 100,
        grayscale: 0,
        sepia: 0,
        hueRotate: 0,
        blur: 0
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const getFilterString = () => {
        return `brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturate}%) grayscale(${filter.grayscale}%) sepia(${filter.sepia}%) hue-rotate(${filter.hueRotate}deg) blur(${filter.blur}px)`;
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.filter = getFilterString();
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.download = 'edited-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        };
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faMagic} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Filtros de Imagen CSS Pro</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Edita tus imágenes directamente en el navegador. Aplica filtros estilo Instagram y descarga el resultado.
                </p>
            </div>

            {!image ? (
                <div className="max-w-xl mx-auto">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-4" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir</span> o arrastra y suelta</p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP, GIF</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                </div>
            ) : (
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-4 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Brillo ({filter.brightness}%)</label>
                                <button onClick={() => setFilter({ ...filter, brightness: 100 })} className="text-xs text-primary">Reset</button>
                            </div>
                            <input type="range" min="0" max="200" value={filter.brightness} onChange={(e) => setFilter({ ...filter, brightness: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Contraste ({filter.contrast}%)</label>
                                <button onClick={() => setFilter({ ...filter, contrast: 100 })} className="text-xs text-primary">Reset</button>
                            </div>
                            <input type="range" min="0" max="200" value={filter.contrast} onChange={(e) => setFilter({ ...filter, contrast: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Saturación ({filter.saturate}%)</label>
                                <button onClick={() => setFilter({ ...filter, saturate: 100 })} className="text-xs text-primary">Reset</button>
                            </div>
                            <input type="range" min="0" max="200" value={filter.saturate} onChange={(e) => setFilter({ ...filter, saturate: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Escala de Grises ({filter.grayscale}%)</label>
                            </div>
                            <input type="range" min="0" max="100" value={filter.grayscale} onChange={(e) => setFilter({ ...filter, grayscale: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Sepia ({filter.sepia}%)</label>
                            </div>
                            <input type="range" min="0" max="100" value={filter.sepia} onChange={(e) => setFilter({ ...filter, sepia: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Hue Rotate ({filter.hueRotate}deg)</label>
                            </div>
                            <input type="range" min="0" max="360" value={filter.hueRotate} onChange={(e) => setFilter({ ...filter, hueRotate: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold">Blur ({filter.blur}px)</label>
                            </div>
                            <input type="range" min="0" max="20" value={filter.blur} onChange={(e) => setFilter({ ...filter, blur: Number(e.target.value) })} className="w-full accent-primary" />
                        </div>

                        <div className="pt-4 flex gap-4">
                            <label className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer text-center text-sm flex items-center justify-center gap-2">
                                <FontAwesomeIcon icon={faCloudUploadAlt} />
                                Cambiar
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                            </label>
                            <button onClick={downloadImage} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2">
                                <FontAwesomeIcon icon={faDownload} />
                                Descargar
                            </button>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-8 bg-gray-900 rounded-2xl flex items-center justify-center p-4 overflow-hidden min-h-[500px]">
                        <img
                            src={image}
                            alt="Preview"
                            style={{ filter: getFilterString(), maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                            className="shadow-2xl"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>
            )}
        </div>
    );
}
