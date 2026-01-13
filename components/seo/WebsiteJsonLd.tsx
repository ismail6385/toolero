import React from 'react';

export default function WebsiteJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Toolero',
        url: 'https://toolero.es',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://toolero.es/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
