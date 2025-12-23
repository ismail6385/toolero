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
    faShieldAlt,
    faGlobe,
    faRobot,
    faHashtag,
    faExpand,
    faParagraph,
    faPercentage,
    faExchangeAlt,
    faBirthdayCake,
    faCompress,
    faAlignLeft,
    faEraser,
    faTags,
    faNewspaper,
    faShoppingCart,
    faStore,
    faQuestionCircle,
    faBriefcase,
    faFilePdf,
    faCopy,
    faClock,
    faStopwatch,
    faHourglassHalf,
    faCalendarAlt,
    faEquals,
    faDice,
    faHeartbeat,
    faWeight,
    faFire,
    faTint,
    faCoins,
    faChartLine,
    faFingerprint,
    faQrcode,
    faQuoteRight,
    faSpellCheck,
    faBroom,
    faServer,
    faCheckDouble,
    faKeyboard,
    faCommentDots,
    faBaby,
    faVenus,
    faBullhorn,
    faTag,
    faSmile,
    faUtensils,
    faSearchPlus,
    faMicrochip,
    faEyeDropper,
    faAdjust,
    faBed,
    faUserTag,
    faIcons,
    faGraduationCap,
    faFileWord,
    faFileExcel,
    faFileAlt,
    faPenToSquare,
    faCouch,
    faPaintRoller,
    faTv,
    faTree,
    faRuler,
    faLayerGroup,
    faCube,
    faThLarge
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
        name: 'Imágenes',
        slug: 'imagen',
        icon: faImage,
        color: 'text-purple-500',
        description: 'Optimización y conversión de imágenes sin servidor.',
        tools: [
            {
                title: 'Redimensionar Imagen',
                description: 'Cambia el tamaño pixel por pixel. 100% privado.',
                href: '/tools/imagen/redimensionar',
                icon: faImage
            },
            {
                title: 'Convertidor de Formatos',
                description: 'Convierte entre JPG, PNG y WEBP instantáneamente.',
                href: '/tools/imagen/convertidor',
                icon: faExchangeAlt
            },
            {
                title: 'Compresor de Imagen',
                description: 'Reduce el peso de tus imágenes para web.',
                href: '/tools/imagen/compresor',
                icon: faCompress
            },
            {
                title: 'Generador Código QR',
                description: 'Crea códigos QR personalizados gratis.',
                href: '/tools/imagen/generador-qr',
                icon: faQrcode
            },
            {
                title: 'Generador de Memes',
                description: 'Crea memes virales con tus propias imágenes.',
                href: '/tools/imagen/generador-memes',
                icon: faSmile
            },
            {
                title: 'Generador de Favicon',
                description: 'Crea un icono perfecto para tu sitio web.',
                href: '/tools/imagen/generador-favicon',
                icon: faIcons
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
                description: 'Crea paletas de colores armónicas.',
                href: '/tools/color/palette-generator',
                icon: faPalette
            },
            {
                title: 'Selector de Color',
                description: 'Extrae colores de imágenes.',
                href: '/tools/color/image-picker',
                icon: faEyeDropper
            },
            {
                title: 'Contraste Color',
                description: 'Verifica la accesibilidad y contraste.',
                href: '/tools/color/contrast-checker',
                icon: faAdjust
            },
            {
                title: 'HEX a RGB',
                description: 'Convierte códigos hexadecimales a RGB.',
                href: '/tools/color/hex-to-rgb',
                icon: faCode
            },
            {
                title: 'Generador Gradientes',
                description: 'Crea degradados CSS perfectos.',
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
        name: 'Redes Sociales',
        slug: 'social',
        icon: faShareAlt,
        color: 'text-pink-600',
        description: 'Herramientas para Instagram, YouTube, TikTok y más.',
        tools: [
            {
                title: "Generador de Hashtags",
                description: "Genera hashtags populares y relevantes.",
                href: "/tools/social/hashtag-generator",
                icon: faHashtag
            },
            {
                title: "Fuentes para Bio",
                description: "Fuentes estéticas para tus perfiles sociales.",
                href: "/tools/social/bio-fonts",
                icon: faFont
            },
            {
                title: "Extractor Tags YouTube",
                description: "Extrae etiquetas de videos de YouTube.",
                href: "/tools/social/youtube-tags",
                icon: faVideo
            },
            {
                title: "Miniaturas YouTube",
                description: "Descarga miniaturas de videos de YouTube.",
                href: "/tools/social/youtube-thumbnail",
                icon: faImage
            },
            {
                title: "Generador Link WhatsApp",
                description: "Crea enlaces directos de WhatsApp con mensaje.",
                href: "/tools/social/link-whatsapp",
                icon: faCommentDots
            },
            {
                title: "Generador de UTM",
                description: "Crea URLs con parámetros UTM para tracking.",
                href: "/tools/social/utm-generator",
                icon: faBullhorn
            },
            {
                title: "Generador de Nicknames",
                description: "Crea nombres de usuario únicos para redes.",
                href: "/tools/social/generador-nombres",
                icon: faUserTag
            }
        ]
    },
    {
        name: 'Video',
        slug: 'video',
        icon: faVideo,
        color: 'text-red-500',
        description: 'Herramientas de cálculo útiles para editores de video.',
        tools: [
            {
                title: "Calculadora Aspect Ratio",
                description: "Calcula dimensiones y relaciones de aspecto.",
                href: "/tools/video/aspect-ratio",
                icon: faExpand
            },
            {
                title: "Calculadora de Bitrate",
                description: "Estima el bitrate para streaming y video.",
                href: "/tools/video/bitrate-calculator",
                icon: faCalculator
            },
            {
                title: "Link Tiempo YouTube",
                description: "Genera enlaces a momentos específicos.",
                href: "/tools/video/timestamp-link",
                icon: faLink
            },
            {
                title: "Grabador de Pantalla",
                description: "Graba tu pantalla y micrófono gratis online.",
                href: "/tools/video/grabador-pantalla",
                icon: faVideo
            }
        ]
    },
    {
        name: 'Finanzas',
        slug: 'finanzas',
        icon: faCoins,
        color: 'text-yellow-500',
        description: 'Calculadoras financieras para préstamos, impuestos y ahorros.',
        tools: [
            {
                title: 'Calc. Préstamos',
                description: 'Calcula cuotas mensuales e intereses de préstamos.',
                href: '/tools/finanzas/prestamos',
                icon: faCalculator
            },
            {
                title: 'Interés Compuesto',
                description: 'Proyecta el crecimiento de tus inversiones.',
                href: '/tools/finanzas/interes-compuesto',
                icon: faChartLine
            },
            {
                title: 'Calculadora de IVA',
                description: 'Calcula el impuesto (IVA/VAT) de cualquier importe.',
                href: '/tools/finanzas/iva',
                icon: faPercentage
            },
            {
                title: 'Calculadora de Descuentos',
                description: 'Calcula el precio final con porcentaje de descuento.',
                href: '/tools/finanzas/descuentos',
                icon: faTag
            },
            {
                title: 'Calculadora ROI',
                description: 'Calcula el Retorno de Inversión de tus campañas.',
                href: '/tools/finanzas/roi',
                icon: faChartLine
            },
            {
                title: 'Calculadora de Propinas',
                description: 'Divide la cuenta y calcula propinas fácilmente.',
                href: '/tools/finanzas/calculadora-propinas',
                icon: faUtensils
            }
        ]
    },
    {
        name: 'Email',
        slug: 'email',
        icon: faEnvelope,
        color: 'text-blue-400',
        description: 'Herramientas para correo electrónico.',
        tools: [
            {
                title: 'Generador de Firmas',
                description: 'Crea firmas de correo profesionales gratis.',
                href: '/tools/email/generador-firma',
                icon: faEnvelope
            }
        ]
    },
    {
        name: 'Web & Dev',
        slug: 'dev',
        icon: faCode,
        color: 'text-indigo-600',
        description: 'Herramientas esenciales para desarrolladores web.',
        tools: [
            {
                title: 'Formateador JSON',
                description: 'Valida, formatea y minifica código JSON.',
                href: '/tools/dev/json-formatter',
                icon: faCode
            },
            {
                title: 'Gradientes CSS',
                description: 'Generador de degradados CSS lineales y radiales.',
                href: '/tools/dev/css-gradient',
                icon: faPalette
            },
            {
                title: 'Lorem Ipsum',
                description: 'Generador de texto de relleno para diseños.',
                href: '/tools/dev/lorem-ipsum',
                icon: faParagraph
            },
            {
                title: 'Generador UUID',
                description: 'Genera identificadores únicos universales (v4).',
                href: '/tools/dev/uuid-generator',
                icon: faFingerprint
            },
            {
                title: 'Minificador CSS',
                description: 'Comprime tu código CSS para mejorar la carga.',
                href: '/tools/dev/minificador-css',
                icon: faFileCode
            },
            {
                title: 'Minificador HTML',
                description: 'Reduce el tamaño de tus archivos HTML.',
                href: '/tools/dev/minificador-html',
                icon: faCode
            },
            {
                title: 'Calculadora Chmod',
                description: 'Genera permisos de archivos Linux fácilmente.',
                href: '/tools/dev/chmod-calculator',
                icon: faLock
            },
            {
                title: 'Códigos de Teclas (Keycode)',
                description: 'Encuentra el código JavaScript de cualquier tecla.',
                href: '/tools/dev/keycode-info',
                icon: faKeyboard
            }
        ]
    },
    {
        name: 'Seguridad',
        slug: 'seguridad',
        icon: faShieldAlt,
        color: 'text-sky-600',
        description: 'Herramientas de seguridad y criptografía local.',
        tools: [
            {
                title: 'Generador de Contraseñas',
                description: 'Crea claves fuertes y personalizables al instante.',
                href: '/tools/seguridad/password-generator',
                icon: faLock
            },
            {
                title: 'Analizador de Contraseñas',
                description: 'Verifica la seguridad de tu contraseña localmente.',
                href: '/tools/seguridad/password-strength',
                icon: faShieldAlt
            },
            {
                title: 'Generador Hash',
                description: 'Encripta texto usando MD5, SHA-1, etc.',
                href: '/tools/seguridad/md5-generator',
                icon: faLock
            },
            {
                title: 'Generador SHA-256',
                description: 'Calcula el hash SHA-256 seguro de cualquier texto.',
                href: '/tools/seguridad/sha256-generator',
                icon: faFingerprint
            },
            {
                title: 'Generador .htaccess',
                description: 'Crea archivos de configuración para servidores Apache.',
                href: '/tools/seguridad/htaccess-generator',
                icon: faServer
            },
            {
                title: 'Encoder/Decoder URL',
                description: 'Codifica o decodifica caracteres especiales en URLs.',
                href: '/tools/seguridad/url-encoder',
                icon: faLink
            }
        ]
    },
    {
        name: 'Texto y Contenido',
        slug: 'texto',
        icon: faAlignLeft,
        color: 'text-orange-500',
        description: 'Manipulación y análisis de texto avanzado.',
        tools: [
            {
                title: 'Formateador de Texto',
                description: 'Limpia y da formato a textos desordenados.',
                href: '/tools/texto/formateador-texto',
                icon: faBroom
            },
            {
                title: 'Verificador Ortografía',
                description: 'Revisa la gramática y ortografía (Básico).',
                href: '/tools/texto/verificador-ortografia',
                icon: faCheckDouble
            },
            {
                title: 'Generador de Citas',
                description: 'Crea referencias APA, MLA y Harvard.',
                href: '/tools/texto/generador-citas',
                icon: faQuoteRight
            },
            {
                title: 'Contador de Palabras',
                description: 'Cuenta palabras, caracteres y párrafos en tiempo real.',
                href: '/tools/texto/contador-palabras',
                icon: faAlignLeft
            },
            {
                title: 'Contador de Caracteres',
                description: 'Estadísticas detalladas de caracteres y densidad.',
                href: '/tools/texto/contador-caracteres',
                icon: faCalculator
            },
            {
                title: 'Conversor Mayúsculas',
                description: 'Cambia entre mayúsculas, minúsculas y capitalización.',
                href: '/tools/texto/conversor-mayusculas',
                icon: faFont
            },
            {
                title: 'Eliminador de Espacios',
                description: 'Limpia espacios extra, saltos de línea y tabulaciones.',
                href: '/tools/texto/eliminador-espacios',
                icon: faEraser
            },
            {
                title: 'Comparador de Textos',
                description: 'Encuentra diferencias entre dos textos (Diff).',
                href: '/tools/texto/comparador-textos',
                icon: faExchangeAlt
            },
            {
                title: 'Buscador y Reemplazo',
                description: 'Busca y reemplaza texto masivamente.',
                href: '/tools/texto/buscador-reemplazo',
                icon: faSearch
            },
            {
                title: 'Extractor de Emails',
                description: 'Extrae direcciones de correo de cualquier texto.',
                href: '/tools/texto/extractor-emails',
                icon: faEnvelope
            },
            {
                title: 'Extractor de URLs',
                description: 'Obtén todos los enlaces de un texto.',
                href: '/tools/texto/extractor-urls',
                icon: faLink
            },
            {
                title: 'Inversor de Texto',
                description: 'Invierte el orden de caracteres o palabras.',
                href: '/tools/texto/inversor-texto',
                icon: faExchangeAlt
            },
            {
                title: 'Duplicador de Texto',
                description: 'Repite un texto el número de veces que quieras.',
                href: '/tools/texto/duplicador-texto',
                icon: faCopy
            },
            {
                title: 'Codificador Base64',
                description: 'Codifica y decodifica texto en formato Base64.',
                href: '/tools/texto/codificador-base64',
                icon: faCode
            },
            {
                title: 'Números a Letras',
                description: 'Convierte cifras numéricas a texto escrito.',
                href: '/tools/texto/numeros-a-letras',
                icon: faFont
            },
            {
                title: 'Markdown Preview',
                description: 'Editor y visualizador de Markdown en tiempo real.',
                href: '/tools/texto/markdown-preview',
                icon: faFileCode
            }
        ]
    },
    {
        name: 'Schema SEO',
        slug: 'seo-schema',
        icon: faTags,
        color: 'text-indigo-500',
        description: 'Generadores de datos estructurados JSON-LD.',
        tools: [
            {
                title: 'Schema Artículo',
                description: 'Crea datos estructurados para blogs y noticias.',
                href: '/tools/seo-schema/article',
                icon: faNewspaper
            },
            {
                title: 'Schema Producto',
                description: 'Mejora la apariencia en Google Shopping y rich snippets.',
                href: '/tools/seo-schema/product',
                icon: faShoppingCart
            },
            {
                title: 'Schema Negocio Local',
                description: 'Optimiza para búsquedas locales y Google Maps.',
                href: '/tools/seo-schema/local-business',
                icon: faStore
            },
            {
                title: 'Schema FAQ',
                description: 'Genera estructura para preguntas frecuentes.',
                href: '/tools/seo-schema/faq-page',
                icon: faQuestionCircle
            },
            {
                title: 'Schema Organización',
                description: 'Define la identidad de tu empresa o marca.',
                href: '/tools/seo-schema/organization',
                icon: faBriefcase
            },
            {
                title: 'Schema Video',
                description: 'Ayuda a Google a indexar tus videos correctamente.',
                href: '/tools/seo-schema/video',
                icon: faVideo
            },
            {
                title: 'Analizador Meta Tags',
                description: 'Analiza títulos y descripciones de cualquier web.',
                href: '/tools/seo-schema/analizador-meta',
                icon: faSearchPlus
            },
            {
                title: 'Generador Robots.txt',
                description: 'Crea archivos robots.txt para controlar el rastreo.',
                href: '/tools/seo-schema/generador-robots',
                icon: faRobot
            }
        ]
    },
    {
        name: 'Fecha y Tiempo',
        slug: 'fecha',
        icon: faClock,
        color: 'text-teal-500',
        description: 'Herramientas de gestión de tiempo y calendarios.',
        tools: [
            {
                title: 'Cronómetro',
                description: 'Cronómetro preciso con vueltas (Laps).',
                href: '/tools/fecha/cronometro',
                icon: faStopwatch
            },
            {
                title: 'Temporizador',
                description: 'Cuenta regresiva con alarma visual.',
                href: '/tools/fecha/temporizador',
                icon: faHourglassHalf
            },
            {
                title: 'Diferencia de Fechas',
                description: 'Calcula días entre dos fechas.',
                href: '/tools/fecha/diferencia-fechas',
                icon: faCalendarAlt
            },
            {
                title: 'Cronómetro Pomodoro',
                description: 'Técnica Pomodoro para maximizar tu productividad.',
                href: '/tools/fecha/pomodoro',
                icon: faClock
            }
        ]
    },
    {
        name: 'Matemáticas',
        slug: 'matematicas',
        icon: faCalculator,
        color: 'text-indigo-500',
        description: 'Calculadoras matemáticas para porcentajes, reglas y azar.',
        tools: [
            {
                title: 'Calculadora de Porcentajes',
                description: 'Calcula porcentajes, descuentos y aumentos.',
                href: '/tools/matematicas/porcentaje',
                icon: faPercentage
            },
            {
                title: 'Regla de Tres',
                description: 'Resuelve problemas de proporcionalidad directa.',
                href: '/tools/matematicas/regla-de-tres',
                icon: faEquals
            },
            {
                title: 'Números Aleatorios',
                description: 'Genera números al azar para sorteos.',
                href: '/tools/matematicas/numeros-aleatorios',
                icon: faDice
            },
            {
                title: 'Conversor de Unidades',
                description: 'Convierte longitud, peso, temperatura y más.',
                href: '/tools/matematicas/conversor-unidades',
                icon: faExchangeAlt
            },
            {
                title: 'Calculadora de Edad',
                description: 'Calcula tu edad exacta en años, meses y días.',
                href: '/tools/matematicas/calculadora-edad',
                icon: faCalendarAlt
            },
            {
                title: 'Conversor Binario',
                description: 'Traduce texto a binario y viceversa.',
                href: '/tools/matematicas/conversor-binario',
                icon: faMicrochip
            },
            {
                title: 'Calculadora de Promedio',
                description: 'Calcula la media de tus notas o valores.',
                href: '/tools/matematicas/calculadora-promedio',
                icon: faGraduationCap
            }
        ]
    },
    {
        name: 'Salud y Bienestar',
        slug: 'salud',
        icon: faHeartbeat,
        color: 'text-rose-500',
        description: 'Herramientas para cuidar tu salud y forma física.',
        tools: [
            {
                title: 'Calculadora de IMC',
                description: 'Calcula tu Índice de Masa Corporal (BMI).',
                href: '/tools/salud/imc',
                icon: faWeight
            },
            {
                title: 'Calculadora de Calorías',
                description: 'Estima tu Gasto Calórico Basal (TMB).',
                href: '/tools/salud/calorias',
                icon: faFire
            },
            {
                title: 'Consumo de Agua',
                description: 'Calcula cuánta agua debes beber al día.',
                href: '/tools/salud/agua',
                icon: faTint
            },
            {
                title: 'Calculadora de Embarazo',
                description: 'Calcula tu fecha probable de parto (FPP).',
                href: '/tools/salud/embarazo',
                icon: faBaby
            },
            {
                title: 'Calculadora de Ovulación',
                description: 'Calendario de fertilidad y días fértiles.',
                href: '/tools/salud/ovulacion',
                icon: faVenus
            },
            {
                title: 'Calculadora de Sueño',
                description: 'Calcula la mejor hora para dormir o despertar.',
                href: '/tools/salud/calculadora-sueno',
                icon: faBed
            }
        ]
    },
    {
        name: 'Herramientas PDF',
        slug: 'pdf',
        icon: faFilePdf,
        color: 'text-red-600',
        description: 'Manipulación de archivos PDF 100% en tu navegador.',
        tools: [
            {
                title: 'Unir PDF',
                description: 'Combina múltiples archivos PDF en uno solo.',
                href: '/tools/pdf/unir-pdf',
                icon: faFilePdf
            },
            {
                title: 'Imágenes a PDF',
                description: 'Convierte imágenes (JPG, PNG) a un archivo PDF.',
                href: '/tools/pdf/imagenes-a-pdf',
                icon: faImage
            },
            {
                title: 'Proteger PDF',
                description: 'Añade contraseña y encriptación a tus archivos PDF.',
                href: '/tools/pdf/proteger-pdf',
                icon: faLock
            },
            {
                title: 'Dividir PDF',
                description: 'Separa un PDF en páginas individuales gratis.',
                href: '/tools/pdf/dividir-pdf',
                icon: faFilePdf
            },
            {
                title: 'Comprimir PDF',
                description: 'Reduce el tamaño de tus archivos PDF sin perder calidad.',
                href: '/tools/pdf/comprimir-pdf',
                icon: faCompress
            },
            {
                title: 'PDF a Word',
                description: 'Convierte archivos PDF a documentos Word editables.',
                href: '/tools/pdf/pdf-a-word',
                icon: faFileWord
            },
            {
                title: 'PDF a Excel',
                description: 'Convierte tablas de PDF a hojas de cálculo Excel editables.',
                href: '/tools/pdf/pdf-a-excel',
                icon: faFileExcel
            },
            {
                title: 'PDF a Texto',
                description: 'Extrae el contenido de texto de tus archivos PDF.',
                href: '/tools/pdf/pdf-a-texto',
                icon: faFileAlt
            }
        ]
    },
    {
        name: 'Muebles & Decoración',
        slug: 'muebles',
        icon: faCouch,
        color: 'text-amber-600',
        description: 'Calculadoras de medidas para muebles y distribución de hogar.',
        tools: [
            {
                title: 'Tamaño Sofá',
                description: '¿Cabe el sofá en tu salón? Calcúlalo aquí.',
                href: '/tools/muebles/tamano-sofa',
                icon: faCouch
            },
            {
                title: 'Sofá Seccional',
                description: 'Simulador 3D para sofás en L y Chaise Longue.',
                href: '/tools/muebles/sofa-seccional',
                icon: faCouch
            },
            {
                title: 'Mesa de Centro',
                description: 'Calcula el tamaño ideal de tu mesa de centro.',
                href: '/tools/muebles/mesa-centro',
                icon: faCouch
            },
            {
                title: 'Mueble TV',
                description: 'Distancia y altura ideal para tu televisor.',
                href: '/tools/muebles/mueble-tv',
                icon: faTv
            },
            {
                title: 'Calculadora Pintura',
                description: 'Cantidad de pintura necesaria para tu habitación.',
                href: '/tools/muebles/calculadora-pintura',
                icon: faPaintRoller
            }
        ]
    },
    {
        name: 'Madera y Carpintería',
        slug: 'madera',
        icon: faTree,
        color: 'text-amber-800',
        description: 'Calculadoras de volumen, pies tablares y cortes para carpinteros.',
        tools: [
            {
                title: 'Volumen Madera (m³ / ft³)',
                description: 'Calcula el volumen de madera en rollos o aserrada.',
                href: '/tools/madera/volumen-madera',
                icon: faCube
            },
            {
                title: 'Pies Tablares (Board Feet)',
                description: 'Calculadora de pies tablares y precio de madera.',
                href: '/tools/madera/pies-tablares',
                icon: faRuler
            },
            {
                title: 'Tableros MDF',
                description: 'Calcula peso y optimización de hojas MDF.',
                href: '/tools/madera/calculadora-mdf',
                icon: faLayerGroup
            },
            {
                title: 'Contrachapado (Plywood)',
                description: 'Calculadora de hojas de triplay / plywood.',
                href: '/tools/madera/calculadora-contrachapado',
                icon: faLayerGroup
            },
            {
                title: 'Tableros Melamina',
                description: 'Estimación de material para muebles de melamina.',
                href: '/tools/madera/calculadora-melamina',
                icon: faThLarge
            },
            {
                title: 'Aglomerado',
                description: 'Calculadora para tableros de partículas.',
                href: '/tools/madera/calculadora-aglomerado',
                icon: faThLarge
            },
            {
                title: 'Chapa de Madera',
                description: 'Cálculo de láminas de enchape (Veneer).',
                href: '/tools/madera/calculadora-chapado',
                icon: faLayerGroup
            },
            {
                title: 'Listones de Madera',
                description: 'Calculadora de rastreles y vigas de madera.',
                href: '/tools/madera/calculadora-listones',
                icon: faRuler
            }
        ]
    }
];
