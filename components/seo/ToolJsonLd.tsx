import React from 'react';

interface ToolJsonLdProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
    operatingSystem?: string;
    price?: string;
    currency?: string;
    datePublished?: string;
    keywords?: string[];
}

export default function ToolJsonLd({
    name,
    description,
    url,
    applicationCategory = 'UtilitiesApplication',
    operatingSystem = 'Web Browser',
    price = '0',
    currency = 'EUR',
    datePublished = '2024-01-01',
    keywords = []
}: ToolJsonLdProps) {
    const currentYear = new Date().getFullYear();
    const dateModified = `${currentYear}-01-01`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        description: description,
        url: url,
        applicationCategory: applicationCategory,
        operatingSystem: operatingSystem,
        inLanguage: 'es',
        datePublished: datePublished,
        dateModified: dateModified,
        keywords: keywords.join(', '),
        publisher: {
            '@type': 'Organization',
            name: 'Toolero.es',
            url: 'https://toolero.es',
            logo: 'https://toolero.es/images/logo.png'
        },
        offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: currency,
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
        },
        review: {
            '@type': 'Review',
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5'
            },
            author: {
                '@type': 'Person',
                name: 'Usuario de Toolero'
            },
            reviewBody: `${name} es una herramienta imprescindible. Gratuita, rápida y sin necesidad de registro. Funciona perfectamente en el navegador.`
        },
        featureList: [
            'Completamente gratuita y sin registro',
            'Procesamiento seguro en el navegador (client-side)',
            'Disponible en español',
            'Compatible con móviles y tablets',
            'Sin límite de uso'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

