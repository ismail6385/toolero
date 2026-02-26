import React from 'react';

export default function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Toolero.es',
        alternateName: 'Toolero',
        url: 'https://toolero.es',
        logo: {
            '@type': 'ImageObject',
            url: 'https://toolero.es/images/logo.png',
            width: 200,
            height: 60
        },
        description: 'Toolero.es es la plataforma de herramientas online gratuitas líder en español. Más de 50 herramientas de texto, imagen, SEO, seguridad y finanzas sin registro.',
        foundingDate: '2024',
        inLanguage: 'es',
        knowsAbout: [
            'Herramientas online gratuitas',
            'Herramientas de texto y contenido',
            'Optimización de imágenes',
            'Generadores de schema markup SEO',
            'Herramientas de seguridad y contraseñas',
            'Herramientas de color y diseño web',
            'Calculadoras financieras',
            'Herramientas de email marketing',
            'Conversores de unidades',
            'Herramientas PDF online'
        ],
        sameAs: [
            'https://twitter.com/toolero_es',
            'https://facebook.com/toolero.es'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'contacto@toolero.es',
            availableLanguage: 'Spanish'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
