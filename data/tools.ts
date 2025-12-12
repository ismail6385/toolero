
import {
    faFont,
    faImage,
    faLock,
    faPalette,
    faEnvelope,
    faSearch,
    faShareAlt,
    faVideo,
    faCode,
    faCalculator,
    faList,
    faHeading,
    faLink,
    faFileCode,
    faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

export interface Tool {
    title: string;
    description: string;
    href: string;
    icon: any;
}

export interface Category {
    name: string;
    slug: string;
    icon: any;
    color: string;
    description: string;
    tools: Tool[];
}

export const toolsData: Category[] = [
    {
        name: 'Texto & Contenido',
        slug: 'texto',
        icon: faFont,
        color: 'text-blue-500',
        description: 'Herramientas para manipulación y análisis de texto.',
        tools: [
            {
                title: 'Contador de Palabras',
                description: 'Cuenta palabras, caracteres, frases y estima tiempo de lectura.',
                href: '/tools/texto/contador-palabras',
                icon: faFont
            },
            {
                title: 'Contador de Caracteres',
                description: 'Calcula el número de caracteres con y sin espacios.',
                href: '/tools/texto/contador-caracteres',
                icon: faCalculator
            },
            {
                title: 'Buscador y Reemplazo',
                description: 'Busca y reemplaza texto masivamente en tu contenido.',
                href: '/tools/texto/buscador-reemplazo',
                icon: faSearch
            },
            {
                title: 'Codificador Base64',
                description: 'Convierte texto y archivos a formato Base64 instantáneamente.',
                href: '/tools/texto/codificador-base64',
                icon: faCode
            },
            {
                title: 'Comparador de Textos',
                description: 'Compara dos textos y encuentra las diferencias visualmente.',
                href: '/tools/texto/comparador-textos',
                icon: faCode
            },
            {
                title: 'Conversor de Mayúsculas',
                description: 'Alterna entre mayúsculas, minúsculas y tipo título.',
                href: '/tools/texto/conversor-mayusculas', // Assuming this exists or will exist
                icon: faHeading
            }
        ]
    },
    {
        name: 'Imágenes',
        slug: 'imagen',
        icon: faImage,
        color: 'text-purple-500',
        description: 'Optimización y edición básica de imágenes.',
        tools: [
            {
                title: 'Redimensionar Imagen',
                description: 'Optimiza y cambia el tamaño de tus imágenes (JPG, PNG, WebP).',
                href: '/tools/imagen/redimensionar',
                icon: faImage
            }
        ]
    },
    {
        name: 'Color & Diseño',
        slug: 'color',
        icon: faPalette,
        color: 'text-pink-500',
        description: 'Herramientas de color para diseñadores y desarrolladores.',
        tools: [
            {
                title: 'Generador de Paletas',
                description: 'Crea combinaciones de colores armónicas para tus proyectos.',
                href: '/tools/color/palette-generator',
                icon: faPalette
            },
            {
                title: 'Selector de Color',
                description: 'Extrae colores de imágenes o selecciona manualmente.',
                href: '/tools/color/image-picker',
                icon: faPalette
            },
            {
                title: 'Verificador de Contraste',
                description: 'Verifica la accesibilidad y contraste de tus colores.',
                href: '/tools/color/contrast-checker',
                icon: faPalette
            },
            {
                title: 'Conversor HEX a RGB',
                description: 'Transforma códigos de color entre formatos HEX y RGB.',
                href: '/tools/color/hex-to-rgb',
                icon: faCode
            },
            {
                title: 'Generador de Degradados',
                description: 'Crea gradientes CSS personalizados y copia el código.',
                href: '/tools/color/gradient-generator',
                icon: faPalette
            },
            {
                title: 'RGB a HEX',
                description: 'Convierte valores RGB a código hexadecimal.',
                href: '/tools/color/rgb-to-hex',
                icon: faCode
            }
        ]
    },
    {
        name: 'Seguridad',
        slug: 'seguridad',
        icon: faShieldAlt, // faShieldAlt is usually available
        color: 'text-green-500',
        description: 'Protege tus datos y genera claves seguras.',
        tools: [
            {
                title: 'Generador de Contraseñas',
                description: 'Crea contraseñas criptográficamente seguras y únicas.',
                href: '/tools/seguridad/password-generator',
                icon: faLock
            },
            {
                title: 'Analizador de Contraseñas',
                description: 'Verifica qué tan segura es tu contraseña actual.',
                href: '/tools/seguridad/password-strength',
                icon: faLock
            },
            {
                title: 'Generador MD5',
                description: 'Crea hashes MD5 de cualquier texto o string.',
                href: '/tools/seguridad/md5-generator',
                icon: faLock
            },
            {
                title: 'Generador SHA256',
                description: 'Genera hashes SHA256 seguros para tus datos.',
                href: '/tools/seguridad/sha256-generator',
                icon: faLock
            },
            {
                title: 'URL Encoder/Decoder',
                description: 'Codifica o decodifica URLs para uso seguro.',
                href: '/tools/seguridad/url-encoder',
                icon: faLink
            },
            {
                title: 'Generador .htaccess',
                description: 'Crea archivos de configuración .htaccess fácilmente.',
                href: '/tools/seguridad/htaccess-generator',
                icon: faFileCode
            }
        ]
    },
    {
        name: 'SEO & Schema',
        slug: 'seo-schema',
        icon: faSearch,
        color: 'text-orange-500',
        description: 'Mejora tu posicionamiento y estructura web.',
        tools: [
            {
                title: 'Schema FAQ Page',
                description: 'Genera marcado estructurado para páginas de preguntas frecuentes.',
                href: '/tools/seo-schema/faq-page',
                icon: faCode
            },
            {
                title: 'Schema Article',
                description: 'Genera marcado estructurado para noticias y artículos de blog.',
                href: '/tools/seo-schema/article',
                icon: faCode
            },
            {
                title: 'Schema Organization',
                description: 'Datos estructurados para identificar tu organización.',
                href: '/tools/seo-schema/organization',
                icon: faCode
            },
            {
                title: 'Schema Product',
                description: 'Mejora la visualización de tus productos en Google.',
                href: '/tools/seo-schema/product',
                icon: faCode
            },
            {
                title: 'Schema Local Business',
                description: 'Ayuda a los clientes a encontrar tu negocio local.',
                href: '/tools/seo-schema/local-business',
                icon: faCode
            }
        ]
    }
];
