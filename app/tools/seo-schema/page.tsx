import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTags,
  faStore,
  faUser,
  faNewspaper,
  faVideo,
  faMusic,
  faBook,
  faGraduationCap,
  faUtensils,
  faHotel,
  faCalendar,
  faMapMarkerAlt,
  faStar,
  faQuestionCircle,
  faArrowRight,
  faBolt,
  faLayerGroup,
  faCode,
  faBriefcase,
  faShoppingCart,
  faFilm,
  faImage,
  faFileAlt,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const metadata = {
  title: 'Generadores de Schema SEO - Toolero.es | JSON-LD Schema.org Markup',
  description: 'Generadores gratuitos de Schema.org markup (JSON-LD) para mejorar tu SEO: Organization, LocalBusiness, Article, Product, Review, Event y más. Crea rich snippets para Google.',
  keywords: 'schema seo, schema.org, json-ld, rich snippets, structured data, seo schema generator, schema markup, toolero schema',
  openGraph: {
    title: 'Generadores de Schema SEO - Toolero.es',
    description: 'Suite completa de generadores de Schema.org markup para mejorar tu SEO y rich snippets.',
    type: 'website',
  },
};

interface SchemaTool {
  title: string;
  description: string;
  href: string;
  icon: IconDefinition;
  featured?: boolean;
  category: string;
  schemaType: string;
}

