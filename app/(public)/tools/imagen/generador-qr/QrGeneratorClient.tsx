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

            {/* SEO Content Section */}
            <div className="mt-16 space-y-12">
                {/* Features Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Generador de Códigos QR: Rápido, Gratis y Personalizable</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">✓</div>
                            <h3 className="font-semibold text-text mb-2">100% Gratis</h3>
                            <p className="text-sm text-text/70">Crea códigos QR ilimitados sin pagar ni registrarte.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">🎨</div>
                            <h3 className="font-semibold text-text mb-2">Personalizable</h3>
                            <p className="text-sm text-text/70">Cambia colores y tamaño para que combine con tu marca.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">📱</div>
                            <h3 className="font-semibold text-text mb-2">Múltiples Tipos</h3>
                            <p className="text-sm text-text/70">URLs, WiFi, texto, email y más opciones disponibles.</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-6">¿Para qué usar códigos QR?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">🌐 Compartir URLs</h3>
                            <p className="text-sm text-text/70">Dirige a clientes a tu sitio web, redes sociales o tienda online.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">📶 WiFi Rápido</h3>
                            <p className="text-sm text-text/70">Permite que visitantes se conecten a tu WiFi sin escribir contraseñas.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">📧 Contacto Fácil</h3>
                            <p className="text-sm text-text/70">Genera QR con tu email para que te contacten al instante.</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                            <h3 className="font-semibold text-text mb-2">📄 Menús Digitales</h3>
                            <p className="text-sm text-text/70">Perfecto para restaurantes, cafeterías y negocios.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-text mb-6">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Es gratis generar códigos QR?</h3>
                            <p className="text-text/70">Sí, puedes crear todos los códigos QR que necesites sin costo alguno.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Cómo creo un QR para WiFi?</h3>
                            <p className="text-text/70">Selecciona "WiFi", ingresa el nombre de tu red y contraseña, y descarga el QR generado.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Puedo personalizar los colores?</h3>
                            <p className="text-text/70">Sí, puedes cambiar el color del QR y del fondo para que combine con tu diseño.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-text mb-2">¿Los códigos QR expiran?</h3>
                            <p className="text-text/70">No, los códigos QR que generas son permanentes y funcionarán siempre.</p>
                        </div>
                    </div>
                </section>

                {/* Additional Info */}
                <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-text mb-4">Crea Códigos QR Profesionales Online</h2>
                    <div className="prose prose-sm max-w-none text-text/70 space-y-3">
                        <p>
                            Nuestro <strong>generador de códigos QR</strong> te permite <strong>crear código QR</strong> de forma rápida y profesional. Ya sea que necesites <strong>generar QR</strong> para tu negocio, evento o uso personal, nuestra herramienta gratuita te ofrece todas las opciones que necesitas.
                        </p>
                        <p>
                            Con nuestro <strong>generador QR online</strong>, puedes <strong>crear QR</strong> para URLs, WiFi, texto, email y más. Es perfecto para negocios que quieren <strong>hacer código QR</strong> para menús digitales, tarjetas de presentación, o compartir información de contacto rápidamente.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
