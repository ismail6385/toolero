'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faCopy, faCheck, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

export default function ImageToBase64Client() {
    const [base64, setBase64] = useState('');
    const [copied, setCopied] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => setBase64(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 text-primary">
                    <FontAwesomeIcon icon={faFileCode} className="text-3xl" />
                </div>
                <h1 className="text-4xl font-bold text-text mb-4">Convertidor Imagen a Base64</h1>
                <p className="text-xl text-text/60 max-w-2xl mx-auto">
                    Transforma cualquier imagen en una cadena de texto Base64 para incrustar directamente en HTML o CSS.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div>
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors mb-4">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-4" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Sube tu imagen</span></p>
                            <p className="text-xs text-gray-500">Soporta todos los formatos</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleUpload} />
                    </label>
                    {fileName && <p className="text-center text-sm font-semibold text-primary">Archivo seleccionado: {fileName}</p>}
                </div>

                <div className="relative">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full flex flex-col shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700">Resultado Base64</h3>
                            <button
                                onClick={copyToClipboard}
                                disabled={!base64}
                                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-2 ${copied
                                        ? 'bg-green-500 text-white'
                                        : (base64 ? 'bg-primary text-white hover:bg-secondary' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
                                    }`}
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado' : 'Copiar Todo'}
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={base64}
                            placeholder="Aquí aparecerá el código Base64..."
                            className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
