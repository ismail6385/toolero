import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTools, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página No Encontrada',
  description: 'La página que buscas no existe. Vuelve al inicio o explora nuestras herramientas.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative Background Elements */}
        <div className="relative">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          <div className="absolute top-0 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl mix-blend-multiply opacity-50" />
          
          {/* 404 Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={faExclamationTriangle} 
                  className="text-5xl text-primary"
                />
              </div>
            </div>

            {/* 404 Number */}
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 mb-4 leading-none">
              404
            </h1>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-text mb-4">
              Página No Encontrada
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-text/60 mb-8 max-w-md mx-auto leading-relaxed">
              Lo sentimos, la página que estás buscando no existe o ha sido movida. 
              Pero no te preocupes, tenemos muchas herramientas increíbles esperándote.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <Link 
                href="/" 
                className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-secondary hover:shadow-md transition-all text-lg"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Volver al Inicio
              </Link>
              <Link 
                href="/tools" 
                className="inline-flex justify-center items-center px-8 py-4 bg-surface text-text font-semibold rounded-xl border border-gray-200 hover:text-primary hover:border-primary transition-all text-lg shadow-md"
              >
                <FontAwesomeIcon icon={faTools} className="mr-2" />
                Explorar Herramientas
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-text/50 mb-4">También puedes visitar:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/categorias" 
                  className="text-primary hover:text-secondary font-medium transition-colors"
                >
                  Categorías
                </Link>
                <span className="text-text/30">•</span>
                <Link 
                  href="/tools" 
                  className="text-primary hover:text-secondary font-medium transition-colors"
                >
                  Todas las Herramientas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

