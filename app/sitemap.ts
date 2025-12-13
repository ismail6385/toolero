import { MetadataRoute } from 'next';
import { toolsData } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://toolero.es';

    // Homepage
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/categorias`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Add all category pages
    toolsData.forEach((category) => {
        routes.push({
            url: `${baseUrl}/tools/${category.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        });

        // Add all tool pages
        category.tools.forEach((tool) => {
            routes.push({
                url: `${baseUrl}${tool.href}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return routes;
}
