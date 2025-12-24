import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVideo,
    faCrop,
    faMusic,
    faExpand,
    faCompress,
    faBolt,
    faArrowRight,
    faClock
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Herramientas de Video - Toolero.es | Conversor, Recortador, Audio',
    description: 'Herramientas de video online: conversor de video a audio, calculadora de aspecto, recortador básico y más utilidades para creadores.',
    keywords: 'herramientas video, video to audio, aspect ratio calculator, video trimmer, convertir video, video tools',
    openGraph: {
        title: 'Herramientas de Video - Toolero.es',
        description: 'Edita y optimiza tus videos con nuestras herramientas gratuitas.',
        type: 'website',
    },
};

interface VideoTool {
    title: string;
    description: string;
    href: string;
    icon: any;
    featured?: boolean;
    category: string;
}

export default function VideoToolsPage() {
    const videoTools: VideoTool[] = [
        {
            title: "Calculadora Aspect Ratio",
            description: "Calcula las dimensiones y la relación de aspecto (16:9, 4:3, etc.) para tus proyectos.",
            href: "/tools/video/aspect-ratio",
            icon: faExpand,
            featured: true,
            category: "Cálculo"
        },
        {
            title: "Generador de Enlaces de Tiempo",
            description: "Crea enlaces directos a momentos específicos en videos de YouTube.",
            href: "/tools/video/timestamp-link",
            icon: faClock,
            category: "YouTube"
        },
        {
            title: "Calculadora de Bitrate",
            description: "Estima el bitrate necesario para tus streamings o archivos de video según la resolución.",
            href: "/tools/video/bitrate-calculator",
            icon: faVideo,
            category: "Cálculo"
        }
    ];

    const categories = [
        { name: "Edición", count: videoTools.filter(t => t.category === "Edición").length },
        { name: "Conversión", count: videoTools.filter(t => t.category === "Conversión").length },
        { name: "Cálculo", count: videoTools.filter(t => t.category === "Cálculo").length },
        { name: "Optimización", count: videoTools.filter(t => t.category === "Optimización").length },
        { name: "YouTube", count: videoTools.filter(t => t.category === "YouTube").length },
    ];

    const featuredTools = videoTools.filter(tool => tool.featured);
    const otherTools = videoTools.filter(tool => !tool.featured);

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
                            <li><span className="text-primary font-semibold">Herramientas de Video</span></li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={faVideo} className="mr-2" />
                            Video Tools
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas de <span className="text-primary">Video</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            Edita, convierte y optimiza tus videos directamente desde el navegador.
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
                            ¿Buscas otra herramienta de video?
                        </h2>
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
