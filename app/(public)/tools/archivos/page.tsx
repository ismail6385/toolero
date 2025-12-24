import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faLayerGroup,
  faFolder
} from '@fortawesome/free-solid-svg-icons';
import { toolsData } from '@/data/tools';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Herramientas de Archivos - Toolero.es',
  description:
    'Gestiona y procesa archivos fácilmente: conversores, compresores y utilidades de manejo de ficheros.',
};

export default function FileToolsPage() {
  const category = toolsData.find(c => c.slug === 'archivos');

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <nav className="mb-8 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center justify-center space-x-2 text-text/60">
                <li>
                  <Link href="/" className="hover:text-teal-600 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
                </li>
                <li>
                  <Link href="/categorias" className="hover:text-teal-600 transition-colors">
                    Categorías
                  </Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
                </li>
                <li>
                  <span className="text-teal-600 font-semibold" aria-current="page">
                    Herramientas de archivos
                  </span>
                </li>
              </ol>
            </nav>

            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-600 text-xs font-semibold uppercase tracking-wide mb-6">
                <FontAwesomeIcon icon={faFolder} className="mr-2" />
                Herramientas de archivos
              </div>
              <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
                Herramientas de <span className="text-teal-600">Archivos</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
                Muy pronto podrás combinar, comprimir y convertir tus archivos directamente desde tu navegador.
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-teal-600 mb-1">0</div>
                <div className="text-xs text-text/60 font-semibold">Herramientas aún</div>
              </div>
              <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-teal-600 mb-1">En</div>
                <div className="text-xs text-text/60 font-semibold">Desarrollo</div>
              </div>
              <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold text-teal-600 mb-1">Toolero</div>
                <div className="text-xs text-text/60 font-semibold">Próximamente</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative w-full overflow-hidden bg-surface pb-16 pt-24 lg:pt-32">
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center space-x-2 text-text/60">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
              </li>
              <li>
                <Link href="/categorias" className="hover:text-teal-600 transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs mx-2" />
              </li>
              <li>
                <span className="text-teal-600 font-semibold" aria-current="page">
                  {category.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-600 text-xs font-semibold uppercase tracking-wide mb-6">
              <FontAwesomeIcon icon={category.icon} className="mr-2" />
              {category.name}
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-text tracking-tight mb-6">
              Herramientas de <span className="text-teal-600">Archivos</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-text/60 max-w-3xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-teal-600 mb-1">{category.tools.length}</div>
              <div className="text-xs text-text/60 font-semibold">Herramientas</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-teal-600 mb-1">Instantáneo</div>
              <div className="text-xs text-text/60 font-semibold">Velocidad</div>
            </div>
            <div className="bg-background rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-teal-600 mb-1">100%</div>
              <div className="text-xs text-text/60 font-semibold">Gratis</div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-text mb-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faLayerGroup} className="text-teal-600" />
              Todas las Herramientas
            </h2>
            <p className="text-text/60 text-sm">Colección completa de {category.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map((tool, index) => (
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
    </div>
  );
}


