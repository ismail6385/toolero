import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav 
      className="bg-surface/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center gap-2 group"
              aria-label="Toolero.es - Ir al inicio"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm shadow-md group-hover:scale-105 transition-transform">
                <FontAwesomeIcon icon={faTools} aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-text group-hover:text-primary transition-colors">
                Toolero.es
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link 
              href="/" 
              className="text-text/70 hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              aria-label="Ir a la página de inicio"
            >
              Inicio
            </Link>
            <Link 
              href="/categorias" 
              className="text-text/70 hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              aria-label="Ver todas las categorías"
            >
              Categorías
            </Link>
            <Link 
              href="/tools" 
              className="text-text/70 hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              aria-label="Ver todas las herramientas"
            >
              Herramientas
            </Link>
            <Link 
              href="#" 
              className="px-5 py-2 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-secondary hover:border-secondary hover:text-white transition-all shadow-md"
              aria-label="Contribuir al proyecto"
            >
              Contribuir
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
