import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont,
  faSearch,
  faImage,
  faFilePdf,
  faBolt,
  faCode,
  faFolder,
  faCalculator,
  faArrowRight,
  faLayerGroup,
  faTags,
  faHashtag,
  faPalette,
  faShieldAlt,
  faVideo
} from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categorías de Herramientas - Toolero.es | Text, SEO, Image, PDF & More',
  description: 'Explora nuestras categorías de herramientas gratuitas: Herramientas de texto, SEO, imagen, PDF, utilidades, desarrollo, archivos y cálculo. Todo lo que necesitas en un solo lugar.',
  keywords: [
    'categorías herramientas',
    'herramientas texto',
    'herramientas SEO',
    'herramientas imagen',
    'herramientas PDF',
    'herramientas desarrollo',
    'herramientas cálculo',
    'toolero categorías',
    'herramientas online gratis'
  ],
  openGraph: {
    title: 'Categorías de Herramientas - Toolero.es',
    description: 'Descubre todas nuestras categorías de herramientas gratuitas online',
    type: 'website',
    url: 'https://toolero.es/categorias',
  },
  alternates: {
    canonical: 'https://toolero.es/categorias',
  },
};

interface Category {
  nameEn: string;
  nameEs: string;
  icon: any;
  description: string;
  descriptionEn: string;
  href: string;
  color: string;
  bgGradient: string;
  toolCount: number;
}

