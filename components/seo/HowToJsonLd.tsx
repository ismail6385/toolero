import React from 'react';

interface HowToStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

interface HowToJsonLdProps {
    name: string;
    description: string;
    totalTime?: string; // ISO 8601 duration e.g. "PT2M" = 2 minutes
    estimatedCost?: {
        currency: string;
        value: string;
    };
    steps: HowToStep[];
    toolName?: string;
    toolUrl?: string;
}

/**
 * HowToJsonLd - Schema markup para guías paso a paso.
 * 
 * Este schema es uno de los más efectivos para AEO porque:
 * 1. Los motores de IA (ChatGPT, Gemini, Perplexity) prefieren respuestas paso a paso.
 * 2. Google lo convierte en rich snippets que aumentan CTR.
 * 3. Las queries conversacionales "cómo hacer X" son las más frecuentes en búsqueda por voz.
 * 
 * Úsalo en páginas de herramientas para describir cómo utilizar la herramienta.
 */
export default function HowToJsonLd({
    name,
    description,
    totalTime = 'PT2M',
    estimatedCost = { currency: 'EUR', value: '0' },
    steps,
    toolName,
    toolUrl
}: HowToJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        inLanguage: 'es',
        totalTime,
        estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: estimatedCost.currency,
            value: estimatedCost.value
        },
        supply: [
            {
                '@type': 'HowToSupply',
                name: 'Navegador web moderno (Chrome, Firefox, Safari o Edge)'
            },
            {
                '@type': 'HowToSupply',
                name: 'Conexión a internet'
            }
        ],
        tool: toolName
            ? [
                {
                    '@type': 'HowToTool',
                    name: toolName,
                    url: toolUrl ?? 'https://toolero.es'
                }
            ]
            : [],
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && {
                image: {
                    '@type': 'ImageObject',
                    url: step.image
                }
            }),
            ...(step.url && { url: step.url })
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
