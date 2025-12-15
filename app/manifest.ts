import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Toolero.es - Herramientas Online Gratuitas',
        short_name: 'Toolero',
        description: 'Suite de herramientas online gratuitas: SEO, imágenes, texto, seguridad y más.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f8fc',
        theme_color: '#7129cc',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