export default function CategoriasPage() {
  const categories: Category[] = [
    {
      nameEn: 'Text Tools',
      nameEs: 'Herramientas de texto',
      icon: faFont,
      description: 'Herramientas para trabajar con texto: contador de palabras, conversores, formateadores y más.',
      descriptionEn: 'Tools for working with text: word counter, converters, formatters and more.',
      href: '/tools/texto',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      toolCount: 12
    },
    {
      nameEn: 'SEO Tools',
      nameEs: 'Herramientas de SEO',
      icon: faSearch,
      description: 'Optimiza tu SEO con herramientas de análisis, meta tags, sitemaps y auditorías.',
      descriptionEn: 'Optimize your SEO with analysis tools, meta tags, sitemaps and audits.',
      href: '/tools/seo',
      color: 'text-green-600',
      bgGradient: 'from-green-50 to-green-100',
      toolCount: 8
    },
    {
      nameEn: 'Image Tools',
      nameEs: 'Herramientas de imagen',
      icon: faImage,
      description: 'Edita, optimiza, redimensiona y convierte imágenes sin perder calidad.',
      descriptionEn: 'Edit, optimize, resize and convert images without losing quality.',
      href: '/tools/imagen',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      toolCount: 15
    },
    {
      nameEn: 'PDF Tools',
      nameEs: 'Herramientas de PDF',
      icon: faFilePdf,
      description: 'Combina, divide, comprime y convierte archivos PDF de forma segura.',
      descriptionEn: 'Merge, split, compress and convert PDF files securely.',
      href: '/tools/pdf',
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-red-100',
      toolCount: 10
    },
    {
      nameEn: 'Utility Tools',
      nameEs: 'Herramientas de utilidad',
      icon: faBolt,
      description: 'Utilidades esenciales: generadores, conversores, codificadores y más.',
      descriptionEn: 'Essential utilities: generators, converters, encoders and more.',
      href: '/tools/utilidad',
      color: 'text-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
      toolCount: 20
    },
    {
      nameEn: 'Developer Tools',
      nameEs: 'Herramientas de desarrollo',
      icon: faCode,
      description: 'Herramientas para desarrolladores: validadores, formateadores, minificadores y más.',
      descriptionEn: 'Tools for developers: validators, formatters, minifiers and more.',
      href: '/tools/dev',
      color: 'text-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      toolCount: 18
    },
    {
      nameEn: 'File Tools',
      nameEs: 'Herramientas de archivos',
      icon: faFolder,
      description: 'Gestiona y procesa archivos: conversores, compresores, analizadores y más.',
      descriptionEn: 'Manage and process files: converters, compressors, analyzers and more.',
      href: '/tools/archivos',
      color: 'text-teal-600',
      bgGradient: 'from-teal-50 to-teal-100',
      toolCount: 14
    },
    {
      nameEn: 'Calculation Tools',
      nameEs: 'Herramientas de cálculo',
      icon: faCalculator,
      description: 'Calculadoras y herramientas matemáticas: conversores de unidades, calculadoras financieras y más.',
      descriptionEn: 'Calculators and math tools: unit converters, financial calculators and more.',
      href: '/tools/calculo',
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      toolCount: 16
    },
    {
      nameEn: 'SEO Schema',
      nameEs: 'Schema SEO',
      icon: faTags,
      description: 'Generadores de Schema.org markup: JSON-LD para mejorar tu SEO y rich snippets en Google.',
      descriptionEn: 'Schema.org markup generators: JSON-LD to improve your SEO and rich snippets on Google.',
      href: '/tools/seo-schema',
      color: 'text-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      toolCount: 25
    },
    {
      nameEn: 'Social Media',
      nameEs: 'Redes Sociales',
      icon: faHashtag,
      description: 'Generadores de hashtags, bios, fuentes y herramientas para Instagram, Twitter y más.',
      descriptionEn: 'Hashtag generators, bios, fonts and tools for Instagram, Twitter and more.',
      href: '/tools/social',
      color: 'text-sky-600',
      bgGradient: 'from-sky-50 to-sky-100',
      toolCount: 14
    },
    {
      nameEn: 'Color Tools',
      nameEs: 'Herramientas de Color',
      icon: faPalette,
      description: 'Paletas de colores, selectores, conversores (HEX, RGB, HSL) y degradados.',
      descriptionEn: 'Color palettes, pickers, converters (HEX, RGB, HSL) and gradients.',
      href: '/tools/color',
      color: 'text-fuchsia-600',
      bgGradient: 'from-fuchsia-50 to-fuchsia-100',
      toolCount: 10
    },
    {
      nameEn: 'Security Tools',
      nameEs: 'Seguridad',
      icon: faShieldAlt,
      description: 'Generadores de contraseñas, verificadores de seguridad y cifrado de datos.',
      descriptionEn: 'Password generators, security checkers and data encryption.',
      href: '/tools/seguridad',
      color: 'text-slate-600',
      bgGradient: 'from-slate-50 to-slate-100',
      toolCount: 8
    },
    {
      nameEn: 'Video Tools',
      nameEs: 'Herramientas de Video',
      icon: faVideo,
      description: 'Descarga, recorta, convierte y edita videos para redes sociales y web.',
      descriptionEn: 'Download, trim, convert and edit videos for social media and web.',
      href: '/tools/video',
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-rose-100',
      toolCount: 12
    }
  ];

  // Generate CollectionPage Schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Categorías de Herramientas - Toolero.es',
    description: 'Explora todas las categorías de herramientas gratuitas disponibles',
    url: 'https://toolero.es/categorias',
  };

  // Generate ItemList Schema for categories
  const listItems = categories.map((category, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: category.nameEs,
    description: category.description,
    url: `https://toolero.es${category.href}`,
  }));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Categorías de Herramientas',
    description: 'Lista de todas las categorías de herramientas disponibles',
    numberOfItems: categories.length,
    itemListElement: listItems,
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32 border-b border-gray-200">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <Breadcrumb items={[{ name: 'Categorías', href: '/categorias' }]} />

            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
                Todas las Categorías
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                Explora por <span className="text-primary">Categoría</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                Navega por nuestras herramientas organizadas por categorías. Encuentra exactamente lo que necesitas de forma rápida y sencilla.
              </p>
              <p className="mt-2 text-base md:text-lg text-text/50 max-w-3xl mx-auto">
                Browse our tools organized by category. Find exactly what you need quickly and easily.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative flex flex-col bg-surface rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-primary transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-background group-hover:bg-primary flex items-center justify-center ${category.color} group-hover:text-white transition-all duration-300 shadow-md mb-4`}>
                    <FontAwesomeIcon icon={category.icon} className="text-2xl" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors mb-2">
                    {category.nameEs}
                  </h3>
                  <p className="text-sm text-text/50 mb-3 font-medium">
                    {category.nameEn}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-text/60 leading-relaxed mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover:border-primary/20 transition-colors">
                    <span className="text-xs font-semibold text-text/50 group-hover:text-primary transition-colors">
                      {category.toolCount} herramientas
                    </span>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      Explorar
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full bg-surface border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">13</div>
                <div className="text-sm text-text/60 font-semibold">Categorías</div>
                <div className="text-xs text-text/40 mt-1">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">138+</div>
                <div className="text-sm text-text/60 font-semibold">Herramientas</div>
                <div className="text-xs text-text/40 mt-1">Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-text/60 font-semibold">Gratuitas</div>
                <div className="text-xs text-text/40 mt-1">Free</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-text/60 font-semibold">Registros</div>
                <div className="text-xs text-text/40 mt-1">Sign-ups</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-text/60 mb-6 max-w-xl mx-auto">
                Estamos constantemente añadiendo nuevas herramientas. Si tienes una sugerencia, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-secondary transition-all shadow-md"
                >
                  Ver Todas las Herramientas
                </Link>
                <Link
                  href="#"
                  className="inline-flex justify-center items-center px-6 py-3 bg-surface text-text font-semibold rounded-xl border border-gray-200 hover:border-primary hover:text-primary transition-all"
                >
                  Sugerir Herramienta
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

