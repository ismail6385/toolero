'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faGlobe, faDesktop, faMicrochip } from '@fortawesome/free-solid-svg-icons';

export default function BrowserInfoClient() {
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const na = window.navigator;
            const sc = window.screen;

            setInfo({
                userAgent: na.userAgent,
                language: na.language,
                platform: na.platform,
                vendor: na.vendor,
                cookieEnabled: na.cookieEnabled,
                onLine: na.onLine,
                screen: {
                    width: sc.width,
                    height: sc.height,
                    availWidth: sc.availWidth,
                    availHeight: sc.availHeight,
                    colorDepth: sc.colorDepth,
                    pixelDepth: sc.pixelDepth
                },
                window: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    devicePixelRatio: window.devicePixelRatio
                }
            });
        }
    }, []);

    if (!info) return <div className="p-12 text-center text-gray-500">Cargando información...</div>;

    const InfoCard = ({ title, icon, data }: any) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                <FontAwesomeIcon icon={icon} className="text-primary opacity-60" />
                {title}
            </h3>
            <div className="space-y-3 text-sm">
                {Object.entries(data).map(([k, v]: any) => (
                    <div key={k} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-dashed border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded">
                        <span className="text-gray-500 font-medium capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-mono text-gray-800 font-semibold break-all text-right max-w-full sm:max-w-[60%]">
                            {typeof v === 'boolean' ? (v ? 'Sí' : 'No') : v}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Información de tu Navegador</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Detalles técnicos sobre tu sistema, pantalla y navegador que los sitios web pueden ver.
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 text-blue-800">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                <span className="font-bold">Tu IP:</span> <span className="font-mono text-sm opacity-70">(Privada - No la rastreamos)</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Sistema & Navegador" icon={faDesktop} data={{
                    Platform: info.platform,
                    Language: info.language,
                    Cookies: info.cookieEnabled,
                    Online: info.onLine,
                    Vendor: info.vendor || 'N/A'
                }} />

                <InfoCard title="Pantalla" icon={faMicrochip} data={{
                    Resolution: `${info.screen.width} x ${info.screen.height}`,
                    Available: `${info.screen.availWidth} x ${info.screen.availHeight}`,
                    ColorDepth: `${info.screen.colorDepth} bit`,
                    PixelRatio: `${info.window.devicePixelRatio}x`
                }} />

                <InfoCard title="Ventana Actual" icon={faGlobe} data={{
                    InnerSize: `${info.window.innerWidth} x ${info.window.innerHeight}`,
                    OuterSize: 'Variable', // Security restriction generally prevents reading outer reliably if cross-origin
                }} />

                <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                        <FontAwesomeIcon icon={faGlobe} className="text-primary opacity-60" />
                        User Agent
                    </h3>
                    <code className="block bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm font-mono text-gray-600 break-all leading-relaxed">
                        {info.userAgent}
                    </code>
                </div>
            </div>
        </div>
    );
}
