'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBriefcase,
    faEnvelope,
    faPhone,
    faGlobe,
    faMapMarkerAlt,
    faImage,
    faPalette,
    faCopy,
    faCode,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
    faLinkedin,
    faTwitter,
    faFacebook,
    faInstagram,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

export default function EmailSignatureClient() {
    // State for user details
    const [details, setDetails] = useState({
        fullName: 'Alex Morgan',
        jobTitle: 'Product Designer',
        company: 'Creative Studio',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567',
        website: 'www.creativestudio.com',
        address: 'New York, NY',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        linkedin: '',
        twitter: '',
        instagram: '',
        color: '#7129cc',
    });

    const [template, setTemplate] = useState('modern'); // modern, classic, compact
    const [copied, setCopied] = useState(false);
    const signatureRef = useRef<HTMLDivElement>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const copyHtml = () => {
        if (!signatureRef.current) return;
        const html = signatureRef.current.innerHTML;
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyForGmail = () => {
        if (!signatureRef.current) return;

        // Proper way to copy rich text for Gmail/Outlook
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(signatureRef.current);

        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // --- TEMPLATES ---
    const TemplateModern = () => (
        <table cellPadding={0} cellSpacing={0} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#333' }}>
            <tbody>
                <tr>
                    <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                        <img
                            src={details.avatarUrl}
                            alt={details.fullName}
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `3px solid ${details.color}`
                            }}
                        />
                    </td>
                    <td style={{ borderLeft: `2px solid ${details.color}`, paddingLeft: '20px', verticalAlign: 'top' }}>
                        <h3 style={{ margin: '0 0 5px', fontSize: '18px', fontWeight: 'bold', color: details.color }}>{details.fullName}</h3>
                        <p style={{ margin: '0 0 10px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                            {details.jobTitle} {details.company && `| ${details.company}`}
                        </p>

                        <div style={{ fontSize: '13px' }}>
                            {details.email && (
                                <div style={{ marginBottom: '4px' }}>
                                    <span style={{ color: details.color, marginRight: '8px' }}>✉</span>
                                    <a href={`mailto:${details.email}`} style={{ color: '#555', textDecoration: 'none' }}>{details.email}</a>
                                </div>
                            )}
                            {details.phone && (
                                <div style={{ marginBottom: '4px' }}>
                                    <span style={{ color: details.color, marginRight: '8px' }}>📞</span>
                                    <a href={`tel:${details.phone}`} style={{ color: '#555', textDecoration: 'none' }}>{details.phone}</a>
                                </div>
                            )}
                            {details.website && (
                                <div style={{ marginBottom: '4px' }}>
                                    <span style={{ color: details.color, marginRight: '8px' }}>🌐</span>
                                    <a href={`https://${details.website}`} style={{ color: '#555', textDecoration: 'none' }}>{details.website}</a>
                                </div>
                            )}
                            {details.address && (
                                <div>
                                    <span style={{ color: details.color, marginRight: '8px' }}>📍</span>
                                    <span>{details.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Social Icons (Simulated text/link for email safety or use images usually, keeping simple here) */}
                        <div style={{ marginTop: '12px' }}>
                            {details.linkedin && <a href={details.linkedin} style={{ color: details.color, textDecoration: 'none', marginRight: '10px', fontSize: '12px', fontWeight: 'bold' }}>[in]</a>}
                            {details.twitter && <a href={details.twitter} style={{ color: details.color, textDecoration: 'none', marginRight: '10px', fontSize: '12px', fontWeight: 'bold' }}>[X]</a>}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );

    const TemplateClassic = () => (
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '1.5', color: '#1a1a1a' }}>
            <div style={{ borderBottom: `1px solid ${details.color}`, paddingBottom: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: details.color }}>{details.fullName}</span>
                <br />
                <span style={{ fontStyle: 'italic', fontSize: '14px' }}>{details.jobTitle} at {details.company}</span>
            </div>
            <div>
                {details.email && <div style={{ marginBottom: '2px' }}><strong>E:</strong> <a href={`mailto:${details.email}`} style={{ color: '#1a1a1a', textDecoration: 'none' }}>{details.email}</a></div>}
                {details.phone && <div style={{ marginBottom: '2px' }}><strong>P:</strong> {details.phone}</div>}
                {details.website && <div style={{ marginBottom: '2px' }}><strong>W:</strong> <a href={`https://${details.website}`} style={{ color: '#1a1a1a', textDecoration: 'none' }}>{details.website}</a></div>}
                {details.address && <div><strong>A:</strong> {details.address}</div>}
            </div>
        </div>
    );

    const TemplateCompact = () => (
        <table style={{ fontFamily: 'Verdana, sans-serif', fontSize: '12px', color: '#444' }}>
            <tbody>
                <tr>
                    <td style={{ verticalAlign: 'middle', paddingRight: '15px' }}>
                        <img
                            src={details.avatarUrl}
                            alt={details.fullName}
                            style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                        />
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: details.color, marginBottom: '4px' }}>{details.fullName}</div>
                        <div style={{ marginBottom: '4px' }}>{details.jobTitle}, {details.company}</div>
                        <div>
                            <a href={`mailto:${details.email}`} style={{ color: details.color, textDecoration: 'none' }}>{details.email}</a>
                            {details.phone && <span style={{ margin: '0 5px' }}>•</span>}
                            {details.phone}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Generador de Firmas de Email</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Diseña una firma profesional para Gmail, Outlook, Apple Mail y más.
                    Gratis, personalizable y sin marcas de agua.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Editor Sidebar (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-surface rounded-2xl shadow-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-text mb-6 flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className="text-primary" />
                            Tu Información
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Nombre Completo</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faUser} /></span>
                                        <input
                                            name="fullName" value={details.fullName} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Cargo / Puesto</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faBriefcase} /></span>
                                        <input
                                            name="jobTitle" value={details.jobTitle} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text/70">Empresa</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faBriefcase} /></span>
                                    <input
                                        name="company" value={details.company} onChange={handleInput}
                                        className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Email</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faEnvelope} /></span>
                                        <input
                                            name="email" value={details.email} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Teléfono</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faPhone} /></span>
                                        <input
                                            name="phone" value={details.phone} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Sitio Web</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faGlobe} /></span>
                                        <input
                                            name="website" value={details.website} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Ubicación</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                        <input
                                            name="address" value={details.address} onChange={handleInput}
                                            className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-text/70">URL Foto (Logo/Avatar)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-text/40"><FontAwesomeIcon icon={faImage} /></span>
                                    <input
                                        name="avatarUrl" value={details.avatarUrl} onChange={handleInput}
                                        className="w-full pl-9 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faPalette} className="text-primary" />
                                Estilo
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-text/70">Color Principal</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            name="color"
                                            value={details.color}
                                            onChange={handleInput}
                                            className="h-10 w-20 rounded cursor-pointer"
                                        />
                                        <span className="text-xs font-mono text-text/60">{details.color}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview & Actions (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Template Selector */}
                    <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                        {[
                            { id: 'modern', name: 'Moderno' },
                            { id: 'classic', name: 'Clásico' },
                            { id: 'compact', name: 'Compacto' }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTemplate(t.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${template === t.id
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-text/70 border-gray-200 hover:border-primary/50'
                                    }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>

                    {/* Preview Box */}
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-200 p-3 flex justify-between items-center">
                            <span className="text-xs font-bold text-text/50 uppercase tracking-wider">Vista Previa</span>
                        </div>
                        <div className="p-8 md:p-12 overflow-auto bg-white min-h-[300px] flex items-center justify-center">
                            <div ref={signatureRef}>
                                {template === 'modern' && <TemplateModern />}
                                {template === 'classic' && <TemplateClassic />}
                                {template === 'compact' && <TemplateCompact />}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <button
                            onClick={copyForGmail}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-primary/30"
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? '¡Copiado!' : 'Copiar Firma (Gmail/Outlook)'}
                        </button>

                        <button
                            onClick={copyHtml}
                            className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-text border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            <FontAwesomeIcon icon={faCode} />
                            Copiar Código HTML
                        </button>
                    </div>

                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100">
                        <strong>¿Cómo usarla?</strong> Haz clic en "Copiar Firma" y luego ve a la configuración de tu correo (Gmail, Outlook) y simplemente pega (Ctrl+V) en el cuadro de firma. ¡No necesitas saber HTML!
                    </div>
                </div>
            </div>
        </div>
    );
}
