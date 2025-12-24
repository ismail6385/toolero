'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { toolsData } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Don't show on home
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    // Map segments to readable names
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;

        // Default name is capitalized segment
        let name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        // Try to find better name in toolsData
        if (index === 1 && segments[0] === 'tools') {
            // Category level
            const category = toolsData.find(c => c.slug === segment);
            if (category) name = category.name;
        } else if (index === 2 && segments[0] === 'tools') {
            // Tool level
            // Need to search in all categories for this tool slug
            // Or simpler: We are in a category, find tool in that category
            const categorySlug = segments[1];
            const category = toolsData.find(c => c.slug === categorySlug);
            const tool = category?.tools.find(t => t.href === href);
            if (tool) name = tool.title;
        } else if (segment === 'tools') {
            name = 'Herramientas';
        }

        return { name, href };
    });

    // Add Home
    const allBreadcrumbs = [
        { name: 'Inicio', href: '/' },
        ...breadcrumbs
    ];

    // Prepare Schema Items
    const schemaItems = allBreadcrumbs.map(b => ({
        name: b.name,
        url: b.href
    }));

    return (
        <nav aria-label="Breadcrumb" className="w-full bg-gray-50 border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8 mb-6">
            <BreadcrumbJsonLd items={schemaItems} />
            <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500 max-w-7xl mx-auto">
                {allBreadcrumbs.map((crumb, index) => {
                    const isLast = index === allBreadcrumbs.length - 1;

                    return (
                        <li key={crumb.href} className="flex items-center">
                            {index > 0 && (
                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mx-2 text-gray-300" />
                            )}

                            {isLast ? (
                                <span className="font-medium text-gray-900 line-clamp-1 max-w-[200px] sm:max-w-none" aria-current="page">
                                    {crumb.name}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                                >
                                    {index === 0 && <FontAwesomeIcon icon={faHome} className="w-3 h-3" />}
                                    <span>{crumb.name}</span>
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
