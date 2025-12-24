import React from 'react';

interface ToolJsonLdProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string; // e.g., 'BusinessApplication', 'Utility', 'Multimedia'
    operatingSystem?: string;
    price?: string;
    currency?: string;
}

export default function ToolJsonLd({
    name,
    description,
    url,
    applicationCategory = 'UtilitiesApplication',
    operatingSystem = 'Web Browser',
    price = '0',
    currency = 'USD'
}: ToolJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        description: description,
        url: url,
        applicationCategory: applicationCategory,
        operatingSystem: operatingSystem,
        offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: currency,
        },
        featureList: 'Free online tool, No installation required, Secure client-side processing'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
