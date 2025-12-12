'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faFileCode, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function HtaccessGenerator() {
    const [config, setConfig] = useState({
        protectDirectory: false,
        directoryPath: '',
        redirectHttpToHttps: false,
        redirectWww: false,
        redirectToWww: true,
        blockIPs: false,
        blockedIPs: '',
        customErrorPages: false,
        error404: '',
        error500: '',
        enableCors: false,
        corsOrigin: '*',
        disableDirectoryListing: true,
        enableCompression: true,
        customRules: ''
    });

    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);

    const generateHtaccess = () => {
        let rules: string[] = [];

        // Protección de directorio
        if (config.protectDirectory && config.directoryPath) {
            rules.push(`# Protección de directorio`);
            rules.push(`<Directory "${config.directoryPath}">`);
            rules.push(`    Options -Indexes`);
            rules.push(`    AllowOverride All`);
            rules.push(`</Directory>`);
            rules.push('');
        }

        // Redirección HTTP a HTTPS
        if (config.redirectHttpToHttps) {
            rules.push(`# Redirección HTTP a HTTPS`);
            rules.push(`RewriteEngine On`);
            rules.push(`RewriteCond %{HTTPS} off`);
            rules.push(`RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`);
            rules.push('');
        }

        // Redirección WWW
        if (config.redirectWww) {
            rules.push(`# Redirección WWW`);
            rules.push(`RewriteEngine On`);
            if (config.redirectToWww) {
                rules.push(`RewriteCond %{HTTP_HOST} !^www\\. [NC]`);
                rules.push(`RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`);
            } else {
                rules.push(`RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]`);
                rules.push(`RewriteRule ^(.*)$ https://%1%{REQUEST_URI} [L,R=301]`);
            }
            rules.push('');
        }

        // Bloquear IPs
        if (config.blockIPs && config.blockedIPs) {
            rules.push(`# Bloquear IPs`);
            const ips = config.blockedIPs.split('\n').filter(ip => ip.trim());
            ips.forEach(ip => {
                rules.push(`<RequireAll>`);
                rules.push(`    Require all granted`);
                rules.push(`    Require not ip ${ip.trim()}`);
                rules.push(`</RequireAll>`);
            });
            rules.push('');
        }

        // Páginas de error personalizadas
        if (config.customErrorPages) {
            rules.push(`# Páginas de error personalizadas`);
            if (config.error404) {
                rules.push(`ErrorDocument 404 ${config.error404}`);
            }
            if (config.error500) {
                rules.push(`ErrorDocument 500 ${config.error500}`);
            }
            rules.push('');
        }

        // CORS
        if (config.enableCors) {
            rules.push(`# Habilitar CORS`);
            rules.push(`<IfModule mod_headers.c>`);
            rules.push(`    Header set Access-Control-Allow-Origin "${config.corsOrigin}"`);
            rules.push(`    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"`);
            rules.push(`    Header set Access-Control-Allow-Headers "Content-Type"`);
            rules.push(`</IfModule>`);
            rules.push('');
        }

        // Deshabilitar listado de directorios
        if (config.disableDirectoryListing) {
            rules.push(`# Deshabilitar listado de directorios`);
            rules.push(`Options -Indexes`);
            rules.push('');
        }

        // Compresión
        if (config.enableCompression) {
            rules.push(`# Habilitar compresión`);
            rules.push(`<IfModule mod_deflate.c>`);
            rules.push(`    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json`);
            rules.push(`</IfModule>`);
            rules.push('');
        }

        // Reglas personalizadas
        if (config.customRules) {
            rules.push(`# Reglas personalizadas`);
            rules.push(config.customRules);
            rules.push('');
        }

        setGenerated(rules.join('\n'));
    };

    const handleCopy = () => {
        if (generated) {
            navigator.clipboard.writeText(generated);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (generated) {
            const blob = new Blob([generated], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '.htaccess';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const handleChange = (field: keyof typeof config, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FontAwesomeIcon icon={faFileCode} className="text-2xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-text mb-2">Generador .htaccess</h1>
                <p className="text-text/60 max-w-2xl mx-auto">
                    Crea archivos .htaccess para proteger directorios, redireccionar y configurar tu servidor Apache.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileCode} className="text-primary" />
                        Configuración
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.protectDirectory}
                                    onChange={(e) => handleChange('protectDirectory', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Proteger Directorio</span>
                            </label>
                            {config.protectDirectory && (
                                <input
                                    type="text"
                                    value={config.directoryPath}
                                    onChange={(e) => handleChange('directoryPath', e.target.value)}
                                    placeholder="/var/www/html/protected"
                                    className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                />
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.redirectHttpToHttps}
                                    onChange={(e) => handleChange('redirectHttpToHttps', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Redireccionar HTTP a HTTPS</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.redirectWww}
                                    onChange={(e) => handleChange('redirectWww', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Redirección WWW</span>
                            </label>
                            {config.redirectWww && (
                                <div className="mt-2 space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={config.redirectToWww}
                                            onChange={() => handleChange('redirectToWww', true)}
                                            className="text-primary"
                                        />
                                        <span className="text-sm text-text">Redirigir a www</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={!config.redirectToWww}
                                            onChange={() => handleChange('redirectToWww', false)}
                                            className="text-primary"
                                        />
                                        <span className="text-sm text-text">Redirigir desde www</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.blockIPs}
                                    onChange={(e) => handleChange('blockIPs', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Bloquear IPs</span>
                            </label>
                            {config.blockIPs && (
                                <textarea
                                    value={config.blockedIPs}
                                    onChange={(e) => handleChange('blockedIPs', e.target.value)}
                                    placeholder="192.168.1.1&#10;10.0.0.1"
                                    rows={3}
                                    className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none font-mono text-sm"
                                />
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.customErrorPages}
                                    onChange={(e) => handleChange('customErrorPages', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Páginas de Error Personalizadas</span>
                            </label>
                            {config.customErrorPages && (
                                <div className="mt-2 space-y-2">
                                    <input
                                        type="text"
                                        value={config.error404}
                                        onChange={(e) => handleChange('error404', e.target.value)}
                                        placeholder="/404.html"
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    />
                                    <input
                                        type="text"
                                        value={config.error500}
                                        onChange={(e) => handleChange('error500', e.target.value)}
                                        placeholder="/500.html"
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.enableCors}
                                    onChange={(e) => handleChange('enableCors', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Habilitar CORS</span>
                            </label>
                            {config.enableCors && (
                                <input
                                    type="text"
                                    value={config.corsOrigin}
                                    onChange={(e) => handleChange('corsOrigin', e.target.value)}
                                    placeholder="* o https://ejemplo.com"
                                    className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                                />
                            )}
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.disableDirectoryListing}
                                    onChange={(e) => handleChange('disableDirectoryListing', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Deshabilitar Listado de Directorios</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.enableCompression}
                                    onChange={(e) => handleChange('enableCompression', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-text font-semibold">Habilitar Compresión</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text mb-2">Reglas Personalizadas</label>
                            <textarea
                                value={config.customRules}
                                onChange={(e) => handleChange('customRules', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none font-mono text-sm"
                                placeholder="# Tus reglas personalizadas aquí..."
                            />
                        </div>

                        <button
                            onClick={generateHtaccess}
                            className="w-full px-6 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md"
                        >
                            Generar .htaccess
                        </button>
                    </div>
                </div>

                <div className="bg-surface rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-text flex items-center gap-2">
                            <FontAwesomeIcon icon={faFileCode} className="text-primary" />
                            Código Generado
                        </h2>
                        {generated && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-background hover:bg-gray-100 text-text font-semibold rounded-xl border border-gray-200 transition-colors text-sm"
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                    Descargar
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
                                >
                                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                                    {copied ? 'Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="bg-background rounded-xl p-4 border border-gray-200 overflow-auto max-h-[800px]">
                        {generated ? (
                            <pre className="text-sm text-text font-mono whitespace-pre-wrap">{generated}</pre>
                        ) : (
                            <p className="text-text/50 text-center py-8">Configura las opciones y haz clic en "Generar .htaccess"</p>
                        )}
                    </div>
                    <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm text-text/70">
                            <strong className="text-primary">💡 Instrucciones:</strong> Copia el código generado y guárdalo como 
                            <code className="bg-background px-2 py-1 rounded text-xs mx-1">.htaccess</code> en el directorio raíz de tu sitio web.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

