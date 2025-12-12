import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHashtag,
    faFont,
    faImage,
    faIcons,
    faVideo,
    faAlignLeft,
    faBolt,
    faLayerGroup,
    faArrowRight,
    faSmile
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Herramientas de Redes Sociales - Toolero.es | Hashtags, Bios, Emoji',
    description: 'Herramientas gratuitas para redes sociales: generador de hashtags, fuentes para bio, extractor de tags de YouTube, selector de emojis y más.',
    keywords: 'herramientas redes sociales, generador hashtags, fuentes bio instagram, youtube tags, emoji picker, social media tools',
    openGraph: {
        title: 'Herramientas de Redes Sociales - Toolero.es',
        description: 'Optimiza tu presencia en redes sociales con nuestras herramientas gratuitas.',
        type: 'website',
    },
};

interface SocialTool {
    title: string;
    description: string;
    href: string;
    icon: any;
    featured?: boolean;
    category: string;
}

export default function SocialToolsPage() {
    const socialTools: SocialTool[] = [
        {
            title: "Generador de Hashtags",
            description: "Genera hashtags populares y relevantes para Instagram, TikTok y Twitter.",
            href: "/tools/social/hashtag-generator",
            icon: faHashtag,
            featured: true,
            category: "Instagram"
        },
        {
            title: "Fuentes para Bio",
            description: "Transforma tu texto con fuentes estéticas para Instagram y Twitter Bios.",
            href: "/tools/social/bio-fonts",
            icon: faFont,
            featured: true,
            category: "Personalización"
        },
        {
            title: "Selector de Emojis",
            description: "Busca y copia emojis fácilmente para tus publicaciones y mensajes.",
            href: "/tools/social/emoji-picker",
            icon: faSmile,
            category: "Utilidades"
        },
        {
            title: "Extractor de Tags YouTube",
            description: "Extrae las etiquetas (tags) de cualquier video de YouTube para SEO.",
            href: "/tools/social/youtube-tags",
            icon: faVideo,
            category: "YouTube"
        },
        {
            title: "Espaciador de Captions",
            description: "Añade saltos de línea invisibles para formatear perfectamente tus posts de Instagram.",
            href: "/tools/social/caption-spacer",
            icon: faAlignLeft,
            category: "Instagram"
        },
        {
            title: "Image Resizer Social",
            description: "Redimensiona imágenes a los tamaños exactos de Stories, Posts y Portadas.",
            href: "/tools/social/image-resizer",
            icon: faImage,
            featured: true,
            category: "Imágenes"
        }
    ];

    const categories = [
        { name: "Instagram", count: socialTools.filter(t => t.category === "Instagram").length },
        { name: "YouTube", count: socialTools.filter(t => t.category === "YouTube").length },
        { name: "Personalización", count: socialTools.filter(t => t.category === "Personalización").length },
        { name: "Utilidades", count: socialTools.filter(t => t.category === "Utilidades").length },
        { name: "Imágenes", count: socialTools.filter(t => t.category === "Imágenes").length },
    ];

    const featuredTools = socialTools.filter(tool => tool.featured);
    const otherTools = socialTools.filter(tool => !tool.featured);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32">
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
                <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <nav className="mb-8 text-sm" aria-label="Breadcrumb">
                        <ol className="flex items-center justify-center space-x-2 text-text/60">
                            <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                            <li><FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" /></li>
                            <li><Link href="/categorias" className="hover:text-primary transition-colors">Categorías</Link></li>
                            <li><FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" /></li>
                            <li><span className="text-primary font-semibold">Redes Sociales</span></li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={faHashtag} className="mr-2" />
                            Social Media Tools
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas de <span className="text-primary">Redes Sociales</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            Mejora tu presencia online con herramientas para Instagram, YouTube, TikTok y más.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Tools */}
            {featuredTools.length > 0 && (
                <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl font-semibold text-text mb-6 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBolt} className="text-primary" />
                        Destacadas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredTools.map((tool, index) => (
                            <ToolCard key={index} {...tool} />
                        ))}
                    </div>
                </section>
            )}

            {/* All Tools */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-semibold text-text mb-6">Todas las Herramientas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherTools.map((tool, index) => (
                        <ToolCard key={index} {...tool} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-background py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
                            ¿Falta alguna herramienta?
                        </h2>
                        <p className="text-text/60 mb-6 max-w-xl mx-auto">
                            Dinos qué herramienta de redes sociales necesitas y la crearemos.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/contact" className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition-all">
                                Sugerir Herramienta
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
