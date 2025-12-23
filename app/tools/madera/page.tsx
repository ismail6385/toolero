import type { Metadata } from 'next';
import { toolsData } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const category = toolsData.find(c => c.slug === 'madera');

export const metadata: Metadata = {
    title: category ? `${category.name} - Herramientas y Calculadoras | Toolero` : 'Herramientas de Madera',
    description: category?.description || 'Herramientas de carpintería y cálculo de materiales.',
};

export default function MaderaCategoryIndex() {
    if (!category) return <div>Categoría no encontrada</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6 border-b border-gray-100 pb-8">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl bg-amber-50 ${category.color} shadow-sm border border-amber-100`}>
                    <FontAwesomeIcon icon={category.icon} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
                    <p className="text-lg text-gray-500 max-w-2xl">{category.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.tools.map((tool, index) => (
                    <ToolCard
                        key={index}
                        title={tool.title}
                        description={tool.description}
                        href={tool.href}
                        icon={tool.icon}
                    />
                ))}
            </div>
        </div>
    );
}
