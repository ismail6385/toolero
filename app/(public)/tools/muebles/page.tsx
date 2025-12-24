import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCouch, faBed, faTable, faChair, faTv, faBook, faShoePrints, faRulerCombined, faPaintRoller, faLayerGroup,
    faBoxOpen, faColumns, faDungeon, faDiceD6
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
    title: 'Calculadoras de Muebles y Decoración - Medidas Exactas | Toolero',
    description: 'Colección de herramientas gratuitas para calcular medidas de muebles, sofás, camas, mesas y distribución de espacios. Planifica tu hogar perfecto.',
    keywords: ['calculadoras muebles', 'medidas sofa', 'tamaño cama', 'distribucion salon', 'herramientas decoracion', 'carpinteria medidas'],
};

const tools = [
    {
        title: 'Calculadora de Pintura',
        desc: 'Calcula litros de pintura por m²',
        url: '/tools/muebles/calculadora-pintura',
        icon: faPaintRoller,
        color: 'text-teal-500',
        bg: 'bg-teal-50'
    },
    {
        title: 'Tamaño de Sofá',
        desc: '¿Cabe el sofá en tu salón?',
        url: '/tools/muebles/tamano-sofa',
        icon: faCouch,
        color: 'text-indigo-500',
        bg: 'bg-indigo-50'
    },
    {
        title: 'Sofá Seccional',
        desc: 'Medidas para Chaise Longue',
        url: '/tools/muebles/sofa-seccional',
        icon: faLayerGroup,
        color: 'text-purple-500',
        bg: 'bg-purple-50'
    },
    {
        title: 'Tamaño de Cama',
        desc: 'King, Queen, Twin y medidas',
        url: '/tools/muebles/tamano-cama',
        icon: faBed,
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },
    {
        title: 'Tamaño Colchón',
        desc: 'Comparador de colchones',
        url: '/tools/muebles/tamano-colchon',
        icon: faBed,
        color: 'text-blue-400',
        bg: 'bg-blue-50'
    },
    {
        title: 'Medidas Armario',
        desc: 'Diseña tu ropero ideal',
        url: '/tools/muebles/medidas-armario',
        icon: faDungeon,
        color: 'text-orange-500',
        bg: 'bg-orange-50'
    },
    {
        title: 'Medidas Alacena',
        desc: 'Optimiza tu cocina',
        url: '/tools/muebles/medidas-alacena',
        icon: faBoxOpen,
        color: 'text-orange-400',
        bg: 'bg-orange-50'
    },
    {
        title: 'Mesa Comedor',
        desc: 'Sillas y espacio necesario',
        url: '/tools/muebles/mesa-comedor',
        icon: faTable,
        color: 'text-red-500',
        bg: 'bg-red-50'
    },
    {
        title: 'Mesa de Centro',
        desc: 'Proporción con el sofá',
        url: '/tools/muebles/mesa-centro',
        icon: faDiceD6, // Cube roughly represents coffee table
        color: 'text-red-400',
        bg: 'bg-red-50'
    },
    {
        title: 'Mueble TV',
        desc: 'Altura y distancia ideal',
        url: '/tools/muebles/mueble-tv',
        icon: faTv,
        color: 'text-gray-600',
        bg: 'bg-gray-100'
    },
    {
        title: 'Escritorio Estudio',
        desc: 'Espacio para estudiantes',
        url: '/tools/muebles/escritorio-estudio',
        icon: faBook,
        color: 'text-green-500',
        bg: 'bg-green-50'
    },
    {
        title: 'Escritorio Oficina',
        desc: 'Ergonomía laboral',
        url: '/tools/muebles/escritorio-oficina',
        icon: faTable,
        color: 'text-green-600',
        bg: 'bg-green-50'
    },
    {
        title: 'Altura Ergonómica',
        desc: 'Silla y mesa perfecta',
        url: '/tools/muebles/altura-ergonomica',
        icon: faChair,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50'
    },
    {
        title: 'Estantería Libros',
        desc: 'Altura de baldas',
        url: '/tools/muebles/estanteria-libros',
        icon: faColumns,
        color: 'text-amber-600',
        bg: 'bg-amber-50'
    },
    {
        title: 'Zapatero',
        desc: 'Capacidad de pares',
        url: '/tools/muebles/zapatero',
        icon: faShoePrints,
        color: 'text-pink-500',
        bg: 'bg-pink-50'
    },
    {
        title: 'Tamaño Cajón',
        desc: 'Volumen y guías',
        url: '/tools/muebles/tamano-cajon',
        icon: faBoxOpen,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50'
    },
    {
        title: 'Espaciado Cajones',
        desc: 'Distribución vertical',
        url: '/tools/muebles/espaciado-cajones',
        icon: faRulerCombined,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50'
    },
    {
        title: 'Espaciado Estantes',
        desc: 'Distribución equilibrada',
        url: '/tools/muebles/espaciado-estantes',
        icon: faRulerCombined,
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
    {
        title: 'Lamas Cama',
        desc: 'Separación somier',
        url: '/tools/muebles/lamas-cama',
        icon: faRulerCombined,
        color: 'text-blue-300',
        bg: 'bg-blue-50' // Light blue
    },
    {
        title: 'Mesa Conferencias',
        desc: 'Capacidad personas',
        url: '/tools/muebles/mesa-conferencias',
        icon: faTable,
        color: 'text-slate-600',
        bg: 'bg-slate-100'
    },
    {
        title: 'Estación Trabajo',
        desc: 'Setup completo',
        url: '/tools/muebles/estacion-trabajo',
        icon: faTable,
        color: 'text-slate-500',
        bg: 'bg-slate-50'
    }
];

export default function MueblesCategoryPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    Calculadoras de Muebles y Decoración
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Herramientas precisas para carpinteros, diseñadores de interiores y amantes del bricolaje.
                    Calcula medidas, espacios y materiales al instante.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.url}
                        href={tool.url}
                        className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-100 flex flex-col"
                    >
                        <div className={`w-14 h-14 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                            <FontAwesomeIcon icon={tool.icon} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {tool.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {tool.desc}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
