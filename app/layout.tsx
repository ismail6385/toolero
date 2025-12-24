
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import WebsiteJsonLd from '@/components/seo/WebsiteJsonLd';

// Prevent Font Awesome from adding its own CSS automatically since we imported it above
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolero.es'),
  title: {
    default: 'Toolero.es - Herramientas Gratuitas Online | 100% Gratis',
    template: '%s | Toolero.es'
  },
  description: 'Descubre más de 50 herramientas online gratuitas: contador de palabras, edición de imágenes, generadores de contraseñas, herramientas SEO y más. Sin registro, 100% gratis.',
  keywords: [
    'herramientas online gratis',
    'contador de palabras',
    'redimensionar imagen',
    'generador de contraseñas',
    'herramientas SEO',
    'conversor de texto',
    'herramientas de diseño',
    'utilidades web',
    'toolero',
    'herramientas digitales',
    'generador schema markup',
    'optimización imágenes',
    'herramientas de seguridad'
  ],
  authors: [{ name: 'Toolero.es', url: 'https://toolero.es' }],
  creator: 'Toolero.es',
  publisher: 'Toolero.es',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'g3tTxMCEjAZAs0D8NY8eInOXiy_dHnrkPUUmpyKC4T4',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://toolero.es',
    siteName: 'Toolero.es',
    title: 'Toolero.es - Herramientas Gratuitas Online',
    description: 'Más de 50 herramientas online gratuitas para potenciar tu productividad. Sin registro, sin esperas.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Toolero.es - Herramientas Gratuitas Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolero.es - Herramientas Gratuitas Online',
    description: 'Más de 50 herramientas online gratuitas para potenciar tu productividad.',
    images: ['/og-image.jpg'],
    creator: '@toolero_es',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background`}>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        {children}
      </body>
    </html>
  );
}
