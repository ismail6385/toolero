'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faImage, faDownload, faTextHeight, faPalette } from '@fortawesome/free-solid-svg-icons';

export default function MemeGeneratorClient() {
    const [image, setImage] = useState<string | null>(null);
    const [topText, setTopText] = useState('CUANDO EL CÓDIGO');
    const [bottomText, setBottomText] = useState('FUNCIONA A LA PRIMERA');
    const [fontSize, setFontSize] = useState(40);
    const [textColor, setTextColor] = useState('#FFFFFF');
    const [isDragOver, setIsDragOver] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const drawMeme = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Text settings
            ctx.fillStyle = textColor;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = Math.max(2, fontSize / 8);
            ctx.textAlign = 'center';
            ctx.font = `900 ${fontSize}px sans-serif`; // Impact font feel
            ctx.lineJoin = 'round';

            // Draw Top Text
            ctx.textBaseline = 'top';
            // Simple wrap handling could be added here, but for now simple top/bottom
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);

            // Draw Bottom Text
            ctx.textBaseline = 'bottom';
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        };
    };

    useEffect(() => {
        if (image) {
            drawMeme();
        }
    }, [image, topText, bottomText, fontSize, textColor]);

    const downloadMeme = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = 'meme-toolero.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4 text-yellow-600">
                    <FontAwesomeIcon icon={faSmile} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Memes</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea memes al instante. Sube tu imagen, añade texto y listo.
                </p>
            </div>

            <div className={`grid lg:grid-cols-2 gap-8 mb-8 ${!image ? 'items-center justify-center' : ''}`}>

                {/* Image Upload Area */}
                {!image && (
                    <div className="lg:col-span-2">
                        <div
                            className={`border-4 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer ${isDragOver ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-400 hover:bg-gray-50'}`}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                const file = e.dataTransfer.files?.[0];
                                if (file && file.type.startsWith('image/')) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setImage(ev.target?.result as string);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        >
                            <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FontAwesomeIcon icon={faImage} className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-text mb-2">Sube tu imagen aquí</h3>
                            <p className="text-text/60 mb-6">Arrastra y suelta o haz clic para seleccionar</p>
                            <label className="inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl cursor-pointer hover:bg-yellow-600 hover:scale-105 transition-all shadow-lg">
                                Seleccionar Imagen
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                )}

                {image && (
                    <>
                        {/* Editor Controls */}
                        <div className="bg-surface rounded-3xl shadow-xl border border-gray-200 p-8 order-2 lg:order-1 h-fit">
                            <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                                <FontAwesomeIcon icon={faPalette} className="text-yellow-500" />
                                Personalizar
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-text mb-2">Texto Superior</label>
                                    <input
                                        type="text"
                                        value={topText}
                                        onChange={(e) => setTopText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-text mb-2">Texto Inferior</label>
                                    <input
                                        type="text"
                                        value={bottomText}
                                        onChange={(e) => setBottomText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none font-bold"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-text mb-2">Tamaño Fuente</label>
                                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                                            <FontAwesomeIcon icon={faTextHeight} className="text-gray-400 ml-2" />
                                            <input
                                                type="number"
                                                value={fontSize}
                                                onChange={(e) => setFontSize(Number(e.target.value))}
                                                className="w-full bg-transparent outline-none font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text mb-2">Color Texto</label>
                                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 h-[50px]">
                                            <input
                                                type="color"
                                                value={textColor}
                                                onChange={(e) => setTextColor(e.target.value)}
                                                className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                                            />
                                            <span className="text-sm font-mono text-text/60">{textColor}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={() => setImage(null)}
                                        className="flex-1 py-3 px-4 border border-gray-200 text-text font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cambiar Imagen
                                    </button>
                                    <button
                                        onClick={downloadMeme}
                                        className="flex-1 py-3 px-4 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 shadow-lg hover:scale-105 transition-all"
                                    >
                                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Canvas Preview */}
                        <div className="bg-gray-900 rounded-3xl p-4 lg:p-8 flex items-center justify-center order-1 lg:order-2 shadow-2xl">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-[600px] object-contain shadow-lg"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
