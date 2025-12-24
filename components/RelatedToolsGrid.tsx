import Link from 'next/link';
import { toolsData } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RelatedToolsGridProps {
    categorySlug: string;
    currentToolHref?: string;
}

export default function RelatedToolsGrid({ categorySlug, currentToolHref }: RelatedToolsGridProps) {
    const category = toolsData.find(c => c.slug === categorySlug);
    if (!category) return null;

    // Filter out current tool
    const relatedTools = category.tools
        .filter(t => t.href !== currentToolHref)
        .slice(0, 6); // Max 6

    if (relatedTools.length === 0) return null;

    return (
        <section className="mt-16 pt-12 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Más herramientas de <span className={category.color}>{category.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map((tool) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${category.color.replace('text-', 'bg-').replace('600', '50').replace('500', '50')} ${category.color}`}>
                                <FontAwesomeIcon icon={tool.icon} />
                            </div>
                            <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                {tool.title}
                            </h4>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href={`/tools/${category.slug}`}
                    className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Más herramientas de {category.name}
                    <span>→</span>
                </Link>
            </div>
        </section>
    );
}
