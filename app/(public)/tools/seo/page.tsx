import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faCode,
    faRobot,
    faSitemap,
    faLink,
    faChartBar,
    faArrowRight,
    faBolt,
    faLayerGroup,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Herramientas SEO Gratuitas - Toolero.es | SERP, Meta Tags, Sitemap',
    description: 'Herramientas SEO gratuitas online: simulador SERP, generador de meta tags, robots.txt, sitemap XML y más. Optimiza tu sitio web para buscadores.',
    keywords: 'herramientas seo, serp simulator, meta tag generator, robots.txt, sitemap generator, slug cleaner, keyword density, seo online, toolero seo',
    openGraph: {
        title: 'Herramientas SEO Gratuitas - Toolero.es',
        description: 'Suite completa de herramientas SEO gratuitas para optimización y análisis web.',
        type: 'website',
    },
};

interface SeoTool {
    title: string;
    description: string;
    href: string;
    icon: any;
    featured?: boolean;
    category: string;
}

export default function SeoToolsPage() {
    const seoTools: SeoTool[] = [
        {
            title: "Simulador SERP",
            description: "Visualiza cómo aparecerá tu sitio en los resultados de búsqueda de Google (escritorio y móvil).",
            href: "/tools/seo/serp-simulator",
            icon: faSearch,
            featured: true,
            category: "Visualización"
        },
        {
            title: "Generador Meta Tags",
            description: "Crea etiquetas meta perfectas para SEO y redes sociales (Open Graph, Twitter Cards).",
            href: "/tools/seo/meta-tag-generator",
            icon: faCode,
            featured: true,
            category: "Técnico"
        },
        {
            title: "Generador Robots.txt",
            description: "Genera archivos robots.txt correctamente para controlar el rastreo de tu sitio web.",
            href: "/tools/seo/robots-txt-generator",
            icon: faRobot,
            category: "Técnico"
        },
        {
            title: "Generador Sitemap XML",
            description: "Convierte una lista de URLs en un sitemap XML válido para enviar a Google Search Console.",
            href: "/tools/seo/sitemap-generator",
            icon: faSitemap,
            featured: true,
            category: "Técnico"
        },
        {
            title: "Limpiador de SLUGs",
            description: "Convierte cualquier texto en URLs amigables para SEO (limpias, sin espacios ni caracteres especiales).",
            href: "/tools/seo/slug-cleaner",
            icon: faLink,
            category: "Contenido"
        },
        {
            title: "Densidad de Palabras Clave",
            description: "Analiza la frecuencia y densidad de palabras clave en tu texto para optimización SEO.",
            href: "/tools/seo/keyword-density",
            icon: faChartBar,
            category: "Análisis"
        }
    ];

    const categories = [
        { name: "Visualización", count: seoTools.filter(t => t.category === "Visualización").length },
        { name: "Técnico", count: seoTools.filter(t => t.category === "Técnico").length },
        { name: "Contenido", count: seoTools.filter(t => t.category === "Contenido").length },
        { name: "Análisis", count: seoTools.filter(t => t.category === "Análisis").length },
    ];

    const featuredTools = seoTools.filter(tool => tool.featured);
    const otherTools = seoTools.filter(tool => !tool.featured);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
                <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm" aria-label="Breadcrumb">
                        <ol className="flex items-center justify-center space-x-2 text-text/60">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
                            </li>
                            <li>
                                <Link href="/categorias" className="hover:text-primary transition-colors">Categorías</Link>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
                            </li>
                            <li>
                                <Link href="/tools/seo" className="text-primary font-semibold" aria-current="page">
                                    Herramientas SEO
                                </Link>
                            </li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                            Herramientas SEO
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas <span className="text-primary">SEO</span> Gratuitas
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            Mejora tu posicionamiento en buscadores con nuestra suite de herramientas SEO.
                            Simula resultados, genera meta tags, crea sitemaps y optimiza tu contenido.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-primary mb-1">{seoTools.length}</div>
                            <div className="text-xs text-text/60 font-semibold">Herramientas</div>
                        </div>
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-primary mb-1">{categories.length}</div>
                            <div className="text-xs text-text/60 font-semibold">Categorías</div>
                        </div>
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-primary mb-1">100%</div>
                            <div className="text-xs text-text/60 font-semibold">Gratuito</div>
                        </div>
                        <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                            <div className="text-2xl font-bold text-primary mb-1">0</div>
                            <div className="text-xs text-text/60 font-semibold">Registros</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Tools Section */}
            {featuredTools.length > 0 && (
                <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold text-text mb-2 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBolt} className="text-primary" />
                                Herramientas Destacadas
                            </h2>
                            <p className="text-text/60 text-sm">Las herramientas SEO más esenciales</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredTools.map((tool, index) => (
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
            )}

            {/* Categories Filter */}
            <section className="w-full bg-surface border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <FontAwesomeIcon icon={faLayerGroup} className="text-primary" />
                        <h3 className="text-lg font-semibold text-text">Filtrar por Categoría</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold shadow-md hover:bg-secondary transition-colors">
                            Todas
                        </button>
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 bg-background text-text rounded-xl text-sm font-semibold border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Tools Section */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-text mb-2">Todas las Herramientas</h2>
                        <p className="text-text/60 text-sm">Colección completa de utilidades SEO</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherTools.map((tool, index) => (
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

            {/* CTA Section */}
            <section className="w-full bg-background py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
                            ¿Falta alguna herramienta SEO?
                        </h2>
                        <p className="text-text/60 mb-6 max-w-xl mx-auto">
                            Si necesitas una herramienta específica para tu flujo de trabajo SEO,
                            háznoslo saber y trabajaremos en ella.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/tools"
                                className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition-all shadow-md"
                            >
                                Ver Todas las Herramientas
                            </Link>
                            <Link
                                href="/categorias"
                                className="inline-flex justify-center items-center px-6 py-3 bg-surface text-text font-semibold rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all"
                            >
                                Explorar Categorías
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
