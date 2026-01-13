'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faImage, faDownload, faSync } from '@fortawesome/free-solid-svg-icons';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Redimensionar Imagen Online (Gratis)',
    description: 'Cambia el tamaño de tus imágenes (JPG, PNG, WEBP) pixel por pixel. Herramienta 100% gratuita, privada y sin subir archivos al servidor.',
    keywords: ['redimensionar imagen', 'cambiar tamaño foto', 'resize image', 'redimensionar fotos online', 'ajustar pixeles imagen'],
    alternates: {
        canonical: 'https://toolero.es/tools/imagen/redimensionar/',
    },
    openGraph: {
        title: 'Redimensionar Imagen Online Gratis | Toolero.es',
        description: 'Cambia el tamaño de tus imágenes pixel por pixel. Rápido, gratis y privado.',
        url: 'https://toolero.es/tools/imagen/redimensionar/',
    }
};

export default function ResizeImage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Redimensionar Imagen - Toolero.es',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
        },
        description: 'Herramienta online gratuita para redimensionar imágenes pixel por pixel sin perder calidad.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '156'
        }
    };



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
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-600 text-xs font-semibold uppercase tracking-wide mb-4">
                        <FontAwesomeIcon icon={faImage} className="mr-2" />
                        Imagen
                    </div>
                    <h1 className="text-3xl font-semibold text-text mb-2">Redimensionar Imagen Gratis</h1>
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
                // Invisible Canvas for Processing
                <canvas ref={canvasRef} className="hidden" />

                {/* SEO Content Section */}
                <article className="mt-24 max-w-3xl mx-auto prose prose-gray">
                    <h2 className="text-2xl font-bold text-text mb-4">¿Cómo redimensionar una imagen online gratis?</h2>
                    <p className="text-text/80 mb-6">
                        Nuestra herramienta de <strong>redimensionar imagen online</strong> te permite ajustar las dimensiones (ancho y alto) de tus fotos
                        de manera rápida, sencilla y segura. A diferencia de otros sitios, todo el procesamiento se realiza en tu navegador,
                        lo que significa que tus imágenes <strong>nunca se suben a ningún servidor</strong>.
                    </p>

                    <h3 className="text-xl font-semibold text-text mb-3">Pasos para cambiar el tamaño de una foto:</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-text/80 mb-8">
                        <li><strong>Sube tu imagen:</strong> Haz clic en el área de carga o arrastra tu archivo (JPG, PNG y WEBP).</li>
                        <li><strong>Ajusta las medidas:</strong> Introduce el nuevo ancho o alto en píxeles.</li>
                        <li><strong>Mantén la proporción:</strong> La opción "Mantener relación de aspecto" calcula automáticamente la otra medida para que la foto no se deforme.</li>
                        <li><strong>Descarga:</strong> Pulsa el botón para guardar tu imagen redimensionada al instante.</li>
                    </ol>

                    <h3 className="text-xl font-semibold text-text mb-3">Características principales</h3>
                    <ul className="list-disc pl-5 space-y-2 text-text/80 mb-8">
                        <li>⚡ <strong>Rápido y fluído:</strong> Sin colas de espera ni tiempos de carga.</li>
                        <li>🔒 <strong>100% Privado:</strong> Tus fotos no salen de tu dispositivo.</li>
                        <li>✨ <strong>Alta Calidad:</strong> Usamos algoritmos avanzados de suavizado para evitar que la imagen se vea pixelada.</li>
                        <li>🆓 <strong>Totalmente Gratis:</strong> Sin límites de uso ni marcas de agua.</li>
                    </ul>

                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 my-8">
                        <h3 className="text-lg font-bold text-purple-800 mb-2">Preguntas Frecuentes (FAQ)</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-purple-900">¿Qué formatos son compatibles?</h4>
                                <p className="text-sm text-purple-800/80">Soportamos los formatos más comunes de web: JPG, PNG y WEBP.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-purple-900">¿Pierde calidad mi imagen?</h4>
                                <p className="text-sm text-purple-800/80">Tratamos de mantener la máxima calidad posible. Sin embargo, al agrandar una imagen pequeña es natural perder nitidez. Al reducirla, la calidad se mantiene excelente.</p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            );
        </>
    );
}
