import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faLayerGroup,
    faPalette
} from '@fortawesome/free-solid-svg-icons';
import { toolsData } from '@/data/tools';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Herramientas de Color y Diseño - Toolero.es',
    description: 'Generadores y conversores de color gratuitos: paletas, degradados, contraste, HEX a RGB y más para diseñadores y desarrolladores.',
};

export default function ColorToolsPage() {
    const category = toolsData.find(c => c.slug === 'color');

    if (!category) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
                <div className="absolute top-0 -right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm" aria-label="Breadcrumb">
                        <ol className="flex items-center justify-center space-x-2 text-text/60">
                            <li><Link href="/" className="hover:text-pink-600 transition-colors">Inicio</Link></li>
                            <li><FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" /></li>
                            <li><Link href="/categorias" className="hover:text-pink-600 transition-colors">Categorías</Link></li>
                            <li><FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" /></li>
                            <li>
                                <span className="text-pink-600 font-semibold" aria-current="page">
                                    {category.name}
                                </span>
                            </li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={category.icon} className="mr-2" />
                            {category.name}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas de <span className="text-pink-600">Color y Diseño</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            {category.description} Generadores, conversores y utilidades para diseñadores.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-pink-600 mb-1">{category.tools.length}</div>
                            <div className="text-xs text-text/60 font-semibold">Herramientas</div>
                        </div>
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-pink-600 mb-1">RGB/HEX</div>
                            <div className="text-xs text-text/60 font-semibold">Formatos</div>
                        </div>
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-pink-600 mb-1">100%</div>
                            <div className="text-xs text-text/60 font-semibold">Gratuito</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-text mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-pink-600" />
                            Todas las Herramientas
                        </h2>
                        <p className="text-text/60 text-sm">Colección completa de {category.name}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </section>
        </div>
    );
}
