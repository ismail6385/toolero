'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldAlt,
    faCheckCircle,
    faTimesCircle,
    faExclamationTriangle,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

export default function PasswordStrengthChecker() {
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const checkStrength = (pwd: string) => {
        let score = 0;
        const checks = {
            length: pwd.length >= 8,
            length12: pwd.length >= 12,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            numbers: /[0-9]/.test(pwd),
            special: /[^A-Za-z0-9]/.test(pwd)
        };

        if (checks.length) score++;
        if (checks.length12) score++;
        if (checks.uppercase) score++;
        if (checks.lowercase) score++;
        if (checks.numbers) score++;
        if (checks.special) score++;

        return { score, checks };
    };

    const { score, checks } = checkStrength(password);

    const getStrengthLabel = (s: number) => {
        if (s <= 2) return { text: 'Débil', color: 'text-red-500', bg: 'bg-red-500', width: '33%' };
        if (s <= 4) return { text: 'Media', color: 'text-yellow-500', bg: 'bg-yellow-500', width: '66%' };
        return { text: 'Fuerte', color: 'text-green-500', bg: 'bg-green-500', width: '100%' };
    };

    const label = getStrengthLabel(password ? score : 0);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-600 text-xs font-semibold uppercase tracking-wide mb-4">
                    <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                    Seguridad
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold text-text mb-4">Analizador de Contraseñas</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Verifica qué tan segura es tu contraseña sin enviarla a ningún servidor. Validación 100% local.
                </p>
            </div>

            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
                <div className="relative mb-8">
                    <input
                        type={visible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Escribe tu contraseña..."
                        className="w-full pl-6 pr-12 py-4 text-lg rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                    />
                    <button
                        onClick={() => setVisible(!visible)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                    >
                        <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                    </button>
                </div>

                {password && (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-text/60">Fortaleza:</span>
                            <span className={`text-lg font-bold ${label.color}`}>{label.text}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                            <div
                                className={`h-full transition-all duration-500 ease-out ${label.bg}`}
                                style={{ width: label.width }}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <CheckItem label="Mínimo 8 caracteres" valid={checks.length} />
                            <CheckItem label="Mínimo 12 caracteres (Recomendado)" valid={checks.length12} />
                            <CheckItem label="Letra Mayúscula" valid={checks.uppercase} />
                            <CheckItem label="Letra Minúscula" valid={checks.lowercase} />
                            <CheckItem label="Números" valid={checks.numbers} />
                            <CheckItem label="Símbolo Especial (!@#$)" valid={checks.special} />
                        </div>
                    </div>
                )}

                {!password && (
                    <div className="text-center py-8 text-text/40">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-4xl mb-4 opacity-20" />
                        <p>Escribe para comenzar el análisis</p>
                    </div>
                )}
            </div>
            <p className="text-center text-xs text-text/40 mt-6 max-w-md mx-auto">
                Nota: Esta herramienta se ejecuta completamente en tu navegador. Tu contraseña nunca se envía a través de internet.
            </p>
        </div>
    );
}

function CheckItem({ label, valid }: { label: string, valid: boolean }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${valid ? 'bg-green-50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-100 text-text/50'}`}>
            <FontAwesomeIcon icon={valid ? faCheckCircle : faTimesCircle} className={valid ? "text-green-500" : "text-gray-300"} />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
