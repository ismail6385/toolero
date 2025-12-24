import React from 'react';

export default function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Toolero',
        url: 'https://www.toolero.com',
        logo: 'https://www.toolero.com/logo.png', // Placeholder
        sameAs: [
            'https://twitter.com/toolero',
            'https://facebook.com/toolero'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: 'customer service',
            email: 'contact@toolero.com'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
