'use client';

import GenericTextTool from '@/components/GenericTextTool';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

export default function HtmlCleanerClient() {
    const cleanHtml = (input: string) => {
        // Create a temporary DOM element to extract text
        // This is safe to run in browser, but we need to handle it carefully
        // or just use regex for simplicity and speed on large texts where DOM might be slow/unsafe
        // Regex is faster for simple stripping
        return input.replace(/<[^>]*>?/gm, '');
    };

    return (
        <GenericTextTool
            title="Limpiador de HTML"
            description="Elimina todas las etiquetas HTML de tu texto, dejando solo el contenido legible."
            icon={faEraser}
            onTransform={cleanHtml}
            inputLabel="Texto con HTML"
            outputLabel="Texto Plano"
        />
    );
}
