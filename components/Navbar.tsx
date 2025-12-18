import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav
      className="bg-surface/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-2 group"
              aria-label="Toolero - Ir al inicio"
            >
              <div className="relative w-24 h-24 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Toolero Logo"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <span className="text-3xl font-bold text-text group-hover:text-primary transition-colors">
                Toolero
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
