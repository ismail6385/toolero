'use client';

import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faKey, faRefresh, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let charset = '';
        if (includeUppercase) charset += uppercase;
        if (includeLowercase) charset += lowercase;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        if (charset === '') {
            setPassword('');
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const calculateStrength = () => {
        if (!password) return { level: 0, text: '', color: '' };
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (password.length >= 16) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return { level: 1, text: 'Débil', color: 'text-red-600 bg-red-50' };
        if (strength <= 4) return { level: 2, text: 'Media', color: 'text-yellow-600 bg-yellow-50' };
        if (strength <= 6) return { level: 3, text: 'Fuerte', color: 'text-blue-600 bg-blue-50' };
        return { level: 4, text: 'Muy Fuerte', color: 'text-green-600 bg-green-50' };
    };

    const strength = calculateStrength();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faKey} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador de Contraseñas</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea contraseñas seguras y aleatorias con opciones personalizables de longitud y caracteres.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-text mb-2">Longitud: {length} caracteres</label>
                    <input
                        type="range"
                        min="4"
                        max="128"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-text/50 mt-1">
                        <span>4</span>
                        <span>128</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-text">Incluir mayúsculas (A-Z)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-text">Incluir minúsculas (a-z)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-text">Incluir números (0-9)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-text">Incluir símbolos (!@#$%...)</span>
                    </label>
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md mb-4"
                >
                    <FontAwesomeIcon icon={faRefresh} />
                    Generar Contraseña
                </button>

                {password && (
                    <div className="mt-6">
                        <div className="bg-background rounded-xl p-4 border border-gray-200 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-text">Contraseña Generada:</span>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${strength.color}`}>
                                    {strength.text}
                                </span>
                            </div>
                            <div className="font-mono text-lg text-text break-all select-all">
                                {password}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCopy}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                {copied ? 'Copiado!' : 'Copiar'}
                            </button>
                            <button
                                onClick={generatePassword}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-background hover:bg-gray-100 text-text font-semibold rounded-xl border border-gray-200 transition-colors"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                                Regenerar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-primary mt-1" />
                    <div>
                        <h3 className="font-semibold text-text mb-2">Consejos de Seguridad</h3>
                        <ul className="text-sm text-text/70 space-y-1">
                            <li>• Usa contraseñas de al menos 12 caracteres</li>
                            <li>• Combina mayúsculas, minúsculas, números y símbolos</li>
                            <li>• No reutilices contraseñas en múltiples sitios</li>
                            <li>• Cambia tus contraseñas regularmente</li>
                            <li>• Considera usar un gestor de contraseñas</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

