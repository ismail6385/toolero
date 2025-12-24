import { MetadataRoute } from 'next';
import { toolsData } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.toolero.com';

    // 1. Static Pages
    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 2. Category Pages
    const categoryPages = toolsData.map(category => ({
        url: `${baseUrl}/tools/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 3. Tool Pages
    const toolPages = toolsData.flatMap(category =>
        category.tools.map(tool => ({
            url: `${baseUrl}${tool.href}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    );

    return [...staticPages, ...categoryPages, ...toolPages];
}
