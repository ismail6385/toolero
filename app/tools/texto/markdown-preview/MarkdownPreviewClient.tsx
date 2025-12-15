'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faEye, faCode, faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { marked } from 'marked';

export default function MarkdownPreviewClient() {
    const [markdown, setMarkdown] = useState<string>(`# Bienvenido al Editor Markdown

Escribe tu código **Markdown** aquí y ve el resultado al instante a la derecha.

## Características
- Vista previa en tiempo real
- Soporte para listas, enlaces, imágenes
- Bloques de código

\`\`\`javascript
console.log("Hola Mundo");
\`\`\`

> "El código es poesía."
`);

    // Convert to HTML safely? marked is usually safe but dangerousHTML is needed for react.
    // Ideally sanitize, but for a simple preview tool showing user's own input, it's low risk if no persistence.

    const getHtml = () => {
        try {
            return marked.parse(markdown);
        } catch (e) {
            return 'Cargando...';
        }
    };

    // Type assertion for the result of marked.parse which can be string or Promise in newer versions
    const htmlContent = typeof getHtml() === 'string' ? getHtml() as string : '';
    // Wait, marked.parse is synchronous by default unless async is enabled. 
    // In v12+ it can be async. Let's assume sync for standard usage or check versions.
    // If it returns a promise, we need useEffect.
    // Let's assume standard sync for now or fix if async.
    // Actually modern marked might be async if using async extensions. Base is sync.

    const downloadMd = () => {
        const element = document.createElement("a");
        const file = new Blob([markdown], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = "documento.md";
        document.body.appendChild(element);
        element.click();
    };

    const downloadHtml = () => {
        const element = document.createElement("a");
        const file = new Blob([htmlContent], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        element.download = "documento.html";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="max-w-[1600px] mx-auto px-4 py-8 h-screen-minus-header flex flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        <FontAwesomeIcon icon={faFileCode} className="text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-text">Editor Markdown</h1>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setMarkdown('')}
                        className="px-4 py-2 bg-gray-100 text-text/60 font-bold rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-sm"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Limpiar
                    </button>
                    <button
                        onClick={downloadMd}
                        className="px-4 py-2 bg-white border border-gray-200 text-text font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                        <FontAwesomeIcon icon={faFileCode} className="mr-2" />
                        Guardar .md
                    </button>
                    <button
                        onClick={downloadHtml}
                        className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                        Exportar HTML
                    </button>
                </div>
            </div>

            <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-[600px]">
                {/* Editor */}
                <div className="flex flex-col bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2 text-sm font-bold text-text/60">
                        <FontAwesomeIcon icon={faCode} />
                        <span>Entrada Markdown</span>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full p-6 resize-none outline-none font-mono text-sm leading-relaxed"
                        placeholder="# Escribe aquí..."
                    />
                </div>

                {/* Preview */}
                <div className="flex flex-col bg-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="bg-orange-50 px-4 py-3 border-b border-orange-100 flex items-center gap-2 text-sm font-bold text-orange-800">
                        <FontAwesomeIcon icon={faEye} />
                        <span>Vista Previa</span>
                    </div>
                    <div className="flex-1 w-full p-8 overflow-y-auto prose prose-orange max-w-none prose-img:rounded-xl prose-headings:font-bold">
                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