export default function SEOSchemaPage() {
  const schemaTools: SchemaTool[] = [
    {
      title: "Schema Organization",
      description: "Genera Schema.org markup para tu organización: nombre, logo, redes sociales y datos de contacto.",
      href: "/tools/seo-schema/organization",
      icon: faBriefcase,
      featured: true,
      category: "Negocio",
      schemaType: "Organization"
    },
    {
      title: "Schema LocalBusiness",
      description: "Crea Schema para negocios locales con ubicación, horarios, precios y reseñas para Google My Business.",
      href: "/tools/seo-schema/local-business",
      icon: faStore,
      featured: true,
      category: "Negocio",
      schemaType: "LocalBusiness"
    },
    {
      title: "Schema Person",
      description: "Genera Schema para personas: información profesional, redes sociales y datos de contacto.",
      href: "/tools/seo-schema/person",
      icon: faUser,
      category: "Persona",
      schemaType: "Person"
    },
    {
      title: "Schema Article",
      description: "Crea Schema para artículos de blog: autor, fecha, imagen destacada y categoría para rich snippets.",
      href: "/tools/seo-schema/article",
      icon: faNewspaper,
      featured: true,
      category: "Contenido",
      schemaType: "Article"
    },
    {
      title: "Schema BlogPosting",
      description: "Genera Schema específico para posts de blog con autor, fecha de publicación y tiempo de lectura.",
      href: "/tools/seo-schema/blog-posting",
      icon: faFileAlt,
      category: "Contenido",
      schemaType: "BlogPosting"
    },
    {
      title: "Schema Product",
      description: "Crea Schema para productos: precio, disponibilidad, reseñas, imágenes y especificaciones técnicas.",
      href: "/tools/seo-schema/product",
      icon: faShoppingCart,
      featured: true,
      category: "E-commerce",
      schemaType: "Product"
    },
    {
      title: "Schema Review",
      description: "Genera Schema para reseñas y valoraciones: autor, calificación, fecha y texto de la reseña.",
      href: "/tools/seo-schema/review",
      icon: faStar,
      category: "E-commerce",
      schemaType: "Review"
    },
    {
      title: "Schema VideoObject",
      description: "Crea Schema para videos: duración, miniatura, descripción y datos del canal para YouTube.",
      href: "/tools/seo-schema/video-object",
      icon: faVideo,
      featured: true,
      category: "Multimedia",
      schemaType: "VideoObject"
    },
    {
      title: "Schema ImageObject",
      description: "Genera Schema para imágenes: licencia, autor, descripción y metadatos para SEO de imágenes.",
      href: "/tools/seo-schema/image-object",
      icon: faImage,
      category: "Multimedia",
      schemaType: "ImageObject"
    },
    {
      title: "Schema AudioObject",
      description: "Crea Schema para contenido de audio: podcasts, música y archivos de audio con metadatos.",
      href: "/tools/seo-schema/audio-object",
      icon: faMusic,
      category: "Multimedia",
      schemaType: "AudioObject"
    },
    {
      title: "Schema Book",
      description: "Genera Schema para libros: autor, ISBN, editorial, fecha de publicación y reseñas.",
      href: "/tools/seo-schema/book",
      icon: faBook,
      category: "Contenido",
      schemaType: "Book"
    },
    {
      title: "Schema Course",
      description: "Crea Schema para cursos online: instructor, duración, precio, descripción y calificaciones.",
      href: "/tools/seo-schema/course",
      icon: faGraduationCap,
      category: "Educación",
      schemaType: "Course"
    },
    {
      title: "Schema Recipe",
      description: "Genera Schema para recetas: ingredientes, tiempo de cocción, calorías y pasos de preparación.",
      href: "/tools/seo-schema/recipe",
      icon: faUtensils,
      category: "Contenido",
      schemaType: "Recipe"
    },
    {
      title: "Schema Restaurant",
      description: "Crea Schema para restaurantes: menú, horarios, precios, ubicación y tipo de cocina.",
      href: "/tools/seo-schema/restaurant",
      icon: faUtensils,
      category: "Negocio",
      schemaType: "Restaurant"
    },
    {
      title: "Schema Hotel",
      description: "Genera Schema para hoteles: ubicación, servicios, precios, disponibilidad y reseñas.",
      href: "/tools/seo-schema/hotel",
      icon: faHotel,
      category: "Negocio",
      schemaType: "Hotel"
    },
    {
      title: "Schema Event",
      description: "Crea Schema para eventos: fecha, ubicación, precio, organizador y descripción del evento.",
      href: "/tools/seo-schema/event",
      icon: faCalendar,
      featured: true,
      category: "Eventos",
      schemaType: "Event"
    },
    {
      title: "Schema Place",
      description: "Genera Schema para lugares: coordenadas, dirección, teléfono y datos de contacto.",
      href: "/tools/seo-schema/place",
      icon: faMapMarkerAlt,
      category: "Ubicación",
      schemaType: "Place"
    },
    {
      title: "Schema FAQPage",
      description: "Crea Schema para páginas de preguntas frecuentes: preguntas y respuestas estructuradas.",
      href: "/tools/seo-schema/faq-page",
      icon: faQuestionCircle,
      category: "Contenido",
      schemaType: "FAQPage"
    },
    {
      title: "Schema HowTo",
      description: "Genera Schema para guías paso a paso: instrucciones detalladas con imágenes y videos.",
      href: "/tools/seo-schema/how-to",
      icon: faCode,
      category: "Contenido",
      schemaType: "HowTo"
    },
    {
      title: "Schema BreadcrumbList",
      description: "Crea Schema para breadcrumbs: navegación estructurada para mejorar la experiencia de usuario.",
      href: "/tools/seo-schema/breadcrumb-list",
      icon: faLayerGroup,
      category: "Navegación",
      schemaType: "BreadcrumbList"
    },
    {
      title: "Schema WebSite",
      description: "Genera Schema para sitios web: nombre, URL, motor de búsqueda y configuración del sitio.",
      href: "/tools/seo-schema/website",
      icon: faCode,
      category: "Sitio Web",
      schemaType: "WebSite"
    },
    {
      title: "Schema WebPage",
      description: "Crea Schema para páginas web individuales: título, descripción, fecha y autor.",
      href: "/tools/seo-schema/web-page",
      icon: faFileAlt,
      category: "Sitio Web",
      schemaType: "WebPage"
    },
    {
      title: "Schema Movie",
      description: "Genera Schema para películas: director, actores, duración, calificación y fecha de estreno.",
      href: "/tools/seo-schema/movie",
      icon: faFilm,
      category: "Multimedia",
      schemaType: "Movie"
    },
    {
      title: "Schema SoftwareApplication",
      description: "Crea Schema para aplicaciones: precio, calificación, sistema operativo y descripción.",
      href: "/tools/seo-schema/software-application",
      icon: faCode,
      category: "Tecnología",
      schemaType: "SoftwareApplication"
    },
    {
      title: "Schema Rating",
      description: "Genera Schema para calificaciones: valor numérico, mejor y peor calificación posible.",
      href: "/tools/seo-schema/rating",
      icon: faStar,
      category: "E-commerce",
      schemaType: "Rating"
    },
    {
      title: "Schema AggregateRating",
      description: "Crea Schema para calificaciones agregadas: promedio, número de reseñas y distribución.",
      href: "/tools/seo-schema/aggregate-rating",
      icon: faChartLine,
      category: "E-commerce",
      schemaType: "AggregateRating"
    }
  ];

  const categories = [
    { name: "Negocio", count: schemaTools.filter(t => t.category === "Negocio").length },
    { name: "Contenido", count: schemaTools.filter(t => t.category === "Contenido").length },
    { name: "E-commerce", count: schemaTools.filter(t => t.category === "E-commerce").length },
    { name: "Multimedia", count: schemaTools.filter(t => t.category === "Multimedia").length },
    { name: "Eventos", count: schemaTools.filter(t => t.category === "Eventos").length },
    { name: "Sitio Web", count: schemaTools.filter(t => t.category === "Sitio Web").length },
  ];

  const featuredTools = schemaTools.filter(tool => tool.featured);
  const otherTools = schemaTools.filter(tool => !tool.featured);

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
                <Link href="/tools/seo-schema" className="text-primary font-semibold" aria-current="page">
                  Schema SEO
                </Link>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              Schema.org Markup
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
              Generadores de <span className="text-primary">Schema SEO</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
              Crea Schema.org markup (JSON-LD) para mejorar tu SEO y obtener rich snippets en Google.
              Generadores gratuitos para Organization, Product, Article, LocalBusiness y más de 25 tipos de Schema.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-text/50">
              <span className="px-3 py-1 bg-background rounded-full border border-gray-200">✅ JSON-LD</span>
              <span className="px-3 py-1 bg-background rounded-full border border-gray-200">✅ Validado</span>
              <span className="px-3 py-1 bg-background rounded-full border border-gray-200">✅ Rich Snippets</span>
              <span className="px-3 py-1 bg-background rounded-full border border-gray-200">✅ 100% Gratis</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-primary mb-1">{schemaTools.length}</div>
              <div className="text-xs text-text/60 font-semibold">Schemas</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-primary mb-1">{categories.length}</div>
              <div className="text-xs text-text/60 font-semibold">Categorías</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-primary mb-1">JSON-LD</div>
              <div className="text-xs text-text/60 font-semibold">Formato</div>
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
                Schemas Más Populares
              </h2>
              <p className="text-text/60 text-sm">Los schemas más utilizados para mejorar tu SEO</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className="group relative flex flex-col bg-surface rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-primary transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-background group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-md mb-4">
                    <FontAwesomeIcon icon={tool.icon} className="text-xl" />
                  </div>

                  <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-sm text-text/60 leading-relaxed mb-4 line-clamp-2">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover:border-primary/20 transition-colors">
                    <span className="text-xs font-semibold text-text/50 group-hover:text-primary transition-colors">
                      {tool.schemaType}
                    </span>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                      Generar
                      <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
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
            <h2 className="text-2xl font-semibold text-text mb-2">Todos los Schemas</h2>
            <p className="text-text/60 text-sm">Explora nuestra colección completa de generadores de Schema.org</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.href}
              className="group relative flex flex-col bg-surface rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-primary transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-background group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-md mb-4">
                  <FontAwesomeIcon icon={tool.icon} className="text-xl" />
                </div>

                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors mb-2">
                  {tool.title}
                </h3>

                <p className="text-sm text-text/60 leading-relaxed mb-4 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover:border-primary/20 transition-colors">
                  <span className="text-xs font-semibold text-text/50 group-hover:text-primary transition-colors">
                    {tool.schemaType}
                  </span>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                    Generar
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="w-full bg-surface border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-text mb-4">Organizados por Tipo</h2>
            <p className="text-text/60 max-w-xl mx-auto">
              Encuentra rápidamente el schema que necesitas según el tipo de contenido o negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryTools = schemaTools.filter(t => t.category === category.name);
              return (
                <div
                  key={index}
                  className="bg-background rounded-xl p-6 border border-gray-100 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-text mb-4">{category.name}</h3>
                  <ul className="space-y-2">
                    {categoryTools.slice(0, 4).map((tool, toolIndex) => (
                      <li key={toolIndex}>
                        <Link
                          href={tool.href}
                          className="flex items-center text-sm text-text/70 hover:text-primary transition-colors group"
                        >
                          <FontAwesomeIcon icon={tool.icon} className="mr-2 text-primary/50 group-hover:text-primary text-xs" />
                          {tool.title}
                          <FontAwesomeIcon icon={faArrowRight} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                        </Link>
                      </li>
                    ))}
                    {categoryTools.length > 4 && (
                      <li className="text-xs text-text/50 pt-2">
                        +{categoryTools.length - 4} más schemas
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-text mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-primary" />
              ¿Qué es Schema.org?
            </h2>
            <div className="space-y-4 text-text/70">
              <p>
                Schema.org es un vocabulario estructurado que permite a los motores de búsqueda entender mejor el contenido de tu sitio web.
                Al implementar Schema markup, puedes obtener rich snippets en los resultados de búsqueda de Google.
              </p>
              <p>
                Nuestros generadores crean código JSON-LD válido que puedes copiar y pegar directamente en tu sitio web.
                El formato JSON-LD es el método recomendado por Google y se coloca en la sección <code className="bg-background px-2 py-1 rounded text-xs">{"<head>"}</code> de tu HTML.
              </p>
              <div className="bg-background p-4 rounded-xl border border-gray-200 mt-4">
                <p className="text-sm font-semibold text-text mb-2">💡 Beneficios:</p>
                <ul className="text-sm space-y-1 text-text/60">
                  <li>✅ Rich snippets en Google (estrellas, precios, fechas, etc.)</li>
                  <li>✅ Mejor comprensión del contenido por parte de los motores de búsqueda</li>
                  <li>✅ Mayor probabilidad de aparecer en búsquedas de voz</li>
                  <li>✅ Mejora del CTR (Click-Through Rate) en los resultados de búsqueda</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-surface border-t border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
              ¿Necesitas otro tipo de Schema?
            </h2>
            <p className="text-text/60 mb-6 max-w-xl mx-auto">
              Estamos constantemente añadiendo nuevos generadores de Schema. Si necesitas un tipo específico
              que no encuentras, contáctanos y lo añadiremos.
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

