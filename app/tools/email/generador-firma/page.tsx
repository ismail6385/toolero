'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faUser,
    faPhone,
    faGlobe,
    faMapMarkerAlt,
    faCopy,
    faCheckCircle,
    faCode
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function EmailSignatureGenerator() {
    const [name, setName] = useState('Juan Pérez');
    const [jobTitle, setJobTitle] = useState('Marketing Manager');
    const [email, setEmail] = useState('juan@empresa.com');
    const [phone, setPhone] = useState('+34 600 000 000');
    const [website, setWebsite] = useState('www.empresa.com');
    const [address, setAddress] = useState('Madrid, España');
    const [photoUrl, setPhotoUrl] = useState('https://via.placeholder.com/100');
    const [color, setColor] = useState('#2563EB'); // Primary blue default

    // Social
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');

    const [copied, setCopied] = useState(false);
    const [viewHTML, setViewHTML] = useState(false);

    // This generates the HTML string for the signature
    const getSignatureHTML = () => {
        return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333;">
  <tbody>
    <tr>
      <td width="120" style="vertical-align: top; padding-right: 20px;">
        <img src="${photoUrl}" alt="${name}" width="100" height="auto" style="border-radius: 50%; display: block; max-width: 100px;">
      </td>
      <td style="vertical-align: top; border-left: 2px solid ${color}; padding-left: 20px;">
        <div style="font-size: 18px; font-weight: bold; color: ${color}; margin-bottom: 4px;">${name}</div>
        <div style="font-size: 14px; color: #666666; margin-bottom: 12px;">${jobTitle}</div>
        
        <div style="margin-bottom: 4px;">
          <a href="mailto:${email}" style="color: #333333; text-decoration: none;">
             ${email}
          </a>
        </div>
        
        <div style="margin-bottom: 4px;">
           ${phone}
        </div>
        
        <div style="margin-bottom: 4px;">
          <a href="https://${website}" target="_blank" style="color: ${color}; text-decoration: none; font-weight: bold;">
            ${website}
          </a>
        </div>

        ${address ? `<div style="color: #666666; margin-top: 4px;">${address}</div>` : ''}
        
        <div style="margin-top: 12px;">
           ${linkedin ? `<a href="${linkedin}" style="color: ${color}; text-decoration: none; margin-right: 10px;">LinkedIn</a>` : ''}
           ${twitter ? `<a href="${twitter}" style="color: ${color}; text-decoration: none; margin-right: 10px;">Twitter</a>` : ''}
        </div>
      </td>
    </tr>
  </tbody>
</table>
        `.trim();
    };

    const copySignature = () => {
        const html = getSignatureHTML();

        // Copy as HTML content (rich text) for email clients
        const blob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([html], { type: 'text/plain' });
        const data = [new ClipboardItem({
            "text/html": blob,
            "text/plain": textBlob
        })];

        navigator.clipboard.write(data).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback
            navigator.clipboard.writeText(html);
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email Tools
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Generador de Firmas HTML</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea una firma profesional compatible con Gmail, Outlook y Apple Mail. 100% Gratis.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8 h-fit">
                    <h2 className="text-xl font-semibold text-text mb-6">Tus Datos</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Nombre</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Cargo</label>
                            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Teléfono</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Web</label>
                            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">Color Tema</label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1 rounded-lg border border-gray-200 cursor-pointer" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-text/50 uppercase block mb-2">URL Foto (Pública)</label>
                            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-text">Vista Previa</h2>
                            <button onClick={() => setViewHTML(!viewHTML)} className="text-xs font-bold text-blue-600 hover:underline">
                                {viewHTML ? 'Ver Diseño' : 'Ver HTML'}
                            </button>
                        </div>

                        <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 mb-6 overflow-x-auto">
                            {!viewHTML ? (
                                <div dangerouslySetInnerHTML={{ __html: getSignatureHTML() }} />
                            ) : (
                                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono break-all">
                                    {getSignatureHTML()}
                                </pre>
                            )}
                        </div>

                        <button
                            onClick={copySignature}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <FontAwesomeIcon icon={copied ? faCheckCircle : faCopy} />
                            {copied ? 'Copiada al Portapapeles!' : 'Copiar Firma'}
                        </button>
                        <p className="text-xs text-center text-text/40 mt-3">
                            Pega (Ctrl+V) directamente en la configuración de firma de Gmail o Outlook.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
