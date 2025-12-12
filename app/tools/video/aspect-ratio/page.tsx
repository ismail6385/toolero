"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCalculator, faUndo, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';

export default function AspectRatioPage() {
    const [width, setWidth] = useState<number | string>(1920);
    const [height, setHeight] = useState<number | string>(1080);
    const [ratioW, setRatioW] = useState<number | string>(16);
    const [ratioH, setRatioH] = useState<number | string>(9);
    const [resultRatio, setResultRatio] = useState<string>("16:9");

    // Calculate specific dimension based on the other and the ratio
    const calculateHeight = (w: number, rw: number, rh: number) => {
        return Math.round((w * rh) / rw);
    };

    const calculateWidth = (h: number, rw: number, rh: number) => {
        return Math.round((h * rw) / rh);
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setWidth(isNaN(val) ? '' : val);
        if (!isNaN(val) && ratioW && ratioH) {
            setHeight(calculateHeight(val, Number(ratioW), Number(ratioH)));
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setHeight(isNaN(val) ? '' : val);
        if (!isNaN(val) && ratioW && ratioH) {
            setWidth(calculateWidth(val, Number(ratioW), Number(ratioH)));
        }
    };

    const handleRatioWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setRatioW(isNaN(val) ? '' : val);
        if (!isNaN(val) && val !== 0 && ratioH && width) {
            setHeight(calculateHeight(Number(width), val, Number(ratioH)));
            updateResultString(val, Number(ratioH));
        }
    };

    const handleRatioHChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        setRatioH(isNaN(val) ? '' : val);
        if (!isNaN(val) && val !== 0 && ratioW && width) {
            setHeight(calculateHeight(Number(width), Number(ratioW), val));
            updateResultString(Number(ratioW), val);
        }
    };

    const updateResultString = (w: number, h: number) => {
        setResultRatio(`${w}:${h}`);
    };

    const setPreset = (w: number, h: number) => {
        setRatioW(w);
        setRatioH(h);
        updateResultString(w, h);
        if (width) {
            setHeight(calculateHeight(Number(width), w, h));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copiado al portapapeles');
    };

    return (
        <div className="min-h-screen bg-background">
            <Toaster position="bottom-center" />

            {/* Hero Section */}
            <section className="bg-surface border-b border-gray-100 py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-4">
                        <FontAwesomeIcon icon={faExpand} className="mr-2" />
                        Herramienta de Video
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
                        Calculadora de <span className="text-primary">Aspect Ratio</span>
                    </h1>
                    <p className="text-text/60 max-w-2xl mx-auto text-lg">
                        Calcula fácilmente dimensiones y relaciones de aspecto para video, imágenes y pantallas.
                        Perfecto para editores, diseñadores y desarrolladores.
                    </p>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">

                        {/* Ratio Inputs */}
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">1</span>
                                Relación de Aspecto (Ratio)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <label className="block text-xs font-medium text-text/50 mb-1 ml-1">Ancho (Ratio)</label>
                                        <input
                                            type="number"
                                            value={ratioW}
                                            onChange={handleRatioWChange}
                                            className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center text-xl font-bold text-primary"
                                        />
                                    </div>
                                    <span className="text-2xl font-bold text-text/30 mt-6">:</span>
                                    <div className="relative flex-1">
                                        <label className="block text-xs font-medium text-text/50 mb-1 ml-1">Alto (Ratio)</label>
                                        <input
                                            type="number"
                                            value={ratioH}
                                            onChange={handleRatioHChange}
                                            className="w-full px-4 py-3 bg-background border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-center text-xl font-bold text-primary"
                                        />
                                    </div>
                                </div>

                                {/* Presets */}
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    {[
                                        { w: 16, h: 9, label: '16:9 (HD/TV)' },
                                        { w: 4, h: 3, label: '4:3 (SD)' },
                                        { w: 1, h: 1, label: '1:1 (Square)' },
                                        { w: 9, h: 16, label: '9:16 (Story)' },
                                        { w: 21, h: 9, label: '21:9 (Cinema)' },
                                    ].map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => setPreset(preset.w, preset.h)}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${Number(ratioW) === preset.w && Number(ratioH) === preset.h
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'bg-background text-text/70 border-gray-200 hover:border-primary/50'
                                                }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 my-8"></div>

                        {/* Pixel Dimensions Inputs */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">2</span>
                                Dimensiones (Píxeles)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-2">Ancho (Width)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={handleWidthChange}
                                            className="w-full pl-4 pr-12 py-3 bg-background border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                                        />
                                        <span className="absolute right-4 top-3.5 text-xs font-bold text-text/30">PX</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text/70 mb-2">Alto (Height)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={handleHeightChange}
                                            className="w-full pl-4 pr-12 py-3 bg-background border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
                                        />
                                        <span className="absolute right-4 top-3.5 text-xs font-bold text-text/30">PX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Display */}
                        <div className="bg-background rounded-xl p-6 border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-xs text-text/50 uppercase tracking-wider font-semibold mb-1">Resolución</div>
                                    <div className="text-lg font-bold text-text flex items-center justify-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => copyToClipboard(`${width}x${height}`)}>
                                        {width} x {height}
                                        <FontAwesomeIcon icon={faCopy} className="text-xs opacity-50" />
                                    </div>
                                </div>
                                <div className="md:border-l md:border-r border-gray-100">
                                    <div className="text-xs text-text/50 uppercase tracking-wider font-semibold mb-1">Aspect Ratio</div>
                                    <div className="text-lg font-bold text-primary">{ratioW}:{ratioH}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-text/50 uppercase tracking-wider font-semibold mb-1">Total Píxeles</div>
                                    <div className="text-lg font-bold text-text">{(Number(width) * Number(height) / 1000000).toFixed(2)} MP</div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Preview */}
                        <div className="mt-8 flex justify-center">
                            <div className="relative bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 transition-all"
                                style={{
                                    aspectRatio: `${ratioW}/${ratioH}`,
                                    width: '100%',
                                    maxWidth: '400px',
                                    maxHeight: '300px'
                                }}
                            >
                                <div className="text-center">
                                    <span className="block text-xl font-bold text-text/30 mb-1">{ratioW}:{ratioH}</span>
                                    <span className="block text-xs font-medium text-text/20">Preview</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Common Resolutions Info */}
            <section className="py-8 bg-surface border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-xl font-bold text-text mb-6">Resoluciones Comunes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: '4K Ultra HD', res: '3840 x 2160', ratio: '16:9' },
                            { name: 'Full HD', res: '1920 x 1080', ratio: '16:9' },
                            { name: 'HD', res: '1280 x 720', ratio: '16:9' },
                            { name: 'Instagram Square', res: '1080 x 1080', ratio: '1:1' },
                            { name: 'Instagram Story', res: '1080 x 1920', ratio: '9:16' },
                            { name: 'TikTok', res: '1080 x 1920', ratio: '9:16' },
                            { name: 'YouTube Shors', res: '1080 x 1920', ratio: '9:16' },
                            { name: 'Standard SD', res: '640 x 480', ratio: '4:3' },
                        ].map((item, idx) => (
                            <div key={idx} className="p-4 bg-background border border-gray-100 rounded-xl hover:border-primary/30 transition-all cursor-pointer"
                                onClick={() => {
                                    const [w, h] = item.res.split(' x ').map(Number);
                                    const [rw, rh] = item.ratio.split(':').map(Number);
                                    setWidth(w);
                                    setHeight(h);
                                    setRatioW(rw);
                                    setRatioH(rh);
                                    toast.success(`Cargado: ${item.name}`);
                                }}
                            >
                                <div className="font-semibold text-text text-sm mb-1">{item.name}</div>
                                <div className="text-xs text-text/60 font-mono mb-1">{item.res}</div>
                                <div className="text-[10px] text-primary bg-primary/5 inline-block px-2 py-0.5 rounded">{item.ratio}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
