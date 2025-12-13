import { Metadata } from 'next';

/**
 * Generate SEO-optimized metadata for tool pages
 * Use this helper in each tool's page.tsx file
 */
export function generateToolMetadata({
    title,
    description,
    keywords,
    toolPath,
    category,
}: {
    title: string;
    description: string;
    keywords: string[];
    toolPath: string;
    category?: string;
}): Metadata {
    const fullUrl = `https://toolero.es${toolPath}`;
    const fullTitle = `${title} - Herramienta Gratuita Online`;

    return {
        title: fullTitle,
        description,
        keywords: [...keywords, 'gratis', 'online', 'herramienta', 'toolero'],
        openGraph: {
            title: fullTitle,
            description,
            url: fullUrl,
            siteName: 'Toolero.es',
            locale: 'es_ES',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: fullUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

/**
 * Generate JSON-LD schema for a tool page
 */
export function generateToolSchema({
    name,
    description,
    url,
    category,
    features,
}: {
    name: string;
    description: string;
    url: string;
    category?: string;
    features?: string[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        description,
        url,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
        },
        inLanguage: 'es-ES',
        ...(features && { featureList: features }),
        ...(category && { applicationSubCategory: category }),
    };
}

/**
 * Generate breadcrumb schema for tool pages
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Example usage in a tool page:
 * 
 * // In /app/tools/texto/contador-palabras/page.tsx
 * 
 * import { generateToolMetadata, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo-helpers';
 * 
 * export const metadata = generateToolMetadata({
 *   title: 'Contador de Palabras',
 *   description: 'Cuenta palabras, caracteres, frases y estima tiempo de lectura de forma gratuita.',
 *   keywords: ['contador de palabras', 'contar palabras', 'caracteres', 'tiempo de lectura'],
 *   toolPath: '/tools/texto/contador-palabras',
 *   category: 'Texto'
 * });
 * 
 * export default function ContadorPalabras() {
 *   const toolSchema = generateToolSchema({
 *     name: 'Contador de Palabras',
 *     description: 'Herramienta gratuita para contar palabras y caracteres',
 *     url: 'https://toolero.es/tools/texto/contador-palabras',
 *     category: 'Texto',
 *     features: ['Contador de palabras', 'Contador de caracteres', 'Tiempo de lectura']
 *   });
 * 
 *   const breadcrumbSchema = generateBreadcrumbSchema([
 *     { name: 'Inicio', url: 'https://toolero.es' },
 *     { name: 'Herramientas', url: 'https://toolero.es/tools' },
 *     { name: 'Texto', url: 'https://toolero.es/tools/texto' },
 *     { name: 'Contador de Palabras', url: 'https://toolero.es/tools/texto/contador-palabras' }
 *   ]);
 * 
 *   return (
 *     <>
 *       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
 *       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 *       
 *       <div>
 *         // Your tool component
 *       </div>
 *     </>
 *   );
 * }
 */
