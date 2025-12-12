'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faClock, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function PasswordStrength() {
    const [password, setPassword] = useState('');

    const analysis = useMemo(() => {
        if (!password) {
            return {
                score: 0,
                strength: 'Sin evaluar',
                color: 'text-gray-500',
                bgColor: 'bg-gray-100',
                timeToCrack: 'N/A',
                checks: {
                    length: false,
                    uppercase: false,
                    lowercase: false,
                    numbers: false,
                    symbols: false,
                    common: false
                },
                suggestions: []
            };
        }

        const checks = {
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            symbols: /[^a-zA-Z0-9]/.test(password),
            common: !['password', '12345678', 'qwerty', 'abc123', 'password123'].some(common => password.toLowerCase().includes(common))
        };

        let score = 0;
        if (checks.length) score += 2;
        if (checks.uppercase) score += 1;
        if (checks.lowercase) score += 1;
        if (checks.numbers) score += 1;
        if (checks.symbols) score += 2;
        if (checks.common) score += 1;

        if (password.length >= 16) score += 1;
        if (password.length >= 20) score += 1;

        let strength = '';
        let color = '';
        let bgColor = '';
        let timeToCrack = '';

        if (score <= 2) {
            strength = 'Muy Débil';
            color = 'text-red-600';
            bgColor = 'bg-red-50';
            timeToCrack = '< 1 segundo';
        } else if (score <= 4) {
            strength = 'Débil';
            color = 'text-orange-600';
            bgColor = 'bg-orange-50';
            timeToCrack = '1 minuto - 1 hora';
        } else if (score <= 6) {
            strength = 'Media';
            color = 'text-yellow-600';
            bgColor = 'bg-yellow-50';
            timeToCrack = '1 hora - 1 día';
        } else if (score <= 8) {
            strength = 'Fuerte';
            color = 'text-blue-600';
            bgColor = 'bg-blue-50';
            timeToCrack = '1 día - 1 mes';
        } else {
            strength = 'Muy Fuerte';
            color = 'text-green-600';
            bgColor = 'bg-green-50';
            timeToCrack = 'Años o décadas';
        }

        const suggestions = [];
        if (!checks.length) suggestions.push('Usa al menos 12 caracteres');
        if (!checks.uppercase) suggestions.push('Añade letras mayúsculas');
        if (!checks.lowercase) suggestions.push('Añade letras minúsculas');
        if (!checks.numbers) suggestions.push('Incluye números');
        if (!checks.symbols) suggestions.push('Añade símbolos especiales');
        if (!checks.common) suggestions.push('Evita palabras comunes');

        return {
            score,
            strength,
            color,
            bgColor,
            timeToCrack,
            checks,
            suggestions
        };
    }, [password]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Verificador de Fortaleza</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Analiza qué tan segura es tu contraseña y cuánto tiempo tardaría en ser descifrada.
                </p>
            </div>

            <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6 mb-6">
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-text mb-2">Ingresa tu contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
                        placeholder="Escribe tu contraseña aquí..."
                    />
                    <p className="text-xs text-text/50 mt-2">
                        ⚠️ Tu contraseña se analiza localmente en tu navegador. No se envía a ningún servidor.
                    </p>
                </div>

                {password && (
                    <>
                        <div className={`${analysis.bgColor} rounded-xl p-6 mb-6 border-2 ${analysis.color.replace('text-', 'border-')}`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-text mb-1">Fortaleza: {analysis.strength}</h3>
                                    <p className="text-sm text-text/60">Puntuación: {analysis.score}/10</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-sm text-text/60 mb-1">
                                        <FontAwesomeIcon icon={faClock} />
                                        <span>Tiempo estimado para descifrar:</span>
                                    </div>
                                    <p className={`text-lg font-bold ${analysis.color}`}>{analysis.timeToCrack}</p>
                                </div>
                            </div>
                            <div className="w-full bg-background rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${analysis.color.replace('text-', 'bg-')}`}
                                    style={{ width: `${(analysis.score / 10) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <h4 className="font-semibold text-text mb-3">Verificaciones:</h4>
                            <div className="space-y-2">
                                <CheckItem
                                    label="Al menos 12 caracteres"
                                    passed={analysis.checks.length}
                                />
                                <CheckItem
                                    label="Contiene mayúsculas"
                                    passed={analysis.checks.uppercase}
                                />
                                <CheckItem
                                    label="Contiene minúsculas"
                                    passed={analysis.checks.lowercase}
                                />
                                <CheckItem
                                    label="Contiene números"
                                    passed={analysis.checks.numbers}
                                />
                                <CheckItem
                                    label="Contiene símbolos"
                                    passed={analysis.checks.symbols}
                                />
                                <CheckItem
                                    label="No es una contraseña común"
                                    passed={analysis.checks.common}
                                />
                            </div>
                        </div>

                        {analysis.suggestions.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <h4 className="font-semibold text-yellow-800 mb-2">Sugerencias para mejorar:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                                    {analysis.suggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-primary" />
                    Información sobre el análisis
                </h3>
                <p className="text-sm text-text/70 mb-3">
                    El tiempo estimado para descifrar se basa en un ataque de fuerza bruta estándar. 
                    Contraseñas más largas y complejas requieren significativamente más tiempo.
                </p>
                <p className="text-sm text-text/70">
                    <strong>Importante:</strong> Este análisis se realiza completamente en tu navegador. 
                    Tu contraseña nunca abandona tu dispositivo.
                </p>
            </div>
        </div>
    );
}

function CheckItem({ label, passed }: { label: string; passed: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <FontAwesomeIcon
                icon={passed ? faCheckCircle : faTimesCircle}
                className={passed ? 'text-green-600' : 'text-red-600'}
            />
            <span className={passed ? 'text-text' : 'text-text/60'}>{label}</span>
        </div>
    );
}

