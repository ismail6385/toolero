import React from 'react';

export default function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Toolero',
        url: 'https://toolero.es',
        logo: 'https://toolero.es/favicon.jpg',
        sameAs: [
            'https://twitter.com/toolero_es',
            'https://facebook.com/toolero.es'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: 'customer service',
            email: 'contacto@toolero.es'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
