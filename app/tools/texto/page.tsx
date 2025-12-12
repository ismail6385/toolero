import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont,
  faHeading,
  faRuler,
  faAlignLeft,
  faCopy,
  faCode,
  faSearch,
  faRandom,
  faExchangeAlt,
  faTrash,
  faCheckCircle,
  faQuoteLeft,
  faArrowRight,
  faBolt,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

export const metadata = {
  title: 'Herramientas de Texto Gratuitas - Toolero.es | Contador, Conversor, Formateador',
  description: 'Herramientas de texto gratuitas online: contador de palabras, conversor de mayúsculas, eliminador de espacios, codificador Base64, formateador JSON y más. Todas las herramientas que necesitas para trabajar con texto.',
  keywords: 'herramientas texto, contador palabras, conversor mayúsculas, formateador texto, codificador base64, eliminador espacios, herramienta texto online, toolero texto',
  openGraph: {
    title: 'Herramientas de Texto Gratuitas - Toolero.es',
    description: 'Suite completa de herramientas de texto gratuitas para análisis, conversión y formateo.',
    type: 'website',
  },
};

interface TextTool {
  title: string;
  description: string;
  href: string;
  icon: any;
  featured?: boolean;
  category: string;
}

export default function TextoToolsPage() {
  const textTools: TextTool[] = [
    {
      title: "Contador de Palabras",
      description: "Análisis completo de texto: cuenta palabras, caracteres, párrafos, frases y estima tiempo de lectura.",
      href: "/tools/texto/contador-palabras",
      icon: faFont,
      featured: true,
      category: "Análisis"
    },
    {
      title: "Conversor de Mayúsculas",
      description: "Convierte texto entre mayúsculas, minúsculas, título y formato oración con un clic.",
      href: "/tools/texto/conversor-mayusculas",
      icon: faHeading,
      featured: true,
      category: "Conversión"
    },
    {
      title: "Eliminador de Espacios",
      description: "Elimina espacios en blanco, saltos de línea y caracteres innecesarios de tu texto.",
      href: "/tools/texto/eliminador-espacios",
      icon: faTrash,
      category: "Limpieza"
    },
    {
      title: "Contador de Caracteres",
      description: "Cuenta caracteres con y sin espacios, ideal para redes sociales y límites de texto.",
      href: "/tools/texto/contador-caracteres",
      icon: faRuler,
      category: "Análisis"
    },
    {
      title: "Inversor de Texto",
      description: "Invierte el orden de las palabras o caracteres en tu texto de forma instantánea.",
      href: "/tools/texto/inversor-texto",
      icon: faExchangeAlt,
      category: "Transformación"
    },
    {
      title: "Codificador Base64",
      description: "Codifica y decodifica texto a Base64 de forma segura y rápida.",
      href: "/tools/texto/codificador-base64",
      icon: faCode,
      category: "Codificación"
    },
    {
      title: "Formateador JSON",
      description: "Formatea, valida y minifica código JSON con sintaxis resaltada y detección de errores.",
      href: "/tools/texto/formateador-json",
      icon: faCode,
      featured: true,
      category: "Formateo"
    },
    {
      title: "Buscador y Reemplazo",
      description: "Busca y reemplaza texto en documentos grandes con opciones avanzadas de búsqueda.",
      href: "/tools/texto/buscador-reemplazo",
      icon: faSearch,
      category: "Búsqueda"
    },
    {
      title: "Generador de Texto Aleatorio",
      description: "Genera texto aleatorio, lorem ipsum o texto de prueba para tus proyectos.",
      href: "/tools/texto/generador-texto",
      icon: faRandom,
      category: "Generación"
    },
    {
      title: "Extractor de URLs",
      description: "Extrae todas las URLs, enlaces y direcciones web de cualquier texto.",
      href: "/tools/texto/extractor-urls",
      icon: faSearch,
      category: "Extracción"
    },
    {
      title: "Formateador de Texto",
      description: "Formatea texto: elimina saltos de línea, ajusta espaciado y normaliza formato.",
      href: "/tools/texto/formateador-texto",
      icon: faAlignLeft,
      category: "Formateo"
    },
    {
      title: "Verificador de Ortografía",
      description: "Detecta errores ortográficos y gramaticales en español con sugerencias de corrección.",
      href: "/tools/texto/verificador-ortografia",
      icon: faCheckCircle,
      category: "Corrección"
    },
    {
      title: "Extractor de Emails",
      description: "Encuentra y extrae todas las direcciones de correo electrónico de cualquier texto.",
      href: "/tools/texto/extractor-emails",
      icon: faSearch,
      category: "Extracción"
    },
    {
      title: "Generador de Citas",
      description: "Crea citas formateadas en diferentes estilos: APA, MLA, Chicago y más.",
      href: "/tools/texto/generador-citas",
      icon: faQuoteLeft,
      category: "Generación"
    },
    {
      title: "Comparador de Textos",
      description: "Compara dos textos y encuentra diferencias, similitudes y cambios entre ellos.",
      href: "/tools/texto/comparador-textos",
      icon: faExchangeAlt,
      category: "Análisis"
    },
    {
      title: "Duplicador de Texto",
      description: "Duplica y repite texto múltiples veces con opciones de separación personalizadas.",
      href: "/tools/texto/duplicador-texto",
      icon: faCopy,
      category: "Transformación"
    }
  ];

  const categories = [
    { name: "Análisis", count: textTools.filter(t => t.category === "Análisis").length },
    { name: "Conversión", count: textTools.filter(t => t.category === "Conversión").length },
    { name: "Formateo", count: textTools.filter(t => t.category === "Formateo").length },
    { name: "Codificación", count: textTools.filter(t => t.category === "Codificación").length },
    { name: "Extracción", count: textTools.filter(t => t.category === "Extracción").length },
    { name: "Generación", count: textTools.filter(t => t.category === "Generación").length },
  ];

  const featuredTools = textTools.filter(tool => tool.featured);
  const otherTools = textTools.filter(tool => !tool.featured);

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
                <Link href="/tools/texto" className="text-primary font-semibold" aria-current="page">
                  Herramientas de Texto
                </Link>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
              <FontAwesomeIcon icon={faFont} className="mr-2" />
              Herramientas de Texto
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
              Herramientas de <span className="text-primary">Texto</span> Gratuitas
            </h1>
            <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
              Suite completa de herramientas para trabajar con texto: análisis, conversión, formateo, codificación y más. 
              Todo lo que necesitas para manipular y procesar texto de forma profesional.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-primary mb-1">{textTools.length}</div>
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
              <p className="text-text/60 text-sm">Las herramientas más populares y útiles</p>
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
            <p className="text-text/60 text-sm">Explora nuestra colección completa de herramientas de texto</p>
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

      {/* Category Breakdown */}
      <section className="w-full bg-surface border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-text mb-4">Organizadas por Tipo</h2>
            <p className="text-text/60 max-w-xl mx-auto">
              Encuentra rápidamente la herramienta que necesitas según el tipo de operación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryTools = textTools.filter(t => t.category === category.name);
              return (
                <div
                  key={index}
                  className="bg-background rounded-xl p-6 border border-gray-100 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-text mb-4">{category.name}</h3>
                  <ul className="space-y-2">
                    {categoryTools.slice(0, 3).map((tool, toolIndex) => (
                      <li key={toolIndex}>
                        <Link
                          href={tool.href}
                          className="flex items-center text-sm text-text/70 hover:text-primary transition-colors group"
                        >
                          <FontAwesomeIcon icon={tool.icon} className="mr-2 text-primary/50 group-hover:text-primary" />
                          {tool.title}
                          <FontAwesomeIcon icon={faArrowRight} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs" />
                        </Link>
                      </li>
                    ))}
                    {categoryTools.length > 3 && (
                      <li className="text-xs text-text/50 pt-2">
                        +{categoryTools.length - 3} más herramientas
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-4">
              ¿Necesitas otra herramienta de texto?
            </h2>
            <p className="text-text/60 mb-6 max-w-xl mx-auto">
              Estamos constantemente añadiendo nuevas herramientas. Si tienes una sugerencia específica, 
              no dudes en contactarnos y la consideraremos.
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

