import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPalette,
    faEyeDropper,
    faSync,
    faAdjust,
    faLayerGroup,
    faBolt,
    faArrowRight,
    faImage
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Herramientas de Color - Toolero.es | Paletas, Conversor HEX/RGB',
    description: 'Herramientas de color gratuitas: generador de paletas, conversor HEX a RGB, selector de color de imagen, degradados y más.',
    keywords: 'herramientas color, paleta colores, conversor hex rgb, color picker, degradados css, color tools',
    openGraph: {
        title: 'Herramientas de Color - Toolero.es',
        description: 'Gestión y conversión de colores para diseñadores y desarrolladores.',
        type: 'website',
    },
};

interface ColorTool {
    title: string;
    description: string;
    href: string;
    icon: any;
    featured?: boolean;
    category: string;
}

export default function ColorToolsPage() {
    const colorTools: ColorTool[] = [
        {
            title: "Generador de Paletas",
            description: "Crea paletas de colores armónicas y exporta los códigos en HEX, RGB o CSS.",
            href: "/tools/color/palette-generator",
            icon: faPalette,
            featured: true,
            category: "Diseño"
        },
        {
            title: "Conversor HEX a RGB",
            description: "Convierte códigos de color HEX a formato RGB y viceversa instantáneamente.",
            href: "/tools/color/hex-to-rgb",
            icon: faSync,
            featured: true,
            category: "Conversión"
        },
        {
            title: "Selector de Color de Imagen",
            description: "Sube una imagen y extrae los colores dominantes o selecciona un color específico.",
            href: "/tools/color/image-picker",
            icon: faEyeDropper,
            featured: true,
            category: "Extracción"
        },
        {
            title: "Generador de Degradados",
            description: "Diseña degradados CSS lineales y radiales personalizados y copia el código.",
            href: "/tools/color/gradient-generator",
            icon: faLayerGroup,
            category: "CSS"
        },
        {
            title: "Comprobador de Contraste",
            description: "Verifica si la combinación de colores de texto y fondo cumple con los estándares de accesibilidad (WCAG).",
            href: "/tools/color/contrast-checker",
            icon: faAdjust,
            category: "Accesibilidad"
        },
        {
            title: "Conversor RGB a HEX",
            description: "Transforma valores RGB a código hexadecimal para uso en web.",
            href: "/tools/color/rgb-to-hex",
            icon: faSync,
            category: "Conversión"
        }
    ];

    const categories = [
        { name: "Diseño", count: colorTools.filter(t => t.category === "Diseño").length },
        { name: "Conversión", count: colorTools.filter(t => t.category === "Conversión").length },
        { name: "Extracción", count: colorTools.filter(t => t.category === "Extracción").length },
        { name: "CSS", count: colorTools.filter(t => t.category === "CSS").length },
        { name: "Accesibilidad", count: colorTools.filter(t => t.category === "Accesibilidad").length },
    ];

    const featuredTools = colorTools.filter(tool => tool.featured);
    const otherTools = colorTools.filter(tool => !tool.featured);

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
                            <li><span className="text-primary font-semibold">Herramientas de Color</span></li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={faPalette} className="mr-2" />
                            Color Tools
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas de <span className="text-primary">Color</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            Trabaja con colores de forma profesional: genera paletas, convierte formatos y asegura accesibilidad.
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
                            ¿Necesitas otra utilidad de color?
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
