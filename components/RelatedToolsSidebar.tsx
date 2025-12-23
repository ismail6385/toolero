import Link from 'next/link';
import { toolsData } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RelatedToolsSidebar({ slug }: { slug: string }) {
    const category = toolsData.find(c => c.slug === slug);
    if (!category) return null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className={`w-1 h-6 rounded-full bg-indigo-600`}></span>
                Más de {category.name}
            </h3>
            <div className="space-y-2">
                {category.tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100">
                        <div className="text-lg bg-gray-100 w-8 h-8 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform text-gray-500">
                            <FontAwesomeIcon icon={tool.icon} className="w-4 h-4" />
                        </div>
                        <div className="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors text-sm leading-tight">
                            {tool.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
