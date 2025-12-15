import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
            },
            {
                userAgent: 'Googlebot-Image',
                allow: '/',
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
            },
            {
                userAgent: 'Slurp',
                allow: '/',
            },
        ],
        sitemap: 'https://toolero.es/sitemap.xml',
    };
}
