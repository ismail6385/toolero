import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toolsData } from '@/data/tools';

export const metadata: Metadata = {
    title: 'Herramientas de Email Marketing y Productividad | Toolero',
    description: 'Generadores de firmas, enlaces mailto, analizadores de asuntos y protección contra spam para correo electrónico.',
};

export default function EmailCategoryPage() {
    const category = toolsData.find(c => c.slug === 'email');

    if (!category) {
        return <div className="p-10 text-center">Categoría no encontrada</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className={`bg-gradient-to-r from-blue-400 to-sky-500 rounded-3xl p-8 md:p-12 mb-12 text-center text-white shadow-xl relative overflow-hidden`}>
                <div className="relative z-10">
                    <div className="inline-block p-4 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
                        <FontAwesomeIcon icon={category.icon} className="text-4xl md:text-5xl text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.name}</h1>
                    <p className="text-blue-50 text-lg md:text-xl max-w-2xl mx-auto">
                        {category.description}
                    </p>
                </div>
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-sky-200 rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, index) => (
                    <Link
                        href={tool.href}
                        key={index}
                        className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors bg-blue-50 text-blue-500 group-hover:scale-110 duration-300`}>
                                <FontAwesomeIcon icon={tool.icon} />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-500 transition-colors line-clamp-1">
                                {tool.title}
                            </h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                            {tool.description}
                        </p>

                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-medium">
                            <span className="text-gray-400 group-hover:text-blue-500 transition-colors">Abrir herramienta</span>
                            <span className="text-gray-300 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
