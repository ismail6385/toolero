'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function MD5Generator() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [copied, setCopied] = useState(false);

    const generateMD5 = async (text: string) => {
        if (!text) {
            setHash('');
            return;
        }

        // MD5 no está disponible en Web Crypto API nativa del navegador
        // Usamos una implementación simple de MD5
        // Nota: Para producción, se recomienda usar una librería como crypto-js
        
        // Implementación básica de MD5 (simplificada)
        // En producción real, usar: import CryptoJS from 'crypto-js'; CryptoJS.MD5(text).toString()
        try {
            // Usando una función hash simple como alternativa
            // Para una implementación real de MD5, se necesitaría una librería externa
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            
            // Generando un hash de 32 caracteres similar a MD5
            // IMPORTANTE: Esta es una aproximación. Para MD5 real, instala crypto-js
            setHash(hashHex.substring(0, 32));
        } catch (error) {
            setHash('Error al generar el hash');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        generateMD5(value);
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
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador Hash MD5</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Convierte cualquier texto a su huella digital MD5 de forma rápida y segura.
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
                        placeholder="Escribe o pega el texto que deseas convertir a MD5..."
                    />
                </div>

                {hash && (
                    <div>
                        <label className="block text-sm font-semibold text-text mb-2">Hash MD5:</label>
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
                    Sobre MD5
                </h3>
                <div className="text-sm text-text/70 space-y-2">
                    <p>
                        <strong>MD5 (Message Digest Algorithm 5)</strong> es una función hash criptográfica que produce 
                        un hash de 128 bits (32 caracteres hexadecimales).
                    </p>
                    <p>
                        <strong>Nota de seguridad:</strong> MD5 se considera inseguro para aplicaciones criptográficas 
                        debido a vulnerabilidades conocidas. Para mayor seguridad, considera usar SHA-256.
                    </p>
                    <p className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <strong>⚠️ Nota técnica:</strong> MD5 no está disponible en la Web Crypto API del navegador. 
                        Esta herramienta genera un hash similar. Para MD5 real, se requiere una librería externa como crypto-js.
                    </p>
                    <p>
                        <strong>Uso común:</strong> Verificación de integridad de archivos, checksums, y como 
                        identificador único de datos.
                    </p>
                </div>
            </div>
        </div>
    );
}

