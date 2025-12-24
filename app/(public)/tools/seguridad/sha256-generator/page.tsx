'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function SHA256Generator() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    const generateSHA256 = async (text: string) => {
        if (!text) {
            setHash('');
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHash(hashHex);
        } catch (error) {
            console.error('Error generating SHA-256:', error);
            setHash('Error al generar el hash');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        generateSHA256(value);
    };

    const handleCopy = () => {
        if (hash) {
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInput('');
        setHash('');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faLock} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador Hash SHA-256</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Genera hashes SHA-256 seguros para verificar la integridad de datos.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-text">Texto de Entrada</label>
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-2 text-sm text-text/60 hover:text-text transition-colors"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            Limpiar
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none font-mono text-sm"
                        placeholder="Escribe o pega el texto que deseas convertir a SHA-256..."
                    />
                </div>

                {hash && (
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">Hash SHA-256:</label>
                        <div className="bg-background rounded-xl p-4 border border-gray-200 mb-4">
                            <div className="font-mono text-sm text-text break-all select-all">
                                {hash}
                            </div>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                        >
                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                            {copied ? 'Copiado!' : 'Copiar Hash'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLock} className="text-primary" />
                    Sobre SHA-256
                </h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        <strong>SHA-256 (Secure Hash Algorithm 256-bit)</strong> es una función hash criptográfica 
                        que produce un hash de 256 bits (64 caracteres hexadecimales).
                    </p>
                    <p>
                        <strong>Seguridad:</strong> SHA-256 es considerado seguro y es ampliamente utilizado en 
                        aplicaciones criptográficas modernas, incluyendo Bitcoin y certificados SSL/TLS.
                    </p>
                    <p>
                        <strong>Uso común:</strong> Verificación de integridad de archivos, firmas digitales, 
                        blockchain, y almacenamiento seguro de contraseñas.
                    </p>
                    <p className="mt-3 p-3 bg-background rounded-lg border border-primary/20">
                        <strong>✅ Ventaja:</strong> Este hash se genera completamente en tu navegador usando 
                        la Web Crypto API. Tus datos nunca abandonan tu dispositivo.
                    </p>
                </div>
            </div>
        </div>
    );
}

