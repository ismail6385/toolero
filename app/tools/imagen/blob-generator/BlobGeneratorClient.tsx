'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes, faRandom, faDownload, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function BlobGeneratorClient() {
    const [path, setPath] = useState('');
    const [complexity, setComplexity] = useState(0.6); // 0.1 to 1
    const [contrast, setContrast] = useState(0.6);     // 0.1 to 1
    const [color, setColor] = useState('#ec4899');
    const [copied, setCopied] = useState(false);

    // Simplistic blob generation math (approximate)
    // Actually generating a random nice blob is complex.
    // I will use a simple noise-based approach for 4-ish control points or simular logic
    // OR just simple random radii at intervals.

    // Simple approach: Circle with varying radius at N points.
    const generateBlob = () => {
        const numPoints = 8 + Math.floor(complexity * 10);
        const points = [];
        const angleStep = (Math.PI * 2) / numPoints;
        const radiusBase = 150;
        const radiusVar = 50 * contrast;

        for (let i = 0; i < numPoints; i++) {
            const angle = i * angleStep;
            const r = radiusBase + (Math.random() - 0.5) * 2 * radiusVar;
            const x = 250 + Math.cos(angle) * r;
            const y = 250 + Math.sin(angle) * r;
            points.push({ x, y });
        }

        // Smooth curve through points (Catmull-Rom or Bezier approx)
        // Simplest: Quadratic Bezier through midpoints
        let d = `M ${(points[0].x + points[1].x) / 2} ${(points[0].y + points[1].y) / 2}`;
        for (let i = 1; i < numPoints; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % numPoints];
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            d += ` Q ${p1.x} ${p1.y} ${midX} ${midY}`;
        }
        d += ' Z';

        setPath(d);
    };

    useEffect(() => {
        generateBlob();
    }, []);

    const svgCode = `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" fill="${color}" />
</svg>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(svgCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadSvg = () => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'blob.svg';
        link.click();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faShapes} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Blobs SVG</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea formas orgánicas, únicas y aleatorias para fondos y diseños modernos.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Controls */}
                <div className="lg:col-span-4 bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 h-fit">
                    <button
                        onClick={generateBlob}
                        className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/30"
                    >
                        <FontAwesomeIcon icon={faRandom} />
                        Generar Nuevo
                    </button>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold">Complejidad</label>
                        </div>
                        <input type="range" min="0" max="1" step="0.1" value={complexity} onChange={(e) => setComplexity(Number(e.target.value))} className="w-full accent-primary" />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold">Irregularidad</label>
                        </div>
                        <input type="range" min="0" max="1" step="0.1" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full accent-primary" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={color} onChange={(e) => setColor(e.target.value)}
                                className="h-10 w-10 cursor-pointer rounded border border-gray-200"
                            />
                            <input
                                type="text"
                                value={color} onChange={(e) => setColor(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-white border border-gray-200 rounded-2xl flex items-center justify-center p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] min-h-[400px]">
                        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-[80%] h-[80%] max-w-[400px]">
                            <path d={path} fill={color} className="transition-all duration-500 ease-in-out" />
                        </svg>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={copyToClipboard} className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado' : 'Copiar SVG'}
                        </button>
                        <button onClick={downloadSvg} className="flex-1 bg-gray-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                            <FontAwesomeIcon icon={faDownload} />
                            Descargar SVG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
