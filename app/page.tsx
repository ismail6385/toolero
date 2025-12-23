import ToolCard from '@/components/ToolCard';
import Breadcrumb from '@/components/Breadcrumb';
import { toolsData } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Todas las Herramientas Gratuitas Online - Toolero.es',
  description: 'Explora más de 50 herramientas online gratuitas: contador de palabras, redimensionar imágenes, generador de contraseñas, herramientas SEO, schema markup y más. 100% gratis, sin registro.',
  keywords: [
    'herramientas online gratis',
    'herramientas gratuitas',
    'utilidades web',
    'herramientas de texto',
    'herramientas de imagen',
    'herramientas SEO',
    'generador de contraseñas',
    'contador de palabras',
    'redimensionar imagen',
    'toolero',
    'herramientas digitales'
  ],
  openGraph: {
    title: 'Todas las Herramientas Gratuitas - Toolero.es',
    description: 'Más de 50 herramientas online gratuitas para mejorar tu productividad. Sin registro, 100% gratis.',
    type: 'website',
    url: 'https://toolero.es/tools',
  },
  alternates: {
    canonical: 'https://toolero.es/tools',
  },
};

export default function ToolsPage() {
  // Flatten all tools from all categories
  const allTools = toolsData.flatMap(category =>
    category.tools.map(tool => ({
      ...tool,
      categoryName: category.name,
      categorySlug: category.slug,
    }))
  );

  // Generate ItemList Schema for all tools
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Herramientas Gratuitas Online - Toolero.es',
    description: 'Lista completa de herramientas online gratuitas disponibles en Toolero.es',
    numberOfItems: allTools.length,
    itemListElement: allTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `https://toolero.es${tool.href}`,
    })),
  };

  // Generate CollectionPage Schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catálogo de Herramientas - Toolero.es',
    description: 'Explora nuestra colección completa de herramientas gratuitas online',
    url: 'https://toolero.es/tools',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allTools.length,
    },
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-surface pb-20 pt-24 lg:pt-32 border-b border-gray-200">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Text */}
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <Breadcrumb items={[{ name: 'Herramientas', href: '/tools' }]} />
                </div>

                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6 mx-auto lg:mx-0">
                  <FontAwesomeIcon icon={faTools} className="mr-2" />
                  {allTools.length}+ Herramientas Gratuitas
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                  Todas las <span className="text-primary">Herramientas</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-text/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Explora nuestra colección completa de herramientas online gratuitas.
                  Sin registro, sin límites, 100% gratis.
                </p>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:block relative">
                <div className="relative w-full max-w-lg mx-auto">
                  {/* Decorative background blobs for the image */}
                  <div className="absolute top-10 -left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse delay-1000"></div>

                  <div className="relative hover:scale-105 transition-transform duration-500 ease-in-out">
                    <Image
                      src="/images/hero-3d.png"
                      alt="Toolero Digital Tools 3D Illustration"
                      width={600}
                      height={600}
                      priority
                      className="object-contain w-full h-auto animate-float drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools by Category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {toolsData.map((category, categoryIndex) => (
            <div key={category.slug} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-primary/10 ${category.color}`}>
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-text">{category.name}</h2>
                  <p className="text-text/60 mt-1">{category.description}</p>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <ToolCard
                    key={toolIndex}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    icon={tool.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="w-full bg-surface border-t border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{allTools.length}+</div>
                <div className="text-sm text-text/60 font-semibold">Herramientas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{toolsData.length}</div>
                <div className="text-sm text-text/60 font-semibold">Categorías</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-text/60 font-semibold">Gratuitas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-text/60 font-semibold">Registros</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-surface p-12 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group">
              {/* Rocket Background */}
              <div className="absolute -right-16 -bottom-16 w-64 h-64 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform rotate-12">
                <Image src="/images/rocket.png" alt="Rocket" width={256} height={256} className="object-cover" />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faBolt} className="text-3xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                  ¿Buscas algo específico?
                </h2>
                <p className="text-text/60 mb-8 max-w-xl mx-auto text-lg">
                  Usa nuestra búsqueda o navega por categorías para encontrar exactamente lo que necesitas.
                </p>

                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30"></div>
                  <button className="relative bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg">
                    Explorar Todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
