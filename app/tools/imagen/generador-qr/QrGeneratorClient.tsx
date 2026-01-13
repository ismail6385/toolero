'use client';

import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faDownload, faLink, faFont, faWifi, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function QrGeneratorClient() {
    const [text, setText] = useState('https://toolero.es');
    const [type, setType] = useState<'url' | 'text' | 'wifi' | 'email'>('url');
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const canvasRef = useRef<HTMLDivElement>(null);

    // Wifi/Email specific states
    const [wifiSsid, setWifiSsid] = useState('');
    const [wifiPass, setWifiPass] = useState('');
    const [wifiHidden, setWifiHidden] = useState(false);
    const [emailAddr, setEmailAddr] = useState('');

    // Construct final text based on type
    const getFinalText = () => {
        if (type === 'wifi') {
            return `WIFI:T:WPA;S:${wifiSsid};P:${wifiPass};H:${wifiHidden};;`;
        }
        if (type === 'email') {
            return `mailto:${emailAddr}`;
        }
        return text;
    };

    const downloadQr = () => {
        const canvas = canvasRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = `qrcode_${new Date().getTime()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-gray-900 rounded-full mb-4 text-white">
                    <FontAwesomeIcon icon={faQrcode} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Códigos QR</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Crea QRs personalizados para cualquier propósito. 100% Gratuito.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">

                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-8">
                        {/* Type Selector */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {[
                                { id: 'url', icon: faLink, label: 'URL' },
                                { id: 'text', icon: faFont, label: 'Texto' },
                                { id: 'wifi', icon: faWifi, label: 'WiFi' },
                                { id: 'email', icon: faEnvelope, label: 'Email' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setType(t.id as any)}
                                    className={`px-4 py-2 rounded-xl font-bold border transition-all flex items-center gap-2 ${type === t.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-text/60 hover:bg-gray-100'}`}
                                >
                                    <FontAwesomeIcon icon={t.icon} />
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Inputs */}
                        <div className="space-y-4 mb-8">
                            {type === 'url' && (
                                <div>
                                    <label className="block text-sm font-bold text-text mb-2">Ingresa la URL</label>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
                                        placeholder="https://ejemplo.com"
                                    />
                                </div>
                            )}
                            {type === 'text' && (
                                <div>
                                    <label className="block text-sm font-bold text-text mb-2">Ingresa el Texto</label>
                                    <textarea
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none h-32 resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>
                            )}
                            {type === 'wifi' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold text-text mb-2">Nombre de la Red (SSID)</label>
                                        <input
                                            type="text"
                                            value={wifiSsid}
                                            onChange={e => setWifiSsid(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-text mb-2">Contraseña</label>
                                        <input
                                            type="text"
                                            value={wifiPass}
                                            onChange={e => setWifiPass(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={wifiHidden}
                                            onChange={e => setWifiHidden(e.target.checked)}
                                            className="w-4 h-4 rounded text-black focus:ring-black"
                                        />
                                        <span className="text-sm">Red Oculta</span>
                                    </label>
                                </>
                            )}
                            {type === 'email' && (
                                <div>
                                    <label className="block text-sm font-bold text-text mb-2">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        value={emailAddr}
                                        onChange={e => setEmailAddr(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none"
                                        placeholder="usuario@ejemplo.com"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Styles */}
                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-text/50 mb-2">Color QR</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={fgColor}
                                            onChange={e => setFgColor(e.target.value)}
                                            className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200 p-1"
                                        />
                                        <span className="text-sm font-mono text-text/60">{fgColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-text/50 mb-2">Fondo</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={e => setBgColor(e.target.value)}
                                            className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200 p-1"
                                        />
                                        <span className="text-sm font-mono text-text/60">{bgColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-5">
                    <div className="bg-surface rounded-2xl shadow-xl border border-gray-200 p-8 h-full flex flex-col items-center justify-center text-center sticky top-24">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8" ref={canvasRef}>
                            <QRCodeCanvas
                                value={getFinalText()}
                                size={size}
                                fgColor={fgColor}
                                bgColor={bgColor}
                                level={'H'}
                                includeMargin={true}
                            />
                        </div>

                        <button
                            onClick={downloadQr}
                            className="w-full max-w-xs py-4 bg-gray-900 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={faDownload} /> Descargar QR
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
