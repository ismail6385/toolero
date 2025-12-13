
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import FAQSection from '@/components/FAQSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { toolsData } from '@/data/tools';

export default function Home() {
  // JSON-LD Schema Markup
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolero.es',
    alternateName: 'Toolero',
    url: 'https://toolero.es',
    description: 'Herramientas online gratuitas para potenciar tu productividad',
    inLanguage: 'es-ES',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolero.es/tools?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Toolero.es',
    url: 'https://toolero.es',
    logo: 'https://toolero.es/logo.png',
    description: 'Plataforma de herramientas online gratuitas en español',
    sameAs: [
      'https://twitter.com/toolero_es',
      'https://facebook.com/toolero.es'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Spanish', 'es']
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://toolero.es'
      }
    ]
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Toolero.es',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    operatingSystem: 'Web',
    description: 'Suite completa de herramientas digitales gratuitas',
    inLanguage: 'es-ES',
    featureList: [
      'Contador de palabras',
      'Redimensionar imágenes',
      'Generador de contraseñas',
      'Herramientas SEO',
      'Generador de schemas',
      'Herramientas de color',
      'Conversor de texto'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Categorías de Herramientas - Toolero.es',
    description: 'Categorías principales de herramientas disponibles en Toolero.es',
    numberOfItems: toolsData.length,
    itemListElement: toolsData.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: category.name,
      description: category.description,
      url: `https://toolero.es/tools/${category.slug}`,
    })),
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="flex flex-col items-center overflow-hidden">

        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-surface pb-20 pt-32 lg:pt-48">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              ✨ Herramientas 100% Gratuitas
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-text tracking-tight mb-8">
              Herramientas que <br className="hidden md:block" />
              <span className="text-primary">
                Potencian tu Flujo
              </span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-text/60 max-w-2xl mx-auto leading-relaxed">
              Una suite completa de utilidades digitales. Sin esperas, sin registros y diseñadas para ahorrarte tiempo.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tools" className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-secondary hover:shadow-md transition-all text-lg">
                Explorar Herramientas
              </Link>
              <Link href="#categories" className="inline-flex justify-center items-center px-8 py-4 bg-surface text-text font-semibold rounded-xl border border-gray-200 hover:text-primary hover:border-primary transition-all text-lg shadow-md">
                Ver Categorías
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Categories Section */}
        <div id="categories" className="w-full">
          {toolsData.map((category, index) => (
            <section key={category.slug} className={`w-full py-12 ${index % 2 === 0 ? 'bg-background' : 'bg-surface'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-primary/10 ${category.color}`}>
                      <FontAwesomeIcon icon={category.icon} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold text-text">{category.name}</h2>
                      <p className="text-text/60 mt-1">{category.description}</p>
                    </div>
                  </div>
                  {category.tools.length > 4 && (
                    <Link href={`/tools/${category.slug}`} className="hidden md:flex mt-4 md:mt-0 group items-center text-primary font-semibold hover:text-secondary transition-colors">
                      Ver todo {category.name}
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.tools.slice(0, 4).map((tool, tIndex) => (
                    <ToolCard
                      key={tIndex}
                      title={tool.title}
                      description={tool.description}
                      href={tool.href}
                      icon={tool.icon}
                    />
                  ))}
                </div>

                {category.tools.length > 4 && (
                  <div className="mt-8 text-center md:hidden">
                    <Link href={`/tools/${category.slug}`} className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors">
                      Ver todo {category.name}
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </Link>
                  </div>
                )}
                <div className="mt-8 flex justify-center">
                  <Link href={`/tools/${category.slug}`} className="inline-flex items-center px-6 py-3 border border-gray-200 text-text font-medium rounded-lg hover:border-primary hover:text-primary transition-colors bg-surface shadow-sm hover:shadow-md">
                    Ver todas las herramientas de {category.name}
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <section className="w-full bg-background py-24 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-text mb-6">¿Listo para ser más productivo?</h2>
            <div className="bg-surface p-8 rounded-xl shadow-md border border-gray-100 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300 group hover:border-primary">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faBolt} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empieza sin registro</h3>
              <p className="text-text/60 mb-6">Acceso instantáneo a todas las funciones premium de forma gratuita.</p>
              <Link href="/tools" className="block w-full py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-xl transition-colors shadow-md">
                Abrir Herramientas
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}
