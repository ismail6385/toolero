const fs = require('fs');
const path = require('path');

const tools = [
    { slug: 'tamano-sofa', title: 'Calculadora de Tamaño de Sofá', kw: 'sofa size calculator' },
    { slug: 'sofa-seccional', title: 'Calculadora de Sofá Seccional', kw: 'sectional sofa calculator' },
    { slug: 'tamano-cama', title: 'Calculadora de Tamaño de Cama', kw: 'bed size calculator' },
    { slug: 'tamano-colchon', title: 'Calculadora de Tamaño de Colchón', kw: 'mattress size calculator' },
    { slug: 'medidas-armario', title: 'Calculadora de Medidas de Armario', kw: 'wardrobe calculator' },
    { slug: 'medidas-alacena', title: 'Calculadora de Medidas de Alacena', kw: 'cupboard calculator' },
    { slug: 'mesa-comedor', title: 'Calculadora de Mesa de Comedor', kw: 'dining table size' },
    { slug: 'mesa-centro', title: 'Calculadora de Mesa de Centro', kw: 'coffee table size' },
    { slug: 'mueble-tv', title: 'Calculadora de Mueble de TV', kw: 'tv unit size' },
    { slug: 'escritorio-estudio', title: 'Calculadora de Escritorio de Estudio', kw: 'study table size' },
    { slug: 'escritorio-oficina', title: 'Calculadora de Escritorio de Oficina', kw: 'office desk size' },
    { slug: 'altura-ergonomica', title: 'Calculadora de Altura Silla y Escritorio', kw: 'chair desk height' },
    { slug: 'estanteria-libros', title: 'Calculadora de Estantería de Libros', kw: 'bookshelf size' },
    { slug: 'zapatero', title: 'Calculadora de Zapatero', kw: 'shoe rack size' },
    { slug: 'tamano-cajon', title: 'Calculadora de Tamaño de Cajones', kw: 'drawer size' },
    { slug: 'espaciado-cajones', title: 'Calculadora de Espaciado de Cajones', kw: 'drawer spacing' },
    { slug: 'espaciado-estantes', title: 'Calculadora de Espaciado de Estantes', kw: 'shelf spacing' },
    { slug: 'lamas-cama', title: 'Calculadora de Lamas de Cama', kw: 'bed slat spacing' },
    { slug: 'mesa-conferencias', title: 'Calculadora de Mesa de Conferencias', kw: 'conference table size' },
    { slug: 'estacion-trabajo', title: 'Calculadora de Estación de Trabajo', kw: 'workstation desk size' }
];

const baseDir = path.join('d:', 'toolero', 'app', 'tools', 'muebles');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

tools.forEach(tool => {
    const dir = path.join(baseDir, tool.slug);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const pageContent = `import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '${tool.title} Online Gratis | Toolero',
    description: 'Herramienta para calcular ${tool.title.toLowerCase()}. Optimiza el espacio de tu hogar con nuestras calculadoras de muebles.',
    keywords: ['${tool.kw}', 'calculadora muebles', '${tool.slug.replace('-', ' ')}', 'toolero'],
};

export default function Page() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">${tool.title}</h1>
            <p className="text-xl text-gray-600 mb-8">
                Esta herramienta está en construcción. ¡Vuelve pronto para usar la ${tool.title}!
            </p>
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-4xl">🚧</span>
                <p className="mt-4 font-medium text-gray-500">Estamos trabajando en ello...</p>
            </div>
        </div>
    );
}
`;

    fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
    console.log(`Created ${tool.slug}`);
});
