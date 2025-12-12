import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShieldAlt,
    faKey,
    faLock,
    faFileCode,
    faLink,
    faBolt,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Herramientas de Seguridad - Toolero.es | Contraseñas, Hash, Cifrado',
    description: 'Herramientas de seguridad online: generador de contraseñas seguras, hashes MD5/SHA, verificación de fortaleza y codificación de URLs.',
    keywords: 'seguridad online, generador contraseñas, password generator, md5 hash, sha256, seguridad web',
    openGraph: {
        title: 'Herramientas de Seguridad - Toolero.es',
        description: 'Protege tus datos y genera claves seguras con nuestras herramientas.',
        type: 'website',
    },
};

interface SecurityTool {
    title: string;
    description: string;
    href: string;
    icon: any;
    featured?: boolean;
    category: string;
}

export default function SecurityToolsPage() {
    const securityTools: SecurityTool[] = [
        {
            title: "Generador de Contraseñas",
            description: "Crea contraseñas fuertes y aleatorias con opciones de longitud y caracteres especiales.",
            href: "/tools/seguridad/password-generator",
            icon: faKey,
            featured: true,
            category: "Contraseñas"
        },
        {
            title: "Verificador de Fortaleza",
            description: "Analiza qué tan segura es tu contraseña y cuánto tardaría en descifrarse.",
            href: "/tools/seguridad/password-strength",
            icon: faShieldAlt,
            featured: true,
            category: "Análisis"
        },
        {
            title: "Generador Hash MD5",
            description: "Convierte cualquier texto a su huella digital MD5 de forma rápida.",
            href: "/tools/seguridad/md5-generator",
            icon: faLock,
            category: "Cifrado"
        },
        {
            title: "Generador Hash SHA-256",
            description: "Genera hashes SHA-256 seguros para verificar integridad de datos.",
            href: "/tools/seguridad/sha256-generator",
            icon: faLock,
            featured: true,
            category: "Cifrado"
        },
        {
            title: "Codificador URL",
            description: "Codifica y decodifica URLs para asegurar que sean válidas en la web.",
            href: "/tools/seguridad/url-encoder",
            icon: faLink,
            category: "Web"
        },
        {
            title: "Generador .htaccess",
            description: "Crea archivos .htaccess para proteger directorios, redireccionar y bloquear IPs.",
            href: "/tools/seguridad/htaccess-generator",
            icon: faFileCode,
            category: "Servidor"
        }
    ];

    const categories = [
        { name: "Contraseñas", count: securityTools.filter(t => t.category === "Contraseñas").length },
        { name: "Cifrado", count: securityTools.filter(t => t.category === "Cifrado").length },
        { name: "Análisis", count: securityTools.filter(t => t.category === "Análisis").length },
        { name: "Web", count: securityTools.filter(t => t.category === "Web").length },
        { name: "Servidor", count: securityTools.filter(t => t.category === "Servidor").length },
    ];

    const featuredTools = securityTools.filter(tool => tool.featured);
    const otherTools = securityTools.filter(tool => !tool.featured);

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
                            <li><span className="text-primary font-semibold">Seguridad</span></li>
                        </ol>
                    </nav>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                            Security Tools
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                            Herramientas de <span className="text-primary">Seguridad</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                            Protege tu información y genera datos seguros con nuestras utilidades de criptografía y seguridad.
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
                            ¿Falta alguna herramienta de seguridad?
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
