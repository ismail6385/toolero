import ToolCard from '@/components/ToolCard';
import Breadcrumb from '@/components/Breadcrumb';
import { toolsData } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

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
            <Breadcrumb items={[{ name: 'Herramientas', href: '/tools' }]} />
            
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                <FontAwesomeIcon icon={faTools} className="mr-2" />
                {allTools.length}+ Herramientas Gratuitas
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                Todas las <span className="text-primary">Herramientas</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                Explora nuestra colección completa de herramientas online gratuitas. 
                Sin registro, sin límites, 100% gratis.
              </p>
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
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faBolt} className="text-2xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
                ¿Buscas algo específico?
              </h2>
              <p className="text-text/60 mb-6 max-w-xl mx-auto">
                Usa nuestra búsqueda o navega por categorías para encontrar exactamente lo que necesitas.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
