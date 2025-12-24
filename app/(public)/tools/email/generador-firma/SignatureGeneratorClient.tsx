'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faGlobe, faBuilding, faUser, faImage, faCopy, faCode } from '@fortawesome/free-solid-svg-icons';

export default function SignatureGeneratorClient() {
    const [data, setData] = useState({
        name: 'Alex Johnson',
        role: 'Marketing Manager',
        company: 'Toolero Inc.',
        phone: '+1 234 567 890',
        email: 'alex@toolero.com',
        website: 'www.toolero.com',
        address: '123 Tech Street, San Francisco, CA',
        photoUrl: 'https://via.placeholder.com/150',
        color: '#3b82f6'
    });

    const [copied, setCopied] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const update = (field: string, val: string) => setData({ ...data, [field]: val });

    const copyHtml = () => {
        if (!resultRef.current) return;
        const html = resultRef.current.innerHTML;
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyVisual = () => {
        if (!resultRef.current) return;

        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(resultRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);

        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            selection?.removeAllRanges();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Generador de Firmas de Email</h1>
                    <p className="text-blue-100 text-lg">
                        Diseña firmas profesionales compatibles con Gmail, Outlook y Apple Mail.
                    </p>
                </div>
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-9xl" />
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Form */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Información Personal</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Nombre</label>
                                <div className="flex items-center border border-gray-200 rounded px-2 bg-gray-50">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xs mr-2" />
                                    <input value={data.name} onChange={e => update('name', e.target.value)} className="w-full py-2 bg-transparent outline-none text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Cargo</label>
                                <input value={data.role} onChange={e => update('role', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Empresa</label>
                            <div className="flex items-center border border-gray-200 rounded px-2 bg-gray-50">
                                <FontAwesomeIcon icon={faBuilding} className="text-gray-400 text-xs mr-2" />
                                <input value={data.company} onChange={e => update('company', e.target.value)} className="w-full py-2 bg-transparent outline-none text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Color Principal</label>
                                <input type="color" value={data.color} onChange={e => update('color', e.target.value)} className="w-full h-10 p-1 border border-gray-200 rounded bg-gray-50 cursor-pointer" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Foto URL</label>
                                <input value={data.photoUrl} onChange={e => update('photoUrl', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Contacto</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Email</label>
                                <input value={data.email} onChange={e => update('email', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Teléfono</label>
                                <input value={data.phone} onChange={e => update('phone', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Dirección</label>
                            <input value={data.address} onChange={e => update('address', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Sitio Web</label>
                            <input value={data.website} onChange={e => update('website', e.target.value)} className="w-full p-2 border border-gray-200 rounded bg-gray-50 outline-none text-sm" />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-7 space-y-6 sticky top-6">
                    <div className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
                        <h3 className="text-gray-400 font-bold uppercase tracking-wider mb-4 text-center text-sm">Previsualización en vivo</h3>

                        {/* The Signature Container */}
                        <div className="bg-white p-6 rounded-xl shadow-lg mx-auto max-w-xl overflow-hidden">
                            <div ref={resultRef} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#333' }}>
                                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={data.photoUrl || 'https://via.placeholder.com/100'}
                                                    alt={data.name}
                                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                                                    width="100" height="100"
                                                />
                                            </td>
                                            <td style={{ borderLeft: `2px solid ${data.color}`, paddingLeft: '20px', verticalAlign: 'top' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#111', marginBottom: '2px' }}>
                                                    {data.name}
                                                </div>
                                                <div style={{ color: data.color, fontWeight: 'bold', marginBottom: '8px' }}>
                                                    {data.role} | {data.company}
                                                </div>

                                                <div style={{ fontSize: '12px', color: '#555' }}>
                                                    {data.phone && (
                                                        <div style={{ marginBottom: '4px' }}>
                                                            <span style={{ color: data.color, marginRight: '5px' }}>📞</span>
                                                            <a href={`tel:${data.phone}`} style={{ textDecoration: 'none', color: '#555' }}>{data.phone}</a>
                                                        </div>
                                                    )}
                                                    {data.email && (
                                                        <div style={{ marginBottom: '4px' }}>
                                                            <span style={{ color: data.color, marginRight: '5px' }}>✉️</span>
                                                            <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', color: '#555' }}>{data.email}</a>
                                                        </div>
                                                    )}
                                                    {data.website && (
                                                        <div style={{ marginBottom: '4px' }}>
                                                            <span style={{ color: data.color, marginRight: '5px' }}>🌐</span>
                                                            <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ textDecoration: 'none', color: '#555' }}>{data.website}</a>
                                                        </div>
                                                    )}
                                                    {data.address && (
                                                        <div>
                                                            <span style={{ color: data.color, marginRight: '5px' }}>📍</span>
                                                            {data.address}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div style={{ marginTop: '16px', fontSize: '10px', color: '#999', borderTop: '1px solid #eee', paddingTop: '8px' }}>
                                    <p style={{ margin: 0 }}>This email content is intended only for the recipient. Please consider the environment before printing.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                            <button
                                onClick={copyVisual}
                                className={`px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}
                            >
                                <FontAwesomeIcon icon={copied ? faCopy : faCopy} />
                                {copied ? '¡Copiado!' : 'Copiar Firma (Para Gmail/Outlook)'}
                            </button>

                            <button
                                onClick={copyHtml}
                                className="px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <FontAwesomeIcon icon={faCode} />
                                Copiar código HTML
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            <strong>Instrucciones:</strong> Haz clic en "Copiar Firma" y luego simplemente haz CTRL+V (Pegar) en la configuración de firma de tu cliente de correo. No necesitas saber HTML.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
