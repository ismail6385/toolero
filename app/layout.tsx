
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Prevent Font Awesome from adding its own CSS automatically since we imported it above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toolero.es - Herramientas Gratuitas Online',
  description: 'Descubre nuestra colección de herramientas online gratuitas: contador de palabras, edición de imágenes y más.',
  keywords: 'herramientas, online, gratis, contador palabras, redimensionar imagen, toolero',
  authors: [{ name: 'Toolero.es' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-ES">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
